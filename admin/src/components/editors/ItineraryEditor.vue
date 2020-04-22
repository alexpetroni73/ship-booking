<template>
  <ItineraryFormModel
    busEventName="itinerary"
    :id="id"
    v-slot="{item, modelState, formEvents}"
    v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
  >
          <ItineraryForm
            :item="item"
            v-bind="modelState"
            v-on="formEvents"
            @cancel="$emit('cancel')"
          />
  </ItineraryFormModel>
</template>

<script>
import ItineraryFormModel from '@/components/models/ItineraryFormModel'
import ItineraryForm from '@/components/forms/ItineraryForm'
import { pipeEvents } from '@/utils'

export default {
  name: 'ItineraryEditor',

  components: {
    ItineraryFormModel,
    ItineraryForm,
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
