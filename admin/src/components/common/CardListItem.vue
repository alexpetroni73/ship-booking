<template>
  <base-material-card
    class="v-card-profile"
    avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
  >
    <v-card-text class="text-center">
      <h6 class="display-1 mb-1 grey--text">
        {{ title }}
      </h6>

      <h4 class="display-2 font-weight-light mb-3 black--text">
        Alec Thompson
      </h4>

      <p class="font-weight-light grey--text">
        Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
      </p>

      <v-btn
        color="success"
        rounded
        class="mr-0"
      >
        Edit
      </v-btn>
    </v-card-text>
  </base-material-card>
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
    title: {
      type: String,
    },
    link: {
      type: String,
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

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
