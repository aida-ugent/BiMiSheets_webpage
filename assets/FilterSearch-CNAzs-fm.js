import{d as G,g as ee,j as o,c as r,b as U,t as f,F as _,m as b,f as te,_ as I,r as n,a,p as ae,e as d,u as p,k as m,i as B}from"./index-DqmNMjSd.js";const le={id:"bimisheetshort"},se={class:"label-container text-caption"},ne={class:"label type"},ie={class:"label task"},oe={class:"label dataset-dependency"},re={class:"label pipeline-location"},ue={class:"label compatible-model"},pe={class:"label attribute-types"},de={class:"label fairness-degree"},ce={class:"label fairness-type"},me={class:"label-container"},fe={class:"label programming-language"},ve={class:"label compatible-package"},ge=G({__name:"BiMiSheetShort",props:{sheetcontent:{}},setup(A){const v=ee(),h=A;function N(){v.push("/overview?method=".concat(h.sheetcontent.filename))}return(c,D)=>(o(),r("div",le,[U("a",{class:"text-h4",onClick:D[0]||(D[0]=u=>N())},f(c.sheetcontent.filename),1),U("div",se,[(o(!0),r(_,null,b(c.sheetcontent.description.method_type,u=>(o(),r("div",ne,f(u),1))),256)),(o(!0),r(_,null,b(c.sheetcontent.description.task,u=>(o(),r("div",ie,f(u),1))),256)),(o(!0),r(_,null,b(c.sheetcontent.description.compatible_data,u=>(o(),r("div",oe,f(u),1))),256)),U("div",re,f(c.sheetcontent.pipeline.pipeline_location),1),(o(!0),r(_,null,b(c.sheetcontent.pipeline.compatible_model,u=>(o(),r("div",ue,f(u),1))),256)),(o(!0),r(_,null,b(c.sheetcontent.fairness.composition_features,u=>(o(),r("div",pe,f(u),1))),256)),U("div",de,f(c.sheetcontent.fairness.fairness_guarantee),1),(o(!0),r(_,null,b(c.sheetcontent.fairness.fairness_type,u=>(o(),r("div",ce,f(u),1))),256)),(o(!0),r(_,null,b(c.sheetcontent.implementation.packages,u=>(o(),r("div",me,[U("div",fe,f(u.programming_language),1),u.related_packages?(o(!0),r(_,{key:0},b(u.related_packages,w=>(o(),r("div",ve,f(w),1))),256)):te("",!0)]))),256))])]))}}),he=I(ge,[["__scopeId","data-v-db759ab7"]]),_e={id:"search-box",class:"pt-8"},be={id:"filter-area"},ke={id:"possible-methods"},Ve={id:"individual-sheet-container"},ye=G({__name:"FilterSearch",setup(A){n(void 0);var v=n(void 0),h=n(JSON.parse(JSON.stringify(a)));const N=n(Q()),c=n(W()),D=n(X()),u=n(["Pre-Processing","In-Processing","Post-Processing"]),w=n(Y()),O=n(["Binary Attribute","Categorical Attributes","Parallel Attributes","Numerical Attributes","No Attributes at Inference"]),J=n(["Fairness Guarantee","Tunable Fairness Strength","No Fairness Guarantee","Fairness Guarantee on Dataset"]),R=n(Z()),E=n(x()),q=n($()),z=n(j());var k=n([]),V=n([]),y=n([]),M=n([]),L=n([]),F=n([]),C=n([]),S=n([]),P=n([]),g=n([]),T=n([]);function H(l){if(l){h.value=[];for(var e=0;e<a.length;e++)a[e].filename.toLowerCase().includes(l.toLowerCase())&&h.value.push(a[e])}else h.value=JSON.parse(JSON.stringify(a))}function K(){if(v.value||k.value.length>0||V.value.length>0||y.value.length>0||M.value.length>0||L.value.length>0||F.value.length>0||C.value.length>0||S.value.length>0||P.value.length>0||g.value.length>0||T.value.length>0){h.value=[];for(var l=0;l<a.length;l++)if(!(v.value&&!a[l].filename.toLowerCase().includes(v.value.toLowerCase()))){if(k.value.length>0){for(var e=0,t=0;t<a[l].description.method_type.length;t++)k.value.includes(a[l].description.method_type[t])&&e++;if(e===0)continue}if(V.value.length>0){for(var e=0,t=0;t<a[l].description.task.length;t++)V.value.includes(a[l].description.task[t])&&e++;if(e===0)continue}if(y.value.length>0){for(var e=0,t=0;t<a[l].description.compatible_data.length;t++)y.value.includes(a[l].description.compatible_data[t])&&e++;if(e===0)continue}if(!(M.value.length>0&&!M.value.includes(a[l].pipeline.pipeline_location))){if(L.value.length>0){for(var e=0,t=0;t<a[l].pipeline.compatible_model.length;t++)L.value.includes(a[l].pipeline.compatible_model[t])&&e++;if(e===0)continue}if(F.value.length>0){for(var e=0,t=0;t<a[l].fairness.composition_features.length;t++)F.value.includes(a[l].fairness.composition_features[t])&&e++;if(e===0)continue}if(!(C.value.length>0&&!C.value.includes(a[l].fairness.fairness_guarantee))){if(S.value.length>0){for(var e=0,t=0;t<a[l].fairness.fairness_type.length;t++)S.value.includes(a[l].fairness.fairness_type[t])&&e++;if(e===0)continue}if(P.value.length>0){for(var e=0,t=0;t<a[l].fairness.fairness_definitions.length;t++)P.value.includes(a[l].fairness.fairness_definitions[t])&&e++;if(e===0)continue}if(g.value.length>0){for(var e=0,t=0;t<a[l].implementation.packages.length;t++)g.value.includes(a[l].implementation.packages[t].programming_language)&&e++;if(e===0)continue}if(g.value.length>0){for(var e=0,t=0;t<a[l].implementation.packages.length;t++)g.value.includes(a[l].implementation.packages[t].programming_language)&&e++;if(e===0)continue}if(T.value.length>0){for(var e=0,t=0;t<a[l].implementation.packages.length;t++)if(a[l].implementation.packages[t].related_packages)for(var i=0;i<a[l].implementation.packages[t].related_packages.length;i++)T.value.includes(a[l].implementation.packages[t].related_packages[i])&&e++;if(e===0)continue}h.value.push(a[l])}}}}else h.value=a}function Q(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].description.method_type.length;t++)l.includes(a[e].description.method_type[t])||l.push(a[e].description.method_type[t]);return l.sort()}function W(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].description.task.length;t++)l.includes(a[e].description.task[t])||l.push(a[e].description.task[t]);return l.sort()}function X(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].description.compatible_data.length;t++)l.includes(a[e].description.compatible_data[t])||l.push(a[e].description.compatible_data[t]);return l.sort()}function Y(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].pipeline.compatible_model.length;t++)l.includes(a[e].pipeline.compatible_model[t])||l.push(a[e].pipeline.compatible_model[t]);return l.sort()}function Z(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].fairness.fairness_type.length;t++)l.includes(a[e].fairness.fairness_type[t])||l.push(a[e].fairness.fairness_type[t]);return l.sort()}function x(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].fairness.fairness_definitions.length;t++)l.includes(a[e].fairness.fairness_definitions[t])||l.push(a[e].fairness.fairness_definitions[t]);return l.sort()}function $(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].implementation.packages.length;t++)l.includes(a[e].implementation.packages[t].programming_language)||l.push(a[e].implementation.packages[t].programming_language);return l.sort()}function j(){for(var l=[],e=0;e<a.length;e++)for(var t=0;t<a[e].implementation.packages.length;t++)if(a[e].implementation.packages[t].related_packages)for(var i=0;i<a[e].implementation.packages[t].related_packages.length;i++)l.includes(a[e].implementation.packages[t].related_packages[i])||l.push(a[e].implementation.packages[t].related_packages[i]);return l.sort()}return ae([k,V,y,M,L,F,C,S,P,g,T],()=>{K()}),(l,e)=>{const t=B("v-text-field"),i=B("v-select");return o(),r("main",null,[U("div",_e,[d(t,{id:"input-field",variant:"solo","prepend-inner-icon":"mdi-magnify",modelValue:p(v),"onUpdate:modelValue":e[0]||(e[0]=s=>m(v)?v.value=s:v=s),onInput:e[1]||(e[1]=s=>H(p(v)))},null,8,["modelValue"])]),U("div",be,[d(i,{class:"select-option",label:"Method Type",modelValue:p(k),"onUpdate:modelValue":e[2]||(e[2]=s=>m(k)?k.value=s:k=s),items:N.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"ML Task",modelValue:p(V),"onUpdate:modelValue":e[3]||(e[3]=s=>m(V)?V.value=s:V=s),items:c.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Compatible Datasets",modelValue:p(y),"onUpdate:modelValue":e[4]||(e[4]=s=>m(y)?y.value=s:y=s),items:D.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Pipeline Location",modelValue:p(M),"onUpdate:modelValue":e[5]||(e[5]=s=>m(M)?M.value=s:M=s),items:u.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Compatible Model",modelValue:p(L),"onUpdate:modelValue":e[6]||(e[6]=s=>m(L)?L.value=s:L=s),items:w.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Sensitive Attributes",modelValue:p(F),"onUpdate:modelValue":e[7]||(e[7]=s=>m(F)?F.value=s:F=s),items:O.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Fairness Guarantee",modelValue:p(C),"onUpdate:modelValue":e[8]||(e[8]=s=>m(C)?C.value=s:C=s),items:J.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Fairness Type",modelValue:p(S),"onUpdate:modelValue":e[9]||(e[9]=s=>m(S)?S.value=s:S=s),items:R.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Fairness Definition",modelValue:p(P),"onUpdate:modelValue":e[10]||(e[10]=s=>m(P)?P.value=s:P=s),items:E.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Programming Language",modelValue:p(g),"onUpdate:modelValue":e[11]||(e[11]=s=>m(g)?g.value=s:g=s),items:q.value,multiple:"",chips:""},null,8,["modelValue","items"]),d(i,{class:"select-option",label:"Compatible Packages",modelValue:p(T),"onUpdate:modelValue":e[12]||(e[12]=s=>m(T)?T.value=s:T=s),items:z.value,multiple:"",chips:""},null,8,["modelValue","items"])]),U("div",ke,[(o(!0),r(_,null,b(p(h),s=>(o(),r("div",Ve,[d(he,{sheetcontent:s},null,8,["sheetcontent"])]))),256))])])}}}),Le=I(ye,[["__scopeId","data-v-1abf9bce"]]);export{Le as default};