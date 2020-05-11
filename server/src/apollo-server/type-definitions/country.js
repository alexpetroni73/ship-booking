const typeDef = `

  extend type Query {
    country(id: ID!): Country
    countryBy(field: String!, value: String!): Country
    countryByCode(code: String!): Country

    countries(idArr: [ID!]!): [Country!]!
    countriesBy(field: String, valArr: [String!]!): [Country!]!
    countriesByCode(codeArr: [String!]!): [Country!]!

    publishedCountries: [Country!]!

    searchCountries(args: JSON): [Country!]!
    paginatedCountries(args: JSON): PaginatedCountries!
  }

  extend type Mutation {
    createCountry(input: CountryInput!): Country
    updateCountry(id: ID!, input: CountryInput!): Country
    deleteCountry(id: ID!): ID
    deleteCountries(idArr: [ID!]!): [ID!]!
  }


  type Country{
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    code: String
  }

  input CountryInput {
    name: String
    code: String
  }


  type PaginatedCountries {
    items: [Country!]!
    total: Int
  }

`
module.exports = typeDef
