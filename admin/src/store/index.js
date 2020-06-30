import Vue from 'vue'
import Vuex from 'vuex'

import countriesList from '@common/assets/all-countries-list'
import classedList from '@common/assets/classed-list'
import shipTypesList from '@common/assets/ship-types-list'
import hullMaterialsList from '@common/assets/hull-materials-list'
import hullTypesList from '@common/assets/hull-types-list'
import hotWaterTypesList from '@common/assets/hot-water-types-list'
import airConditioningTypesList from '@common/assets/air-conditioning-types-list'
import operatingLicenseTypesList from '@common/assets/operating-licenses-types-list'
import designationTypesList from '@common/assets/designation-types-list'
import availableForTypesList from '@common/assets/available-for-types-list'
import cabinsTypesList from '@common/assets/cabins-types-list'
import bedsTypesList from '@common/assets/beds-types-list'
import pullmanBedsTypesList from '@common/assets/pullman-beds-types-list'

Vue.use(Vuex)

let image = '@/assets/bg1.jpg'

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
    barImage: image,
    drawer: null,

    countriesList: countriesList,
    classedList: classedList,
    shipTypesList: shipTypesList,
    hullMaterialsList: hullMaterialsList,
    hullTypesList: hullTypesList,
    hotWaterTypesList: hotWaterTypesList,
    airConditioningTypesList: airConditioningTypesList,
    operatingLicenseTypesList: operatingLicenseTypesList,
    designationTypesList: designationTypesList,
    availableForTypesList: availableForTypesList,
    cabinsTypesList: cabinsTypesList,
    bedsTypesList: bedsTypesList,
    pullmanBedsTypesList: pullmanBedsTypesList, 

  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
