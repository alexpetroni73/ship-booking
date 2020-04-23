const resolvers = {
  Query: {
    cruise (_, { id }, context) {
      return context.models.Itinerary.cruiseBy('id', id)
    },

    cruiseBy (_, { field, value }, context) {
      return context.models.Itinerary.cruiseBy(field, value)
    },

    cruiseBySlug (_, { slug }, context) {
      return context.models.Itinerary.cruiseBy('slug', slug)
    },

    cruises (_, { idArr }, context) {
      return context.models.Itinerary.cruisesBy('id', idArr)
    },

    cruisesBy (_, { field, valArr }, context) {
      return context.models.Itinerary.cruisesBy(field, valArr)
    },

    cruisesBySlug (_, { slugArr }, context) {
      return context.models.Itinerary.cruisesBy('slug', slugArr)
    },

    searchCruises (_, { args }, context) {
      return context.models.Itinerary.searchCruises(args)
    },

    paginatedCruises (_, { args }, context) {
      return context.models.Itinerary.paginatedCruises(args)
    },

  },

  Mutation: {
    createItinerary(_, { input }, context){
      return context.models.Itinerary.createItinerary(input)
    },

    updateItinerary(_, { id, input }, context){
      return context.models.Itinerary.updateItinerary(id, input)
    },

    deleteItinerary(_, { id }, context){
      return context.models.Itinerary.deleteItinerary(id)
    },

    deleteCruises(_, { idArr }, context){
      return context.models.Itinerary.deleteCruises(idArr)
    },
  }
}



module.exports = resolvers
