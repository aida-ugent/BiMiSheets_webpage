<template>
  <main>
    <div id="greeting" class="text-h2"> Welcome to BiMi Sheets!</div>
    <div id="explanation"> BiMi sheets are created to make it just a little bit easier to find the right bias mitigation method for you. This might be for a system you are developing, or maybe you have your method and want to find a worthy challenger for it. </div>
    <BiMiSheet v-if="exampleSheet" :sheetcontent=exampleSheet></BiMiSheet>
  </main>
</template>

<script setup lang="ts">
import BiMiSheet from '@/components/BiMiSheet.vue';
import { onBeforeMount } from 'vue';

import axios from 'axios';
import type { bimisheet } from '@/assets/types/bimisheet';

import { ref } from 'vue'
import type { Ref } from 'vue'

var exampleSheet: Ref<bimisheet> | Ref<null> = ref(null);

onBeforeMount(() => {
  console.log(import.meta.env.VITE_BACKEND_URL)
  axios.get(import.meta.env.VITE_BACKEND_URL + "/random_sheet").then(function (response) {
    console.log(response.data)
    exampleSheet.value = response.data;
  })
  
})

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

main {
  container-type: inline-size;
}

</style>
