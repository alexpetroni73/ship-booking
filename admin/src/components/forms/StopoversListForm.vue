<template>
  <div>
    <v-toolbar
    color="white elevation-1"
     >
     <v-spacer></v-spacer>
     <v-toolbar-title>{{ listTitle }}</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-btn @click="$emit('new-item')">+</v-btn>
   </v-toolbar>
   <v-container>
     <v-row>
       <v-col
       v-if="hasStopovers"
       cols="12"
       >

      <v-list>
        <v-list-item
        v-for="(s, index) in item"
        :key="index"
        >
        <v-list-item-content>
          <v-list-item-title v-text="s.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon color="pink" @click="editItem(index)">mdi-pencil</v-icon>
        </v-list-item-icon>
        </v-list-item>
      </v-list>

       </v-col>

       <v-col
       v-else
       class="text-center pa-12"
       >
         No stopovers yet. Click on "+" button to add one.
       </v-col>

     </v-row>
   </v-container>
  </div>
</template>

<script>
import FormMixin from '@/mixins/FormMixin'

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

  mixins: [ FormMixin ],

  model: {

  },

  props: {

  },

  data () {
    return {
      listTitle: "Stopovers",
    }
  },

  computed: {
    hasStopovers () {
      return this.item && Array.isArray(this.item) && this.item.length
    },

  },

  watch: {

  },

  methods: {
    editItem (index) {
      this.$emit('edit-item', index)
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
