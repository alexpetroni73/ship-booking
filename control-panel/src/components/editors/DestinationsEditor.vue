<template>
  <DestinationsFormModel
  id="cabin-features"
  name="Destinations"
  v-slot="{item, modelState, formEvents}"
  >
    <DestinationsForm
    :item="item"
    v-bind="modelState"
    v-on="formEvents"
    />
  </DestinationsFormModel>
</template>

<script>
import DestinationsForm from '@/components/forms/DestinationsForm'
import DestinationsFormModel from '@/components/models/DestinationsFormModel'

export default {
  name: '',

  components: {
    DestinationsFormModel,
    DestinationsForm,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {

  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
