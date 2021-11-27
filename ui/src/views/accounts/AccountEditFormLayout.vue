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
            outlined
            dense
            placeholder="Account Name"
            hide-details
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
            outlined
            dense
            placeholder="Bank Account Number"
            hide-details
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
          <v-select
            v-model="frm.currency_id"
            :items="currency"
            item-text="currency_name"
            item-value="currency_id"
            :hint="`${frm.currency_id}`"
            persistent-hint
            label="Currency"
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
          <v-select
            v-model="frm.account_type_id"
            :items="types"
            item-text="account_type_name"
            item-value="account_type_id"
            label="Type"
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
            color="warning"
            @click="accountUpdate"
          >
            Update
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
    <Error v-show="renderError"></Error>
  </div>
</template>

<script>
  import Error from '@/views/Error.vue'

  export default {
    name: 'AccountEditFormLayout',
    components: {
      Error,
    },
    data() {
      return {
        renderPage: false,
        renderError: false,
        frm: {
          account_name: '',
          account_type_id: '',
          bank_account_number: '',
          currency_id: '',
          amount: '',
        },
        types: this.$store.getters.account_type,
        currency: this.$store.getters.currency,
        overlay: true,
        alert: {
          success: false,
          danger: false,
          warning: false,
        },
        alert_message: '',
      }
    },
    mounted() {
      this.getAccount()
    },
    methods: {
      numberOnly(e) {
        if (e.target.value.match(/^([\d]+$)/g) !== null) {
          this.frm.amount = e.target.value.toString()
        } else {
          // eslint-disable-next-line no-useless-escape
          this.frm.amount = e.target.value.replace(new RegExp('([\[a-zA-Z]*)', 'g'), '')
        }
      },
      numbers(e) {
        const num = e.target.value.replace(/(?:\.)/g, '')
        if (num.match(/([\d]+$)/g) !== null) {
          this.frm.amount = num.toString()
        }
      },
      getAccount() {
        /* eslint-disable */
        axios.get(`account/get/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = response.data;
          data.data.amount = data.data.amount.toLocaleString('id');
          this.frm = data.data;
          this.overlay = false;
          this.renderPages();
        });
      },
      renderPages() {
        if (this.frm.account_name !== '') {
          this.renderPage = true
        } else {
          this.renderError = true
        }
        this.overlay = false
      },
      accountUpdate() {
        var data = this.frm
        axios.post('account/edit', data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.alert_message = response.data.message
          if (response.data.status === '400') {
            this.alert.danger = true
            setTimeout(() => this.alert.danger = false, 3000)
          } else if (response.data.status === '403') {
            this.alert.warning = true
            setTimeout(() => this.alert.warning = false, 3000)
          } else {
            this.alert.success = true
            setTimeout(() => this.alert.success = false, 3000)
          }
        });
      },
    },
  }
</script>

<style scoped>
</style>
