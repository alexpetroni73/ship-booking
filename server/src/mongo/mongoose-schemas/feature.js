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

  items: {
    type: [{
      slug: String,
      name: String,
    }]
  }
}

module.exports = buildTimestampSchema(schemaDefinition)
