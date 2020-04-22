<script>
import { jsonCopy } from '@/utils'
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
      let { data: { itinerary } } = await this.$apollo.query({
        query: Itinerary,
        variables: key,
      })
      return itinerary
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateItinerary } } = await this.$apollo.mutate({
        mutation: UpdateItinerary,
        variables: {...key, input },
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

    parseItemForInput (item) {
      let input = jsonCopy(item)
      if(input.stopovers){
        input.stopovers = input.stopovers.map(e => {
          return {
            title: e.title,
            description: e.description
          }
        })
      }
      return input
    },

  },
}
</script>
