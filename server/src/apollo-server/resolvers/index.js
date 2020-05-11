const merge = require('deepmerge')

const Common = require('./common')

const Country = require('./country')
const Cruise = require('./cruise')
const Ship = require('./ship')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')


const resolvers = merge.all([
  Common,

  Country,
  Cruise,
  Ship,
  FeatureSet,
  Itinerary,
])

module.exports = resolvers
