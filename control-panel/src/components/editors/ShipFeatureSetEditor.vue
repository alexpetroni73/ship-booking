<template>
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
    <v-card>
      <FeatureSetFormModel
      :id="t.slug"
      :name="t.title"
      v-slot="{item, modelState, formEvents}"
      v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
      >
        <FeatureSetForm
        :item="item"
        v-bind="modelState"
        v-on="formEvents"
        />
      </FeatureSetFormModel>
   </v-card>
    </v-tab-item>
</v-tabs>
</template>

<script>
import FeatureSetForm from '@/components/forms/FeatureSetForm'
import FeatureSetFormModel from '@/components/models/FeatureSetFormModel'
import { pipeEvents } from '@common/utils'

export default {
  components: {
    FeatureSetForm,
    FeatureSetFormModel,
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

  methods: {
    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
