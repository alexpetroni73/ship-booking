<script>
import BaseItemFormModel from '@/components/models/BaseItemFormModel'
import Cabins from '@/graphql/ship/Cabins.gql'
import UpdateCabinsListGql from '@/graphql/ship/UpdateCabinsList.gql'
import * as utils from '@/utils'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return []
    },

    itemKey () {
      return { shipId: this.id }
    },

    async loadItem (key, fetchPolicy) {
      console.log('loadItem key %o', key)
      let queryObj = {
        query: Cabins,
        variables: key,
      }
      if(fetchPolicy) {
        queryObj.fetchPolicy = fetchPolicy
      }
      console.log('queryObj cabins %o', queryObj)
      let { data: {cabins}} = await this.$apollo.query(queryObj)
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

    cabinItemCreated (val) {
      console.log('From LIST on cabinItemCreated %o', val)
      this.refreshItem ()
    }

  },

  mounted () {
    utils.EventBus.$on('cabin-item-created', this.cabinItemCreated)
  },
}
</script>
