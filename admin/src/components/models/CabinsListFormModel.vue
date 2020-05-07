<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import Cabins from '@/graphql/ship/Cabins.gql'
import UpdateCabins from '@/graphql/ship/UpdateCabins.gql'
import * as utils from '@common/utils'

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
      // console.log('loadItem key %o', key)
      let queryObj = {
        query: Cabins,
        variables: key,
      }
      if(fetchPolicy) {
        queryObj.fetchPolicy = fetchPolicy
      }
      // console.log('queryObj cabins %o', queryObj)
      let { data: {cabins}} = await this.$apollo.query(queryObj)
      // console.log('loadItem cabins %o', cabins)
      return cabins
    },

    async updateItem (item, key) {
      // console.log('updateItem key %o, item %o', key, item)
      const reorderedItems = item.map((e, index) => {
        return {id: e.id, order: index}
      })
      // console.log('reorderedItems %o', reorderedItems)
      const variables = {...key, inputArr:reorderedItems}
      // console.log('variables %o', variables)

      const result = await this.$apollo.mutate({
        mutation: UpdateCabins,
        variables,
      })
// console.log('result %o', result)
      const {updateCabins:cabins = []} = result.data
      // console.log('cabins %o', cabins)
      return cabins
    },


    onCabinItemCreated (val) {
      console.log('From LIST on onCabinItemCreated %o', val)
      this.refreshItem ()
    },

    onCabinItemUpdated (val) {
      console.log('From LIST on onCabinItemUpdated %o', val)
      this.refreshItem ()
    },

    onCabinItemDeleted (val) {
      console.log('From LIST on onCabinItemDeleted %o', val)
      this.refreshItem ()
    },


  },

  created () {
    utils.EventBus.$on('cabin-item-created', this.onCabinItemCreated)
    utils.EventBus.$on('cabin-item-updated', this.onCabinItemUpdated)
    utils.EventBus.$on('cabin-item-deleted', this.onCabinItemDeleted)
  },


}
</script>
