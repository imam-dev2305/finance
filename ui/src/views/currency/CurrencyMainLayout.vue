<template>
  <div>
    <v-card>
      <v-card-text>
        <v-list
          shaped
        >
          <v-list-item-group
            multiple
          >
            <template v-for="(currency, k) in currencies">
              <v-list-item :key="k">
                <v-list-item-content>
                  <v-list-item-title>{{currency.currency_exchange_name}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-menu
                    bottom
                    right
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        v-show="currency.currency_exchange_deleteable"
                      >
                        <v-icon class="grey--text">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        :to="{name: 'currency-edit', params: {id: currency.currency_exchange_id}}"
                      >
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        @click="deleteContext({item: currency, k})"
                      >
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="k < currencies.length - 1"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-model="snackbar.value"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{snackbar.message}}
    </v-snackbar>
    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        dark
        bottom
        right
        :to="{name: 'currency-add'}"
        class="v-btn--example"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
  export default {
    name: "CurrencyMainLayout",
    data() {
      return {
        currencies: [],
        snackbar: {
          value: false,
          timeout: 1000,
          message: '',
          color: 'success',
        },
      }
    },
    mounted() {
      this.getCurrency()
    },
    methods: {
      getCurrency() {
        axios.get('currencies/get', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        })
          .then((response) => {
            const data = JSON.stringify(response.data.data)
            this.currencies = JSON.parse(data)
          })
          .catch((e) => {
            const data = e.response.data
            const response = e.response.status
            if (response === 401) {
              localStorage.clear();
              this.$router.push({name: 'pages-login'})
            }
          })
      },

      deleteContext(item) {
        axios.post('currencies/delete', item.item, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = response.data
          this.snackbar.value = true
          if (data.flag === 1) {
            this.snackbar.color = 'success'
          } else {
            this.snackbar.color = 'warning'
          }
          this.snackbar.message = data.message
          this.getCurrency()
        })
      }
    }
  }
</script>

<style scoped>
  .v-btn--example {
    bottom: 70px;
    right: 40px;
    position: fixed !important;
  }
</style>
