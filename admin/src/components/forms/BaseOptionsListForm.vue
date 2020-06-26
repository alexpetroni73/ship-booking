<template>
  <v-container
    fluid
    tag="section"
  >
    <v-card
      max-width="650"
     class="mx-auto">
       <v-card-title>
         {{ title }} xx
       </v-card-title>

        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>

        <slot name="option-editor">
          <BaseOptionItemForm
          :item="editedOption"
          @createItem="onAddOption"
          />

        </slot>

          <v-row justify="center">
            <!-- VF Items form -->
            <template v-if="isEditForm">

            <v-col
            sm="12"
            >
            <v-card
            flat
            >
              <v-toolbar flat>
                <v-toolbar-title>{{ item.name }} Features</v-toolbar-title>
              </v-toolbar>



              <v-list v-if="hasItems">
                <draggable v-model="editedItem.items" handle=".handle" @change="onReorder">
                <v-list-item
                  v-for="(item, index) in editedItem.items"
                  :key="item.name"
                >

                  <v-list-item-icon>
                    <v-btn
                      v-if="isReordable"
                      title="Drag to reorder"
                      icon
                      class="handle"
                    >
                      <v-icon>mdi-drag-vertical</v-icon>
                    </v-btn>

                    <template v-if="isColorType">
                    <v-avatar size="28" :color="item.value" class="vfColor mt-2"></v-avatar>
                    </template>
                  </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>

                  <v-list-item-action>
                    <div>
                    <EditBtn @click="editOptionsItem(index)"/>
                    <DeleteBtn @click="deleteOptionItem(index)"/>
                  </div>
                  </v-list-item-action>

                </v-list-item>
                </draggable>
              </v-list>

                <div
                v-else
                class="text-center pa-6"
                >
                No options yet.
              </div>
            </v-card>
            </v-col>

            </template>

            <v-col
            cols="12"
            >
            <FormSubmitButtons
            :disabled="submitDisabled"
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            />
            </v-col>
          </v-row>

          <ConfirmationDialog
            v-model="deleteItemDialog"
            message="Do you want to delete this feature?"
            @confirm="onDeleteItemConfirm"
            @cancel="resetDeleteItemDialog"
          />
    </v-card>
</v-container>
</template>

<script>
import draggable from 'vuedraggable'
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import { FormState } from '@common/utils'
import EditBtn from '@common/components/btn/EditBtn'
import DeleteBtn from '@common/components/btn/DeleteBtn'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
import BaseOptionItemForm from '@/components/forms/inner-components/BaseOptionItemForm'

export default {
  mixins: [ FormItemMixin ],

  props: {
    title: {
      type: String,
      default: "title"
    }
  },

  components: {
    draggable,
    FormSubmitButtons,
    EditBtn,
    DeleteBtn,
    ConfirmationDialog,
    BaseOptionItemForm,
  },

  data () {
    return {
      editedOptionIndex: -1,
      editedOption: this.getDefaultOption(),
      OptionState: FormState.NEW,

      deleteItemDialog: false,
      deleteItemIndex: null,

      cha: 'yy',

      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 3 || 'Min 3 characters',
      },
    }
  },

  computed: {
    submitDisabled () {
      return false
    },

    hasItems () {
      return this.editedItem.items && this.editedItem.items.length
    },

    isReordable () {
      return this.editedItem.items.length > 1
    }
  },

  methods: {
    onAddOption (val) {
      val.name = val.name.trim()
      if(!val.name) return
      if(this.editedItem.items.find(e => e.name.toLowerCase() == val.name.toLowerCase())) {
        return alert("A feature with this name already exists.")
      }
      this.editedItem.items.push(val)
      this.setNewOption()
      this.updateItem()
    },

    onUpdateOption (val) {
      val.name = val.name.trim()
      if(!val.name) return
      if(this.editedItem.items.find((e, index) => e.name.toLowerCase() == val.name.toLowerCase() && index != this.editedOptionIndex)) {
        return alert("A feature with this name already exists.")
      }
      this.editedItem.items.splice(this.editedOptionIndex, 1, val)
      this.setNewOption()
      this.updateItem()
    },

    getDefaultOption () {
      return {
        value: '',
      }
    },

    setNewOption () {
      this.editedOptionIndex = -1
      this.editedOption = this.getDefaultOption()
      this.OptionState = FormState.NEW
    },

    onReorder () {
      this.$emit('reorder-list', this.editedItem)
    },

    editOptionsItem (index) {
      if(!this.hasItems || !this.editedItem.items[index]) return
      this.editedOptionIndex = index
      this.editedOption = this.editedItem.items[index]
      this.OptionState = FormState.EDIT
      this.$vuetify.goTo(this.$refs.vfEditor)
    },

    deleteOptionItem (index) {
      if(!this.hasItems || !this.editedItem.items[index]) return
      this.deleteItemIndex = index
      this.deleteItemDialog = true
    },

    onDeleteItemConfirm () {
      this.editedItem.items.splice(this.deleteItemIndex, 1)
    },

    resetDeleteItemDialog () {
      this.deleteItemIndex = null
    },
  },
}
</script>
<style lang="scss" scoped>
.vfColor {
  border: solid 1px;
  border-color: #757575 !important
}
</style>
