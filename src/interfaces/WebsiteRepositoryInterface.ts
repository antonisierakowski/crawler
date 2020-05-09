import { AnalysedWebsite, StoredWebsiteModel } from '../models/AnalysedWebsite';

export interface WebsiteRepositoryInterface {
    save(website: AnalysedWebsite): Promise<string>;
    getById(id: string): Promise<StoredWebsiteModel>;
    isUrlStored(url: string): Promise<boolean>;
    removeRecord(id: string): Promise<void>;
    removeStorageFile(): Promise<boolean>;
    getStorageFile(): Promise<StoredWebsiteModel[]>;
    updateDB(collectedData: StoredWebsiteModel[]): Promise<boolean>
}
