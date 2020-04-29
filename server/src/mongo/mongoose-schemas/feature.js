module.exports = {
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
