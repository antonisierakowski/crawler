import cheerio from 'cheerio';
import { AnalysedWebsite } from "../models/AnalysedWebsite";

export interface MarkupTraverser {
  analyseWebsite(): AnalysedWebsite;
}

export class CheerioTraverser implements MarkupTraverser {
  private wrapper: CheerioStatic = null;

  constructor(private url: string, body: string) {
    this.wrapper = cheerio.load(body);
  }

  private getAllAnchors(): string[] {
    const allAnchorTags = this.wrapper('a');
    const allUrls = allAnchorTags.toArray().map((a) => (
      a.attribs.href
    ));
    let result: string[];
    try {
      result = allUrls.filter(url => url.includes('http'));
    } catch (e) {
      result = [];
    }
    return result;
  }

  private getSiteTitle(): string {
    return this.wrapper("title").text();
  }

  private getSiteDescription(): string {
    return this.wrapper('meta[name="description"]').attr('content');
  }

  analyseWebsite(): AnalysedWebsite {
    return {
      url: this.url,
      title: this.getSiteTitle(),
      anchors: this.getAllAnchors(),
      description: this.getSiteDescription(),
    };
  }
}