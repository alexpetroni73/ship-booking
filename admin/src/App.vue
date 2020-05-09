<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="accent"
      class="grey darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Admin Panel</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <Drawer />

    <v-content>
      <v-container
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    />

    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import Drawer from '@/components/Drawer'

  export default {
    props: {
      source: String,
    },

    components: {
      Drawer,
      AppFooter,
    },

    data: () => ({
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
    }),


  }
</script>

<style>
.handle {
  cursor: grabbing;
}

.link {
  cursor: pointer;
}
</style>
