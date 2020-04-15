const resolvers = {
  Query: {
    itinerary (_, { id }, context) {
      return context.models.Itinerary.itineraryBy('id', id)
    },

    itineraryBy (_, { field, value }, context) {
      return context.models.Itinerary.itineraryBy(field, value)
    },

    itineraryBySlug (_, { slug }, context) {
      return context.models.Itinerary.itineraryBy('slug', slug)
    },

    itineraries (_, { idArr }, context) {
      return context.models.Itinerary.itinerariesBy('id', idArr)
    },

    itinerariesBy (_, { field, valArr }, context) {
      return context.models.Itinerary.itinerariesBy(field, valArr)
    },

    itinerariesBySlug (_, { slugArr }, context) {
      return context.models.Itinerary.itinerariesBy('slug', slugArr)
    },

    searchItineraries (_, { args }, context) {
      return context.models.Itinerary.searchItineraries(args)
    },

    paginatedItineraries (_, { args }, context) {
      return context.models.Itinerary.paginatedItineraries(args)
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

    deleteItineraries(_, { idArr }, context){
      return context.models.Itinerary.deleteItineraries(idArr)
    },
  }
}



module.exports = resolvers
