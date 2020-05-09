export function getConnectionString(): string {
	const {
		DB_USER,
		DB_PASSWORD,
		DB_HOST,
		DB_PORT,
		DB_DATABASE,
	} = process.env;
	const defaultPort = '27017';
	return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT ?? defaultPort}/${DB_DATABASE}`;
}
