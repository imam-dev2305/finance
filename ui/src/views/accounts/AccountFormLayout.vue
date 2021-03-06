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
            title="close"
            :to="{name: 'accounts'}"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="white"
            title="save"
            @click.once="accountSave"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-progress-linear
          indeterminate
          :active="overlay"
        ></v-progress-linear>
        <v-form v-show="renderPage">
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <label>Account Name</label>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                id="accountName"
                v-model="frm.account_name"
                dense
                placeholder="Account Name"
                :error-count="frmError.account_name.length"
                :error-messages="frmError.account_name"
                @keyup.stop.native="alphabetOnly"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <label>Bank Account Number</label>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                id="bankAccountNumber"
                v-model="frm.bank_account_number"
                dense
                placeholder="Bank Account Number"
                hide-details
                :error-count="frmError.bank_account_number.length"
                :error-messages="frmError.bank_account_number"
                @keyup="numberOnly"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <label>Currency</label>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-skeleton-loader
                v-show="!skeleton.text"
                type="text"
                transition="fade-transition"
              ></v-skeleton-loader>
              <v-select
                v-show="skeleton.text"
                v-model="frm.currency_id"
                :items="currency"
                item-text="currency_exchange_name"
                item-value="currency_exchange_id"
                persistent-hint
                dense
                placeholder="Currency"
                :error-count="frmError.currency_id.length"
                :error-messages="frmError.currency_id"
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <label>Type</label>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-skeleton-loader
                v-show="!skeleton.text"
                type="text"
                transition="fade-transition"
              ></v-skeleton-loader>
              <v-select
                v-show="skeleton.text"
                v-model="frm.account_type_id"
                :items="types"
                item-text="account_type_name"
                item-value="account_type_id"
                placeholder="Type"
                dense
                :error-count="frmError.account_type_id.length"
                :error-messages="frmError.account_type_id"
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <label>Amount</label>
            </v-col>

            <v-col
              cols="12"
              md="9"
            >
              <v-text-field
                id="amount"
                v-model="frm.amount"
                dense
                placeholder="Amount"
                reverse
                :error-count="frmError.amount.length"
                :error-messages="frmError.amount"
                @keyup.stop.native="numberOnly"
                @blur="currencyOnly"
                @focus="numbers"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <label>Color</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
            >
              <v-select
                v-model="frm.color"
                dense
                :items="['bg-gradient-red', 'bg-gradient-orange', 'bg-gradient-yellow', 'bg-gradient-green', 'bg-gradient-light-blue', 'bg-gradient-blue', 'bg-gradient-purple', 'bg-gradient-primary']"
                :error-count="frmError.color.length"
                :error-messages="frmError.color"
              >
                <template slot="item" slot-scope="{item}">
                  <div :class="item" style="width: 100%; min-height: 20px;"></div>
                </template>
                <template slot="selection" slot-scope="{item}">
                  <div :class="item" style="width: 100%; min-height: 20px;"></div>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
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
    name: 'AccountFormLayout',
    data() {
      return {
        renderPage: true,
        frm: {
          account_name: '',
          account_type_id: '',
          bank_account_number: '',
          currency_id: '',
          amount: '',
          color: '',
        },
        frmError: {
          account_name: '',
          account_type_id: '',
          bank_account_number: '',
          currency_id: '',
          amount: '',
          color: '',
        },
        types: this.$store.getters.account_type,
        currency: [],
        overlay: false,
        skeleton: {
          text: true,
        },
        snackbar: {
          value: false,
          timeout: 1000,
          message: '',
          color: 'success',
        },
      }
    },
    watch: {
      // eslint-disable-next-line
      'frm.account_name': function (val) {
        this.frmError.account_name = ''
      },
      // eslint-disable-next-line
      'frm.currency_id': function (val) {
        this.frmError.currency_id = ''
      },
      // eslint-disable-next-line
      'frm.account_type_id': function (val) {
        this.frmError.account_type_id = ''
      },
      // eslint-disable-next-line
      'frm.amount': function (val) {
        this.frmError.amount = ''
      },
      // eslint-disable-next-line
      'frm.color': function (val) {
        this.frmError.color = ''
      }
    },
    mounted() {
      this.getCurrency()
    },
    methods: {
      alphabetOnly(e) {
        if (e.target.value.match(/([a-zA-Z]+$)/g) !== null) {
          this.frm.account_name = e.target.value.toUpperCase()
        } else {
          this.frm.account_name = e.target.value.substr(0, (e.target.value.length - 1))
        }
      },

      numberOnly(e) {
        if (e.target.value.match(/^([\d]+$)/g) !== null) {
          e.target.value = e.target.value.toString()
        } else {
          // eslint-disable-next-line no-useless-escape
          e.target.value = e.target.value.replace(new RegExp('(\[a-zA-Z]*)', 'g'), '')
        }
      },

      numbers(e) {
        const num = e.target.value.replace(/(?:\.)/g, '')
        if (num.match(/([\d]+$)/g) !== null) {
          this.frm.amount = num.toString()
        }
      },

      getCurrency() {
        axios.get('currencies/get', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        })
        .then((response) => {
          const data = JSON.stringify(response.data.data)
          this.currency = JSON.parse(data)
        });
      },

      accountSave() {
        /* eslint-disable */
        axios.post('account/save', this.frm, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          var data = response.data
          this.snackbar.value = true
          this.snackbar.message = data.message
          this.snackbar.color = 'success'
          setTimeout(() => {
            this.$router.push({name: 'accounts'})
          }, 1500)
        }).catch((e) => {
          var data = e.response.data
          switch (data.flag) {
            case 2:
              Object.keys(this.frmError).forEach((key) => {
                if (key in data.message) {
                  this.frmError[key] = data.message[key]
                } else {
                  this.frmError[key] = ''
                }
              })
              break
            case 3:
            default:
              this.snakcbar.value = true
              this.snackbar.message = data.message
              this.snackbar.color = 'warning'
              break
          }
        })
      },
    }
  }
</script>

<style scoped>
</style>
