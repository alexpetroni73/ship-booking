const { Itinerary } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const itinerary = async function (id) {
  return itineraryBy('id', id)
}

const itineraryBy = async function (field, val) {
  return field == 'id' ? Itinerary.findById(val) : Itinerary.findOne({[field]: val})
}

const itineraries = async function (idArr) {
  return itinerariesBy('id', idArr)
}

const itinerariesBy = async function (field, valArr) {
  return field == 'id' ? Itinerary.find({'_id': { $in: valArr.map(e => ObjectId(e)) }}) : Itinerary.find({[field]: { $in: valArr }})
}

const searchItineraries = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  return await Itinerary.aggregate(agg)
}

const paginatedItineraries = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Itinerary.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId()])
  const totalQ = Itinerary.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createItinerary = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Itinerary, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Itinerary, 'slug', slugSeed)

  return Itinerary.create(input)
}

const updateItinerary = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Itinerary, e, input[e], id)))
  }

  return Itinerary.findByIdAndUpdate(id, input, {new: true})
}

const deleteItinerary = async function (id) {
  await Itinerary.findByIdAndRemove(id)
  return id
}

const deleteItineraries = async function (idArr) {
  let attArr = await Itinerary.find({ _id: {$in: idArr }})
  await Itinerary.deleteMany({ _id: {$in: idArr }})
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
  itinerary,
  itineraryBy,
  itineraries,
  itinerariesBy,
  searchItineraries,
  paginatedItineraries,

  createItinerary,
  updateItinerary,
  deleteItinerary,
  deleteItineraries,

}
