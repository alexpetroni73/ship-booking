// FormItemMixin - provide basic properties for an item editing form
import { jsonCopy, FormState, isNewForm, isEditForm } from '@common/utils'

import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  props: {
    item: {
      type: [Object, Array],
      required: true,
    },

    formState: {
      type: String,
      default: FormState.NEW
    },

    loading: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: '',
    },
  },

  components: {
    ValidationProvider,
  },

  data: function () {
    return {
      editedItem: jsonCopy(this.item),
      valid: true,
    }
  },

  computed: {
    modelState () {
      return {
        formState: this.formState,
        error: this.error,
        loading: this.loading,
      }
    },

    formEvents () {
      return  {
        'create-item': this.createItem,
        'update-item': this.updateItem,
        'delete-item': this.deleteItem,
        'reload-item': this.reloadItem,
        'new-item': this.newItem,
        'cancel': this.cancel,
      }
    },

    isNewForm () {
      return isNewForm(this.formState)
    },

    isEditForm () {
      return isEditForm(this.formState)
    },
  },

  methods: {
    createItem () {
      if(!this.valid) {
        console.log('invalid')
        return this.$emit('invalid-form')
      }
      this.$emit('create-item', this.editedItem)
    },

    updateItem () {
      if(!this.valid) {
        console.log('invalid')
        return this.$emit('invalid-form')
      }
      console.log('update %o', this.editedItem)
      this.$emit('update-item', this.editedItem)
    },

    deleteItem () {
      this.$emit('delete-item')
    },

    reloadItem () {
      this.$emit('reload-item')
    },

    newItem () {
      this.$emit('new-item')
    },

    cancel () {
      this.$emit('cancel')
    },

    reset () {
      this.editedItem = jsonCopy(this.item)
    },
  },

  watch: {
    item: function (val) {
      this.editedItem = jsonCopy(val)
    },
  }
}
