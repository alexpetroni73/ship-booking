<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>My Logo</v-toolbar-title>
    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>
    <v-footer
    color="primary"
  app
>
  <span class="white--text">&copy; {{ (new Date()).getFullYear() }}</span>
</v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
