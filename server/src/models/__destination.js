const { Destination } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const destination = async function (id) {
  return destinationBy('id', id)
}

const destinationBy = async function (field, val) {
  return field == 'id' ? Destination.findById(val) : Destination.findOne({[field]: val})
}

const destinations = async function (idArr) {
  return destinationsBy('id', idArr)
}

const publishedDestinations = async function () {
  return Destination.find({})
}

const destinationsBy = async function (field, valArr) {
  return field == 'id' ? Destination.find({'_id': { $in: valArr.map(e => ObjectId(e)) }}) : Destination.find({[field]: { $in: valArr }})
}

const searchDestinations = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  return await Destination.aggregate(agg)
}

const paginatedDestinations = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Destination.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId()])
  const totalQ = Destination.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createDestination = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Destination, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Destination, 'slug', slugSeed)

  return Destination.create(input)
}

const updateDestination = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Destination, e, input[e], id)))
  }

  return Destination.findByIdAndUpdate(id, input, {new: true})
}

const deleteDestination = async function (id) {
  await Destination.findByIdAndRemove(id)
  return id
}

const deleteDestinations = async function (idArr) {
  let attArr = await Destination.find({ _id: {$in: idArr }})
  await Destination.deleteMany({ _id: {$in: idArr }})
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
  destination,
  destinationBy,
  destinations,
  destinationsBy,
  searchDestinations,
  paginatedDestinations,
  publishedDestinations,

  createDestination,
  updateDestination,
  deleteDestination,
  deleteDestinations,

}
