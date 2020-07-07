const typeDef = `

  extend type Query {
    ship(id: ID!): Ship
    shipBy(field: String!, value: String!): Ship
    shipBySlug(slug: String!): Ship

    ships(idArr: [ID!]!): [Ship!]!
    shipsBy(field: String, valArr: [String!]!): [Ship!]!
    shipsBySlug(slugArr: [String!]!): [Ship!]!

    searchShips(args: JSON): [Ship!]!
    paginatedShips(args: JSON): PaginatedShips!

    shipGallery(id: ID!): [String!]!
    shipGalleryBy(field: String!, value: String!): [String!]!

    cabin(shipId: ID!, id: ID!): Cabin
    cabins(shipId: ID!): [Cabin!]!

  }

  extend type Mutation {
    createShip(input: ShipInput!): Ship
    updateShip(id: ID!, input: ShipInput!): Ship
    deleteShip(id: ID!): ID
    deleteShips(idArr: [ID!]!): [ID!]!

    createCabin(shipId: ID!, input: CabinInput!): Cabin
    updateCabin(shipId: ID!, id: ID!, input: CabinInput!): Cabin
    deleteCabin(shipId: ID!, id: ID!): ID!

    deleteCabins(shipId: ID!, idArr: [ID!]!): [ID!]!
    updateCabins(shipId: ID!, inputArr: [CabinInput!]!): [Cabin!]!

    updateCabinGallery(id: ID!, inputArr: [String!]!): [String!]!
  }

  type ShipPreview {
    id: ID!
    name: String
    slug: String
    excerpt: String
    image: String
  }

  type Ship {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String


    slug: String
    excerpt: String
    description: String
    image: String
    gallery: [String!]
    shipFeatures: [String!]
    shipFeaturesText: String
    foodAndDrinksFeatures: [String!]
    foodAndDrinksFeaturesText: String
    divingFeatures: [String!]
    divingFeaturesText: String
    gearRental: String
    gearRentalText: String
    shipLayout: String
    shipLayoutText: String
    shipSpecifications: ShipSpecifications
    shipEntertainment: ShipEntertainment
    shipSafety: ShipSafety
    shipSpecificationsText: String
    navSafteyFeatures: [String!]
    navSafteyFeaturesText: String
    cabins: [Cabin!]
    cabinsText: String
  }

  input ShipInput {
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    gallery: [String!]
    shipFeatures: [String!]
    shipFeaturesText: String
    foodAndDrinksFeatures: [String!]
    foodAndDrinksFeaturesText: String
    divingFeatures: [String!]
    divingFeaturesText: String
    gearRental: String
    gearRentalText: String
    shipLayout: String
    shipLayoutText: String
    shipSpecifications: ShipSpecificationsInput
    shipEntertainment: ShipEntertainmentInput
    shipSafety: ShipSafetyInput
    shipSpecificationsText: String
    navSafteyFeatures: [String!]
    navSafteyFeaturesText: String
    cabins: [CabinInput!]
    cabinsText: String
  }

  type ShipSpecifications {
    yard: String
    country: String
    built: Int
    refit: String
    flag: String
    classed: String
    length: Float
    breadth: Float
    maxDraft: Float
    height: Float
    grt: String
    shipType: String
    hullMaterial: String
    superstructure: String

    hullType: String

    noOfDecks: Int
    noOfMasts: Int
    crewNo: Int
    noOfEngines: Int
    engineMaker: String
    power: Float
    cruisingSpeed: Float
    maximumSpeed: Float
    fuelCapacity: Int
    autonomy: Int
    hotWater: Boolean
    hotWaterType: String
    airConditioning: Boolean
    airConditioningType: String
    waterMaker: Boolean
    waterMakerCapacity: Int
    bowThruster: Boolean
    sternThruster: Boolean
    maxCapacity: Int
    maxCapacityCabins: Int
    dayTrips: Int
    atBerth: Int
    noOfCabins: Int

    operatingLicense: String
    designation: [String!]
    availableFor: [String!]
  }

  input ShipSpecificationsInput {
    yard: String
    country: String
    built: Int
    refit: String
    flag: String
    classed: String
    length: Float
    breadth: Float
    maxDraft: Float
    height: Float
    grt: Float
    shipType: String
    hullMaterial: String
    superstructure: String
    hullType: String
    noOfDecks: Int
    noOfMasts: Int
    crewNo: Int
    noOfEngines: Int
    engineMaker: String
    power: Float
    cruisingSpeed: Float
    maximumSpeed: Float
    fuelCapacity: Int
    autonomy: Int
    hotWater: Boolean
    hotWaterType: String
    airConditioning: Boolean
    airConditioningType: String
    waterMaker: Boolean
    waterMakerCapacity: Int
    bowThruster: Boolean
    sternThruster: Boolean
    maxCapacity: Int
    maxCapacityCabins: Int
    dayTrips: Int
    atBerth: Int
    noOfCabins: Int

    operatingLicense: String
    designation: [String!]
    availableFor: [String!]
  }

  type ShipSafety {
    lifejackets: Boolean
    lifejacketsNo: Int
    lifejacketsNoKids: Int
    radar: Boolean
    ais: Boolean
    liferafts: Boolean
    liferaftsNo: Int
    chartPlotter: Boolean
    sart: Boolean
    lifebuoys: Boolean
    lifebuoysNo: Int
    vhf: Boolean
    epirb: Boolean
    rescueBoats: Boolean
    rescueBoatsNo: Int
    mfhf: Boolean
    medicalFirsAidKit: Boolean
    medicalOxygen: Boolean
  }

  input ShipSafetyInput {
    lifejackets: Boolean
    lifejacketsNo: Int
    lifejacketsNoKids: Int
    radar: Boolean
    ais: Boolean
    liferafts: Boolean
    liferaftsNo: Int
    chartPlotter: Boolean
    sart: Boolean
    lifebuoys: Boolean
    lifebuoysNo: Int
    vhf: Boolean
    epirb: Boolean
    rescueBoats: Boolean
    rescueBoatsNo: Int
    mfhf: Boolean
    medicalFirsAidKit: Boolean
    medicalOxygen: Boolean
  }


  type ShipEntertainment {
    stabilizers: String

    tenders: [ Tender ]

    waveRunners: [ WaveRunner ]

    paddleBoards: Boolean
    paddleBoardsNo: Int

    seabobs: Boolean
    seabobsNo: Int

    waterSkis: Boolean
    waterSkisNo: Int

    wakeboards: Boolean
    wakeboardsNo: Int

    waterSlide: Boolean
    waterSlideLength: Int

    bananas: Boolean
    bananasNo: Int

    surfboards: Boolean
    surfboardsNo: Int

    kayacs: Boolean
    kayacsNo: Int

    ocanPool: Boolean

    sailingDinghies: Boolean
    sailingDinghiesType: String

    snorkelingEquipment: Boolean
    snorkelingEquipmentNo: Int

    divingEquipment: Boolean
    divingEquipmentNo: Int

    airCompressors: [ AirCompressor ]

    nitroxOnBoard: [ NitroxOnBoard ]
  }

  input ShipEntertainmentInput {
    stabilizers: String

    tenders: [ TenderInput ],

    waveRunners: [ WaveRunnerInput ],

    paddleBoards: Boolean
    paddleBoardsNo: Int

    seabobs: Boolean
    seabobsNo: Int

    waterSkis: Boolean
    waterSkisNo: Int

    wakeboards: Boolean
    wakeboardsNo: Int

    waterSlide: Boolean
    waterSlideLength: Int

    bananas: Boolean
    bananasNo: Int

    surfboards: Boolean
    surfboardsNo: Int

    kayacs: Boolean
    kayacsNo: Int

    ocanPool: Boolean

    sailingDinghies: Boolean
    sailingDinghiesType: String

    snorkelingEquipment: Boolean
    snorkelingEquipmentNo: Int

    divingEquipment: Boolean
    divingEquipmentNo: Int

    airCompressors: [ AirCompressorInput ]

    nitroxOnBoard: [ NitroxOnBoardInput ]
  }

  type Tender {
    type: String
    length: Float
  }

  input TenderInput {
    type: String
    length: Float
  }

  type WaveRunner {
      maker: String
      length: Float
      type: String
  }

  input WaveRunnerInput {
      maker: String
      length: Float
      type: String
  }

  type AirCompressor {
      capacity: Float
  }

  input AirCompressorInput {
      capacity: Float
  }

  type NitroxOnBoard {
      type: String
  }

  input NitroxOnBoardInput {
      type: String
  }

  type Cabin {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String

    type: String
    ensuite: Boolean
    showerBathub: Boolean
    seaView: Boolean
    bedding: String
    pullmanBedding: String
    airconditioning: Boolean
    tv: Boolean


    excerpt: String
    description: String
    order: Int
    image: String
    gallery: [String!]
    features: [String!]
    featuresText: String
    capacity: Int

  }

  input CabinInput {
    id: ID
    name: String
    slug: String

    type: String
    ensuite: Boolean
    showerBathub: Boolean
    seaView: Boolean
    bedding: String
    pullmanBedding: String
    airconditioning: Boolean
    tv: Boolean

    excerpt: String
    description: String
    order: Int
    image: String
    gallery: [String!]
    features: [String!]
    featuresText: String
    capacity: Int
  }

  type PaginatedCabins {
    items: [Cabin!]!
    total: Int
  }

  type PaginatedShips {
    total: Int
    items: [Ship!]!
  }
`
module.exports = typeDef
