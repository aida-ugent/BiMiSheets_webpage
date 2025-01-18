<template>
  <main>
    <v-form>
      <v-container>
        <v-text-field label="Method Name" ></v-text-field>
        <v-text-field label="Author Name(s)"></v-text-field>
        <v-text-field label="Version Name"></v-text-field>
        <v-autocomplete ></v-autocomplete>
      </v-container>
    </v-form>
  </main>
</template>

<script setup lang="ts">
import { presentCompPack } from '@/assets/labelUtils';

</script>

<style scoped>


</style>
