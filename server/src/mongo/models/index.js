require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')

const Country = mongoose.model('Country', schemas.country)
const Cruise = mongoose.model('Cruise', schemas.cruise)
const FeatureSet = mongoose.model('FeatureSet', schemas.featureSet)
const Itinerary = mongoose.model('Itinerary', schemas.itinerary)
const Ship = mongoose.model('Ship', schemas.ship)

module.exports = {
  Country,
  Cruise,
  FeatureSet,
  Itinerary,
  Ship,
}
