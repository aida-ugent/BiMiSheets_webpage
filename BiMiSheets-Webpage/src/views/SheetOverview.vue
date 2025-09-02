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
            <div class="button-container" v-if="selectedSheet">
                <v-btn density="default" icon="mdi-download" @click="downloadPDF"></v-btn>
            </div>
            <BiMiSheet :sheetcontent=selectedSheet ref="pdfContent"></BiMiSheet>
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

const pdfContent = ref(null)

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

async function downloadPDF(): Promise<void> {  
  // Reference to the HTML element containing the content to export
  // @ts-ignore: Unreachable code error
  const content = pdfContent.value?.el;

  const printWindow = window.open("", "_blank")
  if (!printWindow) return;

  // Grab all stylesheets from the current document
  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        if (sheet.href) {
          // External stylesheet
          return `<link rel="stylesheet" href="${sheet.href}">`
          // @ts-ignore: Unreachable code error
        } else if (sheet.ownerNode && sheet.ownerNode.innerHTML) {
          // Inline <style> block
          // @ts-ignore: Unreachable code error
          return `<style>${sheet.ownerNode.innerHTML}</style>`
        }
      } catch (e) {
        // Some stylesheets (like from extensions) may throw CORS errors
        return ""
      }
    })
    .join("\n")

  printWindow.document.write(`
    <html>
      <head>
        <title>BiMi Sheet</title>
        ${styles}
        <style>
          /* Print-specific overrides */
          @page { margin: 20mm; }
          body { font-family: sans-serif; margin: 0; padding: 0; }

          /* Ensure backgrounds & colors are preserved */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body>${content.innerHTML}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  printWindow.close()
};

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

.button-container{
    float: right;
    margin-right: 10px;
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