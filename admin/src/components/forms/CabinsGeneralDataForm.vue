<template>
  <!-- ===============================  Capacity  =============================== -->
  <v-container>
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
     label="In cabins (pax)"
     required
     persistent-hint
     hint="For whom beds are provided"
    ></v-text-field>
    </v-col>

    <v-col
    sm="12"
    md="2"
    >
    <v-text-field
     v-model.number="editedItem.shipSpecifications.dayTrips"
     label="Day trips (pax)"
     required
     persistent-hint
     hint="If your license allows for increased passenger capacity during day trips compared with normal capacity"
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

    <v-col
    sm="12"
    >
    <FormSubmitButtons
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />
  </v-col>

  </v-row>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'


export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
  },

}
</script>
