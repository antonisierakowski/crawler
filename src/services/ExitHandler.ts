import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { DBClient } from '../interfaces/DBClient';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { UrlQueueInterface } from '../interfaces/UrlQueueInterface';
import { Logger } from './Logger';

@injectable()
export class ExitHandler implements ExitHandlerInterface {
	constructor(
		@inject(TYPES.DBClient) private dbClient: DBClient,
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepositoryInterface,
		@inject(TYPES.UrlQueueInterface) private queue: UrlQueueInterface,
	) {
		this.handleExit = this.handleExit.bind(this);
	}

	async handleExit(): Promise<void> {
		// await this.queue.collectAndSave();
		// const shouldSave = await Logger.getYesOrNo('Do you want to save the crawled websites in a database? It will clear locally saved file.');
		// if (shouldSave) {
		// 	await this.saveInDbAndClearStorage();
		// }
		// Logger.msg('Terminating process.');
		process.exit();
	}

	private async saveInDbAndClearStorage(): Promise<void> {
		Logger.msg('Initializing DB connection...');
		await this.dbClient.connect();
		Logger.msg('Saving in DB...');
		const collectedData = await this.repository.loadFromStorage();
		const success = await this.repository.updateDB(collectedData);
		if (success) {
			Logger.msg('Succesfuly updated the database. Removing local storage file...');
			await this.repository.removeStorageFile();
		}
		await this.dbClient.disconnect();
	}
}
