<template>
  <v-container>




  <v-slide-x-transition>
    <CabinsListFormModel
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    >

    <v-row
      v-show="isListView"
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
