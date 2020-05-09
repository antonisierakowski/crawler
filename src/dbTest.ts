import './configs/envConfig';
import 'reflect-metadata';
import { StoredWebsiteModel } from './models/AnalysedWebsite';
import container from './dependenciesContainer/container';
import { TYPES } from './dependenciesContainer/types';
import { WebsiteRepositoryInterface } from './interfaces/WebsiteRepositoryInterface';

const records: StoredWebsiteModel[] = [

];

const repository = container.get<WebsiteRepositoryInterface>(TYPES.WebsiteRepository);

repository.updateDB(records)
	.then(() => {
		console.log('success.');
	})
	.catch(err => {
		console.log(err);
	});
