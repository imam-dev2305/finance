<template>
  <div>
    <v-card>
      <v-card-title>
        <v-toolbar
          fixed
          elevation="0"
          class="bg-gradient-primary"
        >
          <v-btn
            icon
            exact-path
            tag="button"
            :to="{name: 'accounts'}"
            title="Back"
            color="white"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            icon
            title="Delete"
            @click="accountDeleteModal"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
          <v-btn
            color="white"
            icon
            title="Update"
            @click="accountUpdate"
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
              <v-select
                v-model="frm.currency_id"
                :items="currency"
                item-text="currency_exchange_name"
                item-value="currency_exchange_id"
                persistent-hint
                label="Currency"
                dense
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
              <v-select
                v-model="frm.account_type_id"
                :items="types"
                item-text="account_type_name"
                item-value="account_type_id"
                label="Type"
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

    <Error v-show="renderError"></Error>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete {{ frm.account_name }} from your account?
        </v-card-title>
        <v-card-text>Once deleted, all of transactions related to this account will be deleted
          too.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = !dialog"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="accountDelete"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          color: '',
        },
        frmError: {
          account_name: '',
          account_type_id: '',
          bank_account_number: '',
          currency_id: '',
          amount: '',
        },
        types: this.$store.getters.account_type,
        currency: [],
        overlay: true,
        dialog: false,
        snackbar: {
          value: false,
          timeout: 1000,
          message: '',
          color: 'success',
        }
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
      this.getAccount()
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
          e.target.value = e.target.value.replace(new RegExp('([\[a-zA-Z]*)', 'g'), '')
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
          this.snackbar.value = true
          this.snackbar.message = 'Update successfull'
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
              this.snackbar.value = true
              this.snackbar.message = data.message
              this.snackbar.color = 'warning'
              break
          }
        })
      },
      accountDeleteModal() {
        this.dialog = true
      },
      accountDelete() {
        this.dialog = !this.dialog
        axios.post('account/delete', { account_id: this.frm.account_id }, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          this.snackbar.value = true
          this.snackbar.message = response.data.message
          if (response.data.flag === 2) {
            this.snackbar.color = 'warning'
          }
          setTimeout(() => this.$router.push({name: 'accounts'}), 2000)
        }).catch((e) => {
          var data = e.response.data
          this.snackbar.value = true
          this.snackbar.message = data.message
          this.snackbar.color = 'warning'
        })
      },
    },
  }
</script>

<style scoped>
</style>
