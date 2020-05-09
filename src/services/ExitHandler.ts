import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { DBClient } from '../interfaces/DBClient';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { LoggerInterface } from '../interfaces/LoggerInterface';
import { UrlQueueInterface } from '../interfaces/UrlQueueInterface';

@injectable()
export class ExitHandler implements ExitHandlerInterface {
	constructor(
		@inject(TYPES.DBClient) private dbClient: DBClient,
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepositoryInterface,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.UrlQueueInterface) private queue: UrlQueueInterface,
	) {
		this.handleExit = this.handleExit.bind(this);
	}

	async handleExit(): Promise<void> {
		await this.queue.collectAndSave();
		await this.saveInDbAndClearStorage();
		// const shouldSave = await this.logger.getYesOrNo('Do you want to save the crawled websites in a database? It will clear locally saved file.');
		// this.logger.msg(`got some kind of answer? ${shouldSave}`); // delete
		// if (shouldSave) {
		// 	await this.saveInDbAndClearStorage();
		// }
		// this.logger.msg('Terminating process.');
		process.exit();
	}

	private async saveInDbAndClearStorage(): Promise<void> {
		this.logger.msg('Initializing DB connection...');
		await this.dbClient.connect();
		this.logger.msg('Saving in DB...');
		const collectedData = await this.repository.getStorageFile();
		const success = await this.repository.updateDB(collectedData);
		// console.log(`o co chodzi: ${success}`);
		// if (success) {
		// 	this.logger.msg('Succesfuly updated the database. Removing local storage file...');
		// 	await this.repository.removeStorageFile();
		// }
		await this.dbClient.disconnect();
	}
}
