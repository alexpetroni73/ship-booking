<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    left
    src="@/assets/bg1.jpg"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    v-bind="$attrs"
  >
  <template v-slot:img="props">
    <v-img
      :gradient="`to bottom, ${barColor}`"
      v-bind="props"
    />
  </template>

  <v-divider class="mb-1" />

  <v-list
    dense
    nav
  >
    <v-list-item>
      <v-list-item-avatar
        class="align-self-center"
        color="white"
        contain
      >
        <v-img
          src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
          max-height="30"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          class="display-1"
          v-text="company"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>

  <v-divider class="mb-2" />

  <v-list dense>
  <v-list-item-group v-model="model">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      @click="navigateTo(item.route)"
    >
      <v-list-item-icon>
        <v-icon v-text="item.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
   </v-list>
    </v-navigation-drawer>
</template>

<script>
import {  mapState,} from 'vuex'

export default {
  name: 'MainMenu',

  data () {
    return {
      company: "Ship Booking Inc",
      model: null,

      items: [
        { icon: 'mdi-view-dashboard-outline', text: 'Dashboard', route: 'home'},
        { icon: 'mdi-ship-wheel', text: 'Ships', route: 'ships' },
        { icon: 'mdi-map-clock-outline', text: 'Cruises', route: 'cruises' },
        { icon: 'mdi-map-marker-path', text: 'Itineraries', route: 'itineraries' },
        { icon: 'mdi-image-multiple', text: 'Media', route: 'media' },
        { icon: 'mdi-cash-multiple', text: 'Orders', route: 'orders' },
        { icon: 'mdi-account-multiple-outline', text: 'Clients', route: 'clients' },
        { icon: 'mdi-cogs', text: 'Settings', route: 'settings' },
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     { icon: 'mdi-plus', text: 'Create label' },
        //   ],
        // },
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' },
        //   ],
        // },
        // { icon: 'mdi-settings', text: 'Settings', route: 'ships' },
        //
        // { icon: 'mdi-help-circle', text: 'Help', route: 'ships' },
        // { icon: 'mdi-cellphone-link', text: 'App downloads', route: 'ships' },
        // { icon: 'mdi-keyboard', text: 'Go to the old version', route: 'ships' },
      ],
    }
  },

  computed: {
    ...mapState(['barColor', 'barImage']),
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
  },

  watch: {
    kk :function (val) {
      console.log(val)
    }
  },

  methods: {
    navigateTo (routeName) {
      if(!routeName || this.$route.name == routeName) return
      this.$router.push({name: routeName}).catch(error => console.log(error))
    }
  },


}
</script>

  <style lang="sass">
    @import '~vuetify/src/styles/tools/_rtl.sass'

    #core-navigation-drawer
      .v-list-group__header.v-list-item--active:before
        opacity: .24

      .v-list-item
        &__icon--text,
        &__icon:first-child
          justify-content: center
          text-align: center
          width: 20px

          +ltr()
            margin-right: 24px
            margin-left: 12px !important

          +rtl()
            margin-left: 24px
            margin-right: 12px !important

      .v-list--dense
        .v-list-item
          &__icon--text,
          &__icon:first-child
            margin-top: 10px

      .v-list-group--sub-group
        .v-list-item
          +ltr()
            padding-left: 8px

          +rtl()
            padding-right: 8px

        .v-list-group__header
          +ltr()
            padding-right: 0

          +rtl()
            padding-right: 0

          .v-list-item__icon--text
            margin-top: 19px
            order: 0

          .v-list-group__header__prepend-icon
            order: 2

            +ltr()
              margin-right: 8px

            +rtl()
              margin-left: 8px
  </style>
