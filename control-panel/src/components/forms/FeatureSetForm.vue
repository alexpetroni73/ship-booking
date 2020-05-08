<template>
  <v-card
  max-width="600"
  class="mx-auto">
    <v-toolbar
    color="white elevation-1"
     >
     <v-spacer></v-spacer>
     <v-toolbar-title>{{ item.name }}</v-toolbar-title>
     <v-spacer></v-spacer>
   </v-toolbar>
   <v-container>
     <v-row>
       <v-col xs="12" sm="8">
       <v-text-field
         label="New Feature"
         v-model="newFeature"
         @keyup.enter="addItem"
       ></v-text-field>
      </v-col>
        <v-col xs="12" sm="4">
          <v-btn
          color="primary"
          :disabled="!validNewItem"
          @click="addItem"
          >
          Add
        </v-btn>
        </v-col>
     </v-row>
     <v-row v-if="hasItems">
       <v-col
       cols="12"
       >
      <v-list>
        <draggable v-model="editedItem.items" handle=".handle" @change="onReorder">
        <v-list-item
        v-for="(item, index) in editedItem.items"
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
          <v-list-item-title v-text="item.name"></v-list-item-title>
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

       <v-col cols="12">
         <FormSubmitButtons
         :formState="formState"
         @update-item="updateItem"
         @create-item="createItem"
         />
       </v-col>
     </v-row>


     <v-row  v-else>
       <v-col>
         <NoData
           title="No features yet."
           :subtitle="false"
         />
       </v-col>
     </v-row>
   </v-container>
 </v-card>
</template>

<script>
import FormMixin from '@common/mixins/FormMixin'
import draggable from 'vuedraggable'
import NoData from '@common/components/NoData'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  name: '',

  components: {
    draggable,
    NoData,
    FormSubmitButtons,
  },

  mixins: [ FormMixin ],

  data () {
    return {
      newFeature: '',
    }
  },

  computed: {
    hasItems () {
      return this.editedItem && Array.isArray(this.editedItem.items) && this.editedItem.items.length
    },

    isReordable () {
      return this.hasItems && this.editedItem.items.length > 1
    },

    validNewItem () {
      return this.newFeature && this.newFeature.trim()
    }
  },

  methods: {
    editItem (index) {
      this.$emit('edit-item', index)
    },

    onReorder () {
      this.$emit('reorder-list', this.editedItem)
    },

    addItem () {
      if(!this.validNewItem ) return
      let indexExists = this.editedItem.items.findIndex(e => e.name == this.newFeature)
      if(indexExists != -1){
        this.editedItem.items.splice(indexExists, 1)
      }
      this.editedItem.items.push({name: this.newFeature, slug: this.newFeature})
      this.newFeature = ''
    },
  },


}
</script>
