<template>
  <FeatureSetFormModel
  id="cabin-features"
  name="Cabin features"
  v-slot="{item, modelState, formEvents}"
  v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
  >
    <FeatureSetForm
    :item="item"
    v-bind="modelState"
    v-on="formEvents"
    />
  </FeatureSetFormModel>
</template>

<script>
import FeatureSetForm from '@/components/forms/FeatureSetForm'
import FeatureSetFormModel from '@/components/models/FeatureSetFormModel'
import { pipeEvents } from '@common/utils'

export default {
  components: {
    FeatureSetForm,
    FeatureSetFormModel,
  },

  methods: {
    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
