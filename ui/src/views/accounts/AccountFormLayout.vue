<template>
  <div>
    <v-alert
      v-model="alert.success"
      dense
      outlined
      text
      type="success"
      transition="scroll-x-transition"
    >
      {{ alert_message }}
    </v-alert>

    <v-alert
      v-model="alert.danger"
      dense
      outlined
      text
      type="error"
    >
      {{ alert_message }}
    </v-alert>

    <v-alert
      v-model="alert.danger"
      dense
      outlined
      text
      type="warning"
    >
      {{ alert_message }}
    </v-alert>

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
            item-text="currency_name"
            item-value="currency_id"
            :hint="`${frm.currency_id}`"
            persistent-hint
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
          offset-md="3"
          cols="12"
        >
          <v-btn
            color="primary"
            @click="accountSave"
          >
            Save
          </v-btn>
          <v-btn
            class="mx-2"
            outlined
            :to="{name: 'accounts'}"
          >
            Back
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
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
        },
        frmError: {
          account_name: '',
          account_type_id: '',
          bank_account_number: '',
          currency_id: '',
          amount: '',
        },
        types: this.$store.getters.account_type,
        currency: this.$store.getters.currency,
        overlay: false,
        alert: {
          success: false,
          danger: false,
          warning: false,
        },
        alert_message: '',
        skeleton: {
          text: true,
        },
      }
    },
    watch: {
      // eslint-disable-next-line
      'frm.account_name': function () {
        this.frmError.account_name = ''
      },
      // eslint-disable-next-line
      'frm.currency_id': function () {
        this.frmError.currency_id = ''
      },
      // eslint-disable-next-line
      'frm.account_type_id': function () {
        this.frmError.account_type_id = ''
      },
      // eslint-disable-next-line
      'frm.amount': function () {
        this.frmError.amount = ''
      },
    },
    mounted() {
      // this.getAccount()
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
          this.frm.amount = e.target.value.toString()
        } else {
          // eslint-disable-next-line no-useless-escape
          this.frm.amount = e.target.value.replace(new RegExp('(\[a-zA-Z]*)', 'g'), '')
        }
      },
      numbers(e) {
        const num = e.target.value.replace(/(?:\.)/g, '')
        if (num.match(/([\d]+$)/g) !== null) {
          this.frm.amount = num.toString()
        }
      },
      accountSave() {
        /* eslint-disable */
        axios.post('account/save', this.frm, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          var data = response.data
          this.alert.danger = false
          this.alert.success = true
          this.alert_message = data.message
        }).catch((e) => {
          var data = e.response.data
          switch (data.flag) {
            case 2:
              this.alert.danger = false
              this.alert.success = false
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
              this.alert.danger = true
              this.alert_message = data.message
              break
          }
        })
      },
    }
  }
</script>

<style scoped>
</style>
