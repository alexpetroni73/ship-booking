<template>
  <ShipFormModel
  :id="id"
  v-slot="{item, modelState, crudEvents}"
  v-on="pipeUp('item-created', 'item-deleted')"
  >
  <div>

    <base-material-card class="px-5 py-3">
      <template v-slot:heading>

        <FormTopBar
        addNewTitle="Add New Ship"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
        :name="item.name"
        />

        <v-tabs
          v-model="tab"
          background-color="transparent"
          slider-color="white"
          @change="onTabsChange"
          center-active
         >
          <v-tab
            v-for="t in tabs"
            :key="t.slug"
            :href="`#tab-${t.slug}`"
            :disabled="isDisabledTab(t.slug, modelState.formState)"
            class="mr-3"
          >
            {{ t.title }}
          </v-tab>
          </v-tabs>
      </template>

      <v-tabs-items
        v-model="tab"
      >
      <v-tab-item
      value="tab-basic"
      >
        <ShipBasicInfoForm
        :item="shipBasicData(item)"
        v-bind="modelState"
        v-on="crudEvents"
        />
      </v-tab-item>

      <!-- <v-tab-item
      value="tab-features"
      >
        <ShipFeaturesFormContainer
        :item="shipFeaturesData(item)"
        v-bind="modelState"
        v-on="crudEvents"
        />
      </v-tab-item> -->

      <v-tab-item
      value="tab-safety"
      >
        <ShipSafetyForm
        :item="shipSafetyData(item)"
        v-bind="modelState"
        v-on="crudEvents"
        />
      </v-tab-item>

      <v-tab-item
      value="tab-entertainment"
      >
        <ShipEntertainmentForm
        :item="shipEntertainmentData(item)"
        v-bind="modelState"
        v-on="crudEvents"
        />
      </v-tab-item>

      <v-tab-item
      value="tab-media"
      >
        <ShipMediaForm
        :item="shipMediaData(item)"
        v-bind="modelState"
        v-on="crudEvents"
        />
      </v-tab-item>

      <v-tab-item
      value="tab-accomodation"
      >
        <CabinsEditor
        :id="id"
        :activ="cabinActiv"
        />
      </v-tab-item>
    </v-tabs-items>

      </base-material-card>
    </div>
  </ShipFormModel>
</template>

<script>
import ShipFormModel from '@/components/models/ShipFormModel'
import FormTopBar from '@common/components/FormTopBar'
import ShipBasicInfoForm from '@/components/forms/ShipBasicInfoForm'
import ShipSafetyForm from '@/components/forms/ShipSafetyForm'
import ShipEntertainmentForm from '@/components/forms/ShipEntertainmentForm'
// import ShipFeaturesFormContainer from '@/components/forms/ShipFeaturesFormContainer'
import ShipMediaForm from '@/components/forms/ShipMediaForm'
import CabinsEditor from '@/components/editors/CabinsEditor'

import shipSpecifications from '@/data/ship-specifications'
import shipSafety from '@/data/ship-safety'
import shipEntertainment from '@/data/ship-entertainment'

import { pipeUp, mergeObjectsToLeft, isNewForm, deleteObjField } from '@common/utils'

export default {
  name: 'ShipEditor',

  props: {
    id: {
      type: String,
    }
  },

  mixins: [],

  components: {
    ShipFormModel,
    FormTopBar,
    ShipBasicInfoForm,
    ShipEntertainmentForm,
    ShipSafetyForm,
    // ShipFeaturesFormContainer,
    ShipMediaForm,
    CabinsEditor,
  },

  data: function () {
    return {
      tab: 'tab-basic',

      tabs: [
        {title: "Basic data", slug: 'basic', component: ShipBasicInfoForm},
        {title: "Accomodation", slug: 'accomodation', component: CabinsEditor},
        {title: "Entertainment", slug: 'entertainment', component: ShipEntertainmentForm},
        {title: "Safety", slug: 'safety', component: ShipSafetyForm},
        // {title: "Features", slug: 'features', component: ShipFeaturesFormContainer},
        {title: "Media", slug: 'media', component: ShipMediaForm},
      ],

      cabinActiv: 0,
    }
  },

  methods: {
    shipBasicData (item) {
      let data = {
        name: '',
        slug: '',
        excerpt: '',
        description: '',
        shipLayout: '',
        shipLayoutText: '',
        shipSpecifications: shipSpecifications,
        shipSpecificationsText: '',
      }
      return mergeObjectsToLeft(data, item)
    },

    shipSafetyData (item) {
      let data = {
        shipSafety: shipSafety
      }
      return mergeObjectsToLeft(data, item)
    },

    shipEntertainmentData (item) {
      let data = {
        shipEntertainment: shipEntertainment
      }
      // console.log('data.tenders %o', data.shipEntertainment.tenders)
      // console.log('item.tenders %o', item.shipEntertainment.tenders)
      // let r = mergeObjectsToLeft(data, item)
      // console.log('merged.tenders %o', r.shipEntertainment.tenders)
      let entertainment = mergeObjectsToLeft(data, item)
      return deleteObjField(entertainment, '__typename')
    },

    shipFeaturesData (item) {
      let data = {
        shipFeatures: [],
        shipFeaturesText: '',
        foodAndDrinksFeatures: [],
        foodAndDrinksFeaturesText: '',
        divingFeatures: [],
        divingFeaturesText: '',
        gearRental: '',
        gearRentalText: '',
        navSafteyFeatures: [],
        navSafteyFeaturesText: '',
      }
      return mergeObjectsToLeft(data, item)
    },

    shipMediaData (item) {
      let data = {
        image: '',
        gallery: [],
      }
      return mergeObjectsToLeft(data, item)
    },

    resetTabs () {
      this.tab = 'tab-basic'
    },

    pipeUp (...events) {
      return pipeUp(this, events)
    },

    isDisabledTab (slug, formState) {
      return isNewForm(formState) && slug != 'basic'
    },

    onTabsChange (val) {
      if(val == 'tab-accomodation') {
        this.cabinActiv++
      }
    }
  },

  watch: {
    id:  function () {
      this.resetTabs()
    },
  }
}

</script>
