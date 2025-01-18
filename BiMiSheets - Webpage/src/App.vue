<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-layout>
    <v-app-bar prominent color="teal-darken-2">
      <v-toolbar-title to="/">BiMi Sheets</v-toolbar-title>

      <v-btn 
        text="Start"
        to="/">
      </v-btn>
      <v-btn 
        text="Search"
        to="/search">
      </v-btn>
      <v-btn 
        text="Overview"
        to="/overview">
      </v-btn>
      <v-btn 
        text="Create"
        to="/create">
      </v-btn>
    </v-app-bar>


    <v-main id="main-content">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
header {
  width:100%;
  display: block;
  max-height: 100vh;
}

.v-app-bar {
  height: 64px;
}

#main-content {
  width:100%
}


@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
