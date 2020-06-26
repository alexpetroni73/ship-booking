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

    bodyStructure: String

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
    grt: String
    shipType: String
    hullMaterial: String
    superstructure: String
    bodyStructure: String
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
  }

  type Cabin {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    excerpt: String
    description: String
    order: Int
    image: String
    gallery: [String!]
    features: [String!]
    featuresText: String
    capacity: Int
    bedding: String
    airconditioning: String
  }

  input CabinInput {
    id: ID
    name: String
    slug: String
    excerpt: String
    description: String
    order: Int
    image: String
    gallery: [String!]
    features: [String!]
    featuresText: String
    capacity: Int
    bedding: String
    airconditioning: String
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
