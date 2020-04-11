import { AnalysedWebsite } from "../models/AnalysedWebsite";

export interface MarkupTraverser {
    analyseWebsite(url: string): Promise<AnalysedWebsite>;
}
