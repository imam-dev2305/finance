<template>
  <div>
    <v-card>
      <v-card-title>Reports</v-card-title>
      <v-card-subtitle>
        <v-form ref="reports">
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-dialog
                ref="date1"
                v-model="date1_dialog"
                :return-value.sync="frm.date1"
                persistent
                width="290px"
              >
                <template v-slot:activator="{on, attr}">
                  <v-text-field
                    v-model="frm.date1"
                    label="From"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="[required]"
                    v-bind="attr"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="frm.date1"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="date1_dialog = false"
                  >Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.date1.save(frm.date1)"
                  >Ok</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col
              cols="12"
              md="5"
            >
              <v-dialog
                ref="date2"
                v-model="date2_dialog"
                :return-value.sync="frm.date2"
                persistent
                width="290px"
              >
                <template v-slot:activator="{on, attr}">
                  <v-text-field
                    v-model="frm.date2"
                    label="From"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="[required]"
                    v-bind="attr"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="frm.date2"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="date2_dialog = false"
                  >Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.date2.save(frm.date2)"
                  >Ok</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-btn
                color="primary"
                @click="getReport"
              >
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
      <v-card-text>
        <v-list
          shaped
          v-if="Object.keys(categories).length > 0"
        >
          <v-divider></v-divider>
          <v-subheader><b>Income</b></v-subheader>
          <v-divider></v-divider>
          <v-list-group
            v-for="(income, i) in incomes"
            :key="income.category_id"
            multiple
            value="true"
            disabled
          >
            <template v-slot:activator>
              <v-list-item-title>{{income.category_name}}</v-list-item-title>
            </template>
            <template v-slot:appendIcon>
              <span>{{Math.abs(income.total).toLocaleString('id', {style: 'currency', currency: 'IDR'})}}</span>
            </template>
            <v-list-group
              sub-group
              v-for="(ichild, c) in incomes.child"
              prepend-icon=""
              :key="c"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ichild.category_name}}</v-list-item-title>
              </template>
              <template v-slot:appendIcon>
                <span>{{Math.abs(ichild.total).toLocaleString('id', {style: 'currency', currency: 'IDR'})}}</span>
              </template>
            </v-list-group>
          </v-list-group>
          <v-divider></v-divider>
          <v-subheader><b>Expense</b></v-subheader>
          <v-divider></v-divider>
          <v-list-group
            v-for="(expense, e) in expenses"
            :key="expense.category_id"
            multiple
            value="true"
            disabled
          >
            <template v-slot:activator>
              <v-list-item-title>{{expense.category_name}}</v-list-item-title>
            </template>
            <template v-slot:appendIcon>
              <span>{{Math.abs(expense.total).toLocaleString('id', {style: 'currency', currency: 'IDR'})}}</span>
            </template>
            <v-list-group
              sub-group
              v-for="(echild, c) in expense.child"
              prepend-icon=""
              :key="c"
            >
              <template v-slot:activator>
                <v-list-item-title>{{echild.category_name}}</v-list-item-title>
              </template>
              <template v-slot:appendIcon>
                <span>{{Math.abs(echild.total).toLocaleString('id', {style: 'currency', currency: 'IDR'})}}</span>
              </template>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "Reports",
    data() {
      return {
        date1_dialog: false,
        date2_dialog: false,
        frm: {
          date1: '',
          date2: '',
        },
        expenses: {},
        incomes: {},
        categories: [],
        required: value => !!value || 'Required'
      }
    },
    methods: {
      getReport() {
        if (this.$refs.reports.validate()) {
          axios.post('report/get', this.frm, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.bearer}`
            }
          })
            .then((response) => {
              const result = JSON.stringify(JSON.parse(response.data.data))
              this.categories = JSON.parse(result)
              this.expenses = JSON.parse(result)[0].expense
              this.incomes = JSON.parse(result)[0].income
            })
            .catch((e) => {
              const data = e.response.data
              const response = e.response.status
              if (response === 401) {
                localStorage.clear();
                this.$router.push({name: 'pages-login'})
              }
            })
        }
      }
    }
  }
</script>

<style scoped>
  .v-list-group--active /deep/ .v-icon {
    transform: rotate(0deg) !important;
  }
</style>
