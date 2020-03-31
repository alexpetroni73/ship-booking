const { Ship } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// const ship = async function (id) {
//   let agg = [aggExpr.matchById(id), aggExpr.addId(), ...shipLogoAgg()]
//   return (await Ship.aggregate(agg))[0]
// }

const ship = async function (id) {
  let agg = [
    aggExpr.matchById(id),
    aggExpr.addId(),
    cabinsAddIdAggExpr(),
  ]
  return (await Ship.aggregate(agg))[0]
}

const shipBy = async function (field, value) {
  let agg = [
    aggExpr.matchByField(field, value),
    aggExpr.addId(),
    cabinsAddIdAggExpr(),
  ]
  return (await Ship.aggregate(agg))[0]
}

const ships = async function (idArr) {
  let agg = [aggExpr.matchByIdArr(idArr), aggExpr.addId(), ...shipLogoAgg()]
  return await Ship.aggregate(agg)
}

const shipsBySlug = async function (slugArr) {
  let agg = [{'$match': {'slug': {'$in': slugArr}}}, aggExpr.addId(), ...shipLogoAgg()]
  return await Ship.aggregate(agg)
}

const searchShips = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId(), ...shipLogoAgg()]
  return await Ship.aggregate(agg)
}

const paginatedShips = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Ship.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId(), ...shipLogoAgg()])
  const totalQ = Ship.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const cabin = async function (shipId, id) {
  let c = await Ship.findOne({_id: ObjectId(shipId),  "cabins._id": ObjectId(id)}, {"cabins.$": 1})
  console.log(' c %o', c)
  return c && c.cabins && c.cabins[0]
  // let agg = [
  //   { $match: {_id: ObjectId(shipId),  "cabins._id": ObjectId(id)}},
  //   { $project: { cabins:
  //     { $filter : {
  //       input: "$cabins",
  //       as: "item",
  //       cond: { $eq: ["$$item._id", ObjectId(id)]}
  //     }}
  //   }},
  //   { $unwind: "$cabins"},
  //   { "$replaceRoot": { newRoot: "$cabins" }},
  //   aggExpr.addId(),
  // ]
  //
  // let result = await Ship.aggregate(agg)
  // // console.log('cabin result %o', result)
  // return result[0]
}

const cabinBySlug = async function (slug) {
  let agg = [{$match : {slug: slug}}, aggExpr.addId(), ...cabinLogoAgg()]
  return (await Ship.aggregate(agg))[0]
}

const cabins = async function (shipId) {
  let agg = [aggExpr.matchById(shipId),  cabinsAddIdAggExpr()]
  let result = await Ship.aggregate(agg)
  // console.log('cabins result %o', result)
  return result[0] && result[0].cabins ? result[0].cabins : []
}

const cabinsBySlug = async function (slugArr) {
  let agg = [{$match: {slug: {$in: slugArr}}}, aggExpr.addId(), ...cabinLogoAgg()]
  return await Ship.aggregate(agg)
}

const searchCabins = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId(), ...cabinLogoAgg()]
  return await Ship.aggregate(agg)
}

const paginatedCabins = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Ship.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId(), ...cabinLogoAgg()])
  const totalQ = Ship.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createShip = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Ship, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Ship, 'slug', slugSeed)

  const result = await Ship.create(input)
  return await ship(result._id)
}

const updateShip = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Ship, e, input[e], id)))
  }

  await Ship.findByIdAndUpdate(id, input)
  return await ship(id)
}

const deleteShip = async function (id) {
  let ship = await Ship.findById(id)
  await Ship.findByIdAndRemove(id)
  return id
}

const deleteShips = async function (idArr) {
  let attArr = await Ship.find({ _id: {$in: idArr }})
  await Ship.deleteMany({ _id: {$in: idArr }})
  return idArr
}

const createCabin = async function (shipId, input) {
  // // check required fields
  // utils.checkNonEmptyProperties(['name'], input)
  // // check unicity for provided fields
  // await utils.checkUniqueFieldValue(Cabin, 'name', input.name)
  // // ensure unique slug
  // let slugSeed = input.slug ? input.slug : input.name
  // input.slug = await utils.generateUniqueSlug(Cabin, 'slug', slugSeed)
//console.log('createCabin input %o', input)
  const result = await Ship.findByIdAndUpdate(shipId, {$push: {cabins: input}}, {new: true})
  console.log('createCabin result %o', result)
  // if(!result) return null
  let q = result && result.cabins && result.cabins.slice(-1)[0]
  console.log('addedCabin  %o', q)
  return result && result.cabins && result.cabins.slice(-1)[0]
//console.log('addedCabin  %o', addedCabin)
  // return await cabin(addedCabin._id)
}

const updateCabin = async function (shipId, id, input) {
  // check for non-empty & unique field values if provided
  // const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)
  //
  // input = utils.slugifyObjProperties(input, 'slug')
  // if(uniqueFieldsProvided.length){
  //   await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Cabin, e, input[e], id)))
  // }

  let updateData = Object.keys(input).reduce((acc, item) => {
    if(['_id', 'createdAt', 'updatedAt'].indexOf(item) != -1) return acc
    acc['cabins.$.' + item] = input[item]
    return acc
  }, {})
  console.log('updateData %o', updateData)
  console.log('ship._id: %s, cabins._id: %s', shipId, id)
  let s = await Ship.findOne({'_id': ObjectId(shipId), 'cabins._id': ObjectId(id)})
  console.log('s %o', s)
  await Ship.updateOne({'_id': ObjectId(shipId), 'cabins._id': ObjectId(id)}, {$set: updateData })

  return await cabin(shipId, id)
}

const deleteCabin = async function (shipId, id) {
  await Ship.findByIdAndUpdate(shipId, {$pull: {cabins: {'_id': ObjectId(id)}}})
  return id
}

const deleteCabins = async function (shipId, idArr) {
  await Ship.findByIdAndUpdate(shipId, {$pull: {cabins: {'_id': {$in: utils.idArrToObjectIdArr(idArr)}}}})

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

function shipLogoAgg () {
  return [
    { "$lookup": {
              from: "attachments",
              let: { imageId: "$logo" },
              pipeline: [
                {"$match": { $expr: { $eq: ['$_id', "$$imageId"]} }},
                {"$addFields": { id: "$_id"}},
                { "$project": { _id: 0, createdAt: 0, updatedAt:0 }},
              ],
              as: "logo"
        }},

        { "$addFields": {
          "logo": {"$arrayElemAt": ["$logo", 0]}
        }}
  ]
}

function cabinsAddIdAggExpr () {
  return {
    "$addFields":{
      cabins: { $map: {
        input: "$cabins",
        as: "item",
        in: { $mergeObjects:[ "$$item", { id: "$$item._id" } ] }
      }}
    }
  }
}

module.exports = {
  ship,
  shipBy,
  ships,
  shipsBySlug,
  searchShips,
  paginatedShips,

  cabin,
  cabinBySlug,
  cabins,
  cabinsBySlug,
  searchCabins,
  paginatedCabins,

  createShip,
  updateShip,
  deleteShip,
  deleteShips,

  createCabin,
  updateCabin,
  deleteCabin,
  deleteCabins,
}
