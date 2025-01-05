import AIF360Adversarial from "@/assets/sheets/AIF360AdversarialDebiasing.json"
import AIF360CalibratedEqOdds from "@/assets/sheets/AIF360CalibratedEqOddsPostprocessing.json"
import AIF360DetRerankingConserv from "@/assets/sheets/AIF360DeterministicRerankingConservative.json"
import AIF360DetRerankingConstr from "@/assets/sheets/AIF360DeterministicRerankingConstrained.json"
import AIF360DetRerankingGreedy from "@/assets/sheets/AIF360DeterministicRerankingGreedy.json"
import AIF360DetRerankingRelaxed from "@/assets/sheets/AIF360DeterministicRerankingRelaxed.json"
import AIF360Disparate from "@/assets/sheets/AIF360DisparateImpactRemover.json"
import AIF360ExponentiatedGradient from "@/assets/sheets/AIF360ExponentiatedGradientReduction.json"
import AIF360GerryFair from "@/assets/sheets/AIF360GerryFairClassifier.json"
import AIF360GridSearch from "@/assets/sheets/AIF360GridSearchReduction.json"
import AIF360LFR from "@/assets/sheets/AIF360LFR.json"
import AIF360MetaFair from "@/assets/sheets/AIF360MetaFairClassifier.json"
import AIF360OptimPreproc from "@/assets/sheets/AIF360OptimPreproc.json"
import AIF360PrejRem from "@/assets/sheets/AIF360PrejudiceRemover.json"
import AIF360RejectOption from "@/assets/sheets/AIF360RejectOptionClassification.json"
import AIF360Reweighting from "@/assets/sheets/AIF360Reweighing.json"
import ErrorParity from "@/assets/sheets/ErrorParity.json"
import FairlearnAdv from "@/assets/sheets/FairlearnAdversarialMitigation.json"
import FairlearnCorrRem from "@/assets/sheets/FairlearnCorrelationRemover.json"
import FairlearnReductions from "@/assets/sheets/FairlearnReductions.json"
import FairlearnThresholdOpt from "@/assets/sheets/FairlearnThresholdOptimizer.json"
import FairretProj from "@/assets/sheets/FairretProjection.json"
import FairretViol from "@/assets/sheets/FairretViolation.json"
import OxonFair from "@/assets/sheets/OxonFair.json"

import type { bimisheet } from "../types/bimisheet"


export const allSheets: bimisheet[] = [AIF360Adversarial, AIF360CalibratedEqOdds, AIF360DetRerankingConserv,AIF360DetRerankingConstr,
                          AIF360DetRerankingGreedy, AIF360DetRerankingRelaxed, AIF360Disparate, AIF360ExponentiatedGradient, AIF360GerryFair,
                          AIF360GridSearch, AIF360LFR, AIF360MetaFair, AIF360OptimPreproc, AIF360PrejRem, AIF360RejectOption,
                          AIF360Reweighting, ErrorParity, FairlearnAdv, FairlearnCorrRem, FairlearnReductions, FairlearnThresholdOpt,
                          FairretProj, FairretViol, OxonFair
]