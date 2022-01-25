<template>
  <v-card>
    <v-card-title>
      <router-link to="/currency/list">Currency</router-link>
    </v-card-title>
    <v-card-text>
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
        name: "Currency"
    }
</script>

<style scoped>

</style>
