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
            :to="{name: 'transactions'}"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="white"
            @click.once="saveTransaction"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-form ref="transactions_add">

          <v-select
            v-model="frm.transaction_type_id"
            :items="transaction_type"
            item-text="transaction_type_name"
            item-value="transaction_type_id"
            label="Transaction Type"
            @change="changeAccount"
          ></v-select>

          <v-select
            v-model="frm.account_id"
            label="Account"
            :items="accounts"
            item-text="account_name"
            item-value="account_id"
            @change="changeDestination"
          ></v-select>

          <v-text-field
            v-model="categories.selected"
            label="Categories"
            readonly
            append-icon="mdi-apps"
            @click:append="dialog.categories = true"
            v-show="frm.transaction_type_id == 1 || frm.transaction_type_id == 2"
          >
          </v-text-field>

          <v-select
            v-model="frm.destination_account_id"
            label="Destination Account"
            :items="destination_account"
            item-text="account_name"
            item-value="account_id"
            v-show="frm.transaction_type_id === 3"
          ></v-select>

          <v-text-field
            v-model="frm.transaction_note"
            label="Note"
          ></v-text-field>

          <v-text-field
            v-model="amount"
            label="amount"
            reverse
            @keyup.stop.native="numberOnly"
            @blur="currencyOnly($event,{style: 'currency', currency: frm.currency_exchange_name})"
            @focus="amount = frm.amount.toString()"
          ></v-text-field>

          <v-menu
            ref="menu"
            v-model="menu_date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template slot="activator" slot-scope="{on, attrs}">
              <v-text-field
                v-model="frm.transaction_date"
                label="Transaction Date"
                append-icon="mdi-calendar"
                @click:append="menu_date = !menu_date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="frm.transaction_date"
              no-title
            ></v-date-picker>
          </v-menu>

          <v-menu
            ref="menu_time"
            v-model="menu_time"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="frm.transaction_time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="frm.transaction_time"
                label="Transaction Time"
                append-icon="mdi-clock-time-four-outline"
                @click:append="menu_time = !menu_time"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu_time"
              v-model="frm.transaction_time"
              full-width
              scrollable
              format="24hr"
              use-seconds
              @click:second="$refs.menu_time.save(frm.transaction_time)"
              @click:minute="$refs.menu_time.save(frm.transaction_time)"
              @click:hour="$refs.menu_time.save(frm.transaction_time)"
            ></v-time-picker>
          </v-menu>

        </v-form>
      </v-card-text>

    </v-card>

    <v-dialog
      v-model="dialog.categories"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog.categories = false"
            v-if="categories.prev_list.length < 1"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
            icon
            dark
            @click="showPrevPanels"
            v-else
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Categories</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            dark
            icon
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel
              readonly
              v-for="(category, k) in categories.current_list"
              :key="k"
            >
              <v-expansion-panel-header
                hide-actions
                class="white--text"
                @click="showChildPanels(category)"
                :color="category.category_color"
              >{{category.category_name}}</v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
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
  var d = new Date();
  var dd = ('0' + d.getDate()).slice(-2)
  var mm = ('0' + d.getMonth()).slice(-2)
  var yy = d.getFullYear()
  var hh = ('0' + d.getHours()).slice(-2)
  var ii = ('0' + d.getMinutes()).slice(-2)
  var ss = ('0' + d.getSeconds()).slice(-2)

  export default {
    name: 'TransactionsAddLayout',
    data() {
      return {
        frm: {
          transaction_type_id: '',
          account_id: '',
          category_id: '',
          destination_account_id: 0,
          transaction_note: '',
          amount: '',
          transaction_date: `${yy}-${mm}-${dd}`,
          transaction_time: `${hh}:${ii}:${ss}`,
        },
        amount: '',
        menu_date: false,
        menu_time: false,
        dialog: {
          categories: false
        },
        transaction_type: this.$store.getters.transaction_type,
        list_accounts: [],
        accounts: [],
        destination_account: [],
        categories: {
          current_list: [],
          prev_list: [],
          selected: '',
        },
        snackbar: {
          value: false,
          timeout: 2000,
          message: '',
          color: 'success',
        },
      }
    },
    mounted() {
      this.getCategories()
      this.getAccounts()
      this.getTransaction()
    },
    watch: {
      'frm.account_id': function (val) {
        this.changeDestination()
      }
    },
    methods: {
      getAccounts() {
        axios.post('account/get', {}, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          const data = response.data.data.data
          this.accounts = data
          if (this.frm.transaction_type_id === 3) {
            this.accounts.push({account_id: "0", account_name: 'OTHERS'})
          }
        }).catch((e) => {
          const response = e.response.data
        })
      },

      getCategories() {
        axios.get('categories/get', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = JSON.parse(response.data.data.data)
          this.categories.current_list = [...data]
        }).catch((e) => {
          const response = e.response.data
        })
      },

      getTransaction() {
        axios.get(`transactions/get/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          const data = JSON.stringify(response.data.data[0])
          this.frm = JSON.parse(data)
          const d = new Date(JSON.parse(data).transaction_date)
          const dd = ('0' + d.getDate()).slice(-2)
          const mm = ('0' + (d.getMonth() + 1)).slice(-2)
          const yy = d.getFullYear()
          const hh = ('0' + d.getHours()).slice(-2)
          const ii = ('0' + d.getMinutes()).slice(-2)
          const ss = ('0' + d.getSeconds()).slice(-2)
          this.frm.amount = Math.abs(JSON.parse(data).amount)
          this.frm.transaction_date = `${yy}-${mm}-${dd}`
          this.frm.transaction_time = `${hh}:${ii}:${ss}`
          this.amount = parseFloat(this.frm.amount).toLocaleString('id', {style: 'currency', currency: this.frm.currency_exchange_name, minimumFractionDigits: 2, maximumFractionDigits: 2})
          this.categories.selected = this.frm.category_name
        })
      },

      saveTransaction() {
        var data = new Object();
        data.transaction_type_id = parseInt(this.frm.transaction_type_id)
        if ([3, 2].indexOf(data.transaction_type_id) >= 0) {
          if (this.frm.amount.toString().replace(/(?:\.)/g, '').replace(/(?:\,)/g, '.') < 0) {
            data.amount = this.frm.amount.toLocaleString('id')
          } else {
            data.amount = `-${this.frm.amount.toLocaleString('id')}`
          }
        } else {
          data.amount = this.frm.amount.toLocaleString('id')
        }
        data.transaction_id = this.frm.transaction_id
        data.account_id = this.frm.account_id
        data.category_id = this.frm.category_id
        data.destination_account_id = this.frm.destination_account_id
        data.transaction_note = this.frm.transaction_note
        data.transaction_date = this.frm.transaction_date
        data.transaction_time = this.frm.transaction_time
        axios.post('transactions/update', data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = response.data
          this.snackbar.value = true
          this.snackbar.message = data.message
          this.snackbar.color = 'success'
          setTimeout( () => {
            this.$router.push({name: 'transactions'})
          }, 2000)
        })
      },

      showChildPanels(item) {
        if (item.child.length > 0) {
          this.categories.prev_list.push(this.categories.current_list)
          this.categories.current_list = item.child
          item.child = []
          this.categories.current_list.unshift(item)
        } else {
          this.frm.category_id = item.category_id
          this.categories.selected = item.category_name
          this.categories.prev_list = []
          this.getCategories()
          this.dialog.categories = false
        }
      },

      showPrevPanels() {
        this.categories.current_list = this.categories.prev_list[this.categories.prev_list.length - 1]
        this.categories.prev_list.length -= 1;
      },

      changeAccount() {
        this.getAccounts()
        this.frm.category_id = ''
        this.frm.destination_account_id = ''
        this.frm.amount = ''
        this.amount = ''
      },

      changeDestination() {
        axios.post('account/get', {
          exclude: this.frm.account_id
        }, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          const data = response.data.data.data
          this.destination_account = data
          if (this.frm.account_id !== "0") {
            this.destination_account.push({account_id: "0", account_name: 'OTHERS'})
          }
          Object.keys(this.accounts).forEach(function (val) {
            if (this.accounts[val].account_id === this.frm.account_id) {
              this.frm.currency_exchange_name = this.accounts[val].currencies.currency_exchange_name
            }
          }, this)
        }).catch((e) => {
          const response = e.response.data
        })
      },

      numberOnly(e) {
        // if (e.target.value.match(/^([\d]+$)/g) !== null) {
        const num = e.target.value
        if (num.match(/^([\d])+(\.\d{2}|)$/g) !== null) {
          e.target.value = num.toString()
          this.frm.amount = parseFloat(num)
        } else {
          // eslint-disable-next-line no-useless-escape
          e.target.value = e.target.value.replace(new RegExp('(\[a-zA-Z]*)', 'g'), '')
        }
      },
    }
  }
</script>

<style scoped>

</style>
