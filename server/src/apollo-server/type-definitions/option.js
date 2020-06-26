const typeDef = `

  extend type Query {
    option(name: ID!): Option
    options(nameArr: [ID!]!): [Option!]!
  }

  extend type Mutation {
    createOption(input: OptionInput!): Option
    updateOption(name: ID!, value: String): Option
    deleteOption(name: ID!): ID
    deleteOptions(nameArr: [ID!]!): [ID!]!
  }


  type Option{
    createdAt: Date
    updatedAt: Date
    name: ID!
    value: String
  }

  input OptionInput {
    name: String
    value: String
  }
`
module.exports = typeDef
