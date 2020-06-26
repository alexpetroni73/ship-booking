const resolvers = {
  Query: {
    option (_, { name }, context) {
      return context.models.Option.option(name)
    },

    options (_, { nameArr }, context) {
      return context.models.Option.options(nameArr)
    },

  },

  Mutation: {
    createOption(_, { input }, context){
      return context.models.Option.createOption(input)
    },

    updateOption(_, { name, value }, context){
      return context.models.Option.updateOption(name, value)
    },

    deleteOption(_, { name }, context){
      return context.models.Option.deleteOption(name)
    },

    deleteOptions(_, { nameArr }, context){
      return context.models.Option.deleteOptions(nameArr)
    },
  }
}



module.exports = resolvers
