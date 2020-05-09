import { PersistenceClient } from '../interfaces/PersistenceClient';
import fs from 'fs';
import path from 'path';
import { injectable } from 'inversify';

@injectable()
export class LocalJSONStorageClient implements PersistenceClient {
	async saveRecord<T>(path: string, record: T): Promise<void> {
		const allRecords = await this.getAllRecords<T>(path);
		const newFile = [
			...allRecords, record,
		];
		await this.writeFile(path, JSON.stringify(newFile), 'utf-8');
	}

	async getRecordByKeyName<T>(path: string, key: keyof T, value: T[keyof T]): Promise<T> {
		const allRecords = await this.getAllRecords<T>(path);
		let recordToFind: T = null;
		allRecords.forEach(record => {
			if (record[key] === value) {
				recordToFind = record;
			}
		});
		return recordToFind;
	}

	async getAllRecords<T>(path: string): Promise<T[]> {
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
			const doesFileExist = fs.readFileSync(path, 'utf8');
			if (doesFileExist) {
				await fs.unlinkSync(path);
			}
			return true;
		} catch(error) {
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
