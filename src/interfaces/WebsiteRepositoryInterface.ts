import { AnalysedWebsite } from '../models/AnalysedWebsite';

export interface StoredWebsiteModel {
    title: string;
    url: string;
    id: string;
    description: string;
}

export interface WebsiteRepositoryInterface {
    save(website: AnalysedWebsite): Promise<string>;
    getById(id: string): Promise<StoredWebsiteModel>;
    isUrlStored(url: string): Promise<boolean>;
    removeRecord(id: string): Promise<void>;
    removeStorageFile(): Promise<void>;
    getStorageFile(): Promise<StoredWebsiteModel[]>;
}
