<template>
  <v-card>
    <v-card-title>
      <router-link to="/transactions/list">Transactions</router-link>
    </v-card-title>
    <v-card-text>
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'Transaction',
  }
</script>

<style scoped>

</style>
