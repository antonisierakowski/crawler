import { QueueRepositoryInterface } from '../interfaces/QueueRepositoryInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { PersistenceClient } from '../interfaces/PersistenceClient';
import { QueueModel } from '../models/Queue';

@injectable()
export class QueueRepository implements QueueRepositoryInterface {
	constructor(
		@inject(TYPES.PersistenceClient) private client: PersistenceClient,
	) { }

	private readonly path = './_records/queue.json';

	async saveQueue(queue: QueueModel): Promise<boolean> {
		try {
			await this.client.removeStorageFile(this.path);
			await this.client.saveRecord<QueueModel>(this.path, queue);
			return true;
		} catch {
			return false;
		}
	}

	async loadQueue(): Promise<QueueModel> {
		const queue = await this.client.getAllRecords<QueueModel>(this.path);

		if (queue.length) {
			await this.client.removeStorageFile(this.path);
			return queue[0];
		}
		return null;
	}
}
