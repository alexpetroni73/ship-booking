<template>
  <v-container>
    <v-row>
      <v-col
      sm="12"
      >
      <v-textarea
        :value="featuresText"
        @change="onFeatureTextChange($event)"
        :label="featureTextLabel"
        outlined
      ></v-textarea>
     </v-col>
   </v-row>


       <FeatureSetItemsProvider
       :featureSet="featureSet"
       v-slot="{items}"
       >
       <v-row>
         <v-col
         v-for="item in items"
         :key="item.slug"
         sm="12"
         md="4"
         class="text-center py-0"
         >
         <v-checkbox
           :dense="true"
           :multiple="true"
           :input-value="selectedItems"
           @change="onItemsSelectionChange($event)"
           :label="item.name"
           :value="item.slug"
         ></v-checkbox>
       </v-col>
      </v-row>
     </FeatureSetItemsProvider>

 </v-container>
</template>

<script>
import FeatureSetItemsProvider from './inner-components/FeatureSetItemsProvider'

export default {
  model: {
    prop: 'selectedItems',
    event: 'change'
  },

  props: {
    // items: {
    //   type: Array,
    //   default: () => []
    // },

    featureSet: {
      type: String,
    },

    selectedItems: {
      type: Array,
      default: () => []
    },

    featuresText: {
      type: String,
    },

    title: {
      type: String
    },
  },

  components: {
    FeatureSetItemsProvider,
  },

  data () {
    return {
      sel: []
    }
  },

  computed: {
    featureTextLabel () {
      return this.title ? this.title + " Text" : "Features Text"
    }
  },

  methods: {
    onItemsSelectionChange (event) {
      this.$emit('change', event)
    },

    onFeatureTextChange (event) {
      this.$emit('update:featuresText', event)
    }
  },


}
</script>
