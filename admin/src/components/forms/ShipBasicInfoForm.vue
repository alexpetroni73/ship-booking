<template>
  <v-card flat>
    <v-card-text>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row>
        <v-col
        sm="12"
        md="3"
        >
          <v-text-field
            v-model="editedItem.name"
            label="Name"
             :rules="nameRules"
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
          <v-select
            v-model="editedItem.shipSpecifications.country"
            label="Country"
            :items="countriesList"
            item-text="name"
            item-value="code"
            required
          ></v-select>
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
            label="Classification Society (if any)"
            :items="classedList"
            item-text="name"
            item-value="code"
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
         persistent-hint
         :hint="metersToFeet(editedItem.shipSpecifications.length)"
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="3"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.breadth"
         label="Breadth (m)"
         persistent-hint
         :hint="metersToFeet(editedItem.shipSpecifications.breadth)"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.maxDraft"
         label="Max Draft (m)"
         persistent-hint
         :hint="metersToFeet(editedItem.shipSpecifications.maxDraft)"
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.height"
         label="Height (m)"
         persistent-hint
         :hint="metersToFeet(editedItem.shipSpecifications.height) + ' (hull only, without masts)'"
         required
        ></v-text-field>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSpecifications.grt"
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
          persistent-hint
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
            v-model="editedItem.shipSpecifications.hullType"
            :items="hullTypesList"
            item-text="name"
            item-value="code"
            label="Hull Type"
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
       label="Power (BHP)"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.cruisingSpeed"
       label="Cruising Speed (knots)"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.maximumSpeed"
       label="Maximum Speed (knots)"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.fuelCapacity"
       label="Fuel Capacity (ltrs)"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-text-field
       v-model.number="editedItem.shipSpecifications.autonomy"
       label="Autonomy (days)"
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
            md="2"
            >
            <v-checkbox
             v-model="editedItem.shipSpecifications.airConditioning"
             label="Air conditioning"
            ></v-checkbox>
            </v-col>

      <v-col
      sm="12"
      md="2"
      v-if="editedItem.shipSpecifications.airConditioning"
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
       label="Capacity (ltrs)"
       required
      ></v-text-field>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipSpecifications.thruster"
       label="Thruster(s)"
      ></v-checkbox>
      </v-col>

      <v-col
      sm="12"
      md="2"
      v-if="editedItem.shipSpecifications.thruster"
      >

      <v-select
        v-model="editedItem.shipSpecifications.thrusterType"
        :items="thrustersTypesList"
        item-text="name"
        item-value="code"
        label="Thruster type"
      ></v-select>
      </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
          v-model="editedItem.shipSpecifications.stabilizers"
          label="Stabilizers"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        v-if="editedItem.shipSpecifications.stabilizers"
        >

        <v-select
          v-model="editedItem.shipSpecifications.stabilizersType"
          :items="stabilizersTypesList"
          item-text="name"
          item-value="code"
          label="Stabilizers type"
        ></v-select>
        </v-col>

    </v-row>

    <!-- ===============================  Crew No.  =============================== -->
    <v-row>
      <v-col sm="12" dense><v-divider></v-divider></v-col>
      <v-col
      sm="12"
      md="3"
      >
      <v-select
        v-model="editedItem.shipSpecifications.operatingLicense"
        :items="operatingLicenseTypesList"
        item-text="name"
        item-value="code"
        label="Operating Licence"
      ></v-select>
      </v-col>

      <v-col
      sm="12"
      md="3"
      >
      <v-select
        v-model="editedItem.shipSpecifications.designation"
        :items="designationTypesList"
        item-text="name"
        item-value="code"
        label="Select What Qualify Best Your Boat"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0">{{ item.name }}</span>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ editedItem.shipSpecifications.designation.length - 1 }} others)</span>
      </template>

    </v-select>
      </v-col>

      <v-col
      sm="12"
      md="3"
      >
      <v-select
        v-model="editedItem.shipSpecifications.availableFor"
        :items="availableForTypesList"
        item-text="name"
        item-value="code"
        label="Available For"
       multiple
      >

      <template v-slot:selection="{ item, index }">
        <span v-if="index === 0">{{ item.name }}</span>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >(+{{ editedItem.shipSpecifications.availableFor.length - 1 }} others)</span>
    </template>
  </v-select>
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
      <v-col sm="12" dense><v-divider></v-divider></v-col>

    </v-row>

    <!-- ===============================  Capacity moved to Cabins editor =============================== -->
    <!-- <v-row>
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

    </v-row> -->

    <v-row>

        <!-- <v-col
        sm="12"
        md="12"
        >
          <v-textarea
            v-model="editedItem.excerpt"
            label="Excerpt"
            hint="The short description visible on ship list page"
            outlined
          ></v-textarea>
       </v-col> -->

       <v-col
       sm="12"
       >
         <v-textarea
           v-model="editedItem.description"
           label="Description"
           persistent-hint
           hint="Type a short presentation of your craft - Highlight any key features that are of concern to potential customers. Please keep it under 300 characters."
           outlined
           counter
           maxlength="500"
         ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
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
import { metersToFeet } from '@common/utils'

import { mapState } from 'vuex'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
  },

  data () {
    return {
      // validation rules
      nameRules: [
        v => !!v || 'Name is required',
      ],
    }
  },

  computed: {
    ...mapState([
      'countriesList',
      'classedList',
      'shipTypesList',
      'hullMaterialsList',
      'hullTypesList',
      'hotWaterTypesList',
      'airConditioningTypesList',
      'operatingLicenseTypesList',
      'designationTypesList',
      'availableForTypesList',
      'stabilizersTypesList',
      'thrustersTypesList',
    ]),

    superYachtHint () {
      // let selectedType = this.editedItem.shipSpecifications.shipType
      return 'Notes: To qualify as super/mega yacht – minimum length is 40 m (or 130 ft) in registered length'
    },

    isPhinisiOrSailingYacht () {
      let selectedType = this.editedItem.shipSpecifications.shipType
      return selectedType == 'sailing-yacht' || selectedType == 'phinisi'
    },
  },

  methods: {
    metersToFeet (val) {
      return metersToFeet(val)
    }
  },

  watch: {
    'editedItem.shipSpecifications.waterMaker': function (val) {
      if(!val) {
        this.editedItem.shipSpecifications.waterMakerCapacity = null
      }
    },

    'editedItem.shipSpecifications.airConditioning': function (val) {
      if(!val) {
        this.editedItem.shipSpecifications.airConditioningType = ''
      }
    },

    'editedItem.shipSpecifications.hotWater': function (val) {
      if(!val) {
        this.editedItem.shipSpecifications.hotWaterType = ''
      }
    },

    'editedItem.shipSpecifications.stabilizers': function (val) {
      if(!val) {
        this.editedItem.shipSpecifications.stabilizersType = ''
      }
    },


    'editedItem.shipSpecifications.thruster': function (val) {
      if(!val) {
        this.editedItem.shipSpecifications.thrusterType = ''
      }
    },

  }
}
</script>
