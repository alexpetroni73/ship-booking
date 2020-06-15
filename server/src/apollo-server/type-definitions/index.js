const Common = require('./common')

const Attachment = require('./attachment')
const Cruise = require('./cruise')
const FeatureSet = require('./feature-set')
const Itinerary = require('./itinerary')
const Option = require('./option')
const Ship = require('./ship')


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

  Attachment,
  Cruise,
  FeatureSet,
  Itinerary,
  Option,
  Ship,

]

module.exports = typeDefs
