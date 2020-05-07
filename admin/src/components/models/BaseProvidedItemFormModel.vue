<script>
import BaseFormModelMixin from '@common/mixins/BaseFormModelMixin'

export default {
  mixins: [ BaseFormModelMixin ],

  props: {
    item: {
      required: true,
    },
  },

  data () {
    return {

    }
  },

  computed: {
    formEvents () {
      return {
        'update-item': this.onUpdateItem,
      }
    },
  },

  methods: {
    // --------------- Async services that should be overwritten in components ---------------
    async updateItem (item, key) {
      console.log('updateItem item %o, key %o', item, key )
      throw new Error("updateItem() should be overwritten in child component.")
    },

    // --------------- Events listeners ---------------
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

    // --------------- Result parsers ---------------
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
        mData: this.mData,
        formEvents: this.formEvents,
      })
    }
}
</script>
