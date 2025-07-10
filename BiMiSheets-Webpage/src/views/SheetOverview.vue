<template>
    <main>
        <div id="methods-container">
            <v-list class="overflow-y-auto">
                <div id="search-box" class="pl-4 pr-8 pt-8">
                    <v-text-field 
                        variant="solo"
                        prepend-inner-icon="mdi-magnify"
                        v-model="searchedMethod"
                        @input="filterMethods(searchedMethod)">
                    </v-text-field>
                </div>
                
                <v-list-subheader> BIAS MITIGATION METHODS </v-list-subheader>
                <v-list-item v-for="sheet in viewableMethods" v-model="viewableMethods" :key="sheet.filename" :title="sheet.filename" @click="newSheetSelected(sheet.bimisheet_id)"></v-list-item>
            </v-list>
            </div>
        <div id="sheet-container" class="pt-16 pb-16" v-if="selectedSheet">
            <BiMiSheet :sheetcontent=selectedSheet></BiMiSheet>
        </div>
    </main>
  </template>

<script setup lang="ts">
import BiMiSheet from '@/components/BiMiSheet.vue';
import type { bimisheet } from '@/assets/types/bimisheet';

import { ref } from 'vue'
import type { Ref } from 'vue'

import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

import { onBeforeMount } from 'vue';
import axios from 'axios';


var selectedSheet: Ref<bimisheet | undefined> = ref(undefined);
var searchedMethod: Ref<string | undefined> = ref(undefined);
var allSheets: sheetNamesId[] = [];
var viewableMethods: Ref<sheetNamesId[]> = ref([]);

interface sheetNamesId {
    bimisheet_id: BigInt,
    filename: string
}

onBeforeMount(() => {
    try{
        axios.get(import.meta.env.VITE_BACKEND_URL + "/allSheetNames").then(function (response) {
                viewableMethods.value = response.data;
                allSheets = response.data;
            })
        if (route.query.method && typeof(route.query.method) === "string"){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/sheet/" + route.query.method).then(function (response) {
                selectedSheet.value = response.data;
            })
            window.scrollTo(0, 0)
        } 
    }
    catch(error) {
        console.log(error)
    }
})


async function newSheetSelected(sheetID: BigInt): Promise<void> {
    await axios.get(import.meta.env.VITE_BACKEND_URL + "/sheet/" + sheetID).then(function (response) {
        selectedSheet.value = response.data;
    })
}

function filterMethods(methodName: string| undefined): void {
    if (methodName) {
        viewableMethods.value = [];
        for (var i = 0; i < allSheets.length; i++) { 
            if (allSheets[i].filename.toLowerCase().includes(methodName.toLowerCase())) {
                // viewableMethods.value.push(allSheets[i])
            }
        }
    }
    else{
        viewableMethods.value = JSON.parse(JSON.stringify(allSheets));
    }
}

</script>

<style scoped>

main {
    display: flex;
    overflow-y: hidden;
}

.v-list {
    overflow-y: auto;
    height: calc(100vh - 64px);
    position: fixed;
    width: 25%;
}

#filter-icon {
    align-self: right;
}

#methods-container {
    width: 25%;
    max-height: 100%;
    border-right: 2px;
    border-right-color: lightgray;
}

#sheet-container {
    left: 25%;
    width: 75%;
    container-type: inline-size;
}

/* Scrollbar styling */
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>