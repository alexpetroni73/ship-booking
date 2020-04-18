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

  length: {
    type: String
  },

  dives: {
    type: String
  },

  experience: {
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

  stopovers: [{
      title: String,
      description: String,
  }],
}

module.exports = buildTimestampSchema(schemaDefinition)
