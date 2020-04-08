<template>
    <div>
      <slot v-bind="{
        isNewForm,
        isEditForm,
        disableAddNewBtn,
        disableReloadBtn,
        disableDeleteBtn,
        title,
        formState,
        name,
        error,
        hideAddNewBtn,
        hideReloadBtn,
        hideDeleteBtn,
        btnColor,
        editTitle,
        addNewTitle,
        requireDeleteConfirmation,
        deleteConfirmationMsg,
      }">
        <v-toolbar
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
              :title="addNewTitle"
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

      <slot name="error-display" v-bind="{error}">
          <BaseError
            :error="error"
          />
      </slot>

      <ConfirmationDialog
      :confirmDialog="showConfirmDialog"
      :confirmationMsg="deleteConfirmationMsg"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      >
      </ConfirmationDialog>

    </div>
</template>

<script>

import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import BaseError from '@/components/shared/BaseError'

import {
  FormState,
  isNewForm,
  isEditForm,
  } from '@/utils'

export default {
  name: '',

  components: {
    ConfirmationDialog,
    BaseError,
  },

  props: {
    formState: {
      type: String,
      default: FormState.NEW
    },

    name: { // name of the edited item
      type: String,
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

    editTitle: {
      type: String,
      default: 'Edit'
    },

    addNewTitle: {
      type: String,
      default: 'Add New'
    },

    requireDeleteConfirmation: {
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
    isNewForm () {
      return isNewForm(this.formState)
    },

    isEditForm () {
      return isEditForm(this.formState)
    },

    disableAddNewBtn () {
      return this.isNewForm
    },

    disableReloadBtn () {
      return false
    },

    disableDeleteBtn () {
      return this.isNewForm
    },

    title () {
      if(isEditForm(this.formState)){
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
      this.$emit('new-item')
    },

    onDelete () {
      this.requireDeleteConfirmation ? this.showConfirmDialog = true : this.$emit('delete-item')
    },

    onReload () {
      this.$emit('reload-item')
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
