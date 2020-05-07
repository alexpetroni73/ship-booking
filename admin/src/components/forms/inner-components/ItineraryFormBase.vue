<template>
      <v-container>
       <v-row>
         <v-col
         v-if="!cruiseEmbeded"
         sm="12"
         md="4"
         >
           <v-text-field v-model="item.name" label="Itinerary name"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         :md="mdCruiseEmbeded"
         >
         <v-select
          :items="locations"
          v-model="item.location"
          label="Location"
          ></v-select>
         </v-col>

         <v-col
         sm="12"
         :md="mdCruiseEmbeded"
         >
           <v-text-field v-model="item.length" label="Length of trip"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         md="6"
         >
           <v-text-field v-model="item.dives" label="Dives"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         md="6"
         >
           <v-text-field v-model="item.experience" label="Experience"></v-text-field>
         </v-col>

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="item.description"
             label="Description"
             hint="Description visible on itinerary presentation"
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
         v-model="item.image"
        />

        <!-- <MediaSelect
         title="Gallery"
         :multiple="true"
         v-model="item.gallery"
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
          v-model="item.stopovers"
        />
      </v-col>

      </v-row>
     </v-container>
</template>

<script>
//import FormSubmitButtons from '@common/components/FormSubmitButtons'
import MediaSelect from '@common/components/MediaSelect'
import StopoversEditor from '@/components/editors/StopoversEditor'

export default {
  props: {
    item: {
      type: Object,
    },

    cruiseEmbeded: {
      type: Boolean,
      default: false,
    },

    locations: {
      type: Array,
      default: () => []
    },
  },

  components: {
    MediaSelect,
    StopoversEditor,
  },

  computed: {
    mdCruiseEmbeded () {
      return this.cruiseEmbeded ? 6 : 4
    },
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  }
}
</script>
