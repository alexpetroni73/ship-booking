<template>
    <div>
      <slot name="top" v-bind="{
        isNewForm,
        isEditForm,
        disableAddNewBtn,
        disableReloadBtn,
        disableDeleteBtn,
        title,
        formState,
        disableSubmitBtn,
        name,
        error,
        hideAddNewBtn,
        hideReloadBtn,
        hideDeleteBtn,
        btnColor,
        showToolbar,
        showActionButtons,
        editTitle,
        addNewTitle,
        requireDeleteConfiramtion,
        deleteConfirmationMsg,
      }">
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

      <slot name="error-display" v-bind="{error}">
          <v-alert v-if="error" type="error">
            {{ error }}
          </v-alert>
      </slot>

      <slot>
        form editor
      </slot>


      <slot name="action-buttons" v-bind="{showActionButtons, formState, disableSubmitBtn, btnColor}">
        <FormSubmitButtons
          v-if="showActionButtons"
          :formState="formState"
          :btnColor="btnColor"
          :disabled="disableSubmitBtn"
          @create-item="onCreate"
          @update-item="onUpdate"
        >
        </FormSubmitButtons>
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
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'

import {
  FormState,
  isNewForm,
  isEditForm,
  } from '@/utils'

export default {
  name: '',

  components: {
    ConfirmationDialog,
    FormSubmitButtons,
  },

  props: {
    formState: {
      type: String,
      default: FormState.NEW
    },

    disableSubmitBtn: {
      type: Boolean,
      default: false,
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
