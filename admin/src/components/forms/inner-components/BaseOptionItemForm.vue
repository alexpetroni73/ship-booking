<template>
  <v-card flat>
      <v-text-field
         label="Name"
         :v-model="editedItem.name"
       ></v-text-field>

       <v-card-actions>
         <FormSubmitButtons
         :formState="formState"
         @update-item="updateItem"
         @create-item="createItem"
         :disabled="!enableSubmit"
         />
      </v-card-actions>
  </v-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  name: '',

  components: {
    FormSubmitButtons,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [
    FormItemMixin,
  ],

  model: {

  },

  props: {

  },

  data () {
    return {

    }
  },

  computed: {
    enableSubmit () {
      return true
    }
  },

  watch: {

  },

  methods: {

  },


}
</script>
