export interface PersistenceClient {
	saveRecord<T>(path: string, record: T): Promise<void>;
	getRecordByKeyName<T>(path: string, key: keyof T, value: T[keyof T]): Promise<T>;
	getAllRecords<T>(path: string): Promise<T[]>;
	removeStorageFile(path: string): Promise<boolean>;
}
