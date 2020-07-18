<template>
  <v-card flat class="ma-0">
    <v-row>
      <v-col sm="4" class="d-flex align-center">
        Tender {{ itemNo }}
      </v-col>
      <v-col sm="4">
      <v-select
         label="Type"
         :items="tendersTypesList"
         item-text="name"
         item-value="code"
         v-model="item.type"
         class="d-inline-flex"
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
import { mapState } from 'vuex'

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

}
</script>
