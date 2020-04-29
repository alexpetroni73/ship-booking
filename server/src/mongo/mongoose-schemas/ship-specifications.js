module.exports = {
  length: {
    type: Number
  },

  beam: {
    type: Number
  },

  topSpeed: {
    type: Number
  },

  cruisingSpeed: {
    type: Number
  },

  engines: {
    type: String,
    default: ''
  },

  maxGuests: {
    type: Number
  },

  bathrooms: {
    type: Number
  },

  tenders: {
    type: String,
  },

  waterCapacity: {
    type: Number
  },

  fuelCapacity: {
    type: Number
  },

  freshwaterMaker: {
    type: Boolean,
    default: false
  },
}
