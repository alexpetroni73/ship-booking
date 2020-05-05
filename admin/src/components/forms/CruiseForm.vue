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
      Accommodation
      </v-stepper-step>

      <v-spacer></v-spacer>

    </v-stepper-header>

    <v-stepper-items>
      <!-- ========================= STEP 1 ========================= -->
      <v-stepper-content step="1">

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <CruiseShipSelect
              v-model="editedItem.ship"
              :accommodations.sync="editedItem.accommodations"
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
            :disabled="!stepOneValid"
            >
            Next
            </v-btn>
          </v-col>
        </v-row>

      </v-stepper-content>
            <!-- ========================= STEP 2 ========================= -->
      <v-stepper-content step="2">

        <v-row>
          <v-col cols="12" class="text-right">
            <CruiseItinerarySelectDialog
              v-model="editedItem.itinerary"
            />
        </v-col>
      </v-row>


        <ItineraryForm
          :item="editedItem.itinerary"
          :cruiseEmbeded="true"
        />

        <v-row>
          <v-col
          cols="12"
          class="text-center"
          >
            <v-btn
            color="primary"
            @click="nextStep(2)"
            :disabled="!stepTwoValid"
            >
            Next
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

        <!-- ========================= STEP 3 ========================= -->
      <v-stepper-content step="3">

        <v-card
          class="mx-auto"
          tile
        >
        <template

        >
          <CruiseAccomodationItem
            v-for="(item, index) in editedItem.accommodations"
            :item="item"
            :key="item.cabinId"
            :add-divider="index + 1 < editedItem.accommodations.length"
          />
        </template>
        </v-card>

        <FormSubmitButtons
        :formState="formState"
        @update-item="updateItem"
        @create-item="createItem"
        />
      </v-stepper-content>

    </v-stepper-items>

  </v-stepper>
  </v-container>
</template>

<script>
import FormMixin from '@/mixins/FormMixin'
import FormTopBar from '@/components/shared/FormTopBar'
import DatePickerInMenu from '@/components/shared/DatePickerInMenu'
import CruiseItinerarySelectDialog from '@/components/forms/inner-components/CruiseItinerarySelectDialog'
import CruiseShipSelect from '@/components/forms/inner-components/CruiseShipSelect'
import CruiseAccomodationItem from '@/components/forms/inner-components/CruiseAccomodationItem'
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'
import ItineraryForm from '@/components/forms/ItineraryForm'


export default {
  mixins: [ FormMixin ],

  components: {
    FormTopBar,
    DatePickerInMenu,
    CruiseItinerarySelectDialog,
    CruiseShipSelect,
    CruiseAccomodationItem,
    ItineraryForm,
    FormSubmitButtons,
  },

  data () {
    return {
      currentStep: 1,
      itineraryDialog: false,

      disable: "Disable",
    }
  },

  computed: {
    stepOneValid () {
      return this.editedItem && this.editedItem.ship && this.editedItem.startDate && this.editedItem.endDate
    },

    stepTwoValid () {
      return this.editedItem && this.editedItem.itinerary && this.editedItem.itinerary.location
    },
  },

  methods: {
    nextStep (val) {
      this.currentStep = +val + 1
    },

  },
}
</script>
