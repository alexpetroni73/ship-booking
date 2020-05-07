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
      <v-toolbar-title>Control Panel</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      left
    >
    <MainMenu />
    </v-navigation-drawer>

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
import MainMenu from '@/components/MainMenu'
import AppFooter from '@/components/AppFooter'

  export default {
    props: {
      source: String,
    },

    components: {
      MainMenu,
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
