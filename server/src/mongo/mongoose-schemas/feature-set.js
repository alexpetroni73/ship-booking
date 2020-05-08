module.exports = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
    unique: true, 
  },

  items: {
    type: [{
      slug: String,
      name: String,
    }]
  }
}
