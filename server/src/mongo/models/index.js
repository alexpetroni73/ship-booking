require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')

const Ship = mongoose.model('Ship', schemas.ship)
const Feature = mongoose.model('Feature', schemas.feature)
const Itinerary = mongoose.model('Itinerary', schemas.itinerary)

module.exports = {
  Ship,
  Feature,
  Itinerary,
}
