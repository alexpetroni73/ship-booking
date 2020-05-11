<template>
  <base-material-card class="px-5 py-3">
    <template v-slot:heading>
      <FormTopBar
      title="xx"
      :menuItems="[]"
      :formState="formState"
      v-on="formEvents"
      />
    </template>

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
     btnTextUpdate="Update Stopover"
     btnTextAdd="Add Stopover"
     />

    </v-container>
  </base-material-card>

</template>


<script>
import FormMixin from '@common/mixins/FormMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {

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
