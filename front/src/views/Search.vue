<template>
  <v-container>
    <v-row dense>
      <v-col md="2">
        Search
      </v-col>

      <v-col md="10">
        <CruisesListFormModel
        :destination="destination"
        :departure="departure"
        v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
        >

        <CruisesListForm
          :items="items"
          :totalItems="totalItems"
          :tableOptions="tableOptions"
          v-bind="modelState"
          v-on="Object.assign({}, tableEvents, pipeUp('view-item'))"
          :destination="destination"
          :departure="departure"
        />

        </CruisesListFormModel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CruisesListFormModel from '@/components/models/CruisesListFormModel'
import CruisesListForm from '@/components/forms/CruisesListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    CruisesListFormModel,
    CruisesListForm,
  },

  data () {
    return {
      destination: 'all',
      departure: ''
    }
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  },

  watch: {
    '$route.params': {
      handler: function (val) {
        console.log('val route %o', val)
        this.destination = val.destination
        this.departure = val.daparture
      },
      immediate: true,
    },
  },

}
</script>
