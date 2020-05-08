const typeDef = `

  extend type Query {
    featureSet(slug: ID!): FeatureSet
    featureSetBy(field: String!, value: String!): FeatureSet
    featureSetBySlug(slug: String!): FeatureSet

    featureSets(slugArr: [ID!]!): [FeatureSet!]!
    featureSetsBy(field: String, valArr: [String!]!): [FeatureSet!]!
    featureSetsBySlug(slugArr: [String!]!): [FeatureSet!]!
    searchFeatureSets(args: JSON): [FeatureSet!]!
    paginatedFeatureSets(args: JSON): PaginatedFeatureSets!
  }

  extend type Mutation {
    createFeatureSet(input: FeatureSetInput!): FeatureSet
    updateFeatureSet(slug: ID!, input: FeatureSetInput!): FeatureSet
    deleteFeatureSet(slug: ID!): ID
    deleteFeatureSets(slugArr: [ID!]!): [ID!]!

    updateFeatureSetGallery(slug: ID!, inputArr: [String!]!): [String!]!
  }

  type Features {
    name: String
    slug: String
    items: [FeatureSetItem!]
  }

  type FeatureSet {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    items: [FeatureSetItem!]
  }

  input FeatureSetInput {
    name: String
    slug: String
    items: [FeatureSetItemInput!]
  }

  type FeatureSetItem {
    name: String
    slug: String
  }

  input FeatureSetItemInput {
    name: String
    slug: String
  }

  type PaginatedFeatureSets {
    total: Int
    items: [FeatureSet!]!
  }
`
module.exports = typeDef
