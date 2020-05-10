import * as mongoose from 'mongoose';

export interface AnalyzedWebsiteSchemaInterface extends mongoose.Document {
	title: string;
	url: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export const AnalyzedWebsiteSchema = new mongoose.Schema<AnalyzedWebsiteSchemaInterface>({
	title: { type: String, required: true },
	url: { type: String, required: true, unique: true },
	description: { type: String },
	created_at: { type: Date, required: true, default: Date.now, immutable: true },
	updated_at: { type: Date },
});

export const AnalyzedWebsiteModel = mongoose.model<AnalyzedWebsiteSchemaInterface>(
	'AnalyzedWebsite',
	AnalyzedWebsiteSchema,
	'analyzed_websites',
);
