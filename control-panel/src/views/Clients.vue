<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
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

  },

  props: {

  },

  data () {
    return {
      headers: [
        { text: 'Cruise', value: 'cruise' },
        { text: 'First Name', value: 'firstName'},
        { text: 'Last Name', value: 'lastName' },
        { text: 'Gender', value: 'gender' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Last Order', value: 'order'},
        { text: 'Status', value: 'status' },
      ],

      items: [],
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {

  },


}
</script>
