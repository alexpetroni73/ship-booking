const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const { buildTimestampSchema } = require('./../utils')

const schemaDefinition = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
  },

  excerpt: {
    type: String
  },

  description: {
    type: String
  },

  order: {
    type: Number,
    default: 5,
  },

  capacity: {
    type: Number,
    default: 2
  },

  features: {
    type: [String]
  },

  featuresText: {
    type: String
  },

  image: {
    type: String
  },

  gallery: {
    type: [String]
  },
}

module.exports = buildTimestampSchema(schemaDefinition)
