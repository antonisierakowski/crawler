import { PostgresRepository } from "services/PostgresRepository";
import { LocalJSONStorage } from "services/LocalJSONStorage";

export function getStorageService() {
  const shouldUseDb = Boolean(process.env.USE_DATABASE);
  if (shouldUseDb) {
    return PostgresRepository;
  }
  return LocalJSONStorage;
}
