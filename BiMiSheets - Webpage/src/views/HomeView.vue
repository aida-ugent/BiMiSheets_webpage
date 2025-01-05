<template>
  <main>
    <div id="greeting" class="text-h2"> Welcome to BiMi Sheets!</div>
    <div id="explanation"> BiMi sheets are created to make it just a little bit easier to find the right bias mitigation method for you. This might be for a system you are developing, or maybe you have your method and want to find a worthy challenger for it. </div>
    <BiMiSheet :sheetcontent=allSheets[getRandomInt(allSheets.length)]></BiMiSheet>
  </main>
</template>

<script setup lang="ts">
import BiMiSheet from '@/components/BiMiSheet.vue';
import ErrorParity from "@/assets/sheets/ErrorParity.json";
import { allSheets } from "@/assets/sheets/AllSheets"

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

</script>

<style scoped>

#greeting {
  color: black;
  text-align: center;
  padding: 3rem;
  padding-bottom: 1rem;
}

#explanation {
  padding: 2rem;
  padding-top: 0rem;
  text-align: center;
  max-width: 800px;
  margin: auto;
}

</style>
