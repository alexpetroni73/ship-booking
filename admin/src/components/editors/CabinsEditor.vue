<template>
  <v-container>
  <v-slide-x-transition>
    <CabinsListFormModel
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    >

    <!-- ===============================  Capacity  =============================== -->
    <!-- <v-row>
      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.maxCapacity"
       label="Maximum capacity passangers"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.maxCapacityCabins"
       label="In cabins (pax)"
       required
       persistent-hint
       hint="For whom beds are provided"
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.dayTrips"
       label="Day trips (pax)"
       required
       persistent-hint
       hint="If your license allows for increased passenger capacity during day trips compared with normal capacity"
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.atBerth"
       label="Alongside/at berth"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.noOfCabins"
       label="Total No of cabins"
       required
      ></v-text-field>
      </v-col>

    </v-row> -->


    <v-row
      v-show="isListView"
      justify="center"
    >
      <v-col
      sm="12"
      md="6"
      >
        <CabinsListForm
        :item="item"
        v-bind="modelState"
        @update-item="crudEvents['update-item']"
        @edit-item="setCabinEditor"
        />
      </v-col>
    </v-row>
    </CabinsListFormModel>
  </v-slide-x-transition>

  <v-slide-x-reverse-transition>
    <CabinFormModel
    :shipId="id"
    busEventName="cabin"
    v-model="selectedCabinId"
    @item-deleted="setListView"
    @item-created="setListView"
    @item-updated="setListView"
    v-slot="{item, modelState, crudEvents, cabinFeatures}"
    v-on="pipeUpEvents(['item-created', 'item-updated', 'item-deleted'])"
    >
    <v-row
      v-show="isCabinView"
      justify="center"
    >
      <v-col
        cols="12"
      >
            <CabinForm
            :item="item"
            :cabinFeatures="cabinFeatures"
            v-bind="modelState"
            v-on="crudEvents"
            @cancel="setListView"
            />
        </v-col>
      </v-row>
    </CabinFormModel>

</v-slide-x-reverse-transition>
</v-container>
</template>

<script>
import CabinsListFormModel from '@/components/models/CabinsListFormModel'
import CabinFormModel from '@/components/models/CabinFormModel'
import CabinsListForm from '@/components/forms/CabinsListForm'
import CabinForm from '@/components/forms/CabinForm'

import { pipeUp } from '@common/utils'

export default {
  name: '',

  components: {
    CabinsListFormModel,
    CabinsListForm,
    CabinFormModel,
    CabinForm,
  },

  props: {
    id: {
      type: String
    },

    activ: { // re-set the listView when CabinsEditor tab is selected
      type: Number
    },
  },

  data () {
    return {
      selectedCabinId: null,
      view: 'cabinsList',
    }
  },

  computed: {
    isListView () {
      return this.view == 'cabinsList'
    },

    isCabinView () {
      return this.view == 'cabin'
    },
  },

  watch: {
    activ () {
      if(this.view != 'cabinsList'){
        this.view = 'cabinsList'
      }
    }
  },

  methods: {
    pipeUpEvents (...events) {
      return pipeUp(this, ...events)
    },

    setListView () {
      this.view = 'cabinsList'
    },

    setCabinEditor (id) {
      this.selectedCabinId = id
      this.view = 'cabin'
    },
  },

}
</script>
