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
        <v-form ref="currency_update">
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="frm.currency_exchange_name"
                readonly
                label="From"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="frm.currency_exchange_convert_to"
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
            v-model="currency_exchange_value"
            readonly
            label="Exchange Rate"
            :rules="[rules.required]"
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
    name: "CurrencyEditLayout",
    data() {
      return {
        frm: {
          currency_exchange_id: '',
          currency_exchange_name: '',
          currency_exchange_convert_to: '',
          currency_exchange_value: '',
        },
        currency_exchange_value: '',
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
      this.getCurrency()
      this.getCountry()
    },
    methods: {
      getCurrency() {
        axios.get(`currencies/get/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = JSON.stringify(response.data.data)
          this.frm = JSON.parse(data)
          this.currency_exchange_value = this.frm.currency_exchange_value.toLocaleString('id', {currency: this.frm.currency_exchange_convert_to, style: 'currency'})
        })
      },

      getCountry() {
        axios.get('country/currency', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = JSON.stringify(response.data.data)
          this.country = JSON.parse(data)
          this.country.push({code: this.frm.currency_exchange_name})
        })
      },

      getRate() {
        this.overlay = true
        axios.post('currencies/exchange_rate', {currency_origin: this.frm.currency_exchange_convert_to, currency_convert_to: this.frm.currency_exchange_name}, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.overlay = !this.overlay
          const data = response.data.data
          this.frm.currency_exchange_value = data.toLocaleString('id')
          this.currency_exchange_value = data.toLocaleString('id', {style: 'currency', currency: this.frm.currency_exchange_convert_to})
        })
      },

      saveCurrency() {
        if(this.$refs.currency_update.validate()) {
          const data = new Object();
          data.currency_exchange_id = this.frm.currency_exchange_id
          data.currency_exchange_value = this.frm.currency_exchange_value
          axios.post('currencies/edit', data, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.bearer}`
            }
          }).then((response) => {
            const data = response.data
            console.log(data.message)
            this.snackbar.value = true
            this.snackbar.color = 'success'
            this.snackbar.message = data.message
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
