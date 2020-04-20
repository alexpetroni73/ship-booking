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
       sm="12"
       md="6"
       >
         <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
       </v-col>

       <v-col
       sm="12"
       md="6"
       >
         <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
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

  </v-card>

</template>


<script>
import FormMixin from '@/mixins/FormMixin'
import FormTopBar from '@/components/shared/FormTopBar'
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'

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
