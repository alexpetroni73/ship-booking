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
    unique: true,
  },

  excerpt: {
    type: String
  },

  description: {
    type: String
  },

  image: {
    type: String,
  },

  gallery: {
    type: [String]
  },

  locations: [{
      name: String,
      excerpt: String,
      description: String,
      image: String,
      gallery: [String]
  }],
}

module.exports = buildTimestampSchema(schemaDefinition)
