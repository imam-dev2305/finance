import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import axios from 'axios'
import mixin from './mixin'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

window.axios = axios
Vue.prototype.window = window
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `http://${window.location.hostname}/api` : `http://${window.location.hostname}/api`

new Vue({
  mixins: [mixin],
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
