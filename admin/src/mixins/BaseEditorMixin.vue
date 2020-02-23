<script>
import EditStateMixin from '@/mixins/EditStateMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import * as utils from '@/utils'

export default {
  mixins: [EditStateMixin, ErrorMixin],

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
      bus: utils.bus,
    }
  },

  methods: {
    getDefaultItem () {
      throw new Error ("getDefaultItem() should be overwritten in component")
    },

    // to be rewrite for cases where parentId is needed etc.
    itemKey () {
      return { id: this.id }
    },

    busEmit (event, val) {
      if(this.busName) {
        this.bus.$emit(this.busName + '-' + event, val)
      }
    },

    removeTypenameFromInput (input) {
      return utils.deleteObjField(input, '__typename')
    },

    itemError (msg) {
      this.setError(msg)
      this.$emit('error', msg)
    },

    notifiy(event, value){
      this.$emit(event, value)
      this.busEmit(event, value)
    },

    // return an object that contain only the fields that are specified in defaultItem with values (if exists) from the 'item'
    parseItemToConformDefaultModel (item) {
      return utils.isAnObject(item) ? utils.mergeObjectsToLeft(this.getDefaultItem(), item) : item
    },

    // hook for parsing editedItem for input
    parseItemForInput (item) {
      return item
    },
  },


}
</script>
