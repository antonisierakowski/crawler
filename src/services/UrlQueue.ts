import { inject, injectable } from 'inversify';
import { UrlQueueInterface } from '../interfaces/UrlQueueInterface';
import { TYPES } from '../dependenciesContainer/types';
import { QueueRepositoryInterface } from '../interfaces/QueueRepositoryInterface';
import { Logger } from './Logger';

@injectable()
export class UrlQueue implements UrlQueueInterface {
	private queue: Set<string> = new Set();

	constructor(
		@inject(TYPES.QueueRepositoryInterface) private queueRepository: QueueRepositoryInterface,
	) { }

	add(url: string): void {
		this.queue.add(url);
	}

	get size(): number {
		return this.queue.size;
	}

	get current(): string {
		return Array.from(this.queue)[0];
	}

	remove(url: string): void {
		this.queue.delete(url);
	}

	async preload(initial: string): Promise<void> {
		const preloadedQueue = await this.queueRepository.loadQueue();
		if (preloadedQueue) {
			Logger.msg('Found a file with a queue from a previous session. Loading...');
			preloadedQueue.urls.forEach(queueRecord => this.queue.add(queueRecord));
			Logger.msg('Queue loaded.');
		}
		this.queue.add(initial);
	}

	async collectAndSave(): Promise<boolean> {
		const wasSaveSuccessful = await this.queueRepository.saveQueue({
			urls: Array.from(this.queue),
		});
		return wasSaveSuccessful;
	}
}
