<template>
  <CruisesListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <CruisesListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </CruisesListFormModel>
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
