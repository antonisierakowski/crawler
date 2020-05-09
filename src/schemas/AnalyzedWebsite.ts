import { Schema, model, Document, Model } from 'mongoose';

// interface AnalyzedWebsiteInterface extends Document {
// 	title: string;
// 	url: string;
// 	id: string;
// 	description: string;
// 	created_at: string;
// 	updated_at: string;
// }
//
// export interface AnalyzedWebsiteModel extends Model<AnalyzedWebsiteInterface> { }
//
// export class AnalyzedWebsite {
// 	private _model: Model<AnalyzedWebsiteInterface>
//
// 	constructor() {
// 		const schema = new Schema({
// 			title: { type: String, required: true },
// 			url: { type: String, required: true },
// 			description: { type: String },
// 			created_at: { type: Date, default: Date.now },
// 			updated_at: { type: Date, default: Date.now },
// 		});
//
// 		this._model = model<AnalyzedWebsiteInterface>('AnalyzedWebsite', schema);
// 	}
//
// 	public get model(): Model<AnalyzedWebsiteInterface> {
// 		return this._model;
// 	}
// }
