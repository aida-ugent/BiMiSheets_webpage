import { allSheets } from "./sheets/AllSheets";

export function presentMethods(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].description.method_type.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].description.method_type[j]))) {
                presentMethodsList.push(allSheets[i].description.method_type[j]);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentMLTasks(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].description.task.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].description.task[j]))) {
                presentMethodsList.push(allSheets[i].description.task[j]);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentDatasetTypes(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].description.compatible_data.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].description.compatible_data[j]))) {
                presentMethodsList.push(allSheets[i].description.compatible_data[j]);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentCompatibleModels(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].pipeline.compatible_model.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].pipeline.compatible_model[j]))) {
                presentMethodsList.push(allSheets[i].pipeline.compatible_model[j]);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentFairnessTypes(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) {
        for (var j = 0; j < allSheets[i].fairness.fairness_type_defs.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].fairness.fairness_type_defs[j].fairness_type))) {
                presentMethodsList.push(allSheets[i].fairness.fairness_type_defs[j].fairness_type);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentFairnessDef(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].fairness.fairness_type_defs.length; j++){
            for (var k = 0; k < allSheets[i].fairness.fairness_type_defs[j].fairness_definitions.length; k++){
                if (!(presentMethodsList.includes(allSheets[i].fairness.fairness_type_defs[j].fairness_definitions[k]))) {
                    presentMethodsList.push(allSheets[i].fairness.fairness_type_defs[j].fairness_definitions[k]);
                }
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentProgramLang(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].implementation.packages.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].implementation.packages[j].programming_language))) {
                presentMethodsList.push(allSheets[i].implementation.packages[j].programming_language);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentCompPack(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].implementation.packages.length; j++){
            if (allSheets[i].implementation.packages[j].related_packages){
                for (var k = 0; k < allSheets[i].implementation.packages[j].related_packages.length; k++){
                    if (!(presentMethodsList.includes(allSheets[i].implementation.packages[j].related_packages[k]))) {
                        presentMethodsList.push(allSheets[i].implementation.packages[j].related_packages[k]);
                    }
                }
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentSensAttr(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        for (var j = 0; j < allSheets[i].fairness.composition_features.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].fairness.composition_features[j]))) {
                presentMethodsList.push(allSheets[i].fairness.composition_features[j]);
            }
        }
    }
    return presentMethodsList.sort()
}

export function presentFairnessGuarantee(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        if (!(presentMethodsList.includes(allSheets[i].fairness.fairness_guarantee))) {
            presentMethodsList.push(allSheets[i].fairness.fairness_guarantee);
        }
    }
    return presentMethodsList.sort()
}

export function presentLicenses(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) { 
        if (allSheets[i].metadata.license){
            if (!(presentMethodsList.includes(allSheets[i].metadata.license!))) {
                presentMethodsList.push(allSheets[i].metadata.license!);
            }
        }
    }
    return presentMethodsList.sort()
}


export function presentUseCases(): string[] {
    var presentMethodsList: string[] = []
    for (var i = 0; i < allSheets.length; i++) {
        for (var j = 0; j < allSheets[i].use_cases.cases.length; j++){
            if (!(presentMethodsList.includes(allSheets[i].use_cases.cases[j]))) {
                presentMethodsList.push(allSheets[i].use_cases.cases[j]);
            }
        } 
    }
    return presentMethodsList.sort()
}