const { ObjectId } = require('./../utils')

module.exports = {
  ship: {
    stories: [{ type: ObjectId, ref: 'Ship' }]
  },

  slug: {
    type: String,
    index: true,
    unique: true,
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  itinerary: {
    name: {
      type: String
    },

    location: {
      type: String,
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

}
