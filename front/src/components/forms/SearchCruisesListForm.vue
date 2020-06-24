<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

  <v-alert v-if="error" type="error">{{ error }}</v-alert>

  <v-data-iterator
    :items="items"
    :server-items-length="totalItems"
    :search="search"
    class="my-0"
  >
  <template v-slot:header>
    <v-row dense>
      <v-col cols="12" class="headline">
    {{ searchHeader(totalItems) }}
      </v-col>
    </v-row>
  </template>

  <template v-slot:default="props">
    <SearchCruiseCard
    v-for="item in props.items"
    :key="item.ship.id"
    :item="item"
    :destination="destination"
    :departure="departure"
    />
  </template>

</v-data-iterator>
  </v-container>
</template>

<script>
import FormPagListMixin from '@common/mixins/FormPagListMixin'
import { parseDate } from '@common/utils'
import SearchCruiseCard from '@/components/forms/SearchCruiseCard'

export default {

  mixins: [ FormPagListMixin ],

  components: {
    SearchCruiseCard,
  },

  props: {
    destination: {
      type: String,
    },

    departure: {
      type: String,
    },
  },

  data () {
    return {

    }
  },



  methods: {
    formatDate (date) {
      return parseDate(date)
    },

    searchHeader (total) {
      return `${total} vessels available`
    },
  },


}
</script>
