import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { WebsiteRepository } from '../interfaces/WebsiteRepository';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';

export interface WebCrawler {
	initialize(url: string): void;
}

@injectable()
export class Crawler implements WebCrawler {
	private queue: Set<string> = new Set();

	constructor(
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepository,
		@inject(TYPES.MarkupTraverser) private traverser: MarkupTraverser,
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
		console.log('Looks like we\'re out of URLs. Try changing the initial URL and rerun.');
	}

	private async crawlWebsite(url: string): Promise<void> {
		const crawlResult = await this.traverser.analyseWebsite(url);
		await this.repository.save(crawlResult);
		crawlResult.anchors.forEach(anchor => this.queue.add(anchor));
	}

	private removeFromQueue(url: string): void {
		this.queue.delete(url);
	}
}
