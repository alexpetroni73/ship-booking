module.exports = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
  },

  type: {
  type: String
},
  ensuite: {
  type: Boolean
},
surface: {
  type: Number
},
balcony: {
  type: Boolean
},
  shower: {
  type: Boolean
},

bathub: {
  type: Boolean
},

seaView: {
  type: Boolean
},
  bedding: {
  type: String
},
  pullmanBedding: {
  type: String
},
  airconditioning: {
  type: Boolean
},
  tv: {
  type: Boolean
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
