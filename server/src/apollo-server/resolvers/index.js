const merge = require('deepmerge')

const Common = require('./common')

const Ship = require('./ship')
const Feature = require('./feature')
const Itinerary = require('./itinerary')
const Cruise = require('./cruise')

const resolvers = merge.all([
  Common,
  Ship,
  Feature,
  Itinerary,
  Cruise,
])

module.exports = resolvers
