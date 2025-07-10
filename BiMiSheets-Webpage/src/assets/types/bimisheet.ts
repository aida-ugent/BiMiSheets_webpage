import type { fairness_info } from "./fairness_info";
import type { implementation } from "./implementation";
import type { metadata } from "./metadata";
import type { method_description } from "./method_description";
import type { pipeline_info } from "./pipeline_info";
import type { use_cases } from "./use_cases";

export interface bimisheet {
    filename: string;
    metadata: metadata;
    method_description: method_description;
    pipeline: pipeline_info;
    fairness: fairness_info;
    implementation: implementation;
    use_cases: use_cases;
    bibliography: string[]
}
