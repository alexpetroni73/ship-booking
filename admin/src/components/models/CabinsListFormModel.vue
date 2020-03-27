<script>
import BaseLoadedItemFormModel from '@/components/models/BaseLoadedItemFormModel'
import Cabins from '@/graphql/ship/Cabins.gql'
import UpdateCabinsListGql from '@/graphql/ship/UpdateCabinsList.gql'

export default {
  extends: BaseLoadedItemFormModel,

  methods: {
    getDefaultItem () {
      return []
    },

    itemKey () {
      return { shipId: this.id }
    },

    async loadItem (key) {
      console.log('loadItem key %o', key)
      let { data: {cabins}} = await this.$apollo.query({
        query: Cabins,
        variables: key,
      })
      console.log('loadItem cabins %o', cabins)

      return cabins
    },

    async updateItem (item, key) {
      console.log('updateItem key %o, item %o', key, item)
      let result = await this.$apollo.mutate({
        mutation: UpdateCabinsListGql,
        variables: {...key, input:{cabinsText: item.cabinsText}},
      })

      let {updateShip: {cabinsText}, cabins = []} = result.data
      return {cabinsText, cabins}
    },
    //
    // async deleteItem (key) {
    //   console.log('updateItem key %o', key)
    //   let { data: { deleteShip: ship } } = await this.$apollo.mutate({
    //     mutation: DeleteShip,
    //     variables: key,
    //   })
    //   // console.log('%o', result.data.ship)
    //   console.log('ship %o', ship)
    //   return ship
    // },

  },

  created () {
    this.eventBus.$on('cabin-item-created', this.refreshItem)
  },
}
</script>
