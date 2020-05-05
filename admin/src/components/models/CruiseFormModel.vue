<script>
import BaseItemFormModel from '@/components/models/BaseItemFormModel'

import Cruise from '@/graphql/cruise/Cruise.gql'
import CreateCruise from '@/graphql/cruise/CreateCruise.gql'
import UpdateCruise from '@/graphql/cruise/UpdateCruise.gql'
import DeleteCruise from '@/graphql/cruise/DeleteCruise.gql'

import { parseDate, deleteObjField } from '@/utils'

export default {
  extends: BaseItemFormModel,

  data () {
    return {

    }
  },

  methods: {
    getDefaultItem () {
      return {
        ship: {
          id: '',
          name: '',
          slug: '',
        },
        startDate: '',
        endDate: '',
        slug: '',
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
        accommodations: []
      }
    },

    async createItem (item) {
      let { data: { createCruise } } = await this.$apollo.mutate({
        mutation: CreateCruise,
        variables: {input: this.parseItemForInput(item)},
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

    createCruiseSlug (item) {
      return item.itinerary.location + '-' + item.ship.slug + '-' + item.startDate + '-' + item.endDate
    },

    parseItemForInput (item) {
      let input = Object.assign({}, item, {ship: item.ship.id})
      if( item.ship.id) {
        input.ship= item.ship.id
      }
      input.slug = this.createCruiseSlug(item)
      input.accommodations = item.accommodations.map(e => ({
        cabin: e.cabin.id,
        available: e.available,
        regularPrice: e.regularPrice,
        salePrice: e.salePrice,
        saleStartDate: e.saleStartDate,
        enabled: e.enabled,
      }))
      input = deleteObjField(input, '__typename')
      return input
    },



    parseLoadResult (item) {
      return this.parseCruise(item)
    },

    parseUpdateResult (item) {
      return this.parseCruise(item)
    },

    parseCruise (item) {
      let cruise = this.parseItemToMirrorDefaultModel(item)
      cruise.startDate = parseDate(cruise.startDate)
      cruise.endDate = parseDate(cruise.endDate)
      if(cruise.accommodations){
        cruise.accommodations = cruise.accommodations.map(e => {
          e.saleStartDate = parseDate(e.saleStartDate)
          return e
        })
      }
      return cruise
    },

  },
}
</script>
