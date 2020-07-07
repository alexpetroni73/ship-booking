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
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.lifejackets"
         label="Lifejackets (all pax)"
        ></v-checkbox>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSafety.lifejacketsNo"
         label="Lifejackets No."
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSafety.lifejacketsNoKids"
         label="Lifejackets Kids No."
         required
        ></v-text-field>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.radar"
         label="Radar(s)"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.ais"
         label="AIS"
        ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.liferafts"
         label="Liferafts"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSafety.liferaftsNo"
         label="Liferafts No."
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.chartPlotter"
         label="Chart Plotter"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.sart"
         label="SART(s)"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.lifebuoys"
         label="Lifebuoys"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSafety.lifebuoysNo"
         label="Lifebuoys No."
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.vhf"
         label="VHF"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.epirb"
         label="EPIRB"
        ></v-checkbox>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.rescueBoats"
         label="Rescue Boats"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="editedItem.shipSafety.rescueBoatsNo"
         label="Rescue Boats No."
         required
        ></v-text-field>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.mfhf"
         label="MF/HF unit"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.medicalFirsAidKit"
         label="Medical first aid kit(s)"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipSafety.medicalOxygen"
         label="Medical oxygen"
        ></v-checkbox>
        </v-col>



    </v-row>

  </v-form>
  </v-container>
  </v-card-text>
  <FormSubmitButtons
  :disabled="!valid"
  :formState="formState"
  @create-item="createItem"
  @update-item="updateItem"
  />
  </v-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
  },

  data () {
    return {
      valid: true,

      // validation rules

    }
  },

  computed: {

  }
}
</script>
