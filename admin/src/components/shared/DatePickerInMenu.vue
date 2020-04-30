<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="date"
        :label="label"
        prepend-icon="mdi-event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
    :value="date"
    @input="onInput">
  </v-date-picker>
  </v-menu>
</template>

<script>

export default {
  name: '',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {
    prop: 'date',
    event: 'change'
  },

  props: {
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },

    label: {
      type: String,
      default: "Choose Date"
    },
  },

  data () {
    return {
      menu: false
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    onInput (val) {
      this.$emit('change', val)
      this.menu = false
    },
  },


}
</script>
