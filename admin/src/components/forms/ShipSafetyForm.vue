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
         @change="updateNo($event, ['lifejacketsNo', 'lifejacketsNoKids'])"
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
         v-show="editedItem.shipSafety.lifejackets"
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
         v-show="editedItem.shipSafety.lifejackets"
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
         @change="updateNo($event, 'liferaftsNo')"
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
         v-show="editedItem.shipSafety.liferafts"
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
         @change="updateNo($event, 'lifebuoysNo')"
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
        v-show="editedItem.shipSafety.lifebuoys"
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
         @change="updateNo($event, 'rescueBoatsNo')"
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
         v-show="editedItem.shipSafety.rescueBoats"
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

  },

  methods: {
    updateNo (val, field) {
      if(!Array.isArray(field)){
        field = [field]
      }
      field.forEach(e => {
        if(!val && this.editedItem.shipSafety[e]) {
          this.editedItem.shipSafety[e] = null
        }
      })
    },
  }
}
</script>
