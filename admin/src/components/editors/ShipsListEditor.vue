<template>
  <ShipsListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <ShipsListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </ShipsListFormModel>
</template>

<script>
import ShipsListFormModel from '@/components/models/ShipsListFormModel'
import ShipsListForm from '@/components/forms/ShipsListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    ShipsListFormModel,
    ShipsListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
