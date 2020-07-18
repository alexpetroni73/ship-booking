module.exports = {

  tenders: {
    type: [{
      type: String,
      length: Number,
    }],
  },

  waveRunners: {
    type: [{
      maker: String,
      length: Number,
      type: String
    }],
  },

  paddleBoards: {
   type: Boolean,
  },
  paddleBoardsNo: {
  type: Number,
  },

  seabobs: {
   type: Boolean,
  },
  seabobsNo: {
  type: Number,
  },

  waterSkis: {
   type: Boolean,
  },
  waterSkisNo: {
  type: Number,
  },

  wakeboards: {
   type: Boolean,
  },
  wakeboardsNo: {
  type: Number,
  },

  waterSlide: {
   type: Boolean,
  },
  waterSlideLength: {
  type: Number,
  },

  bananas: {
   type: Boolean,
  },
  bananasNo: {
  type: Number,
  },

  surfboards: {
   type: Boolean,
  },
  surfboardsNo: {
  type: Number,
  },

  kayacs: {
   type: Boolean,
  },
  kayacsNo: {
  type: Number,
  },

  oceanPool: {
   type: Boolean,
  },

  sailingDinghies: {
    type: Boolean,
  },
  sailingDinghiesType: {
    type: String,
  },

  snorkelingEquipment: {
    type: Boolean,
  },
  snorkelingEquipmentNo: {
   type: Number,
  },

  divingEquipment: {
    type: Boolean,
  },
  divingEquipmentNo: {
   type: Number,
  },

  airCompressors: {
    type: [{
      capacity: Number,
    }]
  },

  nitroxOnBoard: {
    type: [{
      type: String
    }],
  },

  description: {
    type: String
  }

}
