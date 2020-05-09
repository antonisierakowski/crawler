export interface Website {
  title: string;
  url: string;
  description?: string;
}

export interface AnalysedWebsite extends Website {
  anchors: string[];
}
