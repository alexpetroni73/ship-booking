<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="8" class="title" :class="{'text--disabled': !item.enabled}">
        {{ item.cabin.name }}
      </v-col>
      <v-col sm="12" md="4">
        <v-switch
          v-model="item.enabled"
          :label="enabledLabel(item.enabled)"
          class="float-right"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="3"><v-text-field dense :label="availableLabel(item)" v-model.number="item.available" :disabled="!item.enabled"></v-text-field></v-col>
      <v-col sm="3"><v-text-field dense label="Price" v-model.number="item.regularPrice" :disabled="!item.enabled"></v-text-field></v-col>
      <v-col sm="3"><v-text-field dense label="Sale Price" v-model.number="item.salePrice" :disabled="!item.enabled"></v-text-field></v-col>
      <v-col sm="3"><DatePickerInMenu v-model="item.saleStartDate" label="Sale Start Date" :disabled="!item.enabled" :clearable="true" :dense="true"/></v-col>

    </v-row>
    <v-divider v-if="addDivider"></v-divider>
  </v-container>
</template>

<script>
import DatePickerInMenu from '@common/components/DatePickerInMenu'

export default {
  name: '',

  components: {
    DatePickerInMenu,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  // model: {
  //   prop: 'item',
  //   event: 'change'
  // },

  props: {
    item: {
      type: Object,
      required: true,
    },

    addDivider: {
      type: Boolean,
      default: false,
    }
  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    // labels
    enabledLabel (val) {
      return val ? "Enabled" : "Disabled"
    },

    availableLabel (item) {
      return `Available Places (from ${item.cabin.capacity})`
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
