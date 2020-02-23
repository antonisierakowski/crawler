import { MarkupFetcher } from "./MarkupFetcher";
import { WebsiteRepository } from "./Repository";
import { CheerioTraverser } from "./CheerioTraverser";
import { inject, injectable, unmanaged } from "inversify";
import { TYPES } from "../types/types";

export interface WebCrawler {
  initialize(url: string): void;
}

@injectable()
export class Crawler implements WebCrawler {
  private queue: Set<string> = new Set();

  constructor(
    @inject(TYPES.MarkupFetcher) private fetcher: MarkupFetcher,
    @inject(TYPES.WebsiteRepository) private repository: WebsiteRepository,
  ) { }

  public async initialize(initialUrl: string): Promise<void> {
    this.queue.add(initialUrl);
    console.log('Started crawling...');
    while(this.queue.size) {
      const currentUrl = Array.from(this.queue)[0];
      if (await this.repository.isUrlStored(currentUrl)) {
        this.removeFromQueue(currentUrl);
      } else {
        try {
          await this.crawlWebsite(currentUrl);
        } catch(e) {
          this.removeFromQueue(currentUrl);
        }
      }
    }
    this.reinitializeCrawler();
  }

  private async reinitializeCrawler(): Promise<void> {
    console.log('Reinitializing crawler from the last saved record...');
    const lastRecord = await this.repository.getAndRemoveLastSavedUrl();
    this.initialize(lastRecord);
  }

  private async crawlWebsite(url: string): Promise<void> {
    const markup = await this.fetcher.getMarkup(url);
    const traverser = new CheerioTraverser(url, markup);
    const crawlResult = traverser.analyseWebsite();
    await this.repository.save(crawlResult);
    crawlResult.anchors.forEach(anchor => this.queue.add(anchor));
  }

  private removeFromQueue(url: string): void {
    this.queue.delete(url);
  }
}