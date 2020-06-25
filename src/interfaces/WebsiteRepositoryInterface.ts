import { AnalysedWebsite, Website } from '../models/AnalysedWebsite';

export interface WebsiteRepositoryInterface {
    save(website: AnalysedWebsite): Promise<void>;
    isUrlStored(url: string): Promise<boolean>;
    removeStorageFile(): Promise<boolean>;
    updateDB(collectedData: Website[]): Promise<boolean>;
    loadFromStorage(): Promise<Website[]>;
}
