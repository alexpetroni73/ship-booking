const Common = require('./common')

const Ship = require('./ship')
const Feature = require('./feature')
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
  Feature,
  Itinerary,
  Cruise,
]

module.exports = typeDefs
