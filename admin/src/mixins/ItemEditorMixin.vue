<script>
import * as utils from '@/utils'
import BaseEditorMixin from '@/mixins/BaseEditorMixin'

export default {
  mixins: [BaseEditorMixin],

  props: {
    reloadAfterUpdate: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      item: null, // original item, null for a new item

      // to be overwritten in component
      gqlQueries: {
        create: null,
        read: null,
        update: null,
        delete: null,
      },
    }
  },

  computed: {

  },

  watch: {
    'id': {
      handler (val) {
        this.updateEditedItem(val)
      },
      immediate: true
    }
  },

  methods: {
    updateEditedItem (id) {
      id ? this.loadItem() : this.setNewItem()
    },

    setNewItem () {
      this.clearError()
      this.isLoading = false
      this.item = null
      this.editedItem = this.getDefaultItem()
      this.setAddNewState()
      this.notifiy('item-changed', null)
    },

    async loadItem () {
      this.clearError()
      this.isLoading = true
      try{
        let result = await this.apolloLoadCurrentItem()
        this.handleLoadResult(result.data)
          // console.log('.... itemLoaded  %o', this.editedItem)
        this.notifiy('item-changed', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    async createItem () {
      this.clearError()
      this.isLoading = true
      try{
        let result = await this.apolloCreateFromCurrentItem()
        let id = this.extractCreatedItemId(result.data)
        if(id){
          this.notifiy('item-created', id)
        }else{
          throw new Error("No item key provided in addItem() result.")
        }
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    async updateItem () {
      this.clearError()
      this.isLoading = true
      try{
        let result = await this.apolloUpdateCurrentItem()
        this.handleUpdateResult(result.data)
        this.notifiy('item-updated', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    async deleteItem () {
      this.clearError()
      this.isLoading = true
      try{
        await this.apolloDeleteCurrentItem()
        this.notifiy('item-deleted', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    // ------------------------- ApolloGraphQl -------------------------
    async apolloLoadCurrentItem () {
      if(!this.gqlQueries.read) { throw new Error('No graphql read query defined!')}

      return await this.$apollo.query({
        query: this.gqlQueries.read,
        variables: this.queryLoadVariables()
      })
    },

    async apolloCreateFromCurrentItem () {
      if(!this.gqlQueries.create) { throw new Error('No create graphql mutation defined!')}

      return await this.$apollo.mutate({
        mutation: this.gqlQueries.create,
        variables: this.queryCreateVariables(),
      })
    },

    async apolloUpdateCurrentItem () {
      if(!this.gqlQueries.update) { throw new Error('No update graphql mutation defined!')}
      console.log('this.queryUpdateVariables()  %o ', this.queryUpdateVariables())
      return await this.$apollo.mutate({
        mutation: this.gqlQueries.update,
        variables: this.queryUpdateVariables(),
      })
    },

    async apolloDeleteCurrentItem () {
      if(!this.gqlQueries.delete) { throw new Error('No delete graphql mutation defined!')}

      return await this.$apollo.mutate({
        mutation: this.gqlQueries.delete,
        variables: this.queryDeleteVariables(),
      })
    },

    // ------------------------- Apollo result handlers -------------------------
    handleLoadResult (data) {
      let resultObj = utils.objectSingleProperty(data)
      if(!resultObj) {
        throw new Error(`No item found for ${this.id}`)
      }
      this.item = resultObj
      this.editedItem = this.parseLoadedItem(resultObj)
      this.setEditState()
    },

    handleUpdateResult (data) {
      let resultObj = utils.objectSingleProperty(data)
      if(!resultObj) {
        throw new Error(`Empty result on update ${this.id}`)
      }

      if(this.reloadAfterUpdate){
        this.reloadItem()
      }else{
        this.item = resultObj
        this.editedItem = this.parseUpdateItemResult(resultObj)
        // this.setEditState()
      }
    },
    // -------------------------   -------------------------

    reloadItem () {
      this.updateEditedItem(this.id)
    },

    addNewItem () {
      this.$emit('add-new-item')
    },

    // ------------------------- Hooks -------------------------
    // to be rewrite for cases where parentId is needed etc.
    itemKey () {
      return { id: this.id }
    },

    extractItemKey (item) {
      return item ? item.id : null
    },

    // hook for loaded items
    parseLoadedItem (item) {
      return this.parseItemToConformDefaultModel(item)
    },

    parseCreateItemResult (item) {
      return this.parseItemToConformDefaultModel(item)
    },

    parseUpdateItemResult (item) {
      return this.parseItemToConformDefaultModel(item)
    },

    // ------------------------- GraphQl query/mutations variables Hooks -------------------------
    queryLoadVariables () {
      return this.itemKey()
    },

    queryCreateVariables () {
      return Object.assign(
        {},
        {input: this.parseItemForInput(this.editedItem)},
      )
    },

    queryUpdateVariables () {
      return Object.assign(
        {},
        {input: this.parseItemForInput(this.editedItem)},
        this.itemKey()
      )
    },

    queryDeleteVariables () {
      return this.itemKey()
    },

    extractCreatedItemId (data) {
      let item = utils.objectSingleProperty(data)
      return this.extractItemKey(item)
    },
  },
}

</script>
