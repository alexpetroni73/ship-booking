<template>
  <v-card flat class="ma-0">
    <v-row>
      <v-col sm="4" class="d-flex align-center">
        Waverunnner {{ itemNo }}
      </v-col>
      <v-col sm="4">
        <v-text-field
        label="Maker"
        v-model="item.maker"
        />
    </v-col>
    <v-col sm="4">
       <v-text-field
       label="Length"
       type="number"
       v-model.number="item.length"
       hint="meter"
       />
     </v-col>
    </v-row>
  </v-card>

</template>

<script>

export default {
  name: 'WaveRunnerForm',

  props: {
    item: {
      type: Object,
      required: true,
    },

    itemNo: {
      type: Number,
      default: 1
    }
  },

  model: {
    prop: 'item',
  },

}
</script>
