<template>
  <div id="bimisheet">
    <div class="text-h3">{{ sheetcontent.metadata.name}}: BiMi Sheet</div>

    <div id="metadata-container">
      <div class="text-h4"> Metadata </div>
      <div class="text-body-1">
        <div>Name: {{ sheetcontent.metadata.name }}</div>
        <div>Authors: {{ sheetcontent.metadata.authors }}</div>
        <div>
          <span  class="pe-16" v-if="sheetcontent.metadata.license">Version: {{ sheetcontent.metadata.version }}</span>
          <span v-if="sheetcontent.metadata.version">License: {{ sheetcontent.metadata.license }}</span>
        </div>
        <div v-if="sheetcontent.metadata.source_paper">
          <span> Proposed in </span>
          <span class="font-italic"> {{ paperTitle() }} </span>
        </div>
      </div>
    </div>

    <div id="method-description">
      <div class="text-h4"> Method Description</div>
      <div class="text-body-1">
        <div class="label-container">
          <div class="label type">{{ sheetcontent.description.method_type }}</div>
          <div class="label task" v-for="task in sheetcontent.description.task"> {{ task }} </div>
          <div class="label dataset-dependency" v-for="datasettype in sheetcontent.description.compatible_data"> {{ datasettype }}</div>
        </div>
        <div class="pt-2"> {{ sheetcontent.description.method_description }} </div>
      </div>
    </div>

    <div id="pipeline-architecture-container">
      <div class="text-h4"> Pipeline Architecture</div>
      <div class="text-body-1">
        <div class="label-container">
          <div class="label pipeline-location"> {{ sheetcontent.pipeline.pipeline_location }}</div>
          <div class="label compatible-model" v-for="model in sheetcontent.pipeline.compatible_model"> {{ model }} </div>
        </div>
        <div class="pt-2" v-if="sheetcontent.pipeline.model_description"> {{ sheetcontent.pipeline.model_description }}</div>
      </div>
    </div>

    <div id="fairness-type-container">
      <div class="text-h4"> Fairness Type </div>
      <div class="text-body-1">
        <div class="label-container">
          <div class="label attribute-types" v-for="attr in sheetcontent.fairness.composition_features"> {{ attr }} </div>
          <div class="label fairness-degree"> {{ sheetcontent.fairness.fairness_guarantee }}</div>
          <div class="label fairness-type" v-for="fairtype in sheetcontent.fairness.fairness_type"> {{ fairtype }} </div>
          <div class="label fairness-def" v-for="def in sheetcontent.fairness.fairness_definitions"> {{ def }}</div>
        </div>
        <div class="pt-2"> {{ sheetcontent.fairness.fairness_description }}</div>
      </div>
    </div>
    
    <div id="implementation-container">
      <div class="text-h4"> Implementation Constraints</div>
      <div class="text-body-1">
        <div class="label-container"v-for="implementation in sheetcontent.implementation.packages">
          <div class="label programming-language"> {{ implementation.programming_language }} </div>
          <div class="label compatible-package" v-if="implementation.related_packages" v-for="comp_package in implementation.related_packages"> {{ comp_package }}</div>
        </div>
        <div class="pt-2" v-if="sheetcontent.implementation.description"> {{ sheetcontent.implementation.description }}</div>
      </div>
    </div>
    
    <div id="use-case-container">
      <div class="text-h4"> Tested Use Cases </div>
      <div class="text-body-1">
          <div class="label-container">
          <div class="label dataset" v-for="dataset in sheetcontent.use_cases.cases"> {{ removeCitation(dataset) }}</div>
        </div>
        <div class="pt-2" v-if="sheetcontent.use_cases.description"> {{ sheetcontent.use_cases.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { bimisheet } from '@/assets/types/bimisheet';
import { watch } from 'vue';
import { onMounted } from 'vue';

const props = defineProps<{
  sheetcontent: bimisheet
}>()

function paperTitle() {
  if (typeof(props.sheetcontent.metadata.source_paper) !== "undefined"){
    return  props.sheetcontent.metadata.source_paper.split("{")[1].split("}")[0]
  }
}

function removeCitation(inputText: string): string {
  return (inputText.split("\\cite")[0])
}


</script>

<style scoped>
#bimisheet {
  text-align: left;
  align-self: center;
  padding: 2rem;
  border-style: solid;
  border-color: black;
  border-width: 4px;
}

@media (min-width: 750px) {
  #bimisheet {
    width: 750px;
    margin: auto;
  }
}



</style>