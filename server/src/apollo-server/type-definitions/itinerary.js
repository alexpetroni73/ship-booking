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

  interface ItineraryBase {
    name: String
    slug: String
    location: String
    length: String
    dives: String
    experience: String
    description: String
    image: String
    gallery: [String!]
    stopovers: [Stopover!]!
  }

  type Itinerary implements ItineraryBase {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    location: String
    length: String
    dives: String
    experience: String
    description: String
    image: String
    gallery: [String!]
    stopovers: [Stopover!]!
  }

  input ItineraryInput {
    name: String
    slug: String
    location: String
    length: String
    dives: String
    experience: String
    description: String
    image: String
    gallery: [String!]
    stopovers: [StopoverInput!]
  }

  type CruiseItinerary implements ItineraryBase {
    name: String
    slug: String
    location: String
    length: String
    dives: String
    experience: String
    description: String
    image: String
    gallery: [String!]
    stopovers: [Stopover!]!
  }

  input CruiseItineraryInput {
    name: String
    slug: String
    location: String
    length: String
    dives: String
    experience: String
    description: String
    image: String
    gallery: [String!]
    stopovers: [StopoverInput!]!
  }

  type Stopover {
    title: String
    description: String
  }

  input StopoverInput {
    title: String
    description: String
  }

  type PaginatedItineraries {
    items: [Itinerary!]!
    total: Int
  }

`
module.exports = typeDef
