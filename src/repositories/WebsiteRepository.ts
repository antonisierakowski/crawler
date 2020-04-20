import { AnalysedWebsite, StoredWebsiteModel, WebsiteToStore } from '../models/AnalysedWebsite';
import { inject, injectable } from 'inversify';
import * as fs from 'fs';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { TYPES } from '../dependenciesContainer/types';
import { LoggerInterface } from '../interfaces/Logger';
import { PersistenceClient } from '../interfaces/PersistenceClient';

@injectable()
export class WebsiteRepository implements WebsiteRepositoryInterface {
	private readonly path = './_records/analyzed.json';

	constructor(
		@inject(TYPES.PersistenceClient) private client: PersistenceClient,
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
	) {}

	public async getStorageFile(): Promise<StoredWebsiteModel[]> {
		return this.client.getAllRecords<StoredWebsiteModel>(this.path);
	}

	async save(newWebsite: AnalysedWebsite): Promise<string> {
		this.logger.msg(`Saving website... ${newWebsite.url}`);
		const id = await this.client.saveRecord<WebsiteToStore, StoredWebsiteModel>(this.path, {
			title: newWebsite.title,
			url: newWebsite.url,
			description: newWebsite.description,
		});
		this.logger.msg('Website saved!');
		return id;
	}

	async getById(id: string): Promise<StoredWebsiteModel> {
		return this.client.getRecordById<StoredWebsiteModel>(this.path, id);
	}

	async isUrlStored(url: string): Promise<boolean> {
		const website =
			await this.client.getRecordByKeyName<StoredWebsiteModel>(
				this.path,
				'url',
				url,
			);
		if (website) {
			return true;
		}
		return false;
	}

	async removeRecord(id: string): Promise<void> {
		await this.client.removeRecordById(this.path, id);
	}

	async removeStorageFile(): Promise<boolean> {
		const removalResult = await this.client.removeStorageFile(this.path);
		if (removalResult) {
			this.logger.msg('Storage file removed succesfuly.');
		} else {
			this.logger.msg('There was an error removing the storage file.');
		}
		return removalResult;
	}
}
