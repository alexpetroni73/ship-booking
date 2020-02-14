const typeDef = `

  extend type Query {
    feature(id: ID!): Feature
    featureBy(field: String!, value: String!): Feature
    featureBySlug(slug: String!): Feature

    features(idArr: [ID!]!): [Feature!]!
    featuresBy(field: String, valArr: [String!]!): [Feature!]!
    featuresBySlug(slugArr: [String!]!): [Feature!]!
    searchFeatures(args: JSON): [Feature!]!
    paginatedFeatures(args: JSON): PaginatedFeatures!

    featureGallery(id: ID!): [String!]!
    featureGalleryBy(field: String!, value: String!): [String!]!
  }

  extend type Mutation {
    createFeature(input: FeatureInput!): Feature
    updateFeature(id: ID!, input: FeatureInput!): Feature
    deleteFeature(id: ID!): ID
    deleteFeatures(idArr: [ID!]!): [ID!]!

    updateFeatureGallery(id: ID!, inputArr: [String!]!): [String!]!
  }

  type Feature {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    items: [FeatureItem!]
  }

  input FeatureInput {
    name: String
    slug: String
    items: [FeatureItemInput!]
  }

  type FeatureItem {
    name: String
    slug: String
  }

  input FeatureItemInput {
    name: String
    slug: String
  }

  type PaginatedFeatures {
    total: Int
    items: [Feature!]!
  }
`
module.exports = typeDef
