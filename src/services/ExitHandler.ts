import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { DBClient } from '../interfaces/DBClient';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { LoggerInterface } from '../interfaces/Logger';
import { QueueRepositoryInterface } from '../interfaces/QueueRepositoryInterface';

@injectable()
export class ExitHandler implements ExitHandlerInterface {
	constructor(
		@inject(TYPES.DBClient) private dbClient: DBClient,
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepositoryInterface,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.QueueRepositoryInterface) private queueRepository: QueueRepositoryInterface,
	) {
		this.handleExit = this.handleExit.bind(this);
	}

	async handleExit(): Promise<void> {
		const shouldSave = await this.logger.getYesOrNo('Do you want to save the crawled websites in a database? It will clear locally saved file. Y/N: ');
		if (shouldSave) {
			await this.saveAndClear();
		}
		this.logger.msg('Terminating process.');
	}

	private async saveInDbAndClear() {
		await this.repository.removeStorageFile(); // this.repository.collectQueueAndClearStorage
	}
}
