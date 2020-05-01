<template>
  <v-select
  :items="ships"
  :value="shipId"
  @change="onChange"
  :loading="$apollo.queries.ships.loading"
  item-text="name"
  item-value="id"
  label="Ship"
  />
</template>

<script>
import SearchShips from '@/graphql/ship/SearchShips.gql'

export default {
  props: {
    shipId: {
      type: String
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

  data () {
    return {
      ships: [],
      loading: false,
    }
  },

  methods: {
    onChange (val) {
      this.$emit('change', val)
    },
  },
}
</script>
