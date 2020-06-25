import { QueueRepositoryInterface } from '../interfaces/QueueRepositoryInterface';
import { inject, injectable } from 'inversify';
import { QueueModel } from '../models/Queue';
import { AbstractLocalRepository } from './AbstractLocalRepository';
import { TYPES } from '../dependenciesContainer/types';
import { PersistenceClient } from '../interfaces/PersistenceClient';

@injectable()
export class QueueRepository
	extends AbstractLocalRepository<QueueModel>
	implements QueueRepositoryInterface {

	protected readonly path = './_records/queue.json';
	readonly resourceName = 'Queue';

	constructor(
		@inject(TYPES.PersistenceClient) protected client: PersistenceClient,
	) {
		super(client);
	}

	async saveQueue(queue: QueueModel[]): Promise<boolean> {
		try {
			await this.client.removeStorageFile(this.path);
			await this.client.saveRecord<QueueModel[]>(this.path, queue);
			return true;
		} catch {
			return false;
		}
	}

	async loadFromStorage(): Promise<QueueModel[]> {
		const queue = await super.loadFromStorage();

		if (queue.length) {
			await this.removeStorageFile();
			return queue;
		}
		return null;
	}
}
