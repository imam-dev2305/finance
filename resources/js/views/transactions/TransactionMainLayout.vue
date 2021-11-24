<template>
  <v-responsive
    class="overflow-y-auto"
    max-height="350"
  >
    <v-card
      class="bg-gradient-red"
      dark
    >
      <v-card-title class="white--text">
        <v-icon
          large
          left
          class="white--text"
        >
          mdi-cash-100
        </v-icon>
        <span class="text-h6 font-weight-light white--text">Expense</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-row>
                <div class="white--text">Groceries</div>
              </v-row>
              <v-row>
                <div class="white--text">Cash</div>
              </v-row>
            </v-col>
            <v-col
              cols="7"
              class="text-end pa-0"
            >
              <div class="white--text">12 November 2021</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row
          no-gutters
          justify="end"
        >
          <v-col cols="12" sm="6" md="6" class="text-end">
            <span class="text-md-h5 white--text">IDR</span>
            <span class="text-md-h5 ml-2 white--text">15.000.000.000</span>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-card
      class="bg-gradient-red"
      dark
    >
      <v-card-title>
        <v-icon
          large
          left
          class="white--text"
        >
          mdi-cash-100
        </v-icon>
        <span class="text-h6 font-weight-light white--text">Expense</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-row>
                <div class="white--text">Cloth</div>
              </v-row>
              <v-row>
                <div class="white--text">Saving</div>
              </v-row>
            </v-col>
            <v-col
              cols="7"
              class="text-end pa-0"
            >
              <div class="white--text">12 November 2021</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row
          no-gutters
          justify="end"
        >
          <v-col cols="12" sm="6" md="6" class="text-end">
            <span class="text-md-h5 white--text">IDR</span>
            <span class="text-md-h5 ml-2 white--text">15.000.000</span>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-card
      class="bg-gradient-green"
      dark
    >
      <v-card-title>
        <v-icon
          large
          left
          class="white--text"
        >
          mdi-bitcoin
        </v-icon>
        <span class="text-h6 font-weight-light white--text">Income</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-row>
                <div class="white--text">Freelance</div>
              </v-row>
              <v-row>
                <div class="white--text">Saving</div>
              </v-row>
            </v-col>
            <v-col
              cols="7"
              class="text-end pa-0"
            >
              <div class="white--text">12 November 2021</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row
          no-gutters
          justify="end"
        >
          <v-col cols="12" sm="6" md="6" class="text-end">
            <span class="text-md-h5 white--text">IDR</span>
            <span class="text-md-h5 ml-2 white--text">15.000.000</span>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-card
      class="bg-gradient-blue"
      dark
    >
      <v-card-title>
        <v-icon
          large
          left
          class="white--text"
        >
          mdi-swap-horizontal
        </v-icon>
        <span class="text-h6 font-weight-light white--text">Transfer</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-row>
                <div class="white--text">Cash</div>
              </v-row>
              <v-row>
                <div class="white--text">Saving</div>
              </v-row>
            </v-col>
            <v-col
              cols="7"
              class="text-end pa-0"
            >
              <div class="white--text">12 November 2021</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row
          no-gutters
          justify="end"
        >
          <v-col cols="12" sm="6" md="6" class="text-end">
            <span class="text-md-h5 white--text">IDR</span>
            <span class="text-md-h5 ml-2 white--text">15.000.000</span>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<script>
  export default {
    name: 'AccountTableLayout',
    data() {
      return {
        isActive: false,
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>
