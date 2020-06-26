<template>
  <OptionsListFormModel
    id="ship-type"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
  >
    <BaseOptionsListForm
    :item="item"
    v-bind="modelState"
    @update-item="crudEvents['update-item']"
    listTitle="Ship type"
    />
  </OptionsListFormModel>
</template>

<script>
import OptionsListFormModel from '@/components/models/OptionsListFormModel'
import BaseOptionsListForm from '@/components/forms/BaseOptionsListForm'
import { pipeUp } from '@common/utils'

export default {
  name: 'CruiseEditor',

  components: {
    OptionsListFormModel,
    BaseOptionsListForm,
  },

  props: {
    id: {
      type: String
    },
  },

  methods: {
    pipeUp (...events) {
      return pipeUp(this, events)
    },
  },

}
</script>
