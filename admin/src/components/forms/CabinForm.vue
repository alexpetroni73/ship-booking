<template>
  <v-card>
    <v-card-text>
      <v-container>
          <v-row>
            <v-col
            sm="12"
            md="3"
            >
            <v-btn @click="showList">show</v-btn>
            Cabin form
        </v-col>
       </v-row>

       <v-row>
         <v-col
         sm="12"
         md="3"
         >
           <v-text-field v-model="editedItem.name" label="Cabin name"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.featuresText"
             label="Cabin features text"
             hint="Text on cabin page"
             outlined
           ></v-textarea>
        </v-col>
      </v-row>
     </v-container>
   </v-card-text>

    <FormSubmitButtons
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />
  </v-card>
</template>

<script>
import FormMixin from '@/mixins/FormMixin'
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'

export default {
  mixins: [ FormMixin ],

  components: {
    FormSubmitButtons,
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  }
}
</script>
