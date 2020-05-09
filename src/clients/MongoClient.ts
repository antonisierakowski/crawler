import { inject, injectable } from 'inversify';
import { DBClient } from '../interfaces/DBClient';
import { TYPES } from '../dependenciesContainer/types';
import { LoggerInterface } from '../interfaces/LoggerInterface';
import { getConnectionString } from '../helpers/getConnectionString';
import mongoose from 'mongoose';

@injectable()
export class MongoClient implements DBClient {
	constructor(
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
	) { }

	async connect(): Promise<void> {
		await mongoose.connect(getConnectionString(), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}
