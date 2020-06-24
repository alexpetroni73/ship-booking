<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="white"
  >
    <v-container>
      <v-toolbar-title @click="goHome" class="link">Logo</v-toolbar-title>
    </v-container>
  </v-app-bar>
</template>

<script>

  export default {
    name: 'AppBar',

    methods: {
      goHome () {
        this.$router.push({path: '/'})
      }
    }
  }
</script>
