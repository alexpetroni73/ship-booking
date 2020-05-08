<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
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
        {
          text: 'Company',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Contact', value: 'contact' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Status', value: 'status' },
        { text: '', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ]
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
