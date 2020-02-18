<template>
    <v-container fluid>
      <slot name="top">
        <v-toolbar
        v-if="showToolbar"
        color="white elevation-1"
         >
              <v-icon
              v-if="!hideAddNewBtn"
              :disabled="disableAddNewBtn"
              @click="onAddNew()"
              class="mx-2"
              small
              :color="btnColor"
              left
              title="Add new"
              >
              mdi-plus
            </v-icon>

            <v-spacer></v-spacer>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>

              <v-icon
              v-if="!hideReloadBtn"
              @click="onReload()"
              :disabled="disableReloadBtn"
              class="mx-2"
              small
              :color="btnColor"
              right
              title="Reload"
              >
              mdi-reload
              </v-icon>

             <v-icon
             v-if="!hideDeleteBtn"
             :disabled="disableDeleteBtn"
             @click="onDelete()"
             class="mx-2"
             small
             :color="btnColor"
             right
             title="Delete"
             >
             mdi-delete
           </v-icon>

        </v-toolbar>
      </slot>

      <v-row v-if="error">
        <v-col
        sm="12"
        >
        <v-alert type="error">
          {{ error }}
        </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col
        sm="12"
        >
          <slot>
            form editor
          </slot>
        </v-col>
      </v-row>

      <v-row v-if="showActionButtons">
        <v-col
        sm="12"
        class="text-center"
        >
          <slot name="bottom">
            <v-btn
            v-if="isEditState"
            @click="onUpdate()"
            :color="btnColor"
            :disabled="disableSubmitBtn"
            >
              Update
            </v-btn>

            <v-btn
            v-else
            @click="onCreate()"
            :color="btnColor"
            :disabled="disableSubmitBtn"
            >
              Add
            </v-btn>
          </slot>
        </v-col>
      </v-row>

      <ConfirmationDialog
      :confirmDialog="showConfirmDialog"
      :confirmationMsg="deleteConfirmationMsg"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      >
      </ConfirmationDialog>

    </v-container>
</template>

<script>

import ConfirmationDialog from '@/components/shared/ConfirmationDialog';

import {
  EditState,
  isAddNewState,
  isEditState,
  } from '@/utils'

export default {
  name: '',

  components: {
    ConfirmationDialog,
  },

  props: {
    editState: {
      type: String,
      default: EditState.NEW
    },

    disableSubmitBtn: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
    },

    hideAddNewBtn: {
      type: Boolean,
    },

    hideReloadBtn: {
      type: Boolean,
    },

    hideDeleteBtn: {
      type: Boolean,
    },

    btnColor: {
      type: String,
      default: 'primary'
    },

    showToolbar: {
      type: Boolean,
      default: true
    },

    showActionButtons: {
      type: Boolean,
      default: true
    },

    editTitle: {
      type: String,
      default: 'Edit'
    },

    addNewTitle: {
      type: String,
      default: 'Add New'
    },

    name: {
      type: String,
    },

    requireDeleteConfiramtion: {
      type: Boolean,
      default: true,
    },

    deleteConfirmationMsg: {
      type: String,
      default: "Do you want to delete this item?"
    }

  },

  data () {
    return {
      showConfirmDialog: false,
    }
  },

  computed: {
    isAddNewState () {
      return isAddNewState(this.editState)
    },

    isEditState () {
      return isEditState(this.editState)
    },

    disableAddNewBtn () {
      return this.isAddNewState
    },

    disableReloadBtn () {
      return false
    },

    disableDeleteBtn () {
      return this.isAddNewState
    },

    title () {
      if(isEditState(this.editState)){
        return this.name ? this.editTitle + ' ' + this.name : this.editTitle
      }else{
        return this.addNewTitle
      }
    },
  },

  watch: {

  },

  methods: {
    onAddNew () {
      this.$emit('add-new-item')
    },

    onDelete () {
      this.requireDeleteConfiramtion ? this.showConfirmDialog = true : this.$emit('delete-item')
    },

    onReload () {
      this.$emit('reload-item')
    },

    onCreate () {
      this.$emit('create-item')
    },

    onUpdate () {
      this.$emit('update-item')
    },

    closeConfirmDeleteDialog () {
      this.showConfirmDialog = false
    },

    confirmDelete () {
      this.closeConfirmDeleteDialog()
      this.$emit('delete-item')
    },

    cancelDelete () {
      this.closeConfirmDeleteDialog()
    }
  },


}
</script>
