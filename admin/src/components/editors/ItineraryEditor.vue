<template>
    <ItineraryFormModel
    busEventName="itinerary"
    :id="id"
    v-slot="{item, modelState, formEvents}"
    v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
    >
    <v-container
    >
      <v-row>
        <!-- <v-col
        sm="12"
        md="2"
        >
          <v-btn
            text
            small
           @click="setListView"><v-icon>mdi-chevron-left</v-icon>Itineraries list
         </v-btn>
        </v-col> -->

        <v-col
        cols="12"
        >
            <ItineraryForm
            :item="item"
            v-bind="modelState"
            v-on="formEvents"
            @cancel="setListView"
            />
        </v-col>
        <!-- <v-col
        sm="12"
        md="2"
        >
        </v-col> -->
      </v-row>
      </v-container>
    </ItineraryFormModel>
</template>

<script>
import ItineraryFormModel from '@/components/models/ItineraryFormModel'
import ItineraryForm from '@/components/forms/ItineraryForm'

import { pipeEvents } from '@/utils'

export default {
  name: '',

  components: {
    ItineraryFormModel,
    ItineraryForm,
  },

  props: {
    id: {
      type: String
    },

    activ: { // re-set the listView when ItinerariesEditor tab is selected
      type: Number
    },
  },

  data () {
    return {
      selectedItineraryId: null,
      view: 'itinerariesList',
    }
  },

  methods: {
    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },

    setListView () {
      this.$router.push({name: 'itineraries'})
    }
  },

}
</script>
