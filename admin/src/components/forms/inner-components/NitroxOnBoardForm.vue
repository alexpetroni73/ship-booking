<template>
  <v-card flat class="ma-0">
    <v-row>
      <v-col sm="3" class="d-flex align-center">
        No. {{ itemNo }}
      </v-col>
      <v-col sm="9">
        <ValidationProvider name="Nitrox Type" rules="required" v-slot="{ errors }">
      <v-select
         label="Type*"
         :items="nitroxOnBoardTypesList"
         item-text="name"
         item-value="code"
         v-model="item.type"
         class="d-inline-flex"
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
      'nitroxOnBoardTypesList',
    ]),
  },

}
</script>
