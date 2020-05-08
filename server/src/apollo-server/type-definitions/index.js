const Common = require('./common')

const Ship = require('./ship')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')
const Cruise = require('./cruise')

const Query = `
  type Query {
    _empty: String
  }
  `

const Mutation = `
  type Mutation {
    _empty: String
  }`

const typeDefs = [
  Query,
  Mutation,
  Common,

  Ship,
  FeatureSet,
  Itinerary,
  Cruise,
]

module.exports = typeDefs
