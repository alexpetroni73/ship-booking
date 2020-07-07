<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import ShipQuery from '@common/graphql/ship/Ship.gql'
import CreateShip from '@common/graphql/ship/CreateShip.gql'
import UpdateShip from '@common/graphql/ship/UpdateShip.gql'
import DeleteShip from '@common/graphql/ship/DeleteShip.gql'

import ship from '@/data/ship'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return ship
    },

    async createItem (item) {
      // console.log('createItem , item %o',  item)
      let { data: { createShip: ship } } = await this.$apollo.mutate({
        mutation: CreateShip,
        variables: {input: item},
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

    async loadItem (key) {
      // console.log('loadItem key %o', key)
      let { data: { ship: ship } } = await this.$apollo.query({
        query: ShipQuery,
        variables: key,
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

    async updateItem (item, key) {
      // console.log('updateItem key %o, item %o', key, item)
      let { data: { updateShip: ship } } = await this.$apollo.mutate({
        mutation: UpdateShip,
        variables: {input:item, ... key},
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

    async deleteItem (key) {
      // console.log('updateItem key %o', key)
      let { data: { deleteShip: ship } } = await this.$apollo.mutate({
        mutation: DeleteShip,
        variables: key,
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },


    parseCreateResult (result) {
      let item = this.parseItemToMirrorDefaultModel(result)
      this.enforceEmptyArrays(item)
      return item
    },

    parseLoadResult (result) {
      let item =  this.parseItemToMirrorDefaultModel(result)
      this.enforceEmptyArrays(item)
      return item
    },

    parseUpdateResult (result) {
      let item = this.parseItemToMirrorDefaultModel(result)
      this.enforceEmptyArrays(item)
      return item
    },

    enforceEmptyArrays (item) {
      const entertainmentFields = ['tenders', 'waveRunners', 'airCompressors', 'nitroxOnBoard']
      if(!item.shipEntertainment) item.shipEntertainment = {}
      entertainmentFields.forEach(e => {
        if(!item.shipEntertainment[e]) item.shipEntertainment[e] = []
      })
    }

  },
}
</script>
