<script>
import * as utils from '@/utils'
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

    reloadAfterUpdate: {
      type: Boolean,
      default: false
    }

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
        this.updateEditedItem(val)
      },
      immediate: true
    }
  },

  methods: {
    updateEditedItem (item) {
      ? this.loadItem() : this.setNewItem()
    },

    async updateItem () {
      this.clearError()
      this.isLoading = true
      try{
        let result = await this.updateCurrentItem()
        this.notifiy('item-updated', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.isLoading = false
      }
    },

    // ------------------------- ApolloGraphQl -------------------------
    async updateCurrentItem () {
      if(!this.gqlUpdateQuery) { throw new Error('No update graphql mutation defined!')}

      return await this.$apollo.mutate({
        mutation: this.gqlUpdateQuery,
        variables: this.queryUpdateVariables(),
      })
    },

    // -------------------------   -------------------------

    reloadItem () {
      this.updateEditedItem(this.id)
    },

    // ------------------------- Hooks -------------------------

    // hook for updated item

    parseUpdateItemResult (item) {
      return utils.isAnObject(item) ? this.parseToConformDefaultModel(item) : item
    },


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
