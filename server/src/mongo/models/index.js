require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')

const Ship = mongoose.model('Ship', schemas.ship)
const Feature = mongoose.model('Feature', schemas.feature)

module.exports = {
  Ship,
  Feature,
}
