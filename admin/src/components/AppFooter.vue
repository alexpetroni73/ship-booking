<template>
  <v-footer
    app
    color="blue-grey"
    class="white--text"
  >
  <span>My Ships</span>
  <v-spacer />
  <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>

export default {
  name: 'app-footer',

  data () {
    return {

    }
  },


}
</script>
