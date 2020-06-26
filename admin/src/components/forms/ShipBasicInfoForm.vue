<template>
  <v-card flat>
    <v-card-text>
  <v-container>
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
        md="3"
        >
          <v-text-field
            v-model="editedItem.shipSpecifications.yard"
            label="Yard"
            required
          ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
          <v-autocomplete
            v-model="editedItem.shipSpecifications.country"
            label="Country"
            :items="countriesList"
            item-text="name"
            item-value="code"
            required
          ></v-autocomplete>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
        </v-col>


        <!-- ===============================  build, refit,  =============================== -->

        <v-col
        sm="12"
        md="3"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.built"
         label="Built"
         hint="year"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
        <v-text-field
         v-model="editedItem.shipSpecifications.refit"
         label="Refit"
         hint="enter the most recent one first"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
          <v-autocomplete
            v-model="editedItem.shipSpecifications.flag"
            label="Flag"
            :items="countriesList"
            item-text="name"
            item-value="code"
            required
          ></v-autocomplete>
        </v-col>


        <v-col
        sm="12"
        md="3"
        >
          <v-autocomplete
            v-model="editedItem.shipSpecifications.classed"
            label="Classed"
            :items="classedList"
            item-text="name"
            item-value="code"
            required
          ></v-autocomplete>
        </v-col>

        <!-- ===============================  length, breadth,  =============================== -->
        <v-col
        sm="12"
        md="3"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.length"
         label="Length (m)"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.breadth"
         label="Breadth (m)"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.maxDraft"
         label="Max Draft"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.height"
         label="Height"
         hint="hull only, without masts"
         required
        ></v-text-field>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model="editedItem.shipSpecifications.grt"
         label="GRT"
         required
        ></v-text-field>
        </v-col>

        <!-- ===============================  type , materials,  =============================== -->
        <v-col
        sm="12"
        md="3"
        >
        <v-select
          v-model="editedItem.shipSpecifications.shipType"
          :items="shipTypesList"
          item-text="name"
          item-value="code"
          label="Type"
          :hint="superYachtHint"
        ></v-select>
        </v-col>


        <v-col
        sm="12"
        md="3"
        >
        <v-select
          v-model="editedItem.shipSpecifications.hullMaterial"
          :items="hullMaterialsList"
          item-text="name"
          item-value="code"
          label="Hull Material"
        ></v-select>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
        <v-select
          v-model="editedItem.shipSpecifications.superstructure"
          :items="hullMaterialsList"
          item-text="name"
          item-value="code"
          label="Superstructure"
        ></v-select>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.noOfDecks"
         label="No. of decks"
         required
        ></v-text-field>
        </v-col>
    </v-row>


        <v-row v-if="isPhinisiOrSailingYacht">
          <v-col
          sm="12"
          md="3"
          >
          <v-select
            v-model="editedItem.shipSpecifications.bodyStructure"
            :items="bodyTypesList"
            item-text="name"
            item-value="code"
            label="Body type"
          ></v-select>
        </v-col>

          <v-col
          sm="12"
          md="2"
          >
          <v-select
            v-model="editedItem.shipSpecifications.noOfMasts"
            :items="[1, 2, 3, 4, 5]"
            label="No. Of Masts"
          ></v-select>
        </v-col>

        <v-col md="12"></v-col>
    </v-row>

    <!-- ===============================  Crew No.  =============================== -->
    <v-row>

      <v-col
      sm="12"
      md="3"
      >
      <v-select
        v-model="editedItem.shipSpecifications.operatingLicense"
        :items="operatingLicenseTypesList"
        item-text="name"
        item-value="code"
        label="Operating licence"
      ></v-select>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.crewNo"
       label="Crew No."
       required
      ></v-text-field>
      </v-col>




    </v-row>

    <!-- ===============================  Engines & Features =============================== -->

    <v-row>
      <v-col
      sm="12"
      md="2"
      >
      <v-select
        v-model="editedItem.shipSpecifications.noOfEngines"
        :items="[1, 2, 3]"
        label="Engine(s) No."
      ></v-select>
      </v-col>


      <v-col
      sm="12"
      md="3"
      >
      <v-text-field
       v-model="editedItem.shipSpecifications.engineMaker"
       label="Maker"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.power"
       label="Power"
       hint="BHP"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.cruisingSpeed"
       label="Cruising Speed"
       hint="knots"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.maximumSpeed"
       label="Maximum Speed"
       hint="knots"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.fuelCapacity"
       label="Fuel Capacity"
       hint="ltrs"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.autonomy"
       label="Autonomy"
       hint="days"
       required
      ></v-text-field>
      </v-col>


      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipSpecifications.hotWater"
       label="Hot water"
      ></v-checkbox>
      </v-col>

      <v-col
      sm="12"
      md="2"
      v-if="editedItem.shipSpecifications.hotWater"
      >

      <v-select
        v-model="editedItem.shipSpecifications.hotWaterType"
        :items="hotWaterTypesList"
        item-text="name"
        item-value="code"
        label="Hot water type"
      ></v-select>
      </v-col>

      <v-col
      sm="12"
      md="4"
      >

      <v-select
        v-model="editedItem.shipSpecifications.airConditioningType"
        :items="airConditioningTypesList"
        item-text="name"
        item-value="code"
        label="Air conditioning type"
      ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipSpecifications.waterMaker"
       label="Water maker"
      ></v-checkbox>
      </v-col>


      <v-col
      v-if="editedItem.shipSpecifications.waterMaker"
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.waterMakerCapacity"
       label="Capacity"
       hint="ltrs"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipSpecifications.bowThruster"
       label="Bow thruster"
      ></v-checkbox>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipSpecifications.sternThruster"
       label="Stern thruster"
      ></v-checkbox>
      </v-col>

    </v-row>

    <!-- ===============================  Capacity  =============================== -->
    <v-row>
      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.maxCapacity"
       label="Maximum capacity passangers"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.maxCapacityCabins"
       label="In cabins (night)"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.dayTrips"
       label="Day trips"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.atBerth"
       label="Alongside/at berth"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.noOfCabins"
       label="Total No of cabins"
       required
      ></v-text-field>
      </v-col>

    </v-row>

    <v-row>

        <v-col
        sm="12"
        md="12"
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

    <!-- <v-row>
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

 <v-col
  sm="12"
  md="3"
  >
  <v-text-field
   v-model.number="editedItem.shipSpecifications.cabins"
   label="Cabins"
   required
  ></v-text-field>
  </v-col>

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

    </v-row> -->
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
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

import { mapState } from 'vuex'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
  },

  computed: {
    ...mapState([
      'countriesList',
      'classedList',
      'shipTypesList',
      'hullMaterialsList',
      'bodyTypesList',
      'hotWaterTypesList',
      'airConditioningTypesList',
      'operatingLicenseTypesList',
    ]),

    superYachtHint () {
      let selectedType = this.editedItem.shipSpecifications.shipType
      return  selectedType == 'mega-yacht' ? 'Notes: To qualify as super/mega yacht – minimum length is 40 m (or 130 ft) in registered length' : null
    },

    isPhinisiOrSailingYacht () {
      let selectedType = this.editedItem.shipSpecifications.shipType
      return selectedType == 'sailing-yacht' || selectedType == 'phinisi'
    },
  }
}
</script>
