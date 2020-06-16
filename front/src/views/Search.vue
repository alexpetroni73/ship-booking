<template>
  <v-container>
    <v-row>
      <v-col md="3">
        Search
      </v-col>

      <v-col md="9">
        <CruisesListFormModel
        v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
        >

        <CruisesListForm
          :items="items"
          :totalItems="totalItems"
          :tableOptions="tableOptions"
          v-bind="modelState"
          v-on="Object.assign({}, tableEvents, pipeUp('view-item'))"
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

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
