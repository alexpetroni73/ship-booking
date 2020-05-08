const resolvers = {
  Query: {
    featureSet (_, { slug }, context) {
      return context.models.FeatureSet.featureSet(slug)
    },

    featureSetBy (_, { field, value }, context) {
      return context.models.FeatureSet.featureSetBy(field, value)
    },

    featureSetBySlug (_, { slug }, context) {
      return context.models.FeatureSet.featureSetBy('slug', slug)
    },

    featureSets (_, { slugArr }, context) {
      return context.models.FeatureSet.featureSets(slugArr)
    },

    featureSetsBy (_, { field, valArr }, context) {
      return context.models.FeatureSet.featureSetsBy(field, valArr)
    },

    featureSetsBySlug (_, { slugArr }, context) {
      return context.models.FeatureSet.featureSetsBy('slug', slugArr)
    },

    searchFeatureSets (_, { args }, context) {
      return context.models.FeatureSet.searchFeatureSets(args)
    },

    paginatedFeatureSets (_, { args }, context) {
      return context.models.FeatureSet.paginatedFeatureSets(args)
    },
  },

  Mutation: {
    createFeatureSet(_, { input }, context){
      return context.models.FeatureSet.createFeatureSet(input)
    },

    updateFeatureSet(_, { slug, input }, context){
      return context.models.FeatureSet.updateFeatureSet(slug, input)
    },

    deleteFeatureSet(_, { slug }, context){
      return context.models.FeatureSet.deleteFeatureSet(slug)
    },

    deleteFeatureSets(_, { slugArr }, context){
      return context.models.FeatureSet.deleteFeatureSets(slugArr)
    },
  }
}



module.exports = resolvers
