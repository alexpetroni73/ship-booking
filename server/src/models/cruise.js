const { Cruise } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const cruise = async function (id) {
  return cruiseBy('id', id)
}

const cruiseBy = async function (field, val) {
  return field == 'id' ? Cruise.findById(val) : Cruise.findOne({[field]: val})
}

const cruises = async function (idArr) {
  return cruisesBy('id', idArr)
}

const cruisesBy = async function (field, valArr) {
  return field == 'id' ? Cruise.find({'_id': { $in: valArr.map(e => ObjectId(e)) }}) : Cruise.find({[field]: { $in: valArr }})
}

const searchCruises = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  return await Cruise.aggregate(agg)
}

const paginatedCruises = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Cruise.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId()])
  const totalQ = Cruise.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createCruise = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Cruise, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Cruise, 'slug', slugSeed)

  return Cruise.create(input)
}

const updateCruise = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Cruise, e, input[e], id)))
  }

  return Cruise.findByIdAndUpdate(id, input, {new: true})
}

const deleteCruise = async function (id) {
  await Cruise.findByIdAndRemove(id)
  return id
}

const deleteCruises = async function (idArr) {
  let attArr = await Cruise.find({ _id: {$in: idArr }})
  await Cruise.deleteMany({ _id: {$in: idArr }})
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
  cruise,
  cruiseBy,
  cruises,
  cruisesBy,
  searchCruises,
  paginatedCruises,

  createCruise,
  updateCruise,
  deleteCruise,
  deleteCruises,

}
