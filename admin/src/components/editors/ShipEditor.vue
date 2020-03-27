<template>
  <ShipFormModel
  :id="id"
  v-slot="{item, modelState, formEvents}"
  v-on="pipeUpEvents('new-item', 'item-created', 'item-deleted')"
  >
    <ItemFormEditorWrapper
    addNewTitle="Add New Ship"
    :showActionButtons="false"
    v-bind="modelState"
    v-on="formEvents"
    :name="item.name"
    >
    <v-tabs
     v-model="tab"
     class="elevation-2"
     centered
     >
      <v-tab
        v-for="t in tabs"
        :key="t.slug"
        :href="`#tab-${t.slug}`"
        :disabled="isDisabledTab(t.slug, modelState.formState)"
      >
        {{ t.title }}
      </v-tab>

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
        />
      </v-tab-item>

        <!-- <v-tab-item
          v-for="t in tabs"
          :key="t.slug"
          :value="'tab-' + t.slug"
        >
          <component
          :is="t.component"
          :item="parseItemFor(item, t.slug)"
          v-bind="modelState"
          v-on="formEvents"
          />
        </v-tab-item> -->
      </v-tabs>
    </ItemFormEditorWrapper>
  </ShipFormModel>


  <!-- <ItemEditorWrapper
  :formState="formState"
  :error="error"
  v-on="onEvents"
  addNewTitle="Add New Ship"
  :name="editedItemName"
  :disableSubmitBtn="disableSubmitBtn"
  :showActionButtons="false"
  >
  <v-tabs
   v-model="tab"
   class="elevation-2"
   centered
   >
    <v-tab
      v-for="t in tabs"
      :key="t.slug"
      :href="`#tab-${t.slug}`"
      :disabled="isDisabledTab(t.slug)"
    >
      {{ t.title }}
    </v-tab>

    <v-tab-item
      v-for="t in leafTabs"
      :key="t.slug"
      :value="'tab-' + t.slug"
    >
      <v-card>
        <component
        :is="t.component"
        :id="id"
        :item="item"
        :formState="formState"
        >
       </component>
     </v-card>
    </v-tab-item>

    <v-tab-item
    value="tab-basic"
    >


    </v-tab-item>
</v-tabs>



  </ItemEditorWrapper> -->
</template>

<script>
import ShipFormModel from '@/components/models/ShipFormModel'
import ItemFormEditorWrapper from '@/components/shared/ItemFormEditorWrapper'
import ShipBasicInfoForm from '@/components/forms/ShipBasicInfoForm'
import ShipFeaturesFormContainer from '@/components/forms/ShipFeaturesFormContainer'
import ShipMediaForm from '@/components/forms/ShipMediaForm'
import CabinsEditor from '@/components/editors/CabinsEditor'


import { pipeEvents, mergeObjectsToLeft, isNewForm } from '@/utils'

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
    ItemFormEditorWrapper,
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
    }
  },

  computed: {

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
  },

  watch: {
    id:  function () {
      this.resetTabs()
    },
  }
}

</script>
