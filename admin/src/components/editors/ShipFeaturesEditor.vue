<template>
  <v-container>
     <v-row>
    <template v-for="item in items">
      <v-col
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
    </template>
  </v-row>

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

  <v-row>
    <v-col
    sm="12"
    class="text-center"
    >
    <!-- <v-btn
       color="primary"
      @click="update()"
    >
      Update
    </v-btn> -->
   </v-col>
 </v-row>
 </v-container>
</template>

<script>

export default {
  model: {
    prop: 'selectedItems',
    event: 'change'
  },

  props: {
    items: {
      type: Array,
      default: () => []
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

  data () {
    return {
      sel: []
    }
  },

  computed: {
    featureTextLabel () {
      return this.title ? this.title + " Text" : "Features Texte"
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
