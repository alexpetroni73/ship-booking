const { Cruise } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const cruise = async function (id) {
  return cruiseBy('id', id)
}

const cruiseBy = async function (field, val) {
  let q = field == 'id' ? Cruise.findById(val).populate('ship').lean() : Cruise.findOne({[field]: val}).populate('ship').lean()

  let f = await q

  // patch
  if(f) {
    f.id = f._id.toString()

    if(f.ship && f.ship.cabins){
      f.ship.id = f.ship._id
      f.ship.cabins = f.ship.cabins.map(e => {
        e.id = e._id.toString()
        return e
      })
    }

    if(f.accommodations){
      let acc  = f.accommodations.map(e => {
        e.id = e._id.toString()
        let cabin = f.ship.cabins.find(c => {
            // console.log(' c.id %s, e.cabin %s',  c.id, e.cabin)
          return c.id == e.cabin.toString()
        })
      //  console.log('cabin %o', cabin)
        e.cabin = cabin
        return e
      })
      f.accommodations = acc
    }
  }

  // console.log('f %o', f)
  return f
}

const cruises = async function (idArr) {
  return cruisesBy('id', idArr)
}

const cruisesBy = async function (field, valArr) {
  return field == 'id' ? Cruise.find({'_id': { $in: valArr.map(e => ObjectId(e)) }}) : Cruise.find({[field]: { $in: valArr }})
}

const searchCruises = async function (args = {}) {
  // const {limit} = args
  // let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId()]
  // let r = await Cruise.aggregate(agg)
  // console.log('r %o', r)
  // return await Cruise.aggregate(agg)
  return Cruise.find({}).populate('ship')
}

const paginatedCruises = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Cruise.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), ...aggCruiseShip(), aggExpr.addId()])
  const totalQ = Cruise.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])
console.log('items %o', items)
  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createCruise = async function (input) {
  // console.log('input %o', input)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Cruise, 'slug', slugSeed)
  let result = await Cruise.create(input)
  return cruise(result._id)
}

const updateCruise = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Cruise, e, input[e], id)))
  }

  await Cruise.findByIdAndUpdate(id, input)

  return cruise(id)
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

function aggCruiseShip () {
  return [
    { "$lookup": {
    from: "ships",
    localField: "ship",
    foreignField: "_id",
    as: "ship"
  }},

   { "$addFields": {
     'ship': { $arrayElemAt: [ "$ship", 0] },
   }},

   { "$addFields": {
     'ship.id': "$ship._id"
   }},
  ]

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
