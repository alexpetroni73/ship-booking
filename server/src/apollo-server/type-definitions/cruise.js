const typeDef = `

  extend type Query {
    cruise(id: ID!): Cruise
    cruiseBy(field: String!, value: String!): Cruise
    cruiseBySlug(slug: String!): Cruise

    cruises(idArr: [ID!]!): [Cruise!]!
    cruisesBy(field: String, valArr: [String!]!): [Cruise!]!
    cruisesBySlug(slugArr: [String!]!): [Cruise!]!

    searchCruises(args: JSON): [Cruise!]!
    paginatedCruises(args: JSON): PaginatedCruises!
  }

  extend type Mutation {
    createCruise(input: CruiseInput!): Cruise
    updateCruise(id: ID!, input: CruiseInput!): Cruise
    deleteCruise(id: ID!): ID
    deleteCruises(idArr: [ID!]!): [ID!]!
  }

  type Cruise {
    id: ID!
    createdAt: Date
    updatedAt: Date
    ship: Ship
    itinerary: CruiseItinerary
    startDate: Date
    endDate: Date
    slug: String
    published: Boolean
    accommodations: [Accommodation!]!
  }

  input CruiseInput {
    ship: String
    itinerary: CruiseItineraryInput
    startDate: String
    endDate: String
    slug: String
    published: Boolean
    accommodations: [AccommodationInput!]
  }

  type Accommodation {
    cabin: Cabin
    available: Int
    regularPrice: Float
    salePrice: Float
    saleStartDate: Date
    enabled: Boolean
  }

  input AccommodationInput {
    cabin: String
    available: Int
    regularPrice: Float
    salePrice: Float
    saleStartDate: String
    enabled: Boolean
  }

  type PaginatedCruises {
    items: [Cruise!]!
    total: Int
  }

`
module.exports = typeDef
