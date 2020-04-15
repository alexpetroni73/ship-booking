const typeDef = `

  extend type Query {
    itinerary(id: ID!): Itinerary
    itineraryBy(field: String!, value: String!): Itinerary
    itineraryBySlug(slug: String!): Itinerary

    itineraries(idArr: [ID!]!): [Itinerary!]!
    itinerariesBy(field: String, valArr: [String!]!): [Itinerary!]!
    itinerariesBySlug(slugArr: [String!]!): [Itinerary!]!

    searchItineraries(args: JSON): [Itinerary!]!
    paginatedItineraries(args: JSON): PaginatedItineraries!
  }

  extend type Mutation {
    createItinerary(input: ItineraryInput!): Itinerary
    updateItinerary(id: ID!, input: ItineraryInput!): Itinerary
    deleteItinerary(id: ID!): ID
    deleteItineraries(idArr: [ID!]!): [ID!]!
  }

  type Itinerary {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    gallery: [String!]
    locations: [ItineraryStep!]!
  }

  input ItineraryInput {
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    gallery: [String!]
    locations: [ItineraryStepInput!]!
  }

  type ItineraryStep {
    name: String
    excerpt: String
    description: String
    image: String
    gallery: [String!]
  }

  input ItineraryStepInput {
    name: String
    excerpt: String
    description: String
    image: String
    gallery: [String!]
  }

  type PaginatedItineraries {
    items: [Itinerary!]!
    total: Int
  }

`
module.exports = typeDef
