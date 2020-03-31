<script>
import BaseItemFormModel from '@/components/models/BaseItemFormModel'

import Cabin from '@/graphql/ship/Cabin.gql'
import CreateCabin from '@/graphql/ship/CreateCabin.gql'
import UpdateCabin from '@/graphql/ship/UpdateCabin.gql'
// import CabinFeatures from '@/graphql/ship/CabinFeatures.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    shipId: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      cabinFeatures: [
        { name: 'a', slug: 'a' },
        { name: 'b', slug: 'b' },
        { name: 'c', slug: 'c' },
        { name: 'd', slug: 'd' },
      ],
    }
  },

  // apollo: {
  //   cabinFeatures: {
  //     query: CabinFeatures,
  //     update: (data) => data.cabinFeatures,
  //   }
  // },

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
      console.log('result %o', result)
      let { data: { updateCabin } } = result
      console.log('updateCabin cabin %o', updateCabin)
      return updateCabin
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

    extraSlotParams () {
      return {cabinFeatures: this.cabinFeatures}
    }

  },
}
</script>
