const typeDef = `

  extend type Query {
    destination(id: ID!): Destination
    destinationBy(field: String!, value: String!): Destination
    destinationByCode(code: String!): Destination

    destinations(idArr: [ID!]!): [Destination!]!
    destinationsBy(field: String, valArr: [String!]!): [Destination!]!
    destinationsByCode(codeArr: [String!]!): [Destination!]!

    publishedDestinations: [Destination!]!

    searchDestinations(args: JSON): [Destination!]!
    paginatedDestinations(args: JSON): PaginatedDestinations!
  }

  extend type Mutation {
    createDestination(input: DestinationInput!): Destination
    updateDestination(id: ID!, input: DestinationInput!): Destination
    deleteDestination(id: ID!): ID
    deleteDestinations(idArr: [ID!]!): [ID!]!
  }


  type Destination{
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    code: String
  }

  input DestinationInput {
    name: String
    code: String
  }


  type PaginatedDestinations {
    items: [Destination!]!
    total: Int
  }

`
module.exports = typeDef
