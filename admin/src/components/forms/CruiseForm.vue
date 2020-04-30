<template>
  <v-container
  fluid
  >
  <FormTopBar
  addNewTitle="Add New Cruise"
  v-bind="modelState"
  v-on="formEvents"
  />
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-spacer></v-spacer>
      <v-stepper-step
      step="1"
      :complete="currentStep > 1"
      :editable="currentStep > 1"
      >
      Ship & Date
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
      step="2"
      :complete="currentStep > 2"
      :editable="currentStep > 2"
      >
      Itinerary
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
      step="3"
      :complete="currentStep > 3"
      >
      Prices
      </v-stepper-step>

      <v-spacer></v-spacer>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
            :items="ships"
            item-text="name"
            item-value="id"
            v-model="editedItem.ship"
            label="Ship"
            />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <DatePickerInMenu
              v-model="editedItem.startDate"
              label="Strat Date"
            />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <DatePickerInMenu
              v-model="editedItem.endDate"
              label="End Date"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
          cols="12"
          class="text-center"
          >
            <v-btn
            color="primary"
            @click="nextStep(1)"
            >
            Next
            </v-btn>
          </v-col>
        </v-row>

      </v-stepper-content>
            <!-- ------------------------------- STEP 2 ------------------------------- -->
      <v-stepper-content step="2">

        <v-row>
          <v-col cols="12" class="text-right">
            <ItinerarySelectDialog
              @change="onItineraySelected"
            />
        </v-col>
      </v-row>


        <ItineraryForm
          :item="editedItem.itinerary"
          :cruiseEmbeded="true"
        />
        <!-- <v-row>
          <v-col cols="12" class="text-center">
            <v-select
            :items="itineraries"
            item-text="name"
            item-value="id"
            v-model="editedItem.itinerary"
            label="Ship"
            />
          </v-col>
        </v-row> -->

        <v-row>
          <v-col
          cols="12"
          class="text-center"
          >
            <v-btn
            color="primary"
            @click="nextStep(2)"
            >
            Next
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        s3
      </v-stepper-content>

    </v-stepper-items>

  </v-stepper>
  </v-container>
</template>

<script>
import FormMixin from '@/mixins/FormMixin'
import FormTopBar from '@/components/shared/FormTopBar'
import DatePickerInMenu from '@/components/shared/DatePickerInMenu'
import ItinerarySelectDialog from '@/components/shared/ItinerarySelectDialog'
import ItineraryForm from '@/components/forms/ItineraryForm'
import { jsonCopy } from '@/utils'

export default {
  mixins: [ FormMixin ],

  props: {
    ships: {
      type: Array,
      default: () => []
    },
  },

  components: {
    FormTopBar,
    DatePickerInMenu,
    ItinerarySelectDialog,
    ItineraryForm,
    // FormSubmitButtons,
  },

  data () {
    return {
      currentStep: 1,
      itineraryDialog: false,

    }
  },


  methods: {
    nextStep (val) {
      this.currentStep = +val + 1
    },

    onItineraySelected (val) {
      console.log('onItineraySelected %o', val)
      if(val) {
        let itinerary = jsonCopy(val)
        delete itinerary.id, itinerary.__typename
        console.log('itinerary %o', itinerary)
        this.editedItem.itinerary = itinerary
      }
    },
  },

  watch: {
    item: function () {
      this.currentStep = 1
    },
  }
}
</script>
