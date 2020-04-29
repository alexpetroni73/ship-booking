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
  }

  input CruiseInput {
    ship: String
    itinerary: CruiseItineraryInput
    startDate: Date
    endDate: Date
    slug: String
  }

  type PaginatedCruises {
    items: [Cruise!]!
    total: Int
  }

`
module.exports = typeDef
