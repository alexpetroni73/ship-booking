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
        length: '',
        dives: '',
        experience: '',
        description: '',
        image: '',
        gallery: [],
        stopovers: [],
      }
    },

    getDefaultItineraryStep () {
      return {
        title: '',
        description: '',
      }
    },

    async createItem (item, key) {
      let { data: { createItinerary } } = await this.$apollo.mutate({
        mutation: CreateItinerary,
        variables: {input:item, ...key},
      })
      return createItinerary
    },

    async loadItem (key) {
      console.log('loadItem key %o', key)
      let { data: { itinerary } } = await this.$apollo.query({
        query: Itinerary,
        variables: key,
      })
      console.log('itinerary %o', itinerary)
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
