const Common = require('./common')

const Ship = require('./ship')
const Feature = require('./feature')

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
]

module.exports = typeDefs
