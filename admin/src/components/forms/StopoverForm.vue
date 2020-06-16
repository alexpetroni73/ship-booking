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

       <v-col
       cols="12"
       md="6"
       >
         <v-text-field v-model="editedItem.lng" label="Longitude"></v-text-field>
       </v-col>

       <v-col
       cols="12"
       md="6"
       >
         <v-text-field v-model="editedItem.lat" label="Latitude"></v-text-field>
       </v-col>


       <v-col cols="12">
         <MapLocationSelectDialog
         v-model="location"
         />
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
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import MapLocationSelectDialog from '@/components/selectors/MapLocationSelectDialog'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {

  model: {
    prop: 'item',
    event: 'change'
  },

  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    FormSubmitButtons,
    MapLocationSelectDialog,
  },

  computed: {
    hasStopovers () {
      return this.item && Array.isArray(this.item) && this.item.length
    },

    location: {
      get () {
        return {
          lat: this.editedItem.lat,
          lng: this.editedItem.lng,
        }
      },

      set (val) {
        this.$set(this.editedItem, 'lat', val.lat)
        this.$set(this.editedItem, 'lng', val.lng)
        // this.editedItem.lat = val && val.lat
        // this.editedItem.lng = val && val.lng
      }
    },
  },

  methods: {
  },

  watch : {
    item: {
      handler (val) {
        console.log('item change %o', val)
      },
      immediate: true,
    }
  }

}
</script>
