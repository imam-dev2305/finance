<template>
  <div>
    <v-card>
      <v-card-title>
        <v-toolbar
          fixed
          class="bg-gradient-primary"
        >
          <v-btn
            icon
            color="white"
            exact-path
            :to="{name: 'currency'}"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="white"
            @click.once="saveCurrency"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-form ref="currency_add">

          <v-select
            v-model="frm.currency_name"
            :items="country"
            :rules="[rules.required]"
            item-text="code"
            item-value="code"
            :hint="frm.currency_name"
            persistent-hint
            label="Currency"
            @change="setCurrency"
          ></v-select>

          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="frm.currency_convert_to"
                readonly
                label="From"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="frm.currency_origin"
                readonly
                label="To"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn
                color="primary"
                @click="getRate"
                x-small
              >
                Refresh
              </v-btn>
            </v-col>
          </v-row>

          <v-text-field
            v-model="currency_value"
            readonly
            label="Exchange Rate"
            reverse
          ></v-text-field>

        </v-form>
      </v-card-text>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar.value"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{snackbar.message}}
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: "CurrencyAddLayout",
    data() {
      return {
        frm: {
          currency_origin: '',
          currency_name: '',
          currency_convert_to: '',
          currency_value: '',
        },
        currency_value: '',
        rules: {
          required: value => !!value || 'Required.',
        },
        country: [],
        snackbar: {
          value: false,
          timeout: 1000,
          message: '',
          color: 'success',
        },
        overlay: false,
      }
    },
    mounted() {
      this.getCountry()
      this.getUser()
    },
    methods: {
      getCountry() {
        axios.get('country/currency', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
            const data = JSON.stringify(response.data.data)
            this.country = JSON.parse(data)
          })
      },

      getRate() {
        this.overlay = true
        axios.post('currencies/exchange_rate', this.frm, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.overlay = false
          const data = response.data.data
          this.frm.currency_value = data.toLocaleString('id')
          this.currency_value = data.toLocaleString('id', {style: 'currency', currency: this.frm.currency_origin})
        })
      },

      getUser() {
        axios.get('user', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = response.data.data
          this.frm.currency_origin = data.base_currency
        })
      },

      setCurrency() {
        this.frm.currency_convert_to = this.frm.currency_name
        this.getRate()
      },

      saveCurrency() {
        if (this.$refs.currency_add.validate()) {
          axios.post('currencies/save', this.frm, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.bearer}`
            }
          }).then((response) => {
            this.snackbar.value = true
            this.snackbar.color = 'success'
            this.snackbar.message = response.data.message
          }).catch((e) => {
            const response = e.response.data
            this.snakcbar.value = true
            this.snackbar.message = response.message
            this.snackbar.color = 'warning'
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
