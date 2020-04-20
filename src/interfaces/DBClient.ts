import { StoredWebsiteModel } from './WebsiteRepositoryInterface';

export interface DBClient {
	updateAllData(data: StoredWebsiteModel[]): Promise<boolean>
}
