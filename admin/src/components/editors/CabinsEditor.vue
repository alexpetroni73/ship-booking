<template>
  <div>
  <v-slide-x-transition>
  <CabinsListFormModel
  :id="id"
  v-slot="{item, modelState, formEvents}"
  >
      <CabinsListForm
      v-show="isCabinsListForm"
      :item="item"
      v-bind="modelState"
      @update-item="formEvents['update-item']"
      @edit-item="setEditorView"
      />
  </CabinsListFormModel>
  </v-slide-x-transition>

  <v-slide-x-reverse-transition>
    <CabinFormModel
    :shipId="id"
    busEventName="cabin"
    v-model="selectedCabinId"
    v-slot="{item, modelState, formEvents}"
    >
    <CabinForm
    v-show="isCabinForm"
    :item="item"
    v-bind="modelState"
    v-on="formEvents"
    @show-list="setListView"
    />
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

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {
    id: {
      type: String
    }
  },

  data () {
    return {
      selectedCabinId: null,
      view: 'cabinsList',
    }
  },

  computed: {
    isCabinsListForm () {
      return this.view == 'cabinsList'
    },

    isCabinForm () {
      return this.view == 'cabin'
    },
  },

  watch: {

  },

  methods: {
    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },

    setListView () {
      this.selectedCabinId = null
      this.view = 'cabinsList'
    },

    setEditorView (id) {
      this.selectedCabinId = id
      this.view = 'cabin'
    },
  },

}
</script>
