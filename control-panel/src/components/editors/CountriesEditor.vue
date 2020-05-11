<template>
  <CountriesFormModel
  id="cabin-features"
  name="Countries"
  v-slot="{item, modelState, formEvents}"
  >
    <CountriesForm
    :item="item"
    v-bind="modelState"
    v-on="formEvents"
    />
  </CountriesFormModel>
</template>

<script>
import CountriesForm from '@/components/forms/CountriesForm'
import CountriesFormModel from '@/components/models/CountriesFormModel'

export default {
  name: '',

  components: {
    CountriesFormModel,
    CountriesForm,
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
