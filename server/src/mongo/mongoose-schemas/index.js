const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const { buildTimestampSchema } = require('./../utils')

const cruise = require('./cruise')
const feature = require('./feature')
const itinerary = require('./itinerary')
const ship = require('./ship')

module.exports = {
  cruise: buildTimestampSchema(cruise),
  feature: buildTimestampSchema(feature),
  itinerary: buildTimestampSchema(itinerary),
  ship: buildTimestampSchema(ship),
}
