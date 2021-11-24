import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import preset from './default-preset/preset'

Vue.use(Vuetify)

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
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#696969',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
})
