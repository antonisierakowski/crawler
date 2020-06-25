import { QueueModel } from '../models/Queue';

export interface QueueRepositoryInterface {
	saveQueue(queue: QueueModel[]): Promise<boolean>;
	loadFromStorage(): Promise<QueueModel[]>;
}
