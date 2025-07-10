import type { fairness_info } from "./fairness_info";
import type { implementation } from "./implementation";
import type { method_description } from "./method_description";
import type { pipeline_info } from "./pipeline_info";


export interface bimisheet_short {
    filename: string;
    bimisheet_id: BigInt;
    method_description: method_description;
    pipeline: pipeline_info;
    fairness: fairness_info;
    implementation: implementation;
}
