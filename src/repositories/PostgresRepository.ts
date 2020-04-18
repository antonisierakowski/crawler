import { WebsiteRepository } from "interfaces/WebsiteRepository";
import { injectable } from "inversify";
import { AnalysedWebsite } from "models/AnalysedWebsite";
import { StoredWebsiteModel } from "interfaces/WebsiteRepository";

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
