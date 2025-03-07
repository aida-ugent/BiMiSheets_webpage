<template>
  <main>
    <v-app>
    <v-container class="max-width-set">
        <div class="text-h2 py-1" id="title"> BiMiSheet Creation</div>
        <div class="text-subtitle-1 pl-1">Create your own sheet here! Fill in the form and download the JSON. </div>
        <div class="text-h3 py-3"> Metadata </div>
        
        <div class="form-section">
          <v-text-field label="Method Name" v-model="methodName" class="medium-width  col-1-wide"></v-text-field>
          <v-text-field label="Author Name(s)" v-model="authorNames" class="medium-width  col-2-wide"></v-text-field>

          <v-text-field label="Version Name" v-model="versionName" class="small-width col-1"></v-text-field>
          <v-combobox label="License Info" v-model="licenseName" :items="currentLicenses" class="small-width col-2"></v-combobox>

          <v-text-field label="Source Paper" v-model="sourcePaper" class="large-width full-width"></v-text-field>
        </div>
        

        <div class="text-h3"> Method Description </div>
        <div class="form-section">
          <v-combobox label="Method Type" v-model="methodTypes" :items="currentMethodTypes" chips multiple class="medium-width col-1"></v-combobox>
          <v-combobox label="ML Task" v-model="mlTasks" :items="currentMLTasks" chips multiple class="large-width col-2"></v-combobox>

          <v-combobox label="Compatible Dataset(s)" v-model="compatibleDatasets" :items="currentCompatibleDatasets" chips multiple class="full-width"></v-combobox>

          <v-textarea label="Method Description" v-model="methodDescription" class="full-width "></v-textarea>
        </div>

        <div class="text-h3"> Pipeline Architecture </div>
        <div class="form-section">
          <v-select label="Pipeline Location" v-model="pipelineLocation" :items="allowedPipelineLocations" class="small-width col-1"></v-select>
          <v-combobox label="Compatible Model(s)"v-model="compatibleModelTypes" :items="currentCompatibleModels" chips multiple class="large-width col-2"></v-combobox>

          <v-textarea label="Details on compatible models" v-model="detailsCompatibleModels" class="full-width "></v-textarea>
        </div>

        <div class="text-h3"> Fairness Type </div>
        <div class="form-section">
          <v-select label="Composition of Sens. Attr." v-model="compSensitiveAttr" :items="currentSensAttr" multiple chips class="large-width col-1"></v-select>
          <v-select label="Fairness Guarantee" v-model="fairnessGuarantee" :items="currentFairnessGuarantee" class="small-width col-2"></v-select>
          <v-combobox label="Fairness Type(s)" v-model="fairnessType" :items="currentFairnessTypes" chips class="medium-width col-1"></v-combobox>
          <v-combobox label="Fairness Definition(s)" v-model="fairnessDefinition" :items="currentFairnessDefinitions" multiple chips class="large-width col-2"></v-combobox>

          <v-textarea label="Details on fairness notion" v-model="fairnessDescription" class="full-width "></v-textarea>
        </div>

        <div class="text-h3"> Implementation Constraints </div>
        <div class="form-section">
          <v-combobox label="Programming Language" v-model="programmingLanguage" :items="currentProgrammingLanguage" class="small-width col-1"></v-combobox>
          <v-combobox label="Compatible Package(s)" v-model="compatiblePackages" :items="currentPackages" multiple chips class="large-width col-2"></v-combobox>
          <div class="flex-break"></div>
          <v-textarea label="Details on implementation constraints" v-model="implementationDetails" class="full-width "></v-textarea>
        </div>

        <div class="text-h3"> Tested Use Cases </div>
        <div class="form-section">
          <v-combobox label="Tested Dataset(s)" v-model="testedDatasets" :items="currentTestedDatasets" multiple chips class="full-width "></v-combobox>

          <v-textarea label="Performance information of the method" v-model="useCaseDescription" class="full-width "></v-textarea>
        </div>
        <v-btn class="mt-2 full-width" type="submit" @click="downloadJson" block >Download JSON</v-btn>
    </v-container>
    </v-app>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { presentCompPack, presentLicenses, presentMethods, presentMLTasks,
         presentDatasetTypes, presentCompatibleModels, presentSensAttr, presentFairnessGuarantee,
         presentFairnessTypes, presentFairnessDef, presentProgramLang, presentUseCases
 } from '@/assets/labelUtils';
import { onMounted } from 'vue';
import download from "downloadjs";
import type { bimisheet } from '@/assets/types/bimisheet';
import type { method_description } from '@/assets/types/method_description';
import type { metadata } from '@/assets/types/metadata';
import type { pipeline_info } from '@/assets/types/pipeline_info';
import type { fairness_info } from '@/assets/types/fairness_info';
import type { implementation } from '@/assets/types/implementation';
import type { use_cases } from '@/assets/types/use_cases';

var methodName: Ref<string | undefined> = ref(undefined);
var authorNames: Ref<string | undefined> = ref(undefined);
var versionName: Ref<string | undefined> = ref(undefined);
var licenseName: Ref<string | undefined> = ref(undefined);
var sourcePaper: Ref<string | undefined> = ref(undefined);

var methodTypes: Ref<string[]> = ref([]);
var mlTasks: Ref<string[]> = ref([]);
var compatibleDatasets: Ref<string[]> = ref([]);
var methodDescription: Ref<string | undefined> = ref(undefined);

var pipelineLocation: Ref<string | undefined> = ref(undefined);
var compatibleModelTypes: Ref<string[]> = ref([]);  
var detailsCompatibleModels: Ref<string | undefined> = ref(undefined);

var compSensitiveAttr: Ref<string[]> = ref([]);  
var fairnessGuarantee: Ref<string | undefined> = ref(undefined);
var fairnessType: Ref<string | undefined> = ref(undefined);
var fairnessDefinition: Ref<string[]> = ref([]);
var fairnessDescription: Ref<string | undefined> = ref(undefined);

var programmingLanguage: Ref<string | undefined> = ref(undefined);
var compatiblePackages: Ref<string[]> = ref([]);
var implementationDetails: Ref<string | undefined> = ref(undefined);

var testedDatasets: Ref<string[]> = ref([]);
var useCaseDescription: Ref<string | undefined> = ref(undefined);
  

const currentLicenses: string[] = presentLicenses();

const currentMethodTypes: string[] = presentMethods();
const currentMLTasks: string[] = presentMLTasks();
const currentCompatibleDatasets: string[] = presentDatasetTypes();

const allowedPipelineLocations: string[] = ["Pre-processing", "In-processing", "Intra-processing", "Post-processing"]
const currentCompatibleModels: string[] = presentCompatibleModels();

const currentSensAttr: string[] = presentSensAttr();
const currentFairnessGuarantee: string[] = presentFairnessGuarantee();
const currentFairnessTypes: string[] = presentFairnessTypes();
const currentFairnessDefinitions: string[] = presentFairnessDef();

const currentProgrammingLanguage: string[] = presentProgramLang();
const currentPackages: string[] = presentCompPack();

const currentTestedDatasets: string[] = presentUseCases();

function downloadJson(): void {
  try{
    const metaDataJson: metadata = {
      name: methodName.value!,
      authors: authorNames.value!,
      version: versionName.value!,
      license: licenseName.value,
      source_paper: sourcePaper.value
    }
    const methodDescriptionJson: method_description = {
      method_type: methodTypes.value,
      task: mlTasks.value,
      compatible_data: compatibleDatasets.value,
      method_description: methodDescription.value!
    }

    const pipelineJson: pipeline_info = {
      pipeline_location: pipelineLocation.value!,
      compatible_model: compatibleModelTypes.value,
      model_description: detailsCompatibleModels.value
    }

    const fairnessJson: fairness_info = {
      composition_features: compSensitiveAttr.value,
      fairness_guarantee: fairnessGuarantee.value!,
      fairness_type_defs: [{
        fairness_type: fairnessType.value!,
        fairness_definitions: fairnessDefinition.value
      }],
      fairness_description: fairnessDescription.value!
    }

    const implementationJson: implementation = {
      packages: [{programming_language: programmingLanguage.value!,
                  related_packages: compatiblePackages.value
      }],
      description: implementationDetails.value
    }

    const useCasesJson: use_cases = {
      cases: testedDatasets.value,
      description: useCaseDescription.value
    }

    var newBiMiSheet: bimisheet = {
      filename: methodName.value!,
      metadata: metaDataJson,
      description: methodDescriptionJson,
      pipeline: pipelineJson,
      fairness: fairnessJson,
      implementation: implementationJson,
      use_cases: useCasesJson,
      bibliography: []
    }
    download(JSON.stringify(newBiMiSheet), methodName.value! + ".json", "text/plain");

  } catch(error) {
    console.error(error)
  }
  
}

</script>

<style scoped>

.max-width-set {
  max-width: 1000px;
}

.form-section {
  margin: auto;
  display: grid;
  column-gap: 10px;
}

.col-1 {
  grid-column-start: 1;
  grid-column-end: 2;
}

.col-2 {
  grid-column-start: 2;
  grid-column-end: 3;
}

.full-width{
  grid-column-start: 1;
  grid-column-end: 3;
}

.flex-break{
  flex: 1 0 100% !important
}
  

</style>
