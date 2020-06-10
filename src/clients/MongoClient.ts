import { inject, injectable } from 'inversify';
import { DBClient } from '../interfaces/DBClient';
import { getConnectionString } from '../helpers/getConnectionString';
import mongoose from 'mongoose';
import { dbModels } from '../schemas/models';

export const mongoErrorCodeDuplicateKeys = 11000;

@injectable()
export class MongoClient implements DBClient {
	private models: mongoose.Model<any>[] = dbModels;

	async connect(): Promise<void> {
		await mongoose.connect(getConnectionString(), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			autoIndex: true,
		});

		await this.initModels();
	}

	private async initModels(): Promise<void> {
		for await (const Model of this.models) {
			await Model.init();
		}
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}
