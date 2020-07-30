<template>
  <v-card flat class="ma-0">
    <v-row>
      <v-col sm="3" class="d-flex align-center">
        WaveRunnner {{ itemNo }}
      </v-col>
      <v-col sm="3">
        <ValidationProvider name="Maker" rules="required" v-slot="{ errors }">
        <v-text-field
        label="Maker*"
        v-model="item.maker"
        />
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
    </v-col>

    <v-col sm="2">
      <ValidationProvider name="Length" rules="required|floatNum" v-slot="{ errors }">
       <v-text-field
       label="Length* (m)"
       type="number"
       v-model.number="item.length"
       persistent-hint
       :hint="metersToFeet(item.length)"
       />
       <span class="formError">{{ errors[0] }}</span>
       </ValidationProvider>
     </v-col>

     <v-col sm="2">
       <ValidationProvider name="Power" rules="required|floatNum" v-slot="{ errors }">
        <v-text-field
        label="Power* (BHP)"
        type="number"
        v-model.number="item.power"
        />
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
      </v-col>

     <v-col sm="2">
       <ValidationProvider name="No. pax" rules="required|integer" v-slot="{ errors }">
        <v-select
        label="No. pax*"
        type="number"
        v-model.number="item.pax"
        :items="paxArr"
        />
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>
import { metersToFeet } from '@common/utils'

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

  data () {
    return {
      paxArr: [
        {text: 1, value: 1 },
        {text: 2, value: 2 },
        {text: 3, value: 3 },
      ]
    }
  },

  methods: {
    metersToFeet (val) {
      return metersToFeet(val)
    }
  }

}
</script>
