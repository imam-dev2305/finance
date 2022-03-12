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
            v-show="frm.transaction_type_id == 3"
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
            @blur="currencyOnly($event, obj)"
            @focus="amount = frm.amount.toString().replace(/(?:\.)/g, '').replace(/(?:\,)/g, '.')"
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
          amount: 0,
          transaction_date: '',
          transaction_time: '',
          currency_exchange_name: 'IDR',
        },
        amount: '',
        obj : {
          style: 'decimal',
        },
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
    created() {
      this.DateTime()
    },
    mounted() {
      this.getCategories()
      this.getAccounts()
    },
    methods: {
      DateTime() {
        var d = new Date();
        var dd = ('0' + d.getDate()).slice(-2)
        var mm = ('0' + (d.getMonth() + 1)).slice(-2)
        var yy = d.getFullYear()
        var hh = ('0' + d.getHours()).slice(-2)
        var ii = ('0' + d.getMinutes()).slice(-2)
        var ss = ('0' + d.getSeconds()).slice(-2)
        this.frm.transaction_date = `${yy}-${mm}-${dd}`
        this.frm.transaction_time = `${hh}:${ii}:${ss}`
      },
      getAccounts() {
        axios.post('account/get', {}, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          const data = response.data.data.data
          this.accounts = data
          if (this.frm.transaction_type_id == 3) {
            this.accounts.push({account_id: 0, account_name: 'OTHERS'})
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
          const data = response.data.data
          this.categories.current_list = [...data]
        }).catch((e) => {
          const response = e.response.data
        })
      },

      saveTransaction() {
        let data = new Object();
        data.transaction_type_id = parseInt(this.frm.transaction_type_id)
        data.account_id = this.frm.account_id
        data.category_id = this.frm.category_id
        data.destination_account_id = this.frm.destination_account_id
        data.transaction_note = this.frm.transaction_note
        data.amount = this.frm.amount
        data.transaction_date = this.frm.transaction_date
        data.transaction_time = this.frm.transaction_time
        const new_amount = this.frm.amount.toString()
        if (this.frm.transaction_type_id === 2 || (this.frm.transaction_type_id === 3 && this.frm.account_id !== 0)) {
          data.amount = `-${new_amount.replace('/(?:\.)/g', '').replace('/(?:\,)/g', '.')}`
        } else {
          data.amount = new_amount.replace('/(?:\.)/g', '').replace('/(?:\,)/g', '.')
        }
        axios.post('transactions/save', data, {
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
        if ((item.hasOwnProperty('children_categories') && item.children_categories.length > 0) || (item.hasOwnProperty('categories') && item.categories.length > 0)) {
          this.categories.prev_list.push(this.categories.current_list)
          if (item.hasOwnProperty('children_categories')) {
            this.categories.current_list = item.children_categories
            item.children_categories = []
          } else {
            this.categories.current_list = item.categories
            item.categories = []
          }
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
          if (this.frm.account_id !== 0) {
            this.destination_account.push({account_id: 0, account_name: 'OTHERS'})
          }
          Object.keys(this.accounts).forEach(function (val) {
            if (this.accounts[val].account_id === this.frm.account_id) {
              this.frm.currency_exchange_name = this.accounts[val].currencies.currency_exchange_name
            }
          }, this)
          this.amount = parseFloat(this.frm.amount.toString().replace(/(?:\.)/g, '').replace(/(?:\,)/g, '.')).toLocaleString('id', {style: 'currency', currency: this.frm.currency_exchange_name})
          this.frm.amount = ''
          this.obj.style = 'currency'
          this.obj.currency = this.frm.currency_exchange_name
        }).catch((e) => {
          const response = e.response.data
        })
      },

      numberOnly(e) {
        const num = e.target.value
        if (e.target.value.match(/^([\d])+(\.\d{2}|)$/g) !== null) {
          // e.target.value = e.target.value.toString()
          e.target.value = num.toString()
          this.frm.amount = parseFloat(num).toLocaleString('id', {minimumFractionDigits: 2, maximumFractionDigits: 2})
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
