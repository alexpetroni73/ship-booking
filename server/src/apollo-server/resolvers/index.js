const merge = require('deepmerge')

const Common = require('./common')

const Ship = require('./ship')
const Feature = require('./feature')

const resolvers = merge.all([
  Common,
  Ship,
  Feature,
])

module.exports = resolvers
