<template>
    <main>
        <div id="search-box" class="pt-8">
            <v-text-field 
                id="input-field"
                variant="solo"
                prepend-inner-icon="mdi-magnify"
                v-model="searchedMethod"
                @input="filterMethodsName(searchedMethod)">
            </v-text-field>
        </div>
        <div id="filter-area">
            <v-select class="select-option" label="Method Type" v-model="filterMethodTypes" :items="allMethodTypes" multiple chips ></v-select>
            <v-select class="select-option" label="ML Task" v-model="filterMLTask" :items="allMLTasks" multiple chips ></v-select>
            <v-select class="select-option" label="Compatible Datasets" v-model="filterDatasetTypes" :items="allDatasetTypes" multiple chips ></v-select>
            <v-select class="select-option" label="Pipeline Location" v-model="filterPipelineLocation" :items="allPipelineLocations" multiple chips ></v-select>
            <v-select class="select-option" label="Compatible Model" v-model="filterCompatibleModels" :items="allCompatibleModels" multiple chips ></v-select>
            <v-select class="select-option" label="Sensitive Attributes" v-model="filterSensAttr" :items="allSensAttr" multiple chips ></v-select>
            <v-select class="select-option" label="Fairness Guarantee" v-model="filterFairnessGuarantee" :items="allFairnessGuarantee" multiple chips ></v-select>
            <v-select class="select-option" label="Fairness Type" v-model="filterFairnessType" :items="allFairnessTypes" multiple chips ></v-select>
            <v-select class="select-option" label="Fairness Definition" v-model="filterFairnessDef" :items="allFairnessDef" multiple chips ></v-select>
            <v-select class="select-option" label="Programming Language" v-model="filterProgramLang" :items="allProgramLang" multiple chips ></v-select>
            <v-select class="select-option" label="Compatible Packages" v-model="filterCompPack" :items="allCompPack" multiple chips ></v-select>
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
import { allSheets } from "@/assets/sheets/AllSheets"
import type { bimisheet } from '@/assets/types/bimisheet';
import { presentCompPack, presentCompatibleModels, presentDatasetTypes, presentFairnessDef, presentFairnessGuarantee, presentFairnessTypes,
         presentMethods, presentMLTasks, presentProgramLang, presentSensAttr} from "@/assets/labelUtils"

import { ref } from 'vue'
import type { Ref } from 'vue'
import { watch } from "vue";


var selectedSheet: Ref<bimisheet | undefined> = ref(undefined);
var searchedMethod: Ref<string | undefined> = ref(undefined);
var viewableMethods: Ref<bimisheet[]> = ref(JSON.parse(JSON.stringify(allSheets)));

const allMethodTypes: Ref<string[]> = ref(presentMethods());
const allMLTasks: Ref<string[]> = ref(presentMLTasks());
const allDatasetTypes: Ref<string[]> = ref(presentDatasetTypes());
const allPipelineLocations: Ref<string[]> = ref(["Pre-Processing", "In-Processing", "Post-Processing"])
const allCompatibleModels: Ref<string[]> = ref(presentCompatibleModels())
const allSensAttr: Ref<string[]> = ref(["Binary Attribute", "Categorical Attributes", "Parallel Attributes", "Numerical Attribute", "No Attributes at Inference"])
// const allSensAttr: Ref<string[]> = ref(presentSensAttr());
const allFairnessGuarantee: Ref<string[]> = ref(["Fairness Guaranteed", "Tunable Fairness Strength", "No Fairness Guarantee"])
// const allFairnessGuarantee: Ref<string[]> =ref(presentFairnessGuarantee())
const allFairnessTypes: Ref<string[]> = ref(presentFairnessTypes())
const allFairnessDef: Ref<string[]> = ref(presentFairnessDef())
const allProgramLang: Ref<string[]> = ref(presentProgramLang())
const allCompPack: Ref<string[]> = ref(presentCompPack())

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


function filterMethodsName(methodName: string| undefined): void {
    if (methodName) {
        viewableMethods.value = [];
        for (var i = 0; i < allSheets.length; i++) { 
            if (allSheets[i].filename.toLowerCase().includes(methodName.toLowerCase())) {
                viewableMethods.value.push(allSheets[i])
            }
        }
    }
    else{
        viewableMethods.value = JSON.parse(JSON.stringify(allSheets));
    }
}

function filterViewableSheets(): void {
    if ((searchedMethod.value)  || (filterMethodTypes.value.length > 0)         || (filterMLTask.value.length > 0)              || (filterDatasetTypes.value.length > 0) 
                                || (filterPipelineLocation.value.length > 0)    || (filterCompatibleModels.value.length > 0)    || (filterSensAttr.value.length > 0)
                                || (filterFairnessGuarantee.value.length > 0)   || (filterFairnessType.value.length > 0)        || (filterFairnessDef.value.length > 0)
                                || (filterProgramLang.value.length > 0)         || (filterCompPack.value.length > 0)){
        viewableMethods.value = [];
        for (var i = 0; i < allSheets.length; i++) {
            if (searchedMethod.value){
                if (!(allSheets[i].filename.toLowerCase().includes(searchedMethod.value.toLowerCase()))){
                    continue;
                }
            }
            if (filterMethodTypes.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].description.method_type.length; j++) {
                    if (filterMethodTypes.value.includes(allSheets[i].description.method_type[j])){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterMLTask.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].description.task.length; j++) {
                    if (filterMLTask.value.includes(allSheets[i].description.task[j])){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterDatasetTypes.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].description.compatible_data.length; j++) {
                    if (filterDatasetTypes.value.includes(allSheets[i].description.compatible_data[j])){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterPipelineLocation.value.length > 0){
                if (!(filterPipelineLocation.value.includes(allSheets[i].pipeline.pipeline_location))){
                    continue
                }
            }
            if (filterCompatibleModels.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].pipeline.compatible_model.length; j++) {
                    if (filterCompatibleModels.value.includes(allSheets[i].pipeline.compatible_model[j])){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterSensAttr.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].fairness.composition_features.length; j++) {
                    if (filterSensAttr.value.includes(allSheets[i].fairness.composition_features[j])){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterFairnessGuarantee.value.length > 0){
                if (!(filterFairnessGuarantee.value.includes(allSheets[i].fairness.fairness_guarantee))){
                    continue
                }
            }
            if (filterFairnessType.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].fairness.fairness_type_defs.length; j++) {
                    if (filterFairnessType.value.includes(allSheets[i].fairness.fairness_type_defs[j].fairness_type)){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterFairnessDef.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].fairness.fairness_type_defs.length; j++) {
                    for (var k = 0; k < allSheets[i].fairness.fairness_type_defs[j].fairness_definitions.length; k++) {
                        if (filterFairnessDef.value.includes(allSheets[i].fairness.fairness_type_defs[j].fairness_definitions[k])){
                            count++;
                        }
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterProgramLang.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].implementation.packages.length; j++) {
                    if (filterProgramLang.value.includes(allSheets[i].implementation.packages[j].programming_language)){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterProgramLang.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].implementation.packages.length; j++) {
                    if (filterProgramLang.value.includes(allSheets[i].implementation.packages[j].programming_language)){
                        count++;
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            if (filterCompPack.value.length > 0){
                var count: number = 0;
                for (var j = 0; j < allSheets[i].implementation.packages.length; j++) {
                    if (allSheets[i].implementation.packages[j].related_packages){
                        for (var k = 0; k < allSheets[i].implementation.packages[j].related_packages.length; k++){
                            if (filterCompPack.value.includes(allSheets[i].implementation.packages[j].related_packages[k])){
                                count++;
                            }
                        }
                    }
                }
                if (count === 0) {
                    continue;
                }
            }
            viewableMethods.value.push(allSheets[i])
        }
    }
    else {
        viewableMethods.value = allSheets;
    }
    // methodCount = viewableMethods.value.length;
}

// Watchers for the v-selects
watch([filterMethodTypes,   filterMLTask,       filterDatasetTypes,     filterPipelineLocation,     filterCompatibleModels,
                            filterSensAttr,     filterFairnessGuarantee,filterFairnessType,         filterFairnessDef,
                            filterProgramLang,  filterCompPack
], () => {
    filterViewableSheets()
})


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