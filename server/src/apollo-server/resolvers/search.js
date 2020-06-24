const resolvers = {
  Query: {
    paginatedSearchCruises (_, { args }, context) {
      return context.models.Search.paginatedSearchCruises(args)
    },
  },
}



module.exports = resolvers
