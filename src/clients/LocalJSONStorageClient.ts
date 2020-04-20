import { PersistenceClient, StorageRecord } from '../interfaces/PersistenceClient';
import fs from 'fs';
import uuid from 'uuid';
import path from 'path';

export class LocalJSONStorageClient implements PersistenceClient {
	async saveRecord<T, R extends StorageRecord>(path: string, record: T): Promise<string> {
		const allRecords = await this.getAllRecords<R>(path);
		const id = uuid.v4();
		const newFile = [
			...allRecords, record,
		];
		await this.writeFile(path, JSON.stringify(newFile), 'utf-8');
		return id;
	}

	async getRecordById<T extends StorageRecord>(path: string, id: string): Promise<T> {
		const allRecords = await this.getAllRecords<T>(path);
		return allRecords.find(record => record.id === id);
	}

	async getRecordByKeyName<T extends StorageRecord>(path: string, key: keyof T, value: T[keyof T]): Promise<T> {
		const allRecords = await this.getAllRecords<T>(path);
		let recordToFind: T = null;
		allRecords.forEach(record => {
			if (record[key] === value) {
				recordToFind = record;
			}
		});
		return recordToFind;
	}

	async removeRecordById<T extends StorageRecord>(path: string, id: string): Promise<boolean> {
		const allRecords = await this.getAllRecords<T>(path);
		const fileAfterRemoval = allRecords.filter(record => record.id !== id);
		try {
			await this.writeFile(path, JSON.stringify(fileAfterRemoval),'utf-8');
			return true;
		} catch {
			return false;
		}
	}

	async getAllRecords<T extends StorageRecord>(path: string): Promise<T[]> {
		try {
			return await JSON.parse(
				fs.readFileSync(path, 'utf8'),
			);
		} catch {
			return [];
		}
	}

	async removeStorageFile(path: string): Promise<boolean> {
		try {
			await fs.unlinkSync(path);
			return true;
		} catch(error) {
			console.log(error);
			return false;
		}
	}

	private writeFile(filename: string, content: string, charset: string): void {
		const folders = filename.split(path.sep).slice(0, -1);
		if (folders.length) {
			folders.reduce((last, folder) => {
				const folderPath = last ? last + path.sep + folder : folder;
				if (!fs.existsSync(folderPath)) {
					fs.mkdirSync(folderPath);
				}
				return folderPath;
			});
		}
		fs.writeFileSync(filename, content, charset);
	}

}
