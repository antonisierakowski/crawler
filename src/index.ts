import './configs/envConfig';
import 'reflect-metadata';
import { WebCrawler } from './services/Crawler';
import container from './dependenciesContainer/container';
import { TYPES } from './dependenciesContainer/types';

import { dbTest } from './dbTest';
const isDbTest = Boolean(process.env.DB_TEST);
if (isDbTest) {
	dbTest().then(() => {
		process.exit(0);
	});
}

const initialUrl = process.env.INITIAL_URL;
const crawler = container.get<WebCrawler>(TYPES.WebCrawler);

crawler.initialize(initialUrl);
