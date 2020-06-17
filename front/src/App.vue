<template>
  <v-app>
    <AppBar />
    <v-main>
        <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from '@/components/core/AppBar'
import Footer from '@/components/core/Footer'

export default {
  name: 'App',

  components: {
    AppBar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.link {
  cursor: pointer;
}
</style>
