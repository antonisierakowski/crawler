export interface DBClient {
	saveAllData(): Promise<boolean>
}
