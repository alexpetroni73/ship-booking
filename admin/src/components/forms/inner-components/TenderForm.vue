<template>
  <v-card flat class="ma-0">
    <v-row>
      <v-col sm="3" class="d-flex align-center">
        Tender {{ itemNo }}
      </v-col>
      <v-col sm="3">
        <ValidationProvider name="Tender Type" rules="required" v-slot="{ errors }">
      <v-select
         label="Type*"
         :items="tendersTypesList"
         item-text="name"
         item-value="code"
         v-model="item.type"
         class="d-inline-flex"
       />
       <span class="formError">{{ errors[0] }}</span>
     </ValidationProvider>
    </v-col>
    <v-col sm="2">
      <ValidationProvider name="Length" rules="required|floatNum" v-slot="{ errors }">
       <v-text-field
       label="Length *(m)"
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
    </v-row>
  </v-card>

</template>

<script>
import { mapState } from 'vuex'
import { metersToFeet } from '@common/utils'

export default {
  name: 'TenderForm',

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
      'tendersTypesList',
    ]),
  },

  methods: {
    metersToFeet (val) {
      return metersToFeet(val)
    }
  },

}
</script>
