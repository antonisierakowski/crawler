import { inject, injectable } from 'inversify';
import { StoredWebsiteModel } from '../models/AnalysedWebsite';
import pool from '../configs/db';
import { DBClient } from '../interfaces/DBClient';
import { TYPES } from '../dependenciesContainer/types';
import { LoggerInterface } from '../interfaces/LoggerInterface';
import { QueryResult } from 'pg';

@injectable()
export class PostgresClient implements DBClient {
	constructor(
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
	) { }
	async updateAllData(data: StoredWebsiteModel[]): Promise<boolean> {
		const baseQuery = `
			INSERT INTO websites.websites (title, url, description) VALUES ($1, $2, $3)
			ON CONFLICT (url) UPDATE SET title=$1, description=$3, updated_at=$4
		`;
		let queryPromises: Promise<QueryResult>[] = [];
		try {
			for (const record of data) {
				const query = pool.query(
					baseQuery,
					[record.title, record.url, record.description, Date.now()],
				);
				queryPromises = [
					...queryPromises,
					query,
				];
			}
			const result = await Promise.all(queryPromises);
			console.log(result);
			return true;
		} catch (e) {
			this.logger.msg('There was an error saving to database.');
			this.logger.msg(e);
			return false;
		}
	}
}
