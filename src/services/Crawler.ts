import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';
import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { LoggerInterface } from '../interfaces/LoggerInterface';
import { registerExitProcessCallbacks } from '../helpers/registerExitProcessCallbacks';
import { UrlQueueInterface } from '../interfaces/UrlQueueInterface';

export interface WebCrawler {
	initialize(url: string): void;
	stop(): void;
}

@injectable()
export class Crawler implements WebCrawler {
	private shouldRun: boolean = true;

	constructor(
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepositoryInterface,
		@inject(TYPES.MarkupTraverser) private traverser: MarkupTraverser,
		@inject(TYPES.ExitHandlerInterface) private exitHandler: ExitHandlerInterface,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.UrlQueueInterface) private queue: UrlQueueInterface,
	) {
		this.stop = this.stop.bind(this);
		registerExitProcessCallbacks([
			this.stop,
		]);
	}

	public async initialize(initialUrl: string): Promise<void> {
		await this.queue.preload(initialUrl);
		this.logger.msg('Started crawling...');
		while(this.queue.size && this.shouldRun) {
			const currentUrl = this.queue.current;
			if (await this.repository.isUrlStored(currentUrl)) {
				this.queue.remove(currentUrl);
			} else {
				try {
					await this.crawlWebsite(currentUrl);
				} catch(e) {
					this.queue.remove(currentUrl);
				}
			}
		}
		if (this.queue.size === 0) {
			this.logger.warn('Looks like we\'re out of URLs. Try changing the initial URL and rerun.');
		}
		await this.exitHandler.handleExit();
	}

	stop() {
		this.shouldRun = false;
	}

	private async crawlWebsite(url: string): Promise<void> {
		const crawlResult = await this.traverser.analyseWebsite(url);
		await this.repository.save(crawlResult);
		crawlResult.anchors.forEach(anchor => this.queue.add(anchor));
	}
}
