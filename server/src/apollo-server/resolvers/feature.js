const resolvers = {
  Query: {
    feature (_, { id }, context) {
      return context.models.Feature.feature(id)
    },

    featureBy (_, { field, value }, context) {
      return context.models.Feature.featureBy(field, value)
    },

    featureBySlug (_, { slug }, context) {
      return context.models.Feature.featureBy('slug', slug)
    },

    features (_, { idArr }, context) {
      return context.models.Feature.features(idArr)
    },

    featuresBy (_, { field, valArr }, context) {
      return context.models.Feature.featuresBy(field, valArr)
    },

    featuresBySlug (_, { slugArr }, context) {
      return context.models.Feature.featuresBy('slug', slugArr)
    },

    searchFeatures (_, { args }, context) {
      return context.models.Feature.searchFeatures(args)
    },

    paginatedFeatures (_, { args }, context) {
      return context.models.Feature.paginatedFeatures(args)
    },
  },

  Mutation: {
    createFeature(_, { input }, context){
      return context.models.Feature.createFeature(input)
    },

    updateFeature(_, { id, input }, context){
      return context.models.Feature.updateFeature(id, input)
    },

    deleteFeature(_, { id }, context){
      return context.models.Feature.deleteFeature(id)
    },

    deleteFeatures(_, { idArr }, context){
      return context.models.Feature.deleteFeatures(idArr)
    },
  }
}



module.exports = resolvers
