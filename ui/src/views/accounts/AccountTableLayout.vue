<template>
  <v-card>
    <v-card-title>
      <v-row
        justify="end"
      >
        <v-btn
          tile
          color="bg-gradient-primary white--text"
          @click="addAccount"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Add
        </v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
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
      <v-skeleton-loader
        v-show="skeleton.table"
        v-bind="attrs"
        type="table-heading,table-tfoot"
      ></v-skeleton-loader>
      <v-row>
        <v-col :cols="isMobile ? 12:6" v-for="(account, k) in accounts" :key="k">
          <router-link :to="{name: 'accounts-edit', params: {id: account.account_id}}">
            <v-card
              min-height="200px"
              :class="`${account.color ? account.color : 'bg-gradient-primary'} rounded-xl`"
            >
              <v-card-text>
                <span class="text-h5 white--text">{{account.account_name}}</span>
                <div class="card-item">
                  <v-row>
                    <v-col cols="6"><span class="white--text">{{account.bank_account_number}}</span></v-col>
                    <v-col
                      cols="6"
                      class="text-right"
                    ><i class="white--text">{{account.currency_id}}</i> <span class="white--text">{{account.amount.toLocaleString('id')}}</span></v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
      <div
        v-show="!skeleton.table"
        class="text-center pt-2"
      >
        <v-pagination
          v-model="page"
          :length="page_count"
          total-visible="5"
          @input="handlePageChange"
        ></v-pagination>
      </div>

      <v-snackbar
        v-model="snackbar.value"
        :timeout="snackbar.timeout"
        color="info"
      >
        You have exceed the number of account could be created.
      </v-snackbar>

    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'AccountTableLayout',
    data() {
      return {
        isMobile: false,
        accounts: [{'hi':'kamu'},{'hi':'kamu'},{'hi':'kamu'},{'hi':'kamu'},{'hi':'kamu'}],
        loading: false,
        page: 1,
        page_count: 0,
        totalRecord: 0,
        limitPerPage: 2,
        dialog: false,
        dialog_component: {
          deleted_item: '',
        },
        alert: {
          success: false,
          danger: false,
          warning: false,
        },
        alert_message: '',
        attrs: {
          class: 'mb-6',
          boilerplate: true,
          elevation: 2,
        },
        skeleton: {
          table: true,
        },
        snackbar: {
          value: false,
          timeout: 2000,
        }
      }
    },
    computed: {
      accounts_header() {
        return [
          {
            text: 'Account Name',
            align: 'center',
            value: 'account_name',
          },
          {
            text: 'Currency',
            align: 'center',
            value: 'currency_id',
          },
          {
            text: 'Amount',
            align: 'end',
            value: 'amount',
          },
          {
            text: '',
            value: 'action',
            align: 'center',
            sortable: false,
          },
        ]
      },
    },
    mounted() {
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
      this.getAccounts()
    },
    methods: {
      addAccount() {
        if (this.totalRecord > 4) {
          this.snackbar.value = true
        } else {
          this.$router.push({name: 'accounts-add'})
        }
      },
      handlePageChange(val) {
        this.page = val
        this.getAccounts()
      },
      getAccounts() {
        this.loading = true
        /* eslint-disable */
        axios.post('account/get', {
          page: this.page,
          limitPerPage: this.limitPerPage,
        }, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          this.accounts = response.data.data.data
          this.page_count = Math.round(response.data.data.recordsTotal / this.limitPerPage)
          this.totalRecord = response.data.data.recordsTotal
          this.skeleton.table = false
          this.loading = false
        }).catch((e) => {
          var data = e.response.data
          var response = e.response.status
          if (response === 401) {
            localStorage.clear();
            this.$router.push({name: 'pages-login'})
          }
        });
      },
      accountDeleteModal(e) {
        this.dialog_component.deleted_item = e
        this.dialog = true
      },
      accountDelete(id) {
        this.dialog = !this.dialog
        axios.post('account/delete', { account_id: id }, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`,
          },
        }).then((response) => {
          this.alert_message = response.data.message
          this.getAccounts()
        }).catch((e) => {
          var data = e.response.data
          this.alert.danger = true
          this.alert_message = data.message
        })
      },
      sumField(key) {
        return this.accounts.reduce((a, b) => a + (b[key] || 0), 0)
      },
      onResize() {
        this.isMobile = window.innerWidth < 600
      },
    },
  }
</script>

<style scoped>
  .card-item {
    margin-top: 80px;
  }
</style>
