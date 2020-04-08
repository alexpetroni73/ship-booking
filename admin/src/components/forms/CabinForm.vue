<template>
  <v-card
  flat
  >
  <FormTopBar
    addNewTitle="Add New Cabin"
    v-bind="modelState"
    v-on="formEvents"
    :name="item.name"
  />

    <v-card-text>
      <v-container>
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
             v-model="editedItem.excerpt"
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
      </v-row>

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

      <v-row>
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
import FormTopBar from '@/components/shared/FormTopBar'
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'
import MediaSelect from '@/components/shared/MediaSelect'

export default {
  mixins: [ FormMixin ],

  props: {
    cabinFeatures: {
      type: Array,
      default: () => [],
    }
  },

  components: {
    FormTopBar,
    FormSubmitButtons,
    MediaSelect,
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  }
}
</script>
