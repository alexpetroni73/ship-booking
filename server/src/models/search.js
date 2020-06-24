const { Cruise } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const paginatedSearchCruises = async function (args ={}) {
  let {
    page = 1, itemsPerPage = 25,
    location,
    startDate,
    search, searchFields = ['name', 'slug', 'sku'], searchOptions = 'i',
    sortBy,
    sortDesc,
    rawPrice,
  } = args


  let conditions = []

  if(location && location != 'all') {
    conditions.push({'itinerary.location': location})
  }

  if(!startDate || startDate == 'anytime') {
    startDate = moment().format('YYYY-MM')
  }

  let start = new Date(startDate)
  let end = new Date(moment(startDate).add(2, 'months').format('YYYY-MM'))

  conditions.push({'startDate': { '$gte': start}})
  conditions.push({'startDate': { '$lte': end}})


  console.log('conditions %o', conditions)

  const aggCond = [
    {$match: {$and: conditions} },

    {$group: {
      _id: "$ship",
      cruises: {$push: { startDate: "$startDate", endDate: "$endDate", location: "$itinerary.location", length: "$itinerary.length" } },
    }},
  ]

  const aggShip = [
    {$lookup: {
      from: "ships",
      localField: "_id",
      foreignField: "_id",
      as: "shipsArr"
    }},

    { $addFields: {
      "ship": { "$arrayElemAt": ["$shipsArr", 0]}
    }},

    { $addFields: {
      "ship.id": "$_id"
    }},
  ]

  const itemsQ = Cruise.aggregate([...aggCond, ...aggShip, ...aggExpr.pagination(page, itemsPerPage)])
  const totalQ = Cruise.aggregate([...aggCond, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])
  console.log('items %o', items)
  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

  // let result = await Cruise.aggregate([
  //   {$match: {$and: conditions} },
  //
  //   {$group: {
  //     _id: "$ship",
  //     cruises: {$push: { startDate: "$startDate", endDate: "$endDate", location: "$itinerary.location" } },
  //   }},
  //
  //
  //   {$lookup: {
  //     from: "ships",
  //     localField: "_id",
  //     foreignField: "_id",
  //     as: "ship"
  //   }},
  // ])
  //
  // console.log('result %o', result)
  //
  // console.log('no, results %s', result.length)
  //
  // return {
  //   total: 0,
  //   items: []
  // }
}

module.exports = {
  paginatedSearchCruises,
}
