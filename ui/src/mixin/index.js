import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://localhost:8000/api/' : 'http://localhost:8000/api/'
axios.defaults.headers.common = {
  Authorization: 'Bearer 2|r5DRxChJ2DuHyi95DQIrDnI8pGUYdsU2d558W5Et',
}

export default Vue.mixin({
  methods: {
    /**
     * @return {string}
     */
    ValidateNumberOnly(value) {
      if (value === '') {
        return 'Field can\'t be empty'
      }
      if (value !== null) {
        const num = value.replace(/(?:\.)/g, '')
        if (num.match(/^([\d]+$)/g) === null) {
          return 'Only number are allowed'
        }
      }

      return true
    },
    currencyOnly(e) {
      const num = e.target.value.replace(/(?:\.)/g, '')
      if (num.match(/([\d]+$)/g) !== null) {
        e.target.value = num.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.')
      } else {
        e.target.value = num.substr(0, (e.target.value.length - 1)).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.')
      }
    },
  },
})
