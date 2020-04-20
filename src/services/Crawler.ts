import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';
import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { LoggerInterface } from '../interfaces/Logger';
import { registerExitProcessCallbacks } from '../helpers/registerExitProcessCallbacks';
import { QueueRepositoryInterface } from '../interfaces/QueueRepositoryInterface';
import { QueueModel } from '../models/Queue';

export interface WebCrawler {
	initialize(url: string): void;
}

@injectable()
export class Crawler implements WebCrawler {
	private queue: Set<string> = new Set();

	constructor(
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepositoryInterface,
		@inject(TYPES.MarkupTraverser) private traverser: MarkupTraverser,
		@inject(TYPES.ExitHandlerInterface) private exitHandler: ExitHandlerInterface,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.QueueRepositoryInterface) private queueRepository: QueueRepositoryInterface,
	) {
		registerExitProcessCallbacks(this.exitHandler.handleExit);
	}

	public async initialize(initialUrl: string): Promise<void> {
		const preloadedQueue = await this.queueRepository.loadQueue();
		if (preloadedQueue) {
			this.preloadWithQueue(preloadedQueue);
		}
		this.queue.add(initialUrl);
		this.logger.msg('Started crawling...');
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
		this.logger.msg('Looks like we\'re out of URLs. Try changing the initial URL and rerun.');
	}

	private async crawlWebsite(url: string): Promise<void> {
		const crawlResult = await this.traverser.analyseWebsite(url);
		await this.repository.save(crawlResult);
		crawlResult.anchors.forEach(anchor => this.queue.add(anchor));
	}

	private removeFromQueue(url: string): void {
		this.queue.delete(url);
	}

	private preloadWithQueue(preloadedQueue: QueueModel): void {
		preloadedQueue.urls.forEach(queueRecord => this.queue.add(queueRecord));
	}
}
