const { Feature } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')
const slug = require('slug')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const feature = async function (id) {
  let agg = [
    aggExpr.matchById(id),
    aggExpr.addId(),
  ]
  return (await Feature.aggregate(agg))[0]
}

const featureBy = async function (field, value) {
  let agg = [
    aggExpr.matchByField(field, value),
    aggExpr.addId(),
  ]
  return (await Feature.aggregate(agg))[0]
}

const features = async function (idArr) {
  let agg = [aggExpr.matchByIdArr(idArr), aggExpr.addId()]
  return await Feature.aggregate(agg)
}

const featuresBySlug = async function (slugArr) {
  let agg = [{'$match': {'slug': {'$in': slugArr}}}, aggExpr.addId()]
  return await Feature.aggregate(agg)
}

const searchFeatures = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  return await Feature.aggregate(agg)
}

const paginatedFeatures = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Feature.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId()])
  const totalQ = Feature.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}

const createFeature = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Feature, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Feature, 'slug', slugSeed)

  const result = await Feature.create(input)
  return await feature(result._id)
}

const updateFeature = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Feature, e, input[e], id)))
  }

  if(input.items) {
    input.items = slugfifyItems(input.items)
  }

  await Feature.findByIdAndUpdate(id, input)
  return await feature(id)
}

const deleteFeature = async function (id) {
  let feature = await Feature.findById(id)
  await Feature.findByIdAndRemove(id)
  return id
}

const deleteFeatures = async function (idArr) {
  let attArr = await Feature.find({ _id: {$in: idArr }})
  await Feature.deleteMany({ _id: {$in: idArr }})
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

// for an array of items [{name: '..' , slug: '..'}] if slug not defined, create it and remove eventual duplicates
function slugfifyItems (arr) {
  let items = arr.map(e => {
    if(!e.slug) {
      e.slug = slug(e.name)
    }
    return e
  })
  return items.filter( (e, index, arr) => index == arr.findIndex(c => c.slug == e.slug))
}




module.exports = {
  feature,
  featureBy,
  features,
  featuresBySlug,
  searchFeatures,
  paginatedFeatures,

  createFeature,
  updateFeature,
  deleteFeature,
  deleteFeatures,
}
