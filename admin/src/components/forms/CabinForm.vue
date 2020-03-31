<template>
  <v-card>
    <v-card-text>
      <v-container>
          <v-row>
            <v-col
            cols="12"
            >
              <BaseError
              :error="error">
              </BaseError>
            </v-col>
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
         md="6"
         >
           <v-text-field v-model="editedItem.name" label="Cabin name"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.excertp"
             label="Excerpt"
             hint="Short text visible on cabins list"
             outlined
           ></v-textarea>
        </v-col>

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.description"
             label="Description"
             hint="Description visible on cabin presentation"
             outlined
           ></v-textarea>
        </v-col>

        <v-col
        sm="12"
        >
          <v-textarea
            v-model="editedItem.featuresText"
            label="Features text"
            hint="Cabin features text"
            outlined
          ></v-textarea>
       </v-col>
      </v-row>

      <v-row>
     <template v-for="item in cabinFeatures">
       <v-col
       :key="item.slug"
       sm="12"
       md="4"
       class="text-center py-0"
       >
       <v-checkbox
         :dense="true"
         :multiple="true"
         v-model="editedItem.features"
         :label="item.name"
         :value="item.slug"
       ></v-checkbox>
     </v-col>
     </template>
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
import BaseError from '@/components/shared/BaseError'

export default {
  mixins: [ FormMixin ],

  props: {
    cabinFeatures: {
      type: Array,
      default: () => [],
    }
  },

  components: {
    FormSubmitButtons,
    BaseError,
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  }
}
</script>
