<template>
  <v-card flat class="ma-0">
    <v-row>
      <v-col sm="6" class="d-flex align-center">
        Air Compressor {{ itemNo }}
      </v-col>
    <v-col sm="4">
      <ValidationProvider name="Capacity" rules="required|floatNum" v-slot="{ errors }">
       <v-text-field
       label="Capacity*"
       type="number"
       v-model.number="item.capacity"
       />
       <span class="formError">{{ errors[0] }}</span>
       </ValidationProvider>
     </v-col>
    </v-row>
  </v-card>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AirCompressorForm',

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

  computed: {
    ...mapState([
      'itemsTypesList',
    ]),
  },

}
</script>
