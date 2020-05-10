<template>
  <ShipFormModel
  :id="id"
  v-slot="{item, modelState, formEvents}"
  v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
  >
  <div>

    <base-material-card class="px-5 py-3">
      <template v-slot:heading>

        <FormTopBar
        addNewTitle="Add New Ship"
        v-bind="modelState"
        v-on="formEvents"
        :name="item.name"
        @cancel="$emit('cancel')"
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
        v-on="formEvents"
        />
      </v-tab-item>

      <v-tab-item
      value="tab-features"
      >
        <ShipFeaturesFormContainer
        :item="shipFeaturesData(item)"
        v-bind="modelState"
        v-on="formEvents"
        />
      </v-tab-item>

      <v-tab-item
      value="tab-media"
      >
        <ShipMediaForm
        :item="shipMediaData(item)"
        v-bind="modelState"
        v-on="formEvents"
        />
      </v-tab-item>

      <v-tab-item
      value="tab-cabins"
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
import ShipFeaturesFormContainer from '@/components/forms/ShipFeaturesFormContainer'
import ShipMediaForm from '@/components/forms/ShipMediaForm'
import CabinsEditor from '@/components/editors/CabinsEditor'


import { pipeEvents, mergeObjectsToLeft, isNewForm } from '@common/utils'

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
    ShipFeaturesFormContainer,
    ShipMediaForm,
    CabinsEditor,
  },

  data: function () {
    return {
      tab: 'tab-basic',

      tabs: [
        {title: "Basic data", slug: 'basic', component: ShipBasicInfoForm},
        {title: "Features", slug: 'features', component: ShipFeaturesFormContainer},
        {title: "Media", slug: 'media', component: ShipMediaForm},
        {title: "Cabins", slug: 'cabins', component: CabinsEditor},
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
        shipSpecifications: {
          length: null,
          beam: null,
          topSpeed: null,
          cruisingSpeed: null,
          engines: '',
          maxGuests: null,
          bathrooms: null,
          tenders: '',
          waterCapacity: null,
          fuelCapacity: null,
          freshwaterMaker: false
        },
        shipSpecificationsText: '',
      }
      return mergeObjectsToLeft(data, item)
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

    pipeUpEvents (...events) {
      return pipeEvents(this, ...events)
    },

    isDisabledTab (slug, formState) {
      return isNewForm(formState) && slug != 'basic'
    },

    onTabsChange (val) {
      if(val == 'tab-cabins') {
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
