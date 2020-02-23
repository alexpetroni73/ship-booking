<template>
  <ItemEditorWrapper
  :editState="editState"
  :error="error"
  v-on="onEvents"
  addNewTitle="Add New Ship"
  :name="editedItemName"
  :disableSubmitBtn="disableSubmitBtn"
  :showActionButtons="false"
  >
  <v-tabs
   v-model="tab"
   class="elevation-2"
   centered
   >
    <v-tab
      v-for="t in tabs"
      :key="t.slug"
      :href="`#tab-${t.slug}`"
      :disabled="isDisabledTab(t.slug)"
    >
      {{ t.title }}
    </v-tab>

    <v-tab-item
      v-for="t in leafTabs"
      :key="t.slug"
      :value="'tab-' + t.slug"
    >
      <v-card>
        <component
        :is="t.component"
        :id="id"
        :item="item"
        :editState="editState"
        >
       </component>
     </v-card>
    </v-tab-item>

    <v-tab-item
    value="tab-basic"
    >
    <v-card>
      <v-card-text>
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
              hint="The short description visible on ship list page"
            ></v-textarea>
         </v-col>

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.description"
             label="Description"
             hint="The description that will appear on ship presentation page"
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
        v-model.number="editedItem.shipSpecifications.length"
        label="Length"
        required
      ></v-text-field>
     </v-col>

     <v-col
     sm="12"
     md="3"
     >
     <v-text-field
       v-model.number="editedItem.shipSpecifications.beam"
       label="Beam"
       required
     ></v-text-field>
    </v-col>

    <v-col
    sm="12"
    md="3"
    >
    <v-text-field
      v-model.number="editedItem.shipSpecifications.topSpeed"
      label="Top Speed"
      required
    ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.shipSpecifications.cruisingSpeed"
     label="Cruising Speed"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model="editedItem.shipSpecifications.engines"
     label="Engines"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.shipSpecifications.maxGuests"
     label="Max Guests"
     required
   ></v-text-field>
   </v-col>

   <!-- <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.shipSpecifications.cabins"
     label="Cabins"
     required
   ></v-text-field>
   </v-col> -->

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.shipSpecifications.bathrooms"
     label="Bathrooms"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model="editedItem.shipSpecifications.tenders"
     label="Tenders"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.shipSpecifications.waterCapacity"
     label="Water Capacity"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.shipSpecifications.fuelCapacity"
     label="Fuel Capacity"
     required
   ></v-text-field>
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-checkbox
     v-model="editedItem.shipSpecifications.freshwaterMaker"
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

      <v-row>
        <v-col
        sm="12"
        class="text-center"
        >
            <v-btn
            v-if="isEditState"
            @click="onUpdate()"
            color="primary"
            :disabled="disableSubmitBtn"
            >
              Update
            </v-btn>

            <v-btn
            v-else
            @click="onCreate()"
            color="primary"
            :disabled="disableSubmitBtn"
            >
              Add
            </v-btn>
        </v-col>
      </v-row>
    </v-row>
    </v-container>
  </v-card-text>
  </v-card>

    </v-tab-item>
</v-tabs>



  </ItemEditorWrapper>
</template>

<script>
import Ship from '@/graphql/ship/Ship.gql'
import CreateShip from '@/graphql/ship/CreateShip.gql'
import UpdateShip from '@/graphql/ship/UpdateShip.gql'
import DeleteShip from '@/graphql/ship/DeleteShip.gql'

import ItemEditorMixin from '@/mixins/ItemEditorMixin'
import ItemEditorWrapper from '@/components/shared/ItemEditorWrapper'
import ShipFeaturesContainerEditor from '@/components/editors/ShipFeaturesContainerEditor'
import ShipCabinsEditor from '@/components/editors/ShipCabinsEditor'

export default {
  name: 'ShipEditor',

  mixins: [ItemEditorMixin],

  components: {
    ItemEditorWrapper,
    ShipFeaturesContainerEditor,
    ShipCabinsEditor,
  },

  data: function () {
    return {
      tab: 'tab-basic',

      tabs: [
        {title: "Basic data", slug: 'basic'},
        {title: "Features", slug: 'features', component: ShipFeaturesContainerEditor},
        {title: "Cabins", slug: 'cabins', component: ShipCabinsEditor},
      ],

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

    editedItemName () {
      return this.item && this.item.name ? this.item.name : ''
    },

    leafTabs () {
      return this.tabs.slice(1)
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
        shipFeatures: [],
        shipFeaturesText: '',
        foodAndDrinksFeatures: [],
        foodAndDrinksFeaturesText: '',
        divingFeatures: [],
        divingFeaturesText: '',
        gearRental: '',
        gearRentalText: '',
        shipLayout: '',
        shipLayoutText: '',
        shipSpecifications: {
          length: null,
          beam: null,
          topSpeed: null,
          cruisingSpeed: null,
          engines: '',
          maxGuests: null,
          bathrooms: null,
          tenders: '',
          waterCapacity: null,
          fuelCapacity: null,
          freshwaterMaker: false
        },
        shipSpecificationsText: '',
        navSafteyFeatures: [],
        navSafteyFeaturesText: '',
        cabins: [],
        cabinsText: '',
      }
    },

    isDisabledTab (slug) {
      return this.isAddNewState && slug != 'basic'
    },

    onCreate () {
      this.createItem()
    },

    onUpdate () {
      this.updateItem()
    },
  }
}

</script>
