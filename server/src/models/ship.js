const { Ship } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const ship = async function (id) {
  return shipBy('id', id)
}

const shipBy = async function (field, val) {
  return field == 'id' ? Ship.findById(val) : Ship.findOne({[field]: val})
}

const ships = async function (idArr) {
  return shipsBy('id', idArr)
}

const shipsBy = async function (field, valArr) {
  return field == 'id' ? Ship.find({'_id': { $in: valArr.map(e => ObjectId(e)) }}) : Ship.find({[field]: { $in: valArr }})
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
  const ship = await Ship.findOne({_id: ObjectId(shipId),  "cabins._id": ObjectId(id)}, {"cabins.$": 1})
  return ship && ship.cabins && ship.cabins[0]
}

const cabins = async function (shipId) {
  const ship = await Ship.findById(shipId)
  return ship && ship.cabins ? ship.cabins : []
}

const searchCabins = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), ...cabinsArrAggExpr()]
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

  return Ship.create(input)
}

const updateShip = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Ship, e, input[e], id)))
  }

  return Ship.findByIdAndUpdate(id, input, {new: true})
}

const deleteShip = async function (id) {
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
  delete input.id
  const result = await Ship.findByIdAndUpdate(shipId, {$push: {cabins: input}}, {new: true})

  if(!result){
    throw new Error ("No ship found with id " + shipId)
  }

  return result && result.cabins && result.cabins.slice(-1)[0]
}

const updateCabin = async function (shipId, id, input) {
  // check for non-empty & unique field values if provided
  // const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)
  //
  // input = utils.slugifyObjProperties(input, 'slug')
  // if(uniqueFieldsProvided.length){
  //   await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Cabin, e, input[e], id)))
  // }
  // console.log('id %s', id)

  const updateData = cabinMatchArrItemUpdateData(input)
  // console.log('updateData %o', updateData)
  // console.log('ship._id: %s, cabins._id: %s', shipId, id)
  // let s = await Ship.findOne({'_id': ObjectId(shipId), 'cabins._id': ObjectId(id)})
  // console.log('s %o', s)
  const result = await Ship.updateOne({'_id': ObjectId(shipId), 'cabins._id': ObjectId(id)}, {$set: updateData })
  // console.log('result %o', result)
  if(!result.n){
    throw new Error ("No ship found with id " + shipId)
  }

  return await cabin(shipId, id)
}

const deleteCabin = async function (shipId, id) {
  let r = await Ship.updateOne({'_id': ObjectId(shipId), 'cabins._id': ObjectId(id)}, {$pull: {cabins: {'_id': ObjectId(id)}}})
  // console.log('r %o', r)
  return id
}

const updateCabins = async function (shipId, inputArr) {
  await Promise.all(inputArr.map(e => {
    const id = e.id
    const updateData = cabinMatchArrItemUpdateData(e)
    return Ship.updateOne({'_id': ObjectId(shipId), 'cabins._id': ObjectId(id)}, {$set: updateData})
  }))
  // to save the cabins order is needed to push "$each" (MongoDb strange way of doing things...)
  await Ship.updateOne({"_id": ObjectId(shipId)}, {$push: { cabins: {"$each": [], $sort: {order: 1}}}}  )

  return cabins(shipId)
}

const deleteCabins = async function (shipId, idArr) {
  await Ship.findByIdAndUpdate(shipId, {$pull: {cabins: {'_id': {$in: utils.idArrToObjectIdArr(idArr)}}}})
  return idArr
}

// -----------------------------------------------------------
// ------------------ PRIVATE ---------------
// -----------------------------------------------------------

// return the update object for a cabin in form of { cabins.$.fieldName: value , ... } for an update array match
function cabinMatchArrItemUpdateData (input) {
  return Object.keys(input).reduce((acc, item) => {
    if(['id', 'createdAt', 'updatedAt'].indexOf(item) != -1) return acc
    acc['cabins.$.' + item] = input[item]
    return acc
  }, {})
}

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

function cabinsUnwindAggExpr () {
  return {
    "$unwind": "$cabins"
  }
}

function cabinsRootReplaceAggExpr () {
  return {
    "$replaceRoot":{ newRoot: "$cabins" }
  }
}

function cabinsSortAggExpr () {
  return {
    "$sort":{ order: 1 }
  }
}

function cabinsArrAggExpr () {
  return [cabinsAddIdAggExpr(), cabinsUnwindAggExpr(), cabinsRootReplaceAggExpr(), cabinsSortAggExpr()]
}

function cabinsSortAndAddIdAggExpr () {
  return [
    {
      "$unwind": {
        path: "$cabins",
        preserveNullAndEmptyArrays: true,
      }
    },

    {
      "$sort": {
        "cabins.order": 1
      }
    },

    {
      "$addFields": {
        "cabins.id": "$cabins._id"
      }
    },

    {
      "$group": {
        "_id": "$_id"
      }
    },
  ]
}

module.exports = {
  ship,
  shipBy,
  ships,
  shipsBy,
  searchShips,
  paginatedShips,

  cabin,
  cabins,
  searchCabins,
  paginatedCabins,

  createShip,
  updateShip,
  deleteShip,
  deleteShips,

  createCabin,
  updateCabin,
  deleteCabin,

  updateCabins,
  deleteCabins,
}
