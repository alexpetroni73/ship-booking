<template>
  <div>
  <v-slide-x-transition>
    <CabinsListFormModel
    :id="id"
    v-slot="{item, modelState, formEvents}"
    >
        <CabinsListForm
        v-show="showCabinsListForm"
        :item="item"
        v-bind="modelState"
        @update-item="formEvents['update-item']"
        @edit-item="setCabinEditor"
        />
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
    v-slot="{item, modelState, formEvents, cabinFeatures}"
    v-on="pipeUpEvents(['item-created', 'item-updated', 'item-deleted'])"
    >
    <v-container
    v-show="showCabinForm"
    fluid>
      <v-row>
        <v-col
        sm="12"
        md="2"
        >
          <v-btn
            text
            small
           @click="setListView"><v-icon>mdi-chevron-left</v-icon>Cabins list
         </v-btn>
        </v-col>

        <v-col
        sm="12"
        md="8"
        >
            <CabinForm
            :item="item"
            :cabinFeatures="cabinFeatures"
            v-bind="modelState"
            v-on="formEvents"
            />
        </v-col>
        <v-col
        sm="12"
        md="2"
        >
        </v-col>
      </v-row>
      </v-container>
    </CabinFormModel>

</v-slide-x-reverse-transition>
</div>
</template>

<script>
import CabinsListFormModel from '@/components/models/CabinsListFormModel'
import CabinFormModel from '@/components/models/CabinFormModel'
import CabinsListForm from '@/components/forms/CabinsListForm'
import CabinForm from '@/components/forms/CabinForm'

import { pipeEvents } from '@/utils'

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
    showCabinsListForm () {
      return this.view == 'cabinsList'
    },

    showCabinForm () {
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
      return pipeEvents(this, ...events)
    },

    setListView () {
      this.selectedCabinId = null
      this.view = 'cabinsList'
    },

    setCabinEditor (id) {
      this.selectedCabinId = id
      this.view = 'cabin'
    },


  },

}
</script>
