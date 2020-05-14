<template>
  <v-card
  max-width="600"
  class="mx-auto">
    <!-- <v-toolbar
    color="white elevation-1"
     >
     <v-spacer></v-spacer>
     <v-toolbar-title>{{ item.name }}</v-toolbar-title>
     <v-spacer></v-spacer>
   </v-toolbar> -->

   <v-card-title>
     {{ item.name }}
   </v-card-title>
   <v-card class="mx-auto" max-width="450" flat >
   <v-container>
     <v-row>
       <v-col xs="12" sm="9">
       <v-text-field
         label="New Feature"
         v-model="newFeature"
         @keyup.enter="addItem"
       ></v-text-field>
      </v-col>
        <v-col xs="12" sm="3">
          <v-btn
          color="primary"
          :disabled="!validNewItem"
          @click="addItem"
          class="ma-3"
          >
          Add
        </v-btn>
        </v-col>
     </v-row>
   </v-container>
    </v-card>
   <v-container>
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

       <!-- <v-col cols="12">
         <FormSubmitButtons
         :formState="formState"
         @update-item="updateItem"
         @create-item="createItem"
         />
       </v-col> -->
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


   <v-dialog
     v-model="editorDialog"
     width="450"
   >
     <v-card>
       <v-card-title>
         Feature Edit
       </v-card-title>
       <v-card-text>
          <v-text-field
           v-model="editedFeature.name"
           label="Feature Name"
          >
          </v-text-field>
       </v-card-text>

       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn
           color="primary"
           text
           @click="onDialogCancel"
         >
          Cancel
         </v-btn>

         <v-btn
           color="primary"
           text
           @click="onDialogConfirm"
           :disabled="!editedFeature.name"
         >
           Update
         </v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>


 </v-card>
</template>

<script>
import FormMixin from '@common/mixins/FormMixin'
import draggable from 'vuedraggable'
import NoData from '@common/components/NoData'
// import FormSubmitButtons from '@common/components/FormSubmitButtons'

import { jsonCopy } from '@common/utils'

export default {
  name: '',

  components: {
    draggable,
    NoData,
    // FormSubmitButtons,
  },

  mixins: [ FormMixin ],

  data () {
    return {
      newFeature: '',
      editorDialog: false,
      editedFeature: {},
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
      if(!this.hasItems || !this.editedItem.items[index]) return
      this.editedFeature = jsonCopy(this.editedItem.items[index])
      this.editedFeature.index = index
      this.editorDialog = true
    },

    onReorder () {
      this.$emit('update-item', this.editedItem)
    },

    addItem () {
      if(!this.validNewItem ) return
      this.validNewItem = this.validNewItem.trim()
      let indexExists = this.editedItem.items.findIndex(e => e.name == this.newFeature)
      if(indexExists != -1){
        this.editedItem.items.splice(indexExists, 1)
      }
      this.editedItem.items.push({name: this.newFeature, slug: this.newFeature})
      this.newFeature = ''
      this.$emit('update-item', this.editedItem)
    },

    onDialogCancel () {
      this.editorDialog = false
    },

    onDialogConfirm () {
      this.editedItem.items.splice(this.editedFeature.index, 1, {name: this.editedFeature.name, slug: this.editedFeature.slug })
      this.editedFeature = {}
      this.editorDialog = false
      this.$emit('update-item', this.editedItem)
    },
  },


}
</script>
