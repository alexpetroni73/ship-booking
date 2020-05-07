<template>
  <div>
    <StopoversListForm
      v-if="isListView"
      :item="stopovers"
      @new-item="onAddNewItem"
      @edit-item="onEditItem"
      @reorder-list="onListReorder"
    />

    <StopoverForm
      v-else
      :item="editedItem"
      @cancel="setListView"
      @create-item="onCreateItem"
      @update-item="onUpdateItem"
      @delete-item="onDeleteItem"
      :formState="formState"
    />
  </div>
</template>

<script>
import FormStateMixin from '@/mixins/FormStateMixin'
import StopoversListForm from '@/components/forms/StopoversListForm'
import StopoverForm from '@/components/forms/StopoverForm'

export default {
  name: 'StopoversEditor',

  components: {
    StopoversListForm,
    StopoverForm,
  },

  mixins: [ FormStateMixin ],

  model: {
    prop: 'stopovers',
    event: 'change'
  },

  props: {
    stopovers: {
      type: Array,
      default: () => []
    },
  },

  data () {
    return {
      editedItem: this.getDefaultItem(),
      editedItemIndex: null,
      view: 'list'
    }
  },

  computed: {
    isListView () {
      return this.view == 'list'
    },
  },

  watch: {
    stopovers: function () {
      this.setListView()
    },
  },

  methods: {
    getDefaultItem () {
      return {
        title: '',
        description: '',
      }
    },

    setListView () {
      this.view = 'list'
    },

    setFormView () {
      this.view = 'form'
    },

    setNewEditedItem () {
      this.editedItem = this.getDefaultItem()
      this.editedItemIndex = null
      this.setNewFormState()
    },

    setEditedItem (index) {
      let item = this.stopovers[index]
      if(item) {
        this.editedItem = Object.assign({}, item)
        this.editedItemIndex = index
        this.setEditFormState()
        return true
      }

      return false
    },

    resetEditedItem () {
      this.setNewEditedItem()
    },

    //  ---- Events handlers ----

    onListReorder (list) {
      this.$emit('change', list)
    },

    onCreateItem (item) {
      this.$emit('change', [...this.stopovers, item])
    },

    onAddNewItem () {
      this.setNewEditedItem()
      this.setFormView()
    },

    onEditItem (index) {
      this.setEditedItem(index) ? this.setFormView() : this.setListView()
    },

    onUpdateItem (item) {
      let updated = [...this.stopovers]
      updated.splice(this.editedItemIndex, 1, item)
      this.$emit('change', updated)
    },

    onDeleteItem () {
      let updated = [...this.stopovers]
      updated.splice(this.editedItemIndex, 1)
      this.$emit('change', updated)
    },

  },

}
</script>
