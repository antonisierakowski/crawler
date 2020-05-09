import { AnalysedWebsite, Website } from '../models/AnalysedWebsite';
import { inject, injectable } from 'inversify';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { TYPES } from '../dependenciesContainer/types';
import { LoggerInterface } from '../interfaces/LoggerInterface';
import { PersistenceClient } from '../interfaces/PersistenceClient';
import { DBClient } from '../interfaces/DBClient';
import { analyzedWebsiteModel } from '../schemas/AnalyzedWebsite';

@injectable()
export class WebsiteRepository implements WebsiteRepositoryInterface {
	private readonly path = './_records/analyzed.json';

	constructor(
		@inject(TYPES.PersistenceClient) private client: PersistenceClient,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.DBClient) private db: DBClient,
	) {}

	public async getStorageFile(): Promise<Website[]> {
		return this.client.getAllRecords<Website>(this.path);
	}

	async save(newWebsite: AnalysedWebsite): Promise<void> {
		this.logger.msg(`Saving website... ${newWebsite.url}`);
		await this.client.saveRecord<Website>(this.path, {
			title: newWebsite.title,
			url: newWebsite.url,
			description: newWebsite.description,
		});
		this.logger.msg('Website saved!');
	}

	async isUrlStored(url: string): Promise<boolean> {
		const website =
			await this.client.getRecordByKeyName<Website>(
				this.path,
				'url',
				url,
			);
		if (website) {
			return true;
		}
		return false;
	}

	async removeStorageFile(): Promise<boolean> {
		const removalResult = await this.client.removeStorageFile(this.path);
		if (removalResult) {
			this.logger.msg('Storage file removed succesfuly.');
		} else {
			this.logger.err('There was an error removing the storage file.');
		}
		return removalResult;
	}

	async updateDB(collectedData: Website[]): Promise<boolean> {
		try {
			for (const record of collectedData) {
				await new analyzedWebsiteModel(record).save();
			}
			return true;
		} catch(e) {
			this.logger.err(e);
			return false;
		}
	}
}
