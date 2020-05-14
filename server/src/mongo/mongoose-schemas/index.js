const { buildTimestampSchema } = require('./../utils')

const cruise = require('./cruise')
const featureSet = require('./feature-set')
const itinerary = require('./itinerary')
const option= require('./option')
const ship = require('./ship')

module.exports = {
  cruise: buildTimestampSchema(cruise),
  featureSet: buildTimestampSchema(featureSet),
  itinerary: buildTimestampSchema(itinerary),
  option: buildTimestampSchema(option),
  ship: buildTimestampSchema(ship),
}
