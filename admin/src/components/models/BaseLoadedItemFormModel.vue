<script>
import BaseFormModelMixin from '@/mixins/BaseFormModelMixin'

export default {
  mixins: [ BaseFormModelMixin ],

  model: {
    prop: 'id',
    event: 'change'
  },

  props: {

  },

  data () {
    return {
      item: this.getDefaultItem()
    }
  },

  computed: {
    formEvents () {
      return {
        'create-item': this.onCreateItem,
        'update-item': this.onUpdateItem,
        'delete-item': this.onDeleteItem,
        'reload-item': this.onReloadItem,
        'new-item': this.onNewItem,
      }
    },
  },

  watch: {
    'id': {
      handler: function () { this.refreshItem() },
      immediate: true,
    }
  },

  methods: {
    // --------------- Async services that should be overwritten in components ---------------
    async createItem (item, key) {
      console.log('createItem item %o, key %o', item, key )
      throw new Error("createItem() should be overwritten in child component.")
    },

    async loadItem (key) {
      console.log('loadItem key %o', key )
      throw new Error("loadItem() should be overwritten in child component.")
    },

    async updateItem (item, key) {
      console.log('updateItem item %o, key %o', item, key )
      throw new Error("updateItem() should be overwritten in child component.")
    },

    async deleteItem (key) {
      console.log('deleteItem key %o', key )
      throw new Error("deleteItem() should be overwritten in child component.")
    },


    // --------------- Events listeners ---------------
    onNewItem () {
      console.log('onNewItem')
      this.$emit('new-item')
      this.$emit('change', null)
    },

    async onCreateItem (val) {
      console.log('onCreateItem %o', val)
      this.clearError()
      this.loading = true
      try{
        let result = await this.createItem(val, this.itemKey()) // item key is provided in case the item has a parent whos id should be provided
        let id = this.extractCreatedItemId(this.parseCreateResult(result))
        if(id){
          this.notifiy('item-created', id)
          this.$emit('change', id)
        }else{
          throw new Error("No item key provided in createItem result.")
        }
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    async onUpdateItem (val) {
      console.log('onUpdateItem %o', val)
      this.clearError()
      this.loading = true
      try{
        let result = await this.updateItem(val, this.itemKey())
        this.item = this.parseUpdateResult(result)
        this.notifiy('item-updated', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    async onDeleteItem () {
      console.log('onDeleteItem')
      this.clearError()
      this.loading = true
      try{
        await this.deleteItem(this.itemKey())
        this.notifiy('item-deleted', this.id)
        this.$emit('change', null)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    onReloadItem () {
      console.log('onReloadItem')
      this.refreshItem()
    },

    //
    async loadItemForCurrentId () {
      this.clearError()
      this.loading = true
      try{
        let result = await this.loadItem(this.itemKey())
        this.item = this.parseLoadResult(result)
          // console.log('.... itemLoaded  %o', this.editedItem)
        this.setEditFormState()
        this.notifiy('item-loaded', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    refreshItem () {
      this.id ? this.loadItemForCurrentId() : this.setDefaultItem()
    },

    setDefaultItem () {
      console.log('setDefaultItem')
      this.item = this.getDefaultItem()
      this.setNewFormState()
    },

    // --------------- Result parsers ---------------
    parseCreateResult (result) {
      return result
    },

    parseLoadResult (result) {
      return this.parseItemToMirrorDefaultModel(result)
    },

    parseUpdateResult (result) {
      return this.parseItemToMirrorDefaultModel(result)
    },

    // --------------- Helpers ---------------
    extractCreatedItemId (item) {
      return this.extractItemKey(item)
    },
  },

  render() {
      return this.$scopedSlots.default({
        item: this.item,
        modelState: this.modelState,
        formEvents: this.formEvents,
        error: this.error,
        loading: this.loading,
        formState: this.formState,
      })
    }
}
</script>
