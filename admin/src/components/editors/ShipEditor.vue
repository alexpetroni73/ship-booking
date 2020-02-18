<template>
  <ItemEditorWrapper
  :editState="editState"
  :error="error"
  v-on="onEvents"
  addNewTitle="Add New Ship"
  :disableSubmitBtn="disableSubmitBtn"
  >

    <v-container>
      <v-row wrap>
        <v-row>
          <v-col
          sm="12"
          md="3"
          >
            <v-text-field
              v-model="editedItem.name"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col
          sm="12"
          >
            <v-textarea
              v-model="editedItem.excerpt"
              label="Excerpt"
              hint="The short description visible on boat list page"
            ></v-textarea>
         </v-col>

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.description"
             label="Description"
             hint="The description that will appear on boat presentation page"
           ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col
        sm="12"
        class="title"
        >
        Boat Specifications
      </v-col>

      <v-col
      sm="12"
      md="3"
      >
      <v-text-field
        v-model.number="editedItem.boatSpecifications.length"
        label="Length"
        required
      ></v-text-field>
     </v-col>

     <v-col
     sm="12"
     md="3"
     >
     <v-text-field
       v-model.number="editedItem.boatSpecifications.beam"
       label="Beam"
       required
     ></v-text-field>
    </v-col>

    <v-col
    sm="12"
    md="3"
    >
    <v-text-field
      v-model.number="editedItem.boatSpecifications.topSpeed"
      label="Top Speed"
      required
    ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.cruisingSpeed"
     label="Cruising Speed"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model="editedItem.boatSpecifications.engines"
     label="Engines"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.maxGuests"
     label="Max Guests"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.cabins"
     label="Cabins"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.bathrooms"
     label="Bathrooms"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model="editedItem.boatSpecifications.tenders"
     label="Tenders"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.waterCapacity"
     label="Water Capacity"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.fuelCapacity"
     label="Fuel Capacity"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-checkbox
     v-model="editedItem.boatSpecifications.freshwaterMaker"
     label="Freshwater Maker"
     required
   ></v-checkbox>
   </v-col>

        <v-col cols="12">
          <!-- <SingleImageEditor
          v-model="editedItem.logo"
          >
          </SingleImageEditor> -->
        </v-col>
      </v-row>
    </v-row>
    </v-container>

  </ItemEditorWrapper>
</template>

<script>
import Ship from '@/graphql/ship/Ship.gql'
import CreateShip from '@/graphql/ship/CreateShip.gql'
import UpdateShip from '@/graphql/ship/UpdateShip.gql'
import DeleteShip from '@/graphql/ship/DeleteShip.gql'

import ItemEditorMixin from '@/mixins/ItemEditorMixin'
import ItemEditorWrapper from '@/components/shared/ItemEditorWrapper'

export default {
  name: 'ShipEditor',

  mixins: [ItemEditorMixin],

  components: {
    ItemEditorWrapper,
  },

  data: function () {
    return {
      gqlQueries: {
        create: CreateShip,
        read: Ship,
        update: UpdateShip,
        delete: DeleteShip,
      }
    }
  },

  computed: {
    onEvents () {
      return {
        'add-new-item': this.addNewItem,
        'create-item': this.createItem,
        'update-item': this.updateItem,
        'delete-item': this.deleteItem,
        'reload-item': this.reloadItem,
      }
    },

    disableSubmitBtn () {
      return !this.editedItem.name
    },
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        excerpt: '',
        description: '',
        image: '',
        boatFeatures: [],
        boatFeaturesText: '',
        foodAndDrinksFeatures: [],
        foodAndDrinksFeaturesText: '',
        divingFeatures: [],
        divingFeaturesText: '',
        gearRental: '',
        gearRentalText: '',
        boatLayout: '',
        boatLayoutText: '',
        boatSpecifications: {
          length: null,
          beam: null,
          topSpeed: null,
          cruisingSpeed: null,
          engines: '',
          maxGuests: null,
          cabins: null,
          bathrooms: null,
          tenders: '',
          waterCapacity: null,
          fuelCapacity: null,
          freshwaterMaker: false
        },
        boatSpecificationsText: '',
        navSafteyFeatures: [],
        navSafteyFeaturesText: '',
        cabins: [],
        cabinsText: '',
      }
    },
  }
}

</script>
