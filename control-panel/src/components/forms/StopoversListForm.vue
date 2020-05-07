<template>
  <div>
    <v-toolbar
    color="white elevation-1"
     >
     <v-spacer></v-spacer>
     <v-toolbar-title>{{ listTitle }}</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-btn
      fab
      small
      dark
      color="primary"
      @click="$emit('new-item')">
      <v-icon small>mdi-plus</v-icon>
    </v-btn>
   </v-toolbar>
   <v-container>
     <v-row>
       <v-col
       v-if="hasStopovers"
       cols="12"
       >
      <v-list>
        <draggable v-model="editedItem" handle=".handle" @change="onReorder">
        <v-list-item
        v-for="(item, index) in editedItem"
        :key="index"
        >

        <v-list-item-icon>
          <v-btn
          fab
          small
          color="primary"
          @click="editItem(index)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
          <v-btn
            v-if="isReordable"
            title="Drag to reorder"
            icon
            class="handle"
          >
            <v-icon>mdi-drag-vertical</v-icon>
          </v-btn>
        </v-list-item-avatar>
        </v-list-item>
        </draggable>
      </v-list>


       </v-col>

       <!-- <v-col
       v-else
       class="text-center pa-12"
       >
         No stopovers yet. Click on "+" button to add one.
       </v-col> -->

       <v-col v-else>
         <NoData
           title="No stopovers yet."
         />
       </v-col>

     </v-row>
   </v-container>
  </div>
</template>

<script>
import FormMixin from '@/mixins/FormMixin'
import draggable from 'vuedraggable'
import NoData from '@common/components/NoData'

export default {
  name: '',

  components: {
    draggable,
    NoData,
  },

  model: {

  },

  mixins: [ FormMixin ],

  data () {
    return {
      listTitle: "Stopovers",
    }
  },

  computed: {
    hasStopovers () {
      return this.editedItem && Array.isArray(this.editedItem) && this.editedItem.length
    },

    isReordable () {
      return this.hasStopovers && this.editedItem.length > 1
    },
  },

  watch: {
  },

  methods: {
    editItem (index) {
      this.$emit('edit-item', index)
    },

    onReorder () {
      this.$emit('reorder-list', this.editedItem)
    },
  },


}
</script>
