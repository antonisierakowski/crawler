export interface StorageRecord {
	id: string,
}

export interface PersistenceClient {
	saveRecord<T, R extends StorageRecord>(path: string, record: T): Promise<string>;
	getRecordById<T extends StorageRecord>(path: string, id: string): Promise<T>;
	getRecordByKeyName<T extends StorageRecord>(path: string, key: keyof T, value: T[keyof T]): Promise<T>;
	removeRecordById<T extends StorageRecord>(path: string, id: string): Promise<boolean>;
	getAllRecords<T extends StorageRecord>(path: string): Promise<T[]>;
	removeStorageFile(path: string): Promise<boolean>;
}
