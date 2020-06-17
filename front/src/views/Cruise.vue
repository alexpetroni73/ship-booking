<template>
  <v-container>
    <v-row dense>
      <v-col md="2">
        Search
      </v-col>

      <v-col md="10">
  <CruiseShipModel
    :id="shipSlug"
    v-slot="{item}">

    <CruiseFullCard
    :ship="item"
    />


  </CruiseShipModel>
</v-col>
</v-row>
</v-container>
</template>

<script>
import CruiseShipModel from '@/components/models/CruiseShipModel'
import CruiseFullCard from '@/components/forms/CruiseFullCard'

export default {
  name: '',

  components: {
    CruiseShipModel,
    CruiseFullCard,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {

  },

  data () {
    return {
      shipSlug: ''
    }
  },

  computed: {

  },

  watch: {
    '$route.params': {
      handler: function (val) {
        console.log('val route %o', val)
        this.shipSlug= val.shipSlug
        this.destination = val.destination
        this.departure = val.daparture
      },
      immediate: true,
    },
  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
