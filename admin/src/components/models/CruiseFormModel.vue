<script>
import BaseItemFormModel from '@/components/models/BaseItemFormModel'

import Cruise from '@/graphql/cruise/Cruise.gql'
import CreateCruise from '@/graphql/cruise/CreateCruise.gql'
import UpdateCruise from '@/graphql/cruise/UpdateCruise.gql'
import DeleteCruise from '@/graphql/cruise/DeleteCruise.gql'
import SearchShips from '@/graphql/ship/SearchShips.gql'

export default {
  extends: BaseItemFormModel,

  data () {
    return {
      ships: [],
    }
  },

  apollo: {
    ships: {
      query: SearchShips,
      update (data) {
        return data.searchShips
      }
    },
  },

  methods: {
    getDefaultItem () {
      return {
        ship: '',
        itinerary: {
          name: '',
          slug: '',
          location: '',
          length: '',
          dives: '',
          experience: '',
          description: '',
          image: '',
          gallery: [],
          stopovers: [],
        },
        startDate: '',
        endDate: '',
        slug: '',
      }
    },

    extraSlotParams () {
      return {
        ships: this.ships,
      }
    },

    async createItem (item, key) {
      let { data: { createCruise } } = await this.$apollo.mutate({
        mutation: CreateCruise,
        variables: {input:item, ...key},
      })
      return createCruise
    },

    async loadItem (key) {
      let { data: { cruise } } = await this.$apollo.query({
        query: Cruise,
        variables: key,
      })
      return cruise
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateCruise } } = await this.$apollo.mutate({
        mutation: UpdateCruise,
        variables: {...key, input },
      })
      return updateCruise
    },

    async deleteItem (key) {
      let { data: { deleteCruise } } = await this.$apollo.mutate({
        mutation: DeleteCruise,
        variables: key,
      })
      return deleteCruise
    },

  },
}
</script>
