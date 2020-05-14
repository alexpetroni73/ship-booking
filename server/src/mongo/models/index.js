require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')


const Cruise = mongoose.model('Cruise', schemas.cruise)
const FeatureSet = mongoose.model('FeatureSet', schemas.featureSet)
const Itinerary = mongoose.model('Itinerary', schemas.itinerary)
const Ship = mongoose.model('Ship', schemas.ship)
const Option = mongoose.model('Option', schemas.option)

module.exports = {
  Cruise,
  FeatureSet,
  Itinerary,
  Option,
  Ship,
}
