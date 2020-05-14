const resolvers = {
  Query: {
    country (_, { id }, context) {
      return context.models.Country.countryBy('id', id)
    },

    countryBy (_, { field, value }, context) {
      return context.models.Country.countryBy(field, value)
    },

    countryByCode (_, { code }, context) {
      return context.models.Country.countryBy('code', code)
    },

    countries (_, { idArr }, context) {
      return context.models.Country.countriesBy('id', idArr)
    },

    countriesBy (_, { field, valArr }, context) {
      return context.models.Country.countriesBy(field, valArr)
    },

    countriesByCode (_, { codeArr }, context) {
      return context.models.Country.countriesBy('code', codeArr)
    },

    searchCountries (_, { args }, context) {
      return context.models.Country.searchCountries(args)
    },

    paginatedCountries (_, { args }, context) {
      return context.models.Country.paginatedCountries(args)
    },

    publishedCountries (_, {}, context) {
      return context.models.Country.publishedCountries()
    },

  },

  Mutation: {
    createCountry(_, { input }, context){
      return context.models.Country.createCountry(input)
    },

    updateCountry(_, { id, input }, context){
      return context.models.Country.updateCountry(id, input)
    },

    deleteCountry(_, { id }, context){
      return context.models.Country.deleteCountry(id)
    },

    deleteCountries(_, { idArr }, context){
      return context.models.Country.deleteCountries(idArr)
    },
  }
}



module.exports = resolvers
