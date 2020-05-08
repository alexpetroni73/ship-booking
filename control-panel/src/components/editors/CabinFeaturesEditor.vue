<template>
  <FeaturesSetFormModel
  id="cabin-fetures"
  v-slot="{item, modelState, formEvents}"
  v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
  >
    <FeaturesSetForm
    :item="item"
    v-bind="modelState"
    v-on="formEvents"
    />
  </FeaturesSetFormModel>
</template>

<script>
import FeaturesSetForm from '@/components/forms/FeaturesSetForm'
import FeaturesSetFormModel from '@/components/models/FeaturesSetFormModel'

export default {
  components: {
    FeaturesSetForm,
    FeaturesSetFormModel,
  },

}
</script>
