import './configs/envConfig';
import 'reflect-metadata';
import { Website } from './models/AnalysedWebsite';
import container from './dependenciesContainer/container';
import { TYPES } from './dependenciesContainer/types';
import { WebsiteRepositoryInterface } from './interfaces/WebsiteRepositoryInterface';

export async function dbTest() {
	const records: Website[] = [
		// {
		// 	url: 'test',
		//
		// }, {
		//
		// }
	];

	const repository = container.get<WebsiteRepositoryInterface>(TYPES.WebsiteRepository);

	try {
		await repository.updateDB(records);
		console.log('success');
	} catch(e) {
		console.log(e);
	}
}

