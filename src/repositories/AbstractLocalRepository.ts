import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { PersistenceClient } from '../interfaces/PersistenceClient';
import { Logger } from '../services/Logger';

@injectable()
export abstract class AbstractLocalRepository<TStored> {
	protected readonly path: string;
	readonly resourceName: string;

	constructor(
		@inject(TYPES.PersistenceClient) protected client: PersistenceClient,
	) { }

	async removeStorageFile(): Promise<boolean> {
		const removalResult = await this.client.removeStorageFile(this.path);
		if (removalResult) {
			Logger.msg(`Storage file for resource: ${this.resourceName} removed succesfuly.`);
		} else {
			Logger.err(`There was an error removing the storage file for resource: ${this.resourceName}.`);
		}
		return removalResult;
	}

	public async loadFromStorage(): Promise<TStored[]> {
		return this.client.getAllRecords<TStored>(this.path);
	}

}
