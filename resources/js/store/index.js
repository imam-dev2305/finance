import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bearer: localStorage.getItem('bearer'),
    account_type: JSON.parse(localStorage.getItem('account_type')),
    currency: JSON.parse(localStorage.getItem('currency')),
    transaction_type: JSON.parse(localStorage.getItem('transaction_type')),
  },
  getters: {
    bearer: state => state.bearer,
    account: state => state.account,
    account_type: state => state.account_type,
    currency: state => state.currency,
    category: state => state.category,
    transaction_type: state => state.transaction_type,
  },
  mutations: {
    USER_LOGIN(state, data) {
      localStorage.setItem('bearer', data.token)
      localStorage.setItem('account_type', JSON.stringify(data.accounts_type))
      localStorage.setItem('currency', JSON.stringify(data.currencies))
      localStorage.setItem('transaction_type', JSON.stringify(data.transactions_type))
      state.account = data.accounts
      state.account_type = data.accounts_type
      state.currency = data.currencies
      state.category = data.categories
      state.transaction_type = data.transactions_type
      state.bearer = data.token
    },
    USER_LOGOUT(state) {
      localStorage.removeItem('bearer')
      state.bearer = ''
    },
  },
  actions: {
    USER_LOGIN({ commit }, token) {
      commit('USER_LOGIN', token)
    },
    USER_LOGOUT({ commit }) {
      commit('USER_LOGOUT')
    },
  },
  modules: {},
})
