<template>
  <ShipCabinsForm
  :item="editedItem"
  :formState="formState"
  :error="error"
  :loading="loading"
  v-on="pipeUpEvents('update-item')"
  />
</template>

<script>
import FormMixin from '@/mixins/FormMixin'
import { pipeEvents } from '@/utils'
// import FormSubmitButtons from '@/components/shared/FormSubmitButtons'
import ShipCabinsForm from '@/components/forms/ShipCabinsForm'

export default {
  mixins: [ FormMixin ],

  components: {
    ShipCabinsForm,
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    getDefaultItem () {
      return {
        cabins: [],
        cabinsText: '',
      }
    },

    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },

  },


}
</script>
