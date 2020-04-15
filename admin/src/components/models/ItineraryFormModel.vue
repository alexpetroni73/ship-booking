<script>
import BaseItemFormModel from '@/components/models/BaseItemFormModel'

import Itinerary from '@/graphql/itinerary/Itinerary.gql'
import CreateItinerary from '@/graphql/itinerary/CreateItinerary.gql'
import UpdateItinerary from '@/graphql/itinerary/UpdateItinerary.gql'
import DeleteItinerary from '@/graphql/itinerary/DeleteItinerary.gql'

export default {
  extends: BaseItemFormModel,

  data () {
    return {
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        excerpt: '',
        description: '',
        image: '',
        gallery: [],
        locations: [],
      }
    },

    getDefaultItineraryStep () {
      return {
        name: '',
        excerpt: '',
        description: '',
        image: '',
      }
    },

    async createItem (item, key) {
      console.log('createItem item %o', item)
      console.log('createItem key %o', key)
      let { data: { createItinerary } } = await this.$apollo.mutate({
        mutation: CreateItinerary,
        variables: {input:item, ...key},
      })
      return createItinerary
    },

    async loadItem (key) {
      let { data: { itinerary } } = await this.$apollo.query({
        query: Itinerary,
        variables: key,
      })

      return itinerary
    },

    async updateItem (item, key) {
      console.log('updateItem item %o', item)
      console.log('updateItem key %o', key)
      let { data: { updateItinerary } } = await this.$apollo.mutate({
        mutation: UpdateItinerary,
        variables: {...key, input: item},
      })
      return updateItinerary
    },

    async deleteItem (key) {
      let { data: { deleteItinerary } } = await this.$apollo.mutate({
        mutation: DeleteItinerary,
        variables: key,
      })
      return deleteItinerary
    },

  },
}
</script>
