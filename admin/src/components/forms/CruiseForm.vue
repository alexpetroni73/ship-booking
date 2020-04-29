<template>
  <v-card
  flat
  >
  <FormTopBar
    addNewTitle="Add New Cruise"
    v-bind="modelState"
    v-on="formEvents"
    :name="item.name"
  />

    <v-card-text>
      <v-container>
       <v-row>
         <v-col
         sm="12"
         md="4"
         >
           <v-text-field v-model="editedItem.name" label="Cruise name"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         md="4"
         >
         <v-select
          :items="locations"
          v-model="editedItem.location"
          label="Location"
          ></v-select>
         </v-col>

         <v-col
         sm="12"
         md="4"
         >
           <v-text-field v-model="editedItem.length" label="Length of trip"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         md="6"
         >
           <v-text-field v-model="editedItem.dives" label="Dives"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         md="6"
         >
           <v-text-field v-model="editedItem.experience" label="Experience"></v-text-field>
         </v-col>

         <!-- <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.excerpt"
             label="Excerpt"
             hint="Short text visible on cruises list"
             outlined
           ></v-textarea>
        </v-col> -->

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.description"
             label="Description"
             hint="Description visible on cruise presentation"
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

        <!-- <MediaSelect
         title="Gallery"
         :multiple="true"
         v-model="editedItem.gallery"
         :imgWidth="150"
        /> -->

      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
      sm="12"
      md="6"
      >
        <StopoversEditor
          v-model="editedItem.stopovers"
        />
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
import FormTopBar from '@/components/shared/FormTopBar'
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'
import MediaSelect from '@/components/shared/MediaSelect'
import StopoversEditor from '@/components/editors/StopoversEditor'

export default {
  mixins: [ FormMixin ],

  props: {
    cruiseFeatures: {
      type: Array,
      default: () => [],
    },

    locations: {
      type: Array,
      default: () => [
        {text: "Indonesia", value: "Indonesia"},
        {text: "Maldives", value: "Maldives"},
        {text: "Philippines", value: "Philippines"},
        {text: "Thailand", value: "Thailand"},
      ]
    }
  },

  components: {
    FormTopBar,
    FormSubmitButtons,
    MediaSelect,
    StopoversEditor,
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  }
}
</script>
