import {AnalysedWebsite} from "../models/AnalysedWebsite";

export interface MarkupTraverser {
    analyseWebsite(): AnalysedWebsite;
}
