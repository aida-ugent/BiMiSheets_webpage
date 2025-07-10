<template>
    <main>
        <div id="search-box" class="pt-8">
            <v-text-field 
                id="input-field"
                variant="solo"
                prepend-inner-icon="mdi-magnify"
                v-model="searchedMethod">
                <!-- @input="filterMethodsName(searchedMethod)"> -->
            </v-text-field>
        </div>
        <div id="filter-area">
            <v-select class="select-option" label="Method Type" v-model="filterMethodTypes" v-if="allMethodTypes" :items="allMethodTypes" multiple chips ></v-select>
            <v-select class="select-option" label="ML Task" v-model="filterMLTask" v-if="allMLTasks" :items="allMLTasks" multiple chips ></v-select>
            <v-select class="select-option" label="Compatible Datasets" v-model="filterDatasetTypes" v-if="allDatasetTypes" :items="allDatasetTypes" multiple chips ></v-select>
            <v-select class="select-option" label="Pipeline Location" v-model="filterPipelineLocation" v-if="allPipelineLocations" :items="allPipelineLocations" multiple chips ></v-select>
            <v-select class="select-option" label="Compatible Model" v-model="filterCompatibleModels" v-if="allCompatibleModels" :items="allCompatibleModels" multiple chips ></v-select>
            <v-select class="select-option" label="Sensitive Attributes" v-model="filterSensAttr" v-if="allSensAttr" :items="allSensAttr" multiple chips ></v-select>
            <v-select class="select-option" label="Fairness Guarantee" v-model="filterFairnessGuarantee" v-if="allFairnessGuarantee" :items="allFairnessGuarantee" multiple chips ></v-select>
            <v-select class="select-option" label="Fairness Type" v-model="filterFairnessType" v-if="allFairnessTypes" :items="allFairnessTypes" multiple chips ></v-select>
            <v-select class="select-option" label="Fairness Definition" v-model="filterFairnessDef" v-if="allFairnessDef" :items="allFairnessDef" multiple chips ></v-select>
            <v-select class="select-option" label="Programming Language" v-model="filterProgramLang" v-if="allProgramLang" :items="allProgramLang" multiple chips ></v-select>
            <v-select class="select-option" label="Compatible Packages" v-model="filterCompPack" v-if="allCompPack" :items="allCompPack" multiple chips ></v-select>
        </div>
        
        <div id="possible-methods">
            <div class="text-subtitle-1 pl-5"> Number of results: {{ methodCount }}</div>
            <div id="individual-sheet-container" v-for="sheet in viewableMethods">
                <BiMiSheetShort :sheetcontent="sheet"></BiMiSheetShort>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import BiMiSheetShort from "@/components/BiMiSheetShort.vue"
import type { bimisheet_short } from '@/assets/types/bimisheet_short';

import { onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { watch } from "vue";
import axios from "axios";
import qs from "qs";


var selectedSheet: Ref<bimisheet_short | undefined> = ref(undefined);
var searchedMethod: Ref<string | undefined> = ref(undefined);
var viewableMethods: Ref<bimisheet_short[]> = ref([]);

var allMethodTypes: Ref<string[]> | Ref<null> = ref(null);
var allMLTasks: Ref<string[]> | Ref<null> = ref(null);
var allDatasetTypes: Ref<string[]> | Ref<null> = ref(null);
const allPipelineLocations: Ref<string[]> = ref(["Pre-Processing", "In-Processing", "Post-Processing"])
var allCompatibleModels: Ref<string[]> | Ref<null> = ref(null);
const allSensAttr: Ref<string[]> = ref(["Binary Attribute", "Categorical Attributes", "Parallel Attributes", "Numerical Attribute", "No Attributes at Inference"])
// const allSensAttr: Ref<string[]> = ref(presentSensAttr());
const allFairnessGuarantee: Ref<string[]> = ref(["Fairness Guaranteed", "Tunable Fairness Strength", "No Fairness Guarantee"])
// const allFairnessGuarantee: Ref<string[]> =ref(presentFairnessGuarantee())
var allFairnessTypes: Ref<string[]> | Ref<null> = ref(null);
var allFairnessDef: Ref<string[]> | Ref<null> = ref(null);
var allProgramLang: Ref<string[]> | Ref<null> = ref(null);
var allCompPack: Ref<string[]> | Ref<null> = ref(null);

// These are the filter variables
var filterMethodTypes: Ref<string[]> = ref([]);
var filterMLTask: Ref<string[]> = ref([]);
var filterDatasetTypes: Ref<string[]> = ref([]);
var filterPipelineLocation: Ref<string[]> = ref([]);
var filterCompatibleModels: Ref<string[]> = ref([]);
var filterSensAttr: Ref<string[]> = ref([]);
var filterFairnessGuarantee: Ref<string[]> = ref([]);
var filterFairnessType: Ref<string[]> = ref([]);
var filterFairnessDef: Ref<string[]> = ref([]);
var filterProgramLang: Ref<string[]> = ref([]);
var filterCompPack: Ref<string[]> = ref([]);

var methodCount: Ref<number> = ref(viewableMethods.value.length);

onBeforeMount(() => {
  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/method_types").then(function (response) {
    allMethodTypes.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/ml_task").then(function (response) {
    allMLTasks.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_dataset").then(function (response) {
    allDatasetTypes.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_model").then(function (response) {
    allCompatibleModels.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/fairness_types").then(function (response) {
    allFairnessTypes.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/fairness_definitions").then(function (response) {
    allFairnessDef.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/programming_languages").then(function (response) {
    allProgramLang.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_packages").then(function (response) {
    allCompPack.value = response.data;
  })

  setTimeout(() => axios.get(import.meta.env.VITE_BACKEND_URL +"/filtered_bimisheets").then(function(response) {
        var idList: string[] = response.data;
        var split1IdList: string[] = idList.splice(0, Math.floor(idList.length/2))
        addFilteredSheet(idList.shift(), idList)
        addFilteredSheet(split1IdList.shift(), split1IdList)
    }), 500);

  
})


// function filterMethodsName(methodName: string| undefined): void {
//     if (methodName) {
//         viewableMethods.value = [];
//         for (var i = 0; i < allSheets.length; i++) { 
//             if (allSheets[i].filename.toLowerCase().includes(methodName.toLowerCase())) {
//                 viewableMethods.value.push(allSheets[i])
//             }
//         }
//     }
//     else{
//         viewableMethods.value = JSON.parse(JSON.stringify(allSheets));
//     }
// }


interface filterValues {
    method_type_name?: string[],
    task_name?: string[],
    comp_data?: string[],
    pipeline_loc?: string[],
    comp_model?: string[],
    comp_sens_name?: string[],
    fairness_guarantee?: string[],
    fairness_type_name?: string[],
    fairness_def_name?: string[],
    program_lang?: string[],
    related_package?: string[],
}

// Watchers for the v-selects
watch([filterMethodTypes,   filterMLTask,       filterDatasetTypes,     filterPipelineLocation,     filterCompatibleModels,
                            filterSensAttr,     filterFairnessGuarantee,filterFairnessType,         filterFairnessDef,
                            filterProgramLang,  filterCompPack
], () => {
    viewableMethods.value = [];
    var requestParams: filterValues = {}
    var listFilters: [string, string[]][] = [["method_type_name", filterMethodTypes.value], ["task_name", filterMLTask.value], ["comp_data", filterDatasetTypes.value],
                                             ["pipeline_loc", filterPipelineLocation.value], ["comp_model", filterCompatibleModels.value], ["comp_sens_name", filterSensAttr.value],
                                             ["fairness_guarantee", filterFairnessGuarantee.value], ["fairness_type_name", filterFairnessType.value], ["fairness_def_name", filterFairnessDef.value],
                                             ["program_lang", filterProgramLang.value], ["related_package", filterCompPack.value]] 
    listFilters.forEach((filter) => {
        requestParams[filter[0] as keyof filterValues] = filter[1];
    })
    console.log(requestParams)
    console.log(filterMethodTypes.value)
        
    axios.get(import.meta.env.VITE_BACKEND_URL + "/filtered_bimisheets", 
    {
        params: requestParams, 
        paramsSerializer: params => {
        return qs.stringify(params, {arrayFormat: 'repeat'})}
    }).then(function(response) {
        var idList: string[] = response.data;
        var split1IdList: string[] = idList.splice(0, Math.floor(idList.length/2))
        addFilteredSheet(idList.shift(), idList)
        addFilteredSheet(split1IdList.shift(), split1IdList)
        
    })
    // filterViewableSheets()
})

async function addFilteredSheet(id?: string, remainingIds?: string[]){
    if (id != null){
        var filteredSheet = await axios.get(import.meta.env.VITE_BACKEND_URL + "/sheet_short/" + id)
        viewableMethods.value.push(filteredSheet.data)

        methodCount.value = viewableMethods.value.length

        addFilteredSheet(remainingIds?.shift(), remainingIds)
    }
    
}


</script>

<style scoped>

main {
    container-type: inline-size;
}

#individual-sheet-container {
    padding: 10px;
}

#search-box {
    width: 89%;
    align-self: center;
    margin: auto;
}

#filter-area {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.select-option {
    min-width: 300px;
    max-width: 400px;
    padding-left: 16px;
    padding-right: 16px;
}

@container (min-width: 900px) {
#search-box {
    width: 800px;
  }
}
</style>