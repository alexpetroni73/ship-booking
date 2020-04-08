const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Cabin = require('./cabin')
const ShipSpecifications = require('./ship-specifications')

const { buildTimestampSchema } = require('./../utils')


const schemaDefinition = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
    unique: true,
  },

  excerpt: {
    type: String
  },

  description: {
    type: String
  },

  shipFeatures: {
    type: [String],
  },

  shipFeaturesText: {
      type: String,
  },

  foodAndDrinksFeatures: {
    type: [String],
  },

  foodAndDrinksFeaturesText: {
      type: String,
  },

  divingFeatures: {
    type: [String],
  },

  divingFeaturesText: {
    type: String,
  },

  gearRental: {
    type: String,
  },

  gearRentalText: {
    type: String,
  },

  shipLayout: {
    type: String,
  },

  shipLayoutText: {
    type: String,
  },

  shipSpecifications: {
    type: ShipSpecifications,
    default: {}
  },

  shipSpecificationsText: {
    type: String,
  },

  navSafteyFeatures: {
    type: [String],
  },

  navSafteyFeaturesText: {
    type: String,
  },

  cabins: {
    type: [Cabin]
  },

  cabinsText: {
    type: String,
  },

  image: {
    type: String,
  },

  gallery: {
    type: [String]
  },
}

module.exports = buildTimestampSchema(schemaDefinition)
