<template>
  <v-card>
    <FormTopBar
    title="xx"
    :menuItems="[]"
    :formState="formState"
    v-on="formEvents"
    />

    <v-container>
     <v-row>
       <v-col
       cols="12"
       >
         <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
       </v-col>

       <v-col
       cols="12"
       >
         <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
       </v-col>
     </v-row>


     <FormSubmitButtons
     :formState="formState"
     @update-item="updateItem"
     @create-item="createItem"
     :btnTextAdd="btnTextAdd"
     :btnTextUpdate="btnTextUpdate"
     />

    </v-container>
  </v-card>

</template>


<script>
import FormMixin from '@common/mixins/FormMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {

  props: {
    btnTextAdd: {
      type: String,
      default: "Add Feature"
    },

    btnTextUpdate: {
      type: String,
      default: "Update Feature"
    },
  },

  model: {
    prop: 'item',
    event: 'change'
  },

  mixins: [ FormMixin ],

  components: {
    FormTopBar,
    FormSubmitButtons,
  },

  computed: {
    hasStopovers () {
      return this.item && Array.isArray(this.item) && this.item.length
    }
  },

  methods: {
  },

}
</script>
