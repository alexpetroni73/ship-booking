// FormMixin
import { jsonCopy, FormState } from '@/utils'

export default {
  props: {
    item: {
      type: Object,
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
    }
  },

  data: function () {
    return {
      editedItem: jsonCopy(this.item)
    }
  },

  computed: {
    editorWrapperBind () {
      return {
        formState: this.formState,
        error: this.error,
      }
    },

    editorWrapperEvents () {
      return  {
        'create-item': this.createItem,
        'update-item': this.updateItem,
        'delete-item': this.deleteItem,
        'reload-item': this.reloadItem,
        'new-item': this.newItem,
      }
    }
  },

  methods: {
    createItem () {
      this.$emit('create-item', this.editedItem)
    },

    updateItem () {
      console.log('updateItem %o', this.editedItem)
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
  },

  watch: {
    item: function (val) {
        this.editedItem = jsonCopy(val)
    },
  }
}
