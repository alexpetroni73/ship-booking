require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')

const Cruise = mongoose.model('Cruise', schemas.cruise)
const Feature = mongoose.model('Feature', schemas.feature)
const Itinerary = mongoose.model('Itinerary', schemas.itinerary)
const Ship = mongoose.model('Ship', schemas.ship)

module.exports = {
  Cruise,
  Feature,
  Itinerary,
  Ship,
}
