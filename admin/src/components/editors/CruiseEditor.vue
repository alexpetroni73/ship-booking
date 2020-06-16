<template>
  <CruiseFormModel
    busEventName="cruise"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
  >
          <CruiseForm
            :item="item"
            v-bind="modelState"
            v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
          />
  </CruiseFormModel>
</template>

<script>
import CruiseFormModel from '@/components/models/CruiseFormModel'
import CruiseForm from '@/components/forms/CruiseForm'
import { pipeUp } from '@common/utils'

export default {
  name: 'CruiseEditor',

  components: {
    CruiseFormModel,
    CruiseForm,
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
