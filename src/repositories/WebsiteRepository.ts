import { AnalysedWebsite, Website } from '../models/AnalysedWebsite';
import { injectable } from 'inversify';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { AnalyzedWebsiteModel, AnalyzedWebsiteSchemaInterface } from '../schemas/AnalyzedWebsite';
import { mongoErrorCodeDuplicateKeys } from '../clients/MongoClient';
import { Logger } from '../services/Logger';
import { AbstractLocalRepository } from './AbstractLocalRepository';

@injectable()
export class WebsiteRepository
	extends AbstractLocalRepository<Website>
	implements WebsiteRepositoryInterface {

	protected readonly path = './_records/analyzed.json';
	readonly resourceName = 'Website';

	async save(newWebsite: AnalysedWebsite): Promise<void> {
		Logger.msg(`Saving website... ${newWebsite.url}`);
		await this.client.saveRecord<Website>(this.path, {
			title: newWebsite.title,
			url: newWebsite.url,
			description: newWebsite.description,
		});
		Logger.msg('Website saved!');
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
			Logger.err(e.message);
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
