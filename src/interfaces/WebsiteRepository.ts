import { AnalysedWebsite } from '../models/AnalysedWebsite';

export interface StoredWebsiteModel {
    title: string;
    url: string;
    id: string;
    description: string;
}

export interface WebsiteRepository {
    save(website: AnalysedWebsite): Promise<string>;
    getById(id: string): Promise<StoredWebsiteModel>;
    isUrlStored(url: string): Promise<boolean>;
    getAndRemoveLastSavedUrl(): Promise<string>;
    removeRecord(id: string): Promise<void>;
}
