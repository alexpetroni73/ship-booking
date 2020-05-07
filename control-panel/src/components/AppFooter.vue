<template>
  <v-footer
    app
    color="accent"
    class="white--text grey darken-4"
  >
  <span>Control Panel</span>
  <v-spacer />
  <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>

export default {
  name: 'app-footer',

}
</script>
