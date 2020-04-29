const resolvers = {
  Query: {
    cruise (_, { id }, context) {
      return context.models.Cruise.cruiseBy('id', id)
    },

    cruiseBy (_, { field, value }, context) {
      return context.models.Cruise.cruiseBy(field, value)
    },

    cruiseBySlug (_, { slug }, context) {
      return context.models.Cruise.cruiseBy('slug', slug)
    },

    cruises (_, { idArr }, context) {
      return context.models.Cruise.cruisesBy('id', idArr)
    },

    cruisesBy (_, { field, valArr }, context) {
      return context.models.Cruise.cruisesBy(field, valArr)
    },

    cruisesBySlug (_, { slugArr }, context) {
      return context.models.Cruise.cruisesBy('slug', slugArr)
    },

    searchCruises (_, { args }, context) {
      return context.models.Cruise.searchCruises(args)
    },

    paginatedCruises (_, { args }, context) {
      return context.models.Cruise.paginatedCruises(args)
    },

  },

  Mutation: {
    createCruise(_, { input }, context){
      return context.models.Cruise.createCruise(input)
    },

    updateCruise(_, { id, input }, context){
      return context.models.Cruise.updateCruise(id, input)
    },

    deleteCruise(_, { id }, context){
      return context.models.Cruise.deleteCruise(id)
    },

    deleteCruises(_, { idArr }, context){
      return context.models.Cruise.deleteCruises(idArr)
    },
  }
}



module.exports = resolvers
