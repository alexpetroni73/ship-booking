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

         <!-- =========================== Embark | Disembark =========================== -->
         <v-col
         sm="6"
         md="4"
         >
           <v-text-field v-model="item.departure.location" label="Embark from"></v-text-field>
         </v-col>

         <v-col
         sm="6"
         md="2"
         >
         <v-text-field
           label="Embark Time"
           v-model="item.departure.time"
           type="time"
           suffix="PST"
         ></v-text-field>
           <!-- <v-text-field v-model="item.departure.time" label="Embark Time"></v-text-field> -->
         </v-col>

         <v-col
         sm="6"
         md="4"
         >
           <v-text-field v-model="item.return.location" label="Disembark to"></v-text-field>
         </v-col>

         <v-col
         sm="6"
         md="2"
         >
         <v-text-field
           label="Disembark Time"
           v-model="item.return.time"
           type="time"
           suffix="PST"
         ></v-text-field>
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

        <AttachmentSelector
         class="pb-8"
         title="Main image"
         :multiple="false"
         v-model="item.image"
        />

      </v-col>
    </v-row>

    <v-row>
      <v-col
      sm="12"
      md="6"
      >
        <StopoversEditor
          v-model="item.stopovers"
        />
      </v-col>

      <v-col
      sm="12"
      md="6"
      >
        <ItineraryMap
        :locations="item.stopovers"
         style="width: 400px; height: 400px; float: right;" />
      </v-col>

      </v-row>
     </v-container>
</template>

<script>
//import FormSubmitButtons from '@common/components/FormSubmitButtons'
import AttachmentSelector from '@/components/selectors/AttachmentSelector'
import StopoversEditor from '@/components/editors/StopoversEditor'
import ItineraryMap from '@common/components/ItineraryMap'

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
      default: () => [
        {text: "Indonesia", value: "Indonesia"},
        {text: "Maldives", value: "Maldives"},
        {text: "Philippines", value: "Philippines"},
        {text: "Thailand", value: "Thailand"},
      ]
    },
  },

  components: {
    AttachmentSelector,
    StopoversEditor,
    ItineraryMap,
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
  },
}
</script>
