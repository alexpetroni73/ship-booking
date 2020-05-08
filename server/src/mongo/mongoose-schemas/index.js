const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const { buildTimestampSchema } = require('./../utils')

const cruise = require('./cruise')
const featureSet = require('./feature-set')
const itinerary = require('./itinerary')
const ship = require('./ship')

module.exports = {
  cruise: buildTimestampSchema(cruise),
  featureSet: buildTimestampSchema(featureSet),
  itinerary: buildTimestampSchema(itinerary),
  ship: buildTimestampSchema(ship),
}
