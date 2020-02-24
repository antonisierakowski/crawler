import cheerio from 'cheerio';
import { AnalysedWebsite } from "../models/AnalysedWebsite";
import {MarkupTraverser} from "../interfaces/MarkupTraverser";

export class CheerioTraverser implements MarkupTraverser {
  private readonly wrapper: CheerioStatic = null;

  constructor(private url: string, body: string) {
    this.wrapper = cheerio.load(body);
  }

  analyseWebsite(): AnalysedWebsite {
    return {
      url: this.url,
      title: this.getSiteTitle(),
      anchors: this.getAllAnchors(),
      description: this.getSiteDescription(),
    };
  }

  private getAllAnchors(): string[] {
    const allAnchorTags = this.wrapper('a');
    const allUrls = allAnchorTags.toArray().map((a) => (
      a.attribs.href
    ));
    try {
      const result = allUrls.filter(url => url.includes('http'));
      return result
    } catch (e) {
      return [];
    }
  }

  private getSiteTitle(): string {
    return this.wrapper("title").text();
  }

  private getSiteDescription(): string {
    return this.wrapper('meta[name="description"]').attr('content');
  }
}
