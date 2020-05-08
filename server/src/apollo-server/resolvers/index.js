const merge = require('deepmerge')

const Common = require('./common')

const Ship = require('./ship')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')
const Cruise = require('./cruise')

const resolvers = merge.all([
  Common,
  Ship,
  FeatureSet,
  Itinerary,
  Cruise,
])

module.exports = resolvers
