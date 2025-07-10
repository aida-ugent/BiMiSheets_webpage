import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import VueMathjax from 'vue-mathjax-next';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
})
// function onMathJaxReady() {
//     const el = document.getElementById("elementId");
//     renderByMathjax(el);
// }

// initMathJax({}, onMathJaxReady);


app.use(router)

app.use(VueAxios, axios)
app.use(VueMathjax)

app.use(vuetify).mount('#app')
