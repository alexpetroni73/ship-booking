module.exports = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
    unique: true,
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
      lng: Number,
      lat: Number,
  }],
}
