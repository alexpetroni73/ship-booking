<template>
  <v-select
  :items="ships"
  :value="shipId"
  @change="onChange"
  :loading="$apollo.queries.ships.loading"
  item-text="name"
  item-value="id"
  label="Ship"
  :error="error"
  :error-message="error"
  />
</template>

<script>
import SearchShips from '@/graphql/ship/SearchShips.gql'
import Ship from '@/graphql/ship/Ship.gql'
// import { deleteObjFields } from '@common/utils'

export default {
  props: {
    ship: {
      type: Object,
    },

    accommodations: {
      type: Array,
      default: () => []
    },
  },

  model: {
    prop: 'ship',
    event: 'change'
  },

  apollo: {
    ships: {
      query: SearchShips,
      update (data) {
        return data.searchShips
      }
    },
  },

  data () {
    return {
      ships: [],
      loading: false,
      error: null,
    }
  },

  computed: {
    shipId () {
      return this.ship && this.ship.id ? this.ship.id : ''
    },
  },

  methods: {
    async onChange (val) {
      this.cleanErrors()
      if(!val) return
      this.loading = true
      try{
        let {data: {ship}} = await this.$apollo.query({
          query: Ship,
          variables: {id: val}
        })

        if(!ship){
          throw new Error("No ship found")
        }

        const acc = this.createShipAccomodations(ship)
        this.$emit('change', ship)
        this.$emit('update:accommodations', acc)
      }catch(error){
        this.error = error.message
      }finally{
        this.loading = false
      }
    },


    createShipAccomodations (ship) {
      let acc = []
      if(ship.cabins){
        acc = ship.cabins.map(e => {
          return {
            cabin: {
              id: e.id,
              capacity: e.capacity,
              name: e.name,
            },
            enabled: true,
            available: e.capacity,
            regularPrice: null,
            salePrice: null,
            saleStartDate: null,
          }
        })
      }
      return acc
    },

    cleanErrors () {
      if(this.error) {
        this.error = null
      }
    },

  },
}
</script>
