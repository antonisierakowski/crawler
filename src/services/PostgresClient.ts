import { injectable } from 'inversify';
import { StoredWebsiteModel, WebsiteRepository } from '../interfaces/WebsiteRepository';
import { AnalysedWebsite } from '../models/AnalysedWebsite';
import pool from '../configs/db';
import { QueryResult } from 'pg';
import { DBClient } from '../interfaces/DBClient';

@injectable()
export class PostgresClient implements DBClient {
	// async save(website: AnalysedWebsite): Promise<string> {
	// 	console.log(`Saving website... ${website.url}`);
	// 	const query = `
	// 		INSERT INTO websites.websites (title, url, description) VALUES ($1, $2, $3) RETURNING id
	// 	`;
	// 	try {
	// 		const queryResult: QueryResult<StoredWebsiteModel> = await pool.query(
	// 			query,
	// 			[website.title, website.url, website.description],
	// 		);
	// 		return queryResult.rows[0].id;
	// 	}
	// 	catch(e) {
	// 		console.log('There was an error saving the record.');
	// 		console.log(e);
	// 	}
	// }
	//
	// async getById(id: string): Promise<StoredWebsiteModel> {
	// 	const start = Date.now();
	// 	const query = `
	// 		SELECT * FROM websites.websites WHERE id IN ($1)
	// 	`;
	// 	try {
	// 		const queryResult: QueryResult<StoredWebsiteModel> = await pool.query(
	// 			query,
	// 			[id],
	// 		);
	// 		console.log(`Found a record by ID. Took ${Date.now() - start}ms.`);
	// 		return queryResult.rows[0];
	// 	} catch(e) {
	// 		console.log('getById error');
	// 		console.log(e);
	// 	}
	// }
	//
	// async isUrlStored(url: string): Promise<boolean> {
	// 	const start = Date.now();
	// 	const query = `
	// 		SELECT * FROM websites.websites WHERE url IN ($1)
	// 	`; // todo: stop search once single record is found
	// 	try {
	// 		const queryResult: QueryResult<StoredWebsiteModel> = await pool.query(
	// 			query,
	// 			[url],
	// 		);
	// 		console.log(`isUrlStored complete. Took ${Date.now() - start}ms.`);
	//
	// 		return Boolean(queryResult.rows.length);
	// 	} catch(e) {
	// 		console.log('isUrlStored error');
	// 		console.log(e);
	// 	}
	// }
	//
	// async removeRecord(id: string): Promise<void> {
	// 	const query = `
	// 		DELETE * FROM websites.websites WHERE id IN ($1)
	// 	`;
	// 	try {
	// 		await pool.query(
	// 			query,
	// 			[id],
	// 		);
	// 	} catch(e) {
	// 		console.log('removeRecord error');
	// 		console.log(e);
	// 	}
	// }
}
