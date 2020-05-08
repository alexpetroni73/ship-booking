<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Cabin from '@/graphql/ship/Cabin.gql'
import CreateCabin from '@/graphql/ship/CreateCabin.gql'
import UpdateCabin from '@/graphql/ship/UpdateCabin.gql'
import DeleteCabin from '@/graphql/ship/DeleteCabin.gql'
// import CabinFeatures from '@/graphql/ship/CabinFeatures.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    slug: {
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
        capacity: null,
        excerpt: '',
        description: '',
        order: null,
        image: '',
        gallery: [],
        features: [],
        featuresText: '',
        bedding: '',
        airconditioning: '',
      }
    },

    parentKey () {
      return { slug: this.slug }
    },

    async createItem (item, key) {
      console.log('createItem item %o', item)
      console.log('createItem key %o', key)
      let { data: { createCabin } } = await this.$apollo.mutate({
        mutation: CreateCabin,
        variables: {input:item, ...key},
      })
      return createCabin
    },

    async loadItem (key) {
      let { data: { cabin } } = await this.$apollo.query({
        query: Cabin,
        variables: key,
      })

      return cabin
    },

    async updateItem (item, key) {
      console.log('updateItem item %o', item)
      console.log('updateItem key %o', key)
      let { data: { updateCabin } } = await this.$apollo.mutate({
        mutation: UpdateCabin,
        variables: {...key, input: item},
      })
      return updateCabin
    },

    async deleteItem (key) {
      let { data: { deleteCabin } } = await this.$apollo.mutate({
        mutation: DeleteCabin,
        variables: key,
      })
      return deleteCabin
    },

    extraSlotParams () {
      return {cabinFeatures: this.cabinFeatures}
    }

  },
}
</script>
