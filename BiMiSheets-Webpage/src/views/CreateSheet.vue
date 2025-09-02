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
        <div>
          <v-btn class="mt-2 full-width" type="submit" @click="openSheetModel" block >Create Sheet</v-btn>
        </div>
    </v-container>

    <v-dialog id="sheet-preview" v-model="openedBiMiSheetModal" width="auto" class="modal">
      <v-card  class="modal-content modal" >
        <v-toolbar>
          

          <v-toolbar-title>Example BiMiSheet</v-toolbar-title>

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="openedBiMiSheetModal = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <BiMiSheet v-if="tempBiMiSheetModal" :sheetcontent=tempBiMiSheetModal class="ma-6" ref="pdfContent"></BiMiSheet>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-snackbar style="z-index: 9000;">
            Automatic uploads to BiMi Sheet is not possible at the moment. If you want your method included on the website, please download the JSON and send it to marybeth.defrance@ugent.be . 
            <template #activator="{ props }">
              <span v-bind="props">
                <v-btn color="secondary">
                  Upload
                </v-btn>
              </span>
            </template>
          </v-snackbar>

          <v-menu
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
              >
                Download
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="downloadPDF">
                <v-list-item-title >Download PDF</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadJson">
                <v-list-item-title>Download JSON</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-app>
  </main>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { Ref } from 'vue';
import { onBeforeMount } from 'vue';
import download from "downloadjs";

import BiMiSheet from '@/components/BiMiSheet.vue';

import type { bimisheet } from '@/assets/types/bimisheet';
import type { method_description } from '@/assets/types/method_description';
import type { metadata } from '@/assets/types/metadata';
import type { pipeline_info } from '@/assets/types/pipeline_info';
import type { fairness_info } from '@/assets/types/fairness_info';
import type { implementation } from '@/assets/types/implementation';
import type { use_cases } from '@/assets/types/use_cases';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

var openedBiMiSheetModal: Ref<boolean> = ref(false);
var tempBiMiSheetModal: Ref<bimisheet> | Ref<null> = ref(null);

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

const pdfContent = ref(null)

const currentLicenses: string[] = [];

var currentMethodTypes: Ref<string[]> = ref([]);
var currentMLTasks: Ref<string[]> = ref([]);
var currentCompatibleDatasets: Ref<string[]> = ref([]);

const allowedPipelineLocations: string[] = ["Pre-processing", "In-processing", "Intra-processing", "Post-processing"]
var currentCompatibleModels: Ref<string[]> = ref([]);

const currentSensAttr: Ref<string[]> = ref(["Binary Attribute", "Categorical Attributes", "Parallel Attributes", "Numerical Attribute", "No Attributes at Inference"])
const currentFairnessGuarantee: Ref<string[]> = ref(["Fairness Guaranteed", "Tunable Fairness Strength", "No Fairness Guarantee"])
var currentFairnessTypes: Ref<string[]> = ref([]);
var currentFairnessDefinitions: Ref<string[]> = ref([]);

var currentProgrammingLanguage: Ref<string[]> = ref([]);
var currentPackages: Ref<string[]> = ref([]);

var currentTestedDatasets: Ref<string[]> = ref([]);

var isLoading: Ref<boolean> = ref(false);

onBeforeMount (() => {
  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/method_types").then(function (response) {
    currentMethodTypes.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/ml_task").then(function (response) {
    currentMLTasks.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_dataset").then(function (response) {
    currentCompatibleDatasets.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_model").then(function (response) {
    currentCompatibleModels.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/fairness_types").then(function (response) {
    currentFairnessTypes.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/fairness_definitions").then(function (response) {
    currentFairnessDefinitions.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/programming_languages").then(function (response) {
    currentProgrammingLanguage.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_packages").then(function (response) {
    currentPackages.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/comp_packages").then(function (response) {
    currentPackages.value = response.data;
  })

  axios.get(import.meta.env.VITE_BACKEND_URL +"/unique/use_cases").then(function (response) {
    currentTestedDatasets.value = response.data;
  })
})

function createJSONfromInput(): bimisheet | undefined {
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
                  packages: compatiblePackages.value
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
      method_description: methodDescriptionJson,
      pipeline: pipelineJson,
      fairness: fairnessJson,
      implementation: implementationJson,
      use_cases: useCasesJson,
      bibliography: []
    }
    return (newBiMiSheet);
    

  } catch(error) {
    console.error(error)
  }
}

function downloadJson(): void {
  try {
    var newBiMiSheet = createJSONfromInput();
  download(JSON.stringify(newBiMiSheet), methodName.value! + ".json", "text/plain");
  } catch(error) {
    console.error(error)
  }  
}

async function downloadPDF(): Promise<void> {
  // Set the loading state to true to indicate the process has started
  isLoading.value = true;
  
  console.log(pdfContent)
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

function openSheetModel(): void {
  try {
    var newBiMiSheet = createJSONfromInput();
    console.log(newBiMiSheet)
    if (newBiMiSheet){
      console.log("Moved in here!")
      tempBiMiSheetModal.value = newBiMiSheet;
      openedBiMiSheetModal.value = true;
      console.log("Moved in here!", openedBiMiSheetModal)
      console.log("bananana", tempBiMiSheetModal.value)
    }
    
  } catch(error) {
    console.error(error)
  }  
}
</script>

<style scoped>

v-tooltip {
  z-index: 99999 !important;
}

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

.modal {
  max-height: calc(100vh - 20px);
  /* overflow-y: auto; */

  min-width: 80%;
}
  
.modal-content {
  position: relative;

  max-width: 800px;
  width: 90%;
  padding: spacing(4);
  margin: 0 spacing(3);

  background-color: white;

}
</style>
