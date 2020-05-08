<template>
  <div>
  <v-tabs
   v-model="tab"
   class="elevation-2"
   vertical
   >
    <v-tab
      v-for="t in tabs"
      :key="t.slug"
      :href="`#tab-${t.slug}`"
    >
      {{ t.title }}
    </v-tab>

    <v-tab-item
      v-for="t in tabs"
      :key="t.slug"
      :value="'tab-' + t.slug"
    >
    <v-card>
      <ShipFeaturesEditor
      :items="features[t.slug]"
      v-model="editedItem[t.features]"
      :featuresText.sync="editedItem[t.featuresText]"
      :title="t.title"
      >
      </ShipFeaturesEditor>
   </v-card>
    </v-tab-item>
</v-tabs>
<v-container>
  <v-row>
    <v-col
    sm="12"
    class="text-center"
    >
    <v-btn
    color="primary"
    @click="updateItem"
    >Update</v-btn>
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import UpdateShip from '@common/graphql/ship/UpdateShip.gql'

import ItemLeafEditorMixin from '@common/mixins/ItemLeafEditorMixin'
import ShipFeaturesEditor from './ShipFeaturesEditor.vue'


export default {
  name: 'ShipFeaturesContainerEditor',

  components: {
    ShipFeaturesEditor,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [ItemLeafEditorMixin],

  model: {

  },

  props: {

  },

  data () {
    return {
      tab: 'tab-ship-features',

      tabs: [
        {title: "Ship Features", slug: 'ship-features', features: 'shipFeatures', featuresText: 'shipFeaturesText' },
        {title: "Food & Drinks", slug: 'food-and-drinks', features: 'foodAndDrinksFeatures', featuresText: 'foodAndDrinksFeaturesText'},
        {title: "Diving", slug: 'diving', features: 'divingFeatures', featuresText:'divingFeaturesText'},
        {title: "Navigation & Safety", slug: 'navigation-safety', features: 'navSafteyFeatures', featuresText: 'navSafteyFeaturesText'},
      ],

      gqlUpdateQuery: UpdateShip,
    }
  },

  computed: {
    features () {
      return {
        'ship-features': parseFeaturesToObj(shipFeatArr),
        'food-and-drinks': parseFeaturesToObj(drinksArr),
        'diving': parseFeaturesToObj(divingArr),
        'navigation-safety': parseFeaturesToObj(navSafteyArr),
      }
    }
  },

  watch: {
    // 'editedItem': {
    //   handler: (val) => {
    //   console.log('editedItem %o', val)
    //   },
    //   immediate: true,
    // },
    // 'editedItem.shipFeatures': function (val){
    //   console.log('editedItem.shipFeatures %o', val)
    // },
    //
    // 'editedItem.shipFeaturesText': function (val){
    //   console.log('editedItem.shipFeaturesText %s', val)
    // }
  },

  methods: {
    getDefaultItem () {
      return {
        shipFeatures: [],
        shipFeaturesText: '',
        foodAndDrinksFeatures: [],
        foodAndDrinksFeaturesText: '',
        divingFeatures: [],
        divingFeaturesText: '',
        navSafteyFeatures: [],
        navSafteyFeaturesText: '',
      }
    },

    selectedFeaturesFor (slug) {
      return this.item && this.item[slug]
    },
  },


}

function parseFeaturesToObj (arr) {
  return arr.map(e => ({
    name: e, slug: e
  }))
}

const shipFeatArr = [
  "Laundry Service",
  "Camera Station",
  "Daily housekeeping",
  "Audio & video entertainment",
  "Library",
  "Air Conditioned saloon",
  "Aircon Cabins",
  "Sun Deck",
  "Indoor Saloon",
  "Non-Diver (Snorkeler) Friendly",
  "Warm Water Showers",
  "Custom built for diving",
  "Charging stations",
  "En-Suite bathrooms",
  "Free Internet",
  "Non-Smoking Rooms",
  "Outside Showers",
  "Seaview Cabins",
  "Kayaks On-Board",
  "Separate Rinse for u/w Camera",
  "Dedicated Local & International Crew",
  "Nearly 1:1 Crew-to-Guest Ratio",
  "Leisure Deck",
  "Observation Deck",
  "BBQ Area",]

  const drinksArr = [
    "Western Food",
    "Local Food",
    "Vegetarian Options",
    "Buffet style",
    "Beer available",
    "Snacks All Day",
    "Vegan Options",
    "Fine Wines Selection",
    "Free Soft Drinks",
    "Wine Available",
    "Al Fresco Dining",
  ]

  const divingArr = [
    "DIN Adaptors",
    "Nitrox available",
    "Rinse Hoses",
    "Dive deck",
    "Tenders for diving",
    "Shaded Diving Area",
  ]

  const navSafteyArr = [
    "Radar",
    "GPS",
    "Radio VHF/DSC/SSB",
    "Life Vests",
    "Fire Alarm & Fire Extinguishers",
  ]
</script>
