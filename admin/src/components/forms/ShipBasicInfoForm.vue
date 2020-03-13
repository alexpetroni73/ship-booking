<template>
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
            outlined
          ></v-textarea>
       </v-col>

       <v-col
       sm="12"
       >
         <v-textarea
           v-model="editedItem.description"
           label="Description"
           hint="The description that will appear on ship presentation page"
           outlined
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
  </v-row>
  </v-container>
  </v-card-text>
  <FormSubmitButtons
  :formState="formState"
  @create-item="createItem"
  @update-item="updateItem"
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
}
</script>
