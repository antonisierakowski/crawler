import { PostgresRepository } from "repositories/PostgresRepository";
import { LocalJSONStorage } from "repositories/LocalJSONStorage";

export function getStorageService() {
  const shouldUseDb = Boolean(process.env.USE_DATABASE);
  if (shouldUseDb) {
    return PostgresRepository;
  }
  return LocalJSONStorage;
}
