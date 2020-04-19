import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { DBClient } from '../interfaces/DBClient';
import { WebsiteRepository } from '../interfaces/WebsiteRepository';
import * as readline from 'readline-sync';

@injectable()
export class ExitHandler implements ExitHandlerInterface {
	constructor(
		@inject(TYPES.DBClient) private dbClient: DBClient,
		@inject(TYPES.WebsiteRepository) private repository: WebsiteRepository,
	) { }

	async handleExit(): Promise<void> {
		const shouldSave = await readline.question('Do you want to save the crawled websites in a database? It will clear locally saved file. Y/N: ');
		if (shouldSave.toLowerCase() === 'y') {
			await this.saveAndClear();
		}
		console.log('Terminating process.');
	}

	private async saveAndClear() {
		await this.repository.removeStorageFile();
	}
}
