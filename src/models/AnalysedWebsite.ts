import { StorageRecord } from '../interfaces/PersistenceClient';

export interface WebsiteToStore {
  title: string;
  url: string;
  description: string;
}

export interface AnalysedWebsite extends WebsiteToStore {
  anchors: string[];
}

export interface StoredWebsiteModel extends WebsiteToStore, StorageRecord {}
