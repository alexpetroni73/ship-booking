<template>
    <v-card
    >

      <v-tabs
       v-model="tab"
       class="elevation-2"
       vertical
       flat
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
          flat
        >
          <ShipFeaturesForm
          :feature-set="t.slug"
          v-model="editedItem[t.features]"
          :featuresText.sync="editedItem[t.featuresText]"
          :title="t.title"
          >
        </ShipFeaturesForm>
        </v-tab-item>
    </v-tabs>

  <FormSubmitButtons
  :formState="formState"
  @update-item="updateItem"
  />

</v-card>
</template>

<script>
import FormMixin from '@common/mixins/FormMixin'
import ShipFeaturesForm from '@/components/forms/ShipFeaturesForm'
import FormSubmitButtons from '@common/components/FormSubmitButtons'


export default {
  mixins: [ FormMixin ],

  components: {
    ShipFeaturesForm,
    FormSubmitButtons,
  },

  data () {
    return {
      tab: 'tab-ship-features',

      tabs: [
        {
          title: "Ship Features",
          slug: 'ship-features',
          features: 'shipFeatures',
          featuresText: 'shipFeaturesText'
        },
        {
          title: "Food & Drinks",
          slug: 'food-and-drinks',
          features: 'foodAndDrinksFeatures',
          featuresText: 'foodAndDrinksFeaturesText'
        },
        {
          title: "Diving",
          slug: 'diving',
          features: 'divingFeatures',
          featuresText:'divingFeaturesText'
        },
        {
          title: "Navigation & Safety",
          slug: 'navigation-safety',
          features: 'navSafteyFeatures',
          featuresText: 'navSafteyFeaturesText'
        },
      ],
    }
  },

  computed: {
    // features () {
    //   return {
    //     'ship-features': parseFeaturesToObj(shipFeatArr),
    //     'food-and-drinks': parseFeaturesToObj(drinksArr),
    //     'diving': parseFeaturesToObj(divingArr),
    //     'navigation-safety': parseFeaturesToObj(navSafteyArr),
    //   }
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
</script>
