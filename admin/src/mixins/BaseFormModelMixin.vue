<script>
import FormStateMixin from '@/mixins/FormStateMixin'
import ErrorMixin from '@/mixins/ErrorMixin'
import * as utils from '@/utils'

export default {
  mixins: [FormStateMixin, ErrorMixin],

  props: {
    id: {
      type: String,
    },

    busEventName: {
      type: String,
    },
  },

  data () {
    return {
      loading: false,
    }
  },

  computed: {
    modelState () {
      return {
        error: this.error,
        loading: this.loading,
        formState: this.formState,
      }
    },
  },

  methods: {
    getDefaultItem () {
      throw new Error ("getDefaultItem() should be overwritten in component")
    },

    // hook that can be rewriten for cases when parentId is needed
    itemKey () {
      return { id: this.id }
    },

    extractItemKey (item) {
      return item ? item.id : null
    },

    eventBusEmit (event, val) {
      if(this.busEventName) {
        utils.EventBus.$emit(this.busEventName + '-' + event, val)
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
      this.eventBusEmit(event, value)
    },

    // return an object that contain only the fields that are specified in defaultItem with values (if exists) from the 'item'
    parseItemToMirrorDefaultModel (item) {
      return utils.isAnObject(item) ? utils.mergeObjectsToLeft(this.getDefaultItem(), item) : item
    },

    // hook for parsing editedItem for input
    parseItemForInput (item) {
      return item
    },
  },


}
</script>
