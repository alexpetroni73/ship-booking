<script>
import EditStateMixin from '@/mixins/EditStateMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import * as utils from '@/utils'

export default {
  name: '',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [EditStateMixin, ErrorMixin],

  model: {
    prop: 'id',
    event: 'change'
  },

  props: {
    id: {
      required: true,
    },

    busName: {
      type: String,
    },


  },

  data () {
    return {
      editedItem: this.getDefaultItem(),
      isLoading: false,

      // to be overwritten in component
      gqlQueries: {
        create: null,
        read: null,
        update: null,
        delete: null,
      },

      bus: utils.bus,
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
    getDefaultItem () {
      throw new Error ("getDefaultItem() should be overwritten in component")
    },

    updateEditedItem (id) {
      id ? this.loadItem() : this.setNewItem()
    },

    setNewItem () {
      this.clearError()
      this.isLoading = false
      this.editedItem = this.getDefaultItem()
      this.setAddNewState()
      this.busEmit('item-loaded', null)
    },

    async loadItem (emit = 'item-loaded') {
      this.clearError()
      this.isLoading = true
      try{
        let result = await this.loadCurrentItem()
        if(!result) {
          return this.itemError(`No item found for ${this.id}`)
        }
        this.editedItem = result
        this.setEditState()
          // console.log('.... itemLoaded  %o', this.editedItem)
        if(emit){
          this.$emit(emit, this.editedItem)
        }
        this.busEmit('item-loaded', this.id)
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
        let result = await this.createFromCurrentItem()
        let id = this.extractCreatedItemId(result)
        if(id){
          this.$emit('item-created', id)
          this.busEmit('item-created', id)
          this.$emit('change', id)
        }else{
          this.itemError("No item key provided in addItem() result.)")
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
        this.editedItem = await this.updateCurrentItem()
        this.setEditState()

        this.$emit('item-updated', this.id)
        this.busEmit('item-updated', this.id)
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
        await this.deleteCurrentItem()
        this.$emit('item-deleted', this.id)
        this.busEmit('item-deleted', this.id)
        this.$emit('change', null)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    // ------------------------- ApolloGraphQl -------------------------
    async loadCurrentItem () {
      if(!this.gqlQueries.read) { throw new Error('No graphql read query defined!')}

      let result = await this.$apollo.query({
        query: this.gqlQueries.read,
        variables: this.queryLoadVariables()
      })

      return this.parseLoadedItem(result.data)
    },

    async createFromCurrentItem () {
      if(!this.gqlQueries.create) { throw new Error('No create graphql mutation defined!')}

      let result = await this.$apollo.mutate({
        mutation: this.gqlQueries.create,
        variables: this.queryCreateVariables(),
      })

      return this.parseCreateItemResult(result.data)
    },

    async updateCurrentItem () {
      if(!this.gqlQueries.update) { throw new Error('No update graphql mutation defined!')}

      let result = await this.$apollo.mutate({
        mutation: this.gqlQueries.update,
        variables: this.queryUpdateVariables(),
      })

      return this.parseUpdateItemResult(result.data)
    },

    async deleteCurrentItem () {
      if(!this.gqlQueries.delete) { throw new Error('No delete graphql mutation defined!')}

      let result = await this.$apollo.mutate({
        mutation: this.gqlQueries.delete,
        variables: this.queryDeleteVariables(),
      })

      return this.parseDeleteItemResult(result.data)
    },

    reloadItem () {
      this.updateEditedItem(this.id)
    },

    addNewItem () {
      this.$emit('add-new-item')
    },

    itemError (msg) {
      this.setError(msg)
      this.$emit('error', msg)
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
    parseLoadedItem (data) {
      let resultObj = utils.objectSingleProperty(data)
      return utils.isAnObject(resultObj) ? this.removeTypenameFromInput(utils.jsonCopy(resultObj)) : resultObj
    },

    parseCreateItemResult (data) {
      return this.parseLoadedItem(data)
    },

    parseUpdateItemResult (data) {
      return this.parseLoadedItem(data)
    },

    parseDeleteItemResult (data) {
      return this.parseLoadedItem(data)
    },

    // hook for parsing editedItem for input
    // default accept only the fields as the 'defaultItem'
    parseItemForInput (item) {
      return utils.filterObject(item, this.filterInputObject)
    },

    filterInputObject (value, prop) {
      let defaultProps = Object.keys(this.getDefaultItem())
      return defaultProps.indexOf(prop) != -1
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

    extractCreatedItemId (result) {
      return this.extractItemKey(result)
    },

    busEmit (event, val) {
      if(this.busName) {
        this.bus.$emit(this.busName + '-' + event, val)
      }
    },

    removeTypenameFromInput (input) {
      return utils.deleteObjField(input, '__typename')
    },
  },
}

</script>
