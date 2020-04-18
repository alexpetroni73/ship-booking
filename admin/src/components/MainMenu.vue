<template>
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
</template>

<script>

export default {
  name: 'MainMenu',

  data () {
    return {
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
