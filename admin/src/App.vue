<template>
  <v-app id="inspire">
    <!-- <v-app-bar
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
    </v-app-bar> -->
    <AppBar />
    <Drawer />

    <v-content>
      <v-container
        fluid
      >
        <router-view></router-view>

      </v-container>
      <!-- <AppFooter /> -->
    </v-content>

    <!-- <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    /> -->
  </v-app>
</template>

<script>

import AppBar from '@/views/dashboard/components/core/AppBar'
import Drawer from '@/views/dashboard/components/core/Drawer'
// import Footer from '@/views/dashboard/components/core/Footer'

  export default {
    props: {
      source: String,
    },

    components: {
      AppBar,
      Drawer,
      // AppFooter,
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

.tab-img-thumbnail {
  width: 90px;
  height: 90px;
}
</style>
