import { PostgresRepository } from '../repositories/PostgresRepository';
import { LocalJSONStorage } from '../repositories/LocalJSONStorage';

export function getStorageService() {
	const shouldUseDb = process.env.USE_DATABASE === 'TRUE';
	if (shouldUseDb) {
		return PostgresRepository;
	}
	return LocalJSONStorage;
}
