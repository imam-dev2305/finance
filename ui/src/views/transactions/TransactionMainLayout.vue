<template>
  <div id="lateral">
    <v-responsive
      class="overflow-y-auto"
      height="340px"
    >
      <v-card
        flat
        elevation="0"
        outlined
        v-for="(item, i) in records"
        :key="i"
      >
        <v-card-text style="padding-top: 20px; padding-bottom: 20px" class="black--text">
          <v-row>
            <v-col cols="2" md="1" sm="1">
              <v-btn
                icon
                outlined
                x-small
                :color="item.amount < 0 ? 'red':'green'"
              >
                <v-icon class="text-sm m-icon">{{ item.category_icon !== null ? item.category_icon:'mdi-swap-horizontal' }}</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4" md="5" sm="5">
              <v-row>
                <div class="m-font grey--text" v-if="item.transaction_type_id !== 3">{{ item.category_name }}</div>
                <div class="m-font grey--text" v-else>{{ item.transaction_type_name }}</div>
              </v-row>
              <v-row>
                <div class="m-font grey--text" v-if="item.transaction_type_id !== 3">{{ item.account_name }}</div>
                <div class="m-font grey--text" v-else>
                  <div v-if="item.amount < 0">
                    <b>{{item.account_name}}</b><v-btn icon x-small><v-icon>mdi-chevron-right</v-icon></v-btn>{{item.destination_account_name}}
                  </div>
                  <div v-else-if="item.amount > 0">
                    {{item.destination_account_name}}<v-btn icon plain x-small><v-icon>mdi-chevron-right</v-icon></v-btn><b>{{item.account_name}}</b>
                  </div>
                </div>
              </v-row>
            </v-col>
            <v-col cols="4" md="5" sm="5" class="align-self-center">
              <v-row class="align-center justify-end"><div class="grey--text m-font">{{ displaydate(item.transaction_date) }}</div></v-row>
              <v-row class="align-center justify-end"><div :class="`text-right m-font ${item.amount < 0 ? 'red--text':'green--text'}`">{{ `${item.currency_id} ${parseInt(item.amount).toLocaleString('id')}` }}</div></v-row>
            </v-col>
            <v-col cols="2" md="1" sm="1" class="text-right">
              <v-menu
                bottom
                right
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    class="m-icon-dots"
                  >
                    <v-icon class="grey--text">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    :to="{name: 'transactions-edit', params: {id: item.transaction_id}}"
                  >
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="deleteContext(item)"
                  >
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-responsive>
<!--    <v-speed-dial-->
<!--      v-model="fab"-->
<!--      bottom-->
<!--      transition="slide-y-reverse-transition"-->
<!--      class="v-btn&#45;&#45;example"-->
<!--    >-->
<!--      <template v-slot:activator>-->
<!--        <v-btn-->
<!--          v-model="fab"-->
<!--          color="blue darken-2"-->
<!--          dark-->
<!--          fab-->
<!--        >-->
<!--          <v-icon v-if="fab">-->
<!--            mdi-close-->
<!--          </v-icon>-->
<!--          <v-icon v-else>-->
<!--            mdi-plus-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--      </template>-->
<!--      <v-btn-->
<!--        fab-->
<!--        dark-->
<!--        small-->
<!--        color="green"-->
<!--        :to="{name: 'transactions-expense'}"-->
<!--      >-->
<!--        <v-icon>mdi-currency-usd</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--        fab-->
<!--        dark-->
<!--        small-->
<!--        color="red"-->
<!--      >-->
<!--        <v-icon>mdi-shopping</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--        fab-->
<!--        dark-->
<!--        small-->
<!--        color="indigo"-->
<!--      >-->
<!--        <v-icon>mdi-swap-horizontal</v-icon>-->
<!--      </v-btn>-->
<!--    </v-speed-dial>-->
    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        dark
        bottom
        right
        :to="{name: 'transactions-add'}"
        class="v-btn--example"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
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
    name: 'AccountTableLayout',
    data() {
      return {
        isActive: false,
        fab: false,
        records: [],
        snackbar: {
          value: false,
          timeout: 2000,
          message: '',
          color: 'success',
        },
      }
    },
    mounted() {
      this.getTransactions();
    },
    methods: {
      getTransactions() {
        axios.get('transactions/get', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          const data = response.data.data
          this.records = data
        })
      },

      displaydate(date) {
        const dd = new Date(date);
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const m = month[dd.getMonth()]
        const y = dd.getFullYear()
        const d = dd.getDate()
        return `${d} ${m} ${y}`
      },

      deleteContext(item) {
        axios.post('transactions/delete', item, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.getTransactions()
          this.snackbar.value = true
          this.snackbar.color = 'success'
          this.snackbar.message = response.data.message
        })
      }
    },
  }
</script>

<style>
  #lateral .v-btn--example {
    bottom: 70px;
    right: 40px;
    position: fixed !important;
  }
  #lateral .v-speed-dial {
    position: absolute;
  }

  #lateral .v-btn--floating {
    position: relative;
  }
  @media(max-width: 480px) {
    #lateral .m-font {
      font-size: 9px !important;
    }
    #lateral .m-icon {
      font-size: 9px !important;
    }
  }
</style>
