<template>
  <div id="bimisheet" ref="rootEl">
    <div class="text-h3">{{ sheetcontent.metadata.name}}: BiMi Sheet</div>

    <div id="metadata-container" class="avoid-break">
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
          <span class="font-italic"> {{ sheetcontent.metadata.source_paper }} </span>
        </div>
      </div>
    </div>

    <div id="method-description" class="avoid-break">
      <div class="text-h4"> Method Description</div>
      <div class="text-body-1">
        <div class="label-container">
          <div class="label type" v-for="methodType in sheetcontent.method_description.method_type">{{ methodType }}</div>
          <div class="label task" v-for="task in sheetcontent.method_description.task"> {{ task }} </div>
          <div class="label dataset-dependency" v-for="datasettype in sheetcontent.method_description.compatible_data"> {{ datasettype }}</div>
        </div>
        <div class="pt-2"> 
          <vue-mathjax :formula="sheetcontent.method_description.method_description"></vue-mathjax>
        </div>
      </div>
    </div>

    <div id="pipeline-architecture-container" class="avoid-break">
      <div class="text-h4"> Pipeline Architecture</div>
      <div class="text-body-1">
        <div class="label-container">
          <div class="label pipeline-location"> {{ sheetcontent.pipeline.pipeline_location }}</div>
          <div class="label compatible-model" v-for="model in sheetcontent.pipeline.compatible_model"> {{ model }} </div>
        </div>
        <div class="pt-2" v-if="sheetcontent.pipeline.model_description"> 
          <vue-mathjax :formula="sheetcontent.pipeline.model_description"></vue-mathjax>
        </div>
      </div>
    </div>

    <div id="fairness-type-container" class="avoid-break">
      <div class="text-h4"> Fairness Type </div>
      <div class="text-body-1">
        <div class="label-container">
          <div class="label attribute-types" v-for="attr in sheetcontent.fairness.composition_features"> {{ attr }} </div>
          <div class="label fairness-degree"> {{ sheetcontent.fairness.fairness_guarantee }}</div>
          <template v-for="fairness_type_defs in sheetcontent.fairness.fairness_type_defs">
            <div class="label fairness-type" > {{ fairness_type_defs.fairness_type }} </div>
            <div class="label fairness-def" v-for="def in fairness_type_defs.fairness_definitions"> {{ def }}</div>
          </template>
        </div>
        <vue-mathjax :formula="sheetcontent.fairness.fairness_description" ></vue-mathjax>
      </div>
    </div>
    
    <div id="implementation-container" class="avoid-break">
      <div class="text-h4"> Implementation Constraints</div>
      <div class="text-body-1">
        <div class="label-container"v-for="implementation in sheetcontent.implementation.packages">
          <div class="label programming-language"> {{ implementation.programming_language }} </div>
          <div class="label compatible-package" v-if="implementation.packages" v-for="comp_package in implementation.packages"> {{ comp_package }}</div>
        </div>
        <div class="pt-2" v-if="sheetcontent.implementation.description">
          <vue-mathjax :formula="sheetcontent.implementation.description"></vue-mathjax>
        </div>
      </div>
    </div>
    
    <div id="use-case-container" class="avoid-break">
      <div class="text-h4"> Tested Use Cases </div>
      <div class="text-body-1">
          <div class="label-container">
          <div class="label dataset" v-for="dataset in sheetcontent.use_cases.cases"> {{ removeCitation(dataset) }}</div>
        </div>
        <div class="pt-2" v-if="sheetcontent.use_cases.description"> 
          <vue-mathjax :latex="sheetcontent.use_cases.description"></vue-mathjax>
          <div> {{sheetcontent.use_cases.description}} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { bimisheet } from '@/assets/types/bimisheet';
import { ref } from 'vue';
import { onMounted } from 'vue';

const rootEl = ref(null)

// Make rootEl accessible to the parent via expose()
defineExpose({
  el: rootEl
})

const props = defineProps<{
  sheetcontent: bimisheet
}>()

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

@container (min-width: 750px) {
  #bimisheet {
    width: 750px;
    margin: auto;
  }
}

.avoid-break {
  break-inside: avoid;        /* keep block elements together */
  page-break-inside: avoid;   /* legacy alias */
}



</style>