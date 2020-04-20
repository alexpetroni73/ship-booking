<template>
  <div>
    <StopoversListForm
    v-if="isListView"
    :item="stopovers"
    @new-item="onAddNewItem"
    @edit-item="onEditItem"
    />

    <StopoverForm
    :item="editedItem"
    @cancel="setListView"
    @create-item="onCreateItem"
    @update-item="onUpdateItem"
    @delete-item="onDeleteItem"
    :formState="formState"
    v-else
    />
  </div>
</template>

<script>
import FormStateMixin from '@/mixins/FormStateMixin'
import StopoversListForm from '@/components/forms/StopoversListForm'
import StopoverForm from '@/components/forms/StopoverForm'

export default {
  name: '',

  components: {
    StopoversListForm,
    StopoverForm,
  },

  directives: {

  },

  filters: {

  },

  extends: {

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
    }
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
      console.log('this.editedItemIndex %s item %o', this.editedItemIndex, item)
      let updated = [...this.stopovers]
      updated.splice(this.editedItemIndex, 1, item)
      this.$emit('change', updated)
    },

    onDeleteItem () {
      console.log('onDeleteItem')
      let updated = [...this.stopovers]
      updated.splice(this.editedItemIndex, 1)
      this.$emit('change', updated)
    },

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
