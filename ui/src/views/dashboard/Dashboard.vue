<template>
  <v-container>
    <v-col
      cols="12"
    >
      <v-card>
        <v-card-title>Total Aset</v-card-title>
        <v-card-subtitle>{{totalSaldo.toLocaleString('id')}}</v-card-subtitle>
        <v-card-text>
          <v-row v-for="(s, i) in saldo" :key="i">
            <v-col cols="6">
              <span>{{s.account_name}}</span>
            </v-col>
            <v-col cols="6" class="text-right">
              <span>{{s.saldo.toLocaleString('id', {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2})}}</span>
            </v-col>
            <v-col cols="12">
              <v-progress-linear
                v-model="percentageSaldo[s.account_name]"
                color="blue-grey"
                height="25"
              >
                <strong>{{((s.saldo * 100)/totalSaldo).toLocaleString('id', {style: 'decimal', maximumFractionDigits: 2})}}%</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card height="350">
        <v-card-title>Balance Trend</v-card-title>
        <v-card-subtitle>1 Year</v-card-subtitle>
        <v-card-text>
          <LineChart :chart-data="balancecollection" :options="options" :height=100></LineChart>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card height="350">
        <v-card-title>Cash Flow</v-card-title>
        <v-card-subtitle>1 Year</v-card-subtitle>
        <v-card-text>
          <LineChart :chart-data="cashflowcollection" :options="options" :height=100></LineChart>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
  import LineChart from "./LineChart.vue";
  export default {
    components: {
      LineChart
    },
    data () {
      return {
        balancecollection: {},
        cashflowcollection: {},
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        saldo: [],
        percentageSaldo: {},
        totalSaldo: 0,
        options: {
          responsive: true
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        axios.get('dashboard', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          var months = []
          const initial_date = new Date()
          var current_month = initial_date.getMonth()
          if (current_month+1 > 11) {
            current_month = 0
          } else {
            current_month = current_month + 1
          }
          for (var i = (current_month * -1); i >= ((current_month * -1) - 11); i--) {
            if (i < -11) {
              months.push((i + 12) * -1)
            } else {
              months.push(i * -1)
            }
          }
          months = months.map(v => this.month[v], this)
          const result = response.data.data
          this.saldo = result.Assets
          this.totalSaldo = result.TotalSaldo
          this.percentageSaldo = result.PercentageAccount
          console.log(this.persentageSaldo)
          this.balancecollection = {
            labels: months,
            datasets: [
              {
                label: ['Balance'],
                backgroundColor: '#007BFF',
                borderColor: '#007BFF',
                pointBackgroundColor: '#00A2FF',
                hoverBackgroundColor: '#00A2FF',
                data: result.Balance
              },
            ]
          }
          this.cashflowcollection = {
            labels: months,
            datasets: [
              {
                label: ['Income'],
                borderColor: '#C9F001',
                pointBackgroundColor: '#C9F001',
                fill: false,
                data: result.Cashflow.income
              },
              {
                label: ['Expense'],
                borderColor: '#F00101',
                pointBackgroundColor: '#F00101',
                fill: false,
                data: result.Cashflow.expense
              },
              {
                label: ['Cash Flow'],
                borderColor: '#007BFF',
                pointBackgroundColor: '#00A2FF',
                fill: false,
                data: result.Cashflow.cashflow
              },
            ]
          }
        }).catch(e => {
          const data = e.response.data
          const response = e.response.status
          if (response === 401) {
            localStorage.clear();
            this.$router.push({name: 'pages-login'})
          }
        })
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    }
  }
</script>
