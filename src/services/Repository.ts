import { AnalysedWebsite } from "../models/AnalysedWebsite";
import { injectable } from "inversify";
import * as fs from "fs";
import uuid from 'uuid';

interface StoredWebsiteModel {
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

@injectable()
export class LocalJSONStorage implements WebsiteRepository {
  private path = 'src/analyzed.json';
  private async getStorageFile(): Promise<StoredWebsiteModel[]> {
    return JSON.parse(
      fs.readFileSync(this.path, "utf8")
    );
  }

  async save(newWebsite: AnalysedWebsite): Promise<string> {
    const file = await this.getStorageFile();
    const id = uuid.v4()
    const newFile = [
      ...file,
      {
        title: newWebsite.title,
        url: newWebsite.url,
        description: newWebsite.description,
        id,
      },
    ];
    console.log(`Saving website... ${newWebsite.url}`);
    await fs.writeFileSync(this.path, JSON.stringify(newFile));
    console.log('Website saved!');
    return id;
  }

  async getById(id: string): Promise<StoredWebsiteModel> {
    const file = await this.getStorageFile();
    return file.find(website => website.id === id);
  }

  async isUrlStored(url: string): Promise<boolean> {
    const file = await this.getStorageFile();
    let isStored: boolean = false;
    file.forEach(website => {
      if (website.url === url) {
        isStored = true;
      }
    });
    return isStored;
  }

  async removeRecord(id: string): Promise<void> {
    const file = await this.getStorageFile();
    const fileAfterRemoval = file.filter(website => website.id !== id);
    await fs.writeFileSync(this.path, JSON.stringify(fileAfterRemoval));
  }

  async getAndRemoveLastSavedUrl(): Promise<string> {
    const file = await this.getStorageFile();
    const lastRecord = [...file].reverse()[0];
    await this.removeRecord(lastRecord.id);
    return lastRecord.url;
  }
}
