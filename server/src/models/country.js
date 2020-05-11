const { Country } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const country = async function (id) {
  return countryBy('id', id)
}

const countryBy = async function (field, val) {
  return field == 'id' ? Country.findById(val) : Country.findOne({[field]: val})
}

const countries = async function (idArr) {
  return countriesBy('id', idArr)
}

const publishedCountries = async function () {
  return Country.find({})
}

const countriesBy = async function (field, valArr) {
  return field == 'id' ? Country.find({'_id': { $in: valArr.map(e => ObjectId(e)) }}) : Country.find({[field]: { $in: valArr }})
}

const searchCountries = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  return await Country.aggregate(agg)
}

const paginatedCountries = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Country.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId()])
  const totalQ = Country.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createCountry = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Country, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Country, 'slug', slugSeed)

  return Country.create(input)
}

const updateCountry = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Country, e, input[e], id)))
  }

  return Country.findByIdAndUpdate(id, input, {new: true})
}

const deleteCountry = async function (id) {
  await Country.findByIdAndRemove(id)
  return id
}

const deleteCountries = async function (idArr) {
  let attArr = await Country.find({ _id: {$in: idArr }})
  await Country.deleteMany({ _id: {$in: idArr }})
  return idArr
}


// -----------------------------------------------------------
// ------------------ PRIVATE ---------------
// -----------------------------------------------------------


function getMatchExpr (args) {
  const matchingFields = ['id', 'name', 'slug',]
  let exprObject = aggExpr.parseMatchCompFiltersMultiOperators(matchingFields, args, ['', 'ne', 'in', 'not_in'])
  if(args.search){
    const {search, searchPaths = ['name', 'slug'], searchOptions} = args
    Object.assign(exprObject, aggExpr.parseMatchRegexFilters(search, searchPaths, searchOptions))
  }
  return {"$match": exprObject}
}




module.exports = {
  country,
  countryBy,
  countries,
  countriesBy,
  searchCountries,
  paginatedCountries,
  publishedCountries,

  createCountry,
  updateCountry,
  deleteCountry,
  deleteCountries,

}
