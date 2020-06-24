const merge = require('deepmerge')

const Common = require('./common')

const Attachment = require('./attachment')
const Cruise = require('./cruise')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')
const Option = require('./option')
const Search = require('./search')
const Ship = require('./ship')

const resolvers = merge.all([
  Common,

  Attachment,
  Cruise,
  FeatureSet,
  Itinerary,
  Option,
  Search,
  Ship,
])

module.exports = resolvers
