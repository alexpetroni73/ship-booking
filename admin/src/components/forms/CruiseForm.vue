<template>
  <base-material-card class="px-5 py-3">
    <template v-slot:heading>
      <div>
      <FormTopBar
      addNewTitle="Add New Cruise"
      v-bind="modelState"
      v-on="formEvents"
      />

      <v-stepper
      light
       v-model="currentStep">
        <v-stepper-header
        flat
        >
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
    </v-stepper>
  </div>
    </template>


  <v-stepper v-model="currentStep">
    <v-stepper-items>
      <!-- ========================= STEP 1 ========================= -->
      <v-stepper-content step="1" flat>

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


        <ItineraryFormBase
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
</base-material-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import DatePickerInMenu from '@common/components/DatePickerInMenu'
import CruiseItinerarySelectDialog from '@/components/forms/inner-components/CruiseItinerarySelectDialog'
import CruiseShipSelect from '@/components/forms/inner-components/CruiseShipSelect'
import CruiseAccomodationItem from '@/components/forms/inner-components/CruiseAccomodationItem'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import ItineraryFormBase from '@/components/forms/inner-components/ItineraryFormBase'


export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    DatePickerInMenu,
    CruiseItinerarySelectDialog,
    CruiseShipSelect,
    CruiseAccomodationItem,
    ItineraryFormBase,
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

  watch: {
    item: function () {
      this.currentStep = 1
    }
  }
}
</script>
