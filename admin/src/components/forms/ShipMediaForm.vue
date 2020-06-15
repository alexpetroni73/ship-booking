<template>
  <v-card>
  <v-container>
     <v-row>
       <v-col
       cols="12"
       >

       <MediaSelect
        class="pb-8"
        title="Main image"
        :multiple="false"
        v-model="editedItem.image"
       />

       <MediaSelect
        title="Gallery"
        :multiple="true"
        v-model="editedItem.gallery"
        :imgWidth="150"
       />

     </v-col>
     </v-row>
 </v-container>
   <FormSubmitButtons
   :formState="formState"
   @update-item="updateItem"
   />
  </v-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import MediaSelect from '@common/components/MediaSelect'

export default {
  mixins: [ FormItemMixin ],

  components: {
    MediaSelect,
    FormSubmitButtons,
  },

  data () {
    return {
    }
  },
}
</script>
