import { AnalysedWebsite, Website } from '../models/AnalysedWebsite';
import { inject, injectable } from 'inversify';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { TYPES } from '../dependenciesContainer/types';
import { LoggerInterface } from '../interfaces/LoggerInterface';
import { PersistenceClient } from '../interfaces/PersistenceClient';
import { AnalyzedWebsiteModel, AnalyzedWebsiteSchemaInterface } from '../schemas/AnalyzedWebsite';
import { mongoErrorCodeDuplicateKeys } from '../clients/MongoClient';

@injectable()
export class WebsiteRepository implements WebsiteRepositoryInterface {
	private readonly path = './_records/analyzed.json';

	constructor(
		@inject(TYPES.PersistenceClient) private client: PersistenceClient,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
	) { }

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
			for await (const record of collectedData) {
				const model = new AnalyzedWebsiteModel(record);
				try {
					await model.save();
				} catch (e) {
					if (e.code === mongoErrorCodeDuplicateKeys) {
						await this.updateDbRecord(model);
					}
				}
			}
			return true;
		} catch(e) {
			this.logger.err(e);
			return false;
		}
	}

	private async updateDbRecord(model: AnalyzedWebsiteSchemaInterface): Promise<void> {
		await AnalyzedWebsiteModel.updateOne(
			{ url: model.url },
			{ $set: {
				title: model.title,
				description: model.description,
				updated_at: Date.now().toString(),
			}},
		);
	}
}
