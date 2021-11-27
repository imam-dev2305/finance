<template>
  <v-card>
    <v-card-title>
      <v-row
        justify="end"
      >
        <v-btn
          tile
          color="bg-gradient-primary white--text"
          :to="{name: 'accounts-add'}"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Add More
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
      <v-data-table
        v-show="!skeleton.table"
        :headers="accounts_header"
        :items="accounts"
        :loading="loading"
        :page.sync="page"
        hide-default-footer
        class="elevation-1"
      >
        <template slot="body.append">
          <tr class="pink--text">
            <th class="title text-center">
              Total
            </th>
            <th></th>
            <th class="title text-end">
              {{ sumField('amount').toLocaleString('id') }}
            </th>
            <th></th>
          </tr>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.amount="{item}">
          <p class="font-weight-bold">
            {{ item.amount.toLocaleString('id') }}
          </p>
        </template>
        <template v-slot:item.account_name="{item}">
          <p>
            {{ item.account_name.toUpperCase() }}
          </p>
        </template>
        <template v-slot:item.action="{item}">
          <v-btn
            :to="{name: 'accounts-edit', params: {id: item.account_id}}"
            color="yellow"
            icon
          >
            <v-icon
              small
            >mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            icon
          >
            <v-icon
              small
              @click="accountDeleteModal(item)"
            >mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
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
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Delete {{ dialog_component.deleted_item.account_name }} from your account?
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
              @click="accountDelete(dialog_component.deleted_item.account_id)"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'AccountTableLayout',
    data() {
      return {
        accounts: [],
        loading: false,
        page: 1,
        page_count: 0,
        limitPerPage: 10,
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
      this.getAccounts()
    },
    methods: {
      handlePageChange(val) {
        this.page = val
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
          this.page_count = response.data.data.records
          this.skeleton.table = false
          this.loading = false
        }).catch((e) => {
          var data = e.response.data
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
    },
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
