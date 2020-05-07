<template>
  <CruiseFormModel
    busEventName="cruise"
    :id="id"
    v-slot="{item, modelState, formEvents}"
    v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted', 'item-updated')"
  >
          <CruiseForm
            :item="item"
            v-bind="modelState"
            v-on="formEvents"
            @cancel="$emit('cancel')"
          />
  </CruiseFormModel>
</template>

<script>
import CruiseFormModel from '@/components/models/CruiseFormModel'
import CruiseForm from '@/components/forms/CruiseForm'
import { pipeEvents } from '@common/utils'

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
    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
