<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="blue-grey"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer />
      <!-- <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" /> -->
    </v-app-bar>

    <!-- <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

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
</style>
