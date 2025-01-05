<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <v-toolbar title="BiMi Sheets" color="teal-darken-2"></v-toolbar> 
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  width:100%;
  display: block;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
