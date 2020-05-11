const Common = require('./common')

const Country = require('./country')
const Cruise = require('./cruise')
const Ship = require('./ship')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')


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

  Country,
  Cruise,
  Ship,
  FeatureSet,
  Itinerary,

]

module.exports = typeDefs
