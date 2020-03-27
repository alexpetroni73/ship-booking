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
    cabinBy(shipId: ID!, field: String!, value: String!): Cabin
    cabinBySlug(shipId: ID!, slug: String!): Cabin

    cabins(shipId: ID!): [Cabin!]!
    cabinsBy(shipId: ID!, value: String, valArr: [String!]!): [Cabin!]!
    cabinsBySlug(shipId: ID!, slugArr: [String!]!): [Cabin!]!
    searchCabins(args: JSON): [Cabin!]!

    cabinGallery(shipId: ID!, id: ID!): [String!]!
    cabinGalleryBy(shipId: ID!, field: String!, value: String!): [String!]!

  }

  extend type Mutation {
    createShip(input: ShipInput!): Ship
    updateShip(id: ID!, input: ShipInput!): Ship
    deleteShip(id: ID!): ID
    deleteShips(idArr: [ID!]!): [ID!]!

    updateShipGallery(id: ID!, inputArr: [String!]!): [String!]!


    createCabin(shipId: ID!, input: CabinInput!): Cabin
    updateCabin(shipId: ID!, id: ID!, input: CabinInput!): Cabin
    deleteCabin(shipId: ID!, id: ID!): ID!
    deleteCabins(shipId: ID!, idArr: [ID!]!): [ID!]!

    updateCabinGallery(id: ID!, inputArr: [String!]!): [String!]!
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
    length: Float
    beam: Float
    topSpeed: Float
    cruisingSpeed: Float
    engines: String
    maxGuests: Int
    bathrooms: Int
    tenders: String
    waterCapacity: Int
    fuelCapacity: Int
    freshwaterMaker: Boolean
  }

  input ShipSpecificationsInput {
    length: Float
    beam: Float
    topSpeed: Float
    cruisingSpeed: Float
    engines: String
    maxGuests: Int
    bathrooms: Int
    tenders: String
    waterCapacity: Int
    fuelCapacity: Int
    freshwaterMaker: Boolean
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
    features: [String!]
    featuresText: String
    capacity: Int
    bedding: String
    airconditioning: String
  }

  input CabinInput {
    name: String
    slug: String
    excerpt: String
    description: String
    order: Int
    image: String
    features: [String!]
    featuresText: String
    capacity: Int
    bedding: String
    airconditioning: String
  }

  type PaginatedCabins {
    total: Int
    items: [Cabin!]!
  }

  type PaginatedShips {
    total: Int
    items: [Ship!]!
  }
`
module.exports = typeDef
