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
      type: [String, Array],
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

    eventBus () {
      return utils.EventBus
    }
  },

  methods: {
    getDefaultItem () {
      throw new Error ("getDefaultItem() should be overwritten in component")
    },


    itemKey () {
      return this.parentKey() ? { id: this.id , ... this.parentKey() } : { id: this.id }
    },

    // hook that can be rewriten for cases when parentId document is needed
    parentKey () {
      return null
    },

    extractItemKey (item) {
      return item ? item.id : null
    },

    eventBusEmit (event, val) {
      if(this.busEventName) {
        if(Array.isArray(this.busEventName)){
          this.busEventName.forEach(e => utils.EventBus.$emit(e + '-' + event, val))
        }else{
          utils.EventBus.$emit(this.busEventName + '-' + event, val)
          console.log('~~~~~ utils.EventBus ~~~~~ %s', this.busEventName + '-' + event)
        }
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
