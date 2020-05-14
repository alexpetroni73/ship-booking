const merge = require('deepmerge')

const Common = require('./common')


const Cruise = require('./cruise')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')
const Option = require('./option')
const Ship = require('./ship')

const resolvers = merge.all([
  Common,

  Cruise,
  FeatureSet,
  Itinerary,
  Option,
  Ship,
])

module.exports = resolvers
