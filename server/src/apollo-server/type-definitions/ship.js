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
