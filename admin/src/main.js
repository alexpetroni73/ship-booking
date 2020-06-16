import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { createProvider } from './vue-apollo'
import i18n from './i18n'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/dam-img'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
