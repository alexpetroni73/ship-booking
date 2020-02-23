<script>
// import * as utils from '@/utils'
import BaseEditorMixin from '@/mixins/BaseEditorMixin'

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

  mixins: [BaseEditorMixin],

  props: {
    item: {
      required: true,
    },
  },

  data () {
    return {
      // to be provided in component
      gqlUpdateQuery: null,
    }
  },

  computed: {

  },

  watch: {
    'item': {
      handler (val) {
        this.syncEditedItem(val)
      },
      immediate: true
    }
  },

  methods: {
    syncEditedItem (item) {
      item ? this.parseParentItem() : this.setDefaultItem()
    },

    async updateItem () {
      this.clearError()
      this.isLoading = true
      try{
        let result = await this.apolloUpdateCurrentItem()
        console.log('updateItem result %o', result)
        this.notifiy('item-updated', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    // ------------------------- ApolloGraphQl -------------------------
    async apolloUpdateCurrentItem () {
      if(!this.gqlUpdateQuery) { throw new Error('No update graphql mutation defined!')}

      return await this.$apollo.mutate({
        mutation: this.gqlUpdateQuery,
        variables: this.queryUpdateVariables(),
      })
    },

    // -------------------------   -------------------------

    reloadItem () {
      this.syncEditedItem(this.id)
    },

    setDefaultItem () {
      this.editedItem = this.getDefaultItem()
    },

    parseParentItem () {
      this.editedItem = this.parseItemToConformDefaultModel(this.getDefaultItem(), this.item)
    },

    // ------------------------- Hooks -------------------------

    // hook for updated item

    // parseUpdateItemResult (item) {
    //   return this.parseItemToConformDefaultModel(item)
    // },


    // ------------------------- GraphQl query/mutations variables Hooks -------------------------

    queryUpdateVariables () {
      return Object.assign(
        {},
        {input: this.parseItemForInput(this.editedItem)},
        this.itemKey()
      )
    },
  },
}

</script>
