import * as mongoose from 'mongoose';

interface AnalyzedWebsiteSchemaInterface extends mongoose.Document {
	title: string;
	url: string;
	id: string;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

export const AnalyzedWebsiteSchema = new mongoose.Schema<AnalyzedWebsiteSchemaInterface>({
	title: { type: String, required: true },
	url: { type: String, required: true, unique: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export const analyzedWebsiteModel = mongoose.model<AnalyzedWebsiteSchemaInterface>('AnalyzedWebsite', AnalyzedWebsiteSchema);
