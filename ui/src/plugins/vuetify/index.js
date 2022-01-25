import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import preset from './default-preset/preset'

Vue.use(Vuetify)

var tema = localStorage.getItem('theme') === 'dark' ? true : false
export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
    dark: tema,
  },
})
