import { AnalysedWebsite } from '../models/AnalysedWebsite';
import { injectable } from 'inversify';
import * as fs from 'fs';
import uuid from 'uuid';
import { writeFileSyncRecursive } from '../helpers/writeFileRecursive';
import { StoredWebsiteModel, WebsiteRepository } from '../interfaces/WebsiteRepository';

@injectable()
export class LocalJSONStorage implements WebsiteRepository {
	private path = `./_records/${process.env.RESULT_FILE_NAME}`;

	private async getStorageFile(): Promise<StoredWebsiteModel[]> {
		try {
			return JSON.parse(
				fs.readFileSync(this.path, 'utf8'),
			);
		} catch(e) {
			return [];
		}
	}

	async save(newWebsite: AnalysedWebsite): Promise<string> {
		const file = await this.getStorageFile();
		const id = uuid.v4();
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
		await writeFileSyncRecursive(this.path, JSON.stringify(newFile), 'utf-8');
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
		await writeFileSyncRecursive(this.path, JSON.stringify(fileAfterRemoval),'utf-8');
	}

	async removeStorageFile(): Promise<void> {
		await fs.unlinkSync(this.path);
		console.log('Storage file removed succesfuly.');
	}
}
