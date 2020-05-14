const resolvers = {
  Query: {
    destination (_, { id }, context) {
      return context.models.Destination.destinationBy('id', id)
    },

    destinationBy (_, { field, value }, context) {
      return context.models.Destination.destinationBy(field, value)
    },

    destinationByCode (_, { code }, context) {
      return context.models.Destination.destinationBy('code', code)
    },

    destinations (_, { idArr }, context) {
      return context.models.Destination.destinationsBy('id', idArr)
    },

    destinationsBy (_, { field, valArr }, context) {
      return context.models.Destination.destinationsBy(field, valArr)
    },

    destinationsByCode (_, { codeArr }, context) {
      return context.models.Destination.destinationsBy('code', codeArr)
    },

    searchDestinations (_, { args }, context) {
      return context.models.Destination.searchDestinations(args)
    },

    paginatedDestinations (_, { args }, context) {
      return context.models.Destination.paginatedDestinations(args)
    },

    publishedDestinations (_, {}, context) {
      return context.models.Destination.publishedDestinations()
    },

  },

  Mutation: {
    createDestination(_, { input }, context){
      return context.models.Destination.createDestination(input)
    },

    updateDestination(_, { id, input }, context){
      return context.models.Destination.updateDestination(id, input)
    },

    deleteDestination(_, { id }, context){
      return context.models.Destination.deleteDestination(id)
    },

    deleteDestinations(_, { idArr }, context){
      return context.models.Destination.deleteDestinations(idArr)
    },
  }
}



module.exports = resolvers
