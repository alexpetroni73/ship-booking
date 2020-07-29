const { buildTimestampSchema } = require('./../utils')
const cabinObj = require('./cabin')
const Cabin = buildTimestampSchema(cabinObj)
const ShipSpecifications = require('./ship-specifications')
const ShipEntertainment = require('./ship-entertainment')
const ShipSafety = require('./ship-safety')

module.exports = {
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

  shipSafety: {
    type: ShipSafety,
    default: {}
  },

  shipEntertainment: {
    type: ShipEntertainment,
    default: {}
  },

  shipSpecificationsText: {
    type: String,
  },

  navSafetyFeatures: {
    type: [String],
  },

  navSafetyFeaturesText: {
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
