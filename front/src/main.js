import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import i18n from './i18n'
import vuetify from './plugins/vuetify';
import './plugins/base'
// import './plugins/dam-img'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
