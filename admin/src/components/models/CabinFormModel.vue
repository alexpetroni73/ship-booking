<script>
import BaseLoadedItemFormModel from '@/components/models/BaseLoadedItemFormModel'

import Cabin from '@/graphql/ship/Cabin.gql'
import CreateCabin from '@/graphql/ship/CreateCabin.gql'
import UpdateCabin from '@/graphql/ship/UpdateCabin.gql'

export default {
  extends: BaseLoadedItemFormModel,

  props: {
    shipId: {
      type: String,
      required: true,
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        excerpt: '',
        description: '',
        order: null,
        image: '',
        features: [],
        featuresText: '',
        capacity: null,
        bedding: '',
        airconditioning: '',
      }
    },

    parentKey () {
      return { shipId: this.shipId }
    },

    async createItem (item, key) {
      console.log('createItem key %o, item %o', key, item)
      let result = await this.$apollo.mutate({
        mutation: CreateCabin,
        variables: {input:item, ... key},
      })
      console.log('result %o', result)
      let { data: { createCabin } } = result
      //  await this.$apollo.mutate({
      //   mutation: CreateCabin,
      //   variables: {input:item, ... key},
      // })
      console.log('createCabin %o', createCabin)
      return createCabin
    },

    async loadItem (key) {
      console.log('loadItem key %o', key)
      let { data: { cabin } } = await this.$apollo.query({
        query: Cabin,
        variables: key,
      })

      console.log('loadItem cabin %o', cabin)
      return cabin
    },

    async updateItem (item, key) {
      console.log('updateItem key %o, item %o', key, item)
      let result = await this.$apollo.mutate({
        mutation: UpdateCabin,
        variables: {...key, input: item},
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
}
</script>
