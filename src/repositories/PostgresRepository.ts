import { injectable } from 'inversify';
import { StoredWebsiteModel, WebsiteRepository } from '../interfaces/WebsiteRepository';
import { AnalysedWebsite } from '../models/AnalysedWebsite';

@injectable()
export class PostgresRepository implements WebsiteRepository {
	async save(website: AnalysedWebsite): Promise<string> {
		return null;
	}
	async getById(id: string): Promise<StoredWebsiteModel> {
		return null;
	}

	async isUrlStored(url: string): Promise<boolean> {
		return null;
	}

	async getAndRemoveLastSavedUrl(): Promise<string> {
		return null;
	}

	async removeRecord(id: string): Promise<void> {
		return null;
	}
}
