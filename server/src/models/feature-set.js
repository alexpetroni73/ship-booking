const { FeatureSet } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')
const slug = require('slug')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const featureSet = async function (slug) {
  let agg = [
    aggExpr.matchByField('slug', slug),
    aggExpr.addId(),
  ]
  return (await FeatureSet.aggregate(agg))[0]
}

const featureSetBy = async function (field, value) {
  let agg = [
    aggExpr.matchByField(field, value),
    aggExpr.addId(),
  ]
  return (await FeatureSet.aggregate(agg))[0]
}

const featureSets = async function (slugArr) {
  let agg = [aggExpr.matchByIdArr(slugArr), aggExpr.addId()]
  return await FeatureSet.aggregate(agg)
}

const featureSetsBySlug = async function (slugArr) {
  let agg = [{'$match': {'slug': {'$in': slugArr}}}, aggExpr.addId()]
  return await FeatureSet.aggregate(agg)
}

const searchFeatureSets = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  return await FeatureSet.aggregate(agg)
}

const paginatedFeatureSets = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = FeatureSet.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId()])
  const totalQ = FeatureSet.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}

const createFeatureSet = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(FeatureSet, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(FeatureSet, 'slug', slugSeed)

  const result = await FeatureSet.create(input)
  return await featureSet(result._id)
}

const updateFeatureSet = async function (slug, input) {
  if(input.items) {
    input.items = slugfifyItems(input.items)
  }
  await FeatureSet.findOneAndUpdate({slug: slug}, input, {upsert: true})
  return await featureSet(slug)
}

const deleteFeatureSet = async function (id) {
  let featureSet = await FeatureSet.findById(id)
  await FeatureSet.findByIdAndRemove(id)
  return id
}

const deleteFeatureSets = async function (slugArr) {
  let attArr = await FeatureSet.find({ slug: {$in: slugArr }})
  await FeatureSet.deleteMany({ slug: {$in: slugArr }})
  return slugArr
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
  featureSet,
  featureSetBy,
  featureSets,
  featureSetsBySlug,
  searchFeatureSets,
  paginatedFeatureSets,

  createFeatureSet,
  updateFeatureSet,
  deleteFeatureSet,
  deleteFeatureSets,
}
