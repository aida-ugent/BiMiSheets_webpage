export interface fairness_info {
    composition_features: string[];
    fairness_guarantee: string;
    fairness_type_defs: fairness_type_def[];
    fairness_description: string;
}

interface fairness_type_def {
    fairness_type: string;
    fairness_definitions: string[];
}