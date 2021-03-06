const resolvers = {
  Query: {
    ship (_, { id }, context) {
      return context.models.Ship.shipBy('id', id)
    },

    shipBy (_, { field, value }, context) {
      return context.models.Ship.shipBy(field, value)
    },

    shipBySlug (_, { slug }, context) {
      return context.models.Ship.shipBy('slug', slug)
    },

    ships (_, { idArr }, context) {
      return context.models.Ship.shipsBy('id', idArr)
    },

    shipsBy (_, { field, valArr }, context) {
      return context.models.Ship.shipsBy(field, valArr)
    },

    shipsBySlug (_, { slugArr }, context) {
      return context.models.Ship.shipsBy('slug', slugArr)
    },

    searchShips (_, { args }, context) {
      return context.models.Ship.searchShips(args)
    },

    paginatedShips (_, { args }, context) {
      return context.models.Ship.paginatedShips(args)
    },

    cabin (_, { shipId, id }, context) {
      return context.models.Ship.cabin(shipId, id)
    },

    cabins (_, { shipId }, context) {
      return context.models.Ship.cabins(shipId)
    },

  },

  Mutation: {
    createShip(_, { input }, context){
      return context.models.Ship.createShip(input)
    },

    updateShip(_, { id, input }, context){
      return context.models.Ship.updateShip(id, input)
    },

    deleteShip(_, { id }, context){
      return context.models.Ship.deleteShip(id)
    },

    deleteShips(_, { idArr }, context){
      return context.models.Ship.deleteShips(idArr)
    },

    createCabin(_, { shipId, input }, context){
      return context.models.Ship.createCabin(shipId, input)
    },

    updateCabin(_, { shipId, id, input }, context){
      return context.models.Ship.updateCabin(shipId, id, input)
    },

    deleteCabin(_, { shipId, id }, context){
      return context.models.Ship.deleteCabin(shipId, id)
    },

    updateCabins(_, { shipId, inputArr }, context){
      return context.models.Ship.updateCabins(shipId, inputArr)
    },

    deleteCabins(_, { shipId, idArr }, context){
      return context.models.Ship.deleteCabins(shipId, idArr)
    },
  }
}



module.exports = resolvers
