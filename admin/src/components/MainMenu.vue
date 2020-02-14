<template>
  <v-list dense>
     <template v-for="item in items">
       <v-row
         v-if="item.heading"
         :key="item.heading"
         align="center"
       >
         <v-col cols="6">
           <v-subheader v-if="item.heading">
             {{ item.heading }}
           </v-subheader>
         </v-col>
         <v-col
           cols="6"
           class="text-center"
         >
           <a
             href="#!"
             class="body-2 black--text"
           >EDIT</a>
         </v-col>
       </v-row>


       <v-list-item-group

         :key="item.route"
         v-model="kk"
         :prepend-icon="item.model ? item.icon : item['icon-alt']"
         append-icon=""
       >
         <!-- <template v-slot:activator v-if="item.children">
           <v-list-item-content @click="navigateTo(item.route)">
             <v-list-item-title>
               {{ item.text }}
             </v-list-item-title>
           </v-list-item-content>

         <v-list-item
           v-for="(child, i) in item.children"
           :key="i"
           link
         >
           <v-list-item-action v-if="child.icon">
             <v-icon>{{ child.icon }}</v-icon>
           </v-list-item-action>
           <v-list-item-content>
             <v-list-item-title>
               {{ child.text }}
             </v-list-item-title>
           </v-list-item-content>
         </v-list-item>
       </template> -->


         <v-list-item
           :key="item.text"
           link
         >
           <v-list-item-action>
             <v-icon>{{ item.icon }}</v-icon>
           </v-list-item-action>
           <v-list-item-content  @click="navigateTo(item.route)">
             <v-list-item-title>
               {{ item.text }}
             </v-list-item-title>
           </v-list-item-content>
         </v-list-item>


       </v-list-item-group>
     </template>
   </v-list>
</template>

<script>

export default {
  name: '',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: {

  },

  model: {

  },

  props: {

  },

  data () {
    return {
      kk: 0,

      items: [
        { icon: 'mdi-contacts', text: 'Ships', route: 'ships', heading: 'xxxx' },
        { icon: 'mdi-history', text: 'Cruises', route: 'cruises' },
        { icon: 'mdi-content-copy', text: 'Itineraries', route: 'itineraries' },
        { icon: 'mdi-message', text: 'Media', route: 'media' },
        { icon: 'mdi-message', text: 'Orders', route: 'orders' },
        { icon: 'mdi-message', text: 'Clients', route: 'clients' },
        { icon: 'mdi-settings', text: 'Settings', route: 'settings' },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
