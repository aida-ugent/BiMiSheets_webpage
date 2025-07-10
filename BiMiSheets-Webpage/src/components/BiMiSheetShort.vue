<template>
    <div id="bimisheetshort">
      <a class="text-h4" @click="goToSheetOverview()">{{ sheetcontent.filename}}</a>
      <div class="label-container text-caption">
        <div class="label type" v-for="methodType in sheetcontent.method_description.method_type">{{ methodType }}</div>
        <div class="label task" v-for="task in sheetcontent.method_description.task"> {{ task }} </div>
        <div class="label dataset-dependency" v-for="datasettype in sheetcontent.method_description.compatible_data"> {{ datasettype }}</div>
        <div class="label pipeline-location"> {{ sheetcontent.pipeline.pipeline_location }}</div>
        <div class="label compatible-model" v-for="model in sheetcontent.pipeline.compatible_model"> {{ model }} </div>
        <div class="label attribute-types" v-for="attr in sheetcontent.fairness.composition_features"> {{ attr }} </div>
        <div class="label fairness-degree"> {{ sheetcontent.fairness.fairness_guarantee }}</div>
        <div class="label fairness-type" v-for="fairdeftype in sheetcontent.fairness.fairness_type_defs"> {{ fairdeftype.fairness_type }} </div>
        <div class="label-container"v-for="implementation in sheetcontent.implementation.packages">
            <div class="label programming-language"> {{ implementation.programming_language }} </div>
            <div class="label compatible-package" v-if="implementation.packages" v-for="comp_package in implementation.packages"> {{ comp_package }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { bimisheet_short } from '@/assets/types/bimisheet_short';
import { useRouter } from 'vue-router';

  const router = useRouter()
  
  const props = defineProps<{
    sheetcontent: bimisheet_short
  }>()
  
  function goToSheetOverview(): void {
    router.push("/overview?method=".concat(props.sheetcontent.bimisheet_id.toString()))
  }
  
  </script>
  
  <style scoped>
  #bimisheetshort {
    text-align: left;
    align-self: center;
    padding: 2rem;
    border-style: solid;
    border-color: darkgray;
    border-width: 4px;
  }
  
  a {
    cursor: pointer;
  }

  @container (min-width: 750px) {
    #bimisheetshort {
      width: 750px;
      margin: auto;
    }
  }
  
  
  
  </style>