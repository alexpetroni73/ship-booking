<template>
  <ItinerariesListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <ItinerariesListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </ItinerariesListFormModel>
</template>

<script>
import ItinerariesListFormModel from '@/components/models/ItinerariesListFormModel'
import ItinerariesListForm from '@/components/forms/ItinerariesListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    ItinerariesListFormModel,
    ItinerariesListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
