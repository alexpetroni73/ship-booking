import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let image = '@/assets/bg1.jpg'

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
    barImage: image,
    drawer: null,
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
