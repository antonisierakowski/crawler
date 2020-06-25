import { injectable } from 'inversify';
import { MarkupFetcher } from '../interfaces/MarkupFetcher';
import { logExecution } from '../helpers/logExecution';
import fetch from 'node-fetch';

@injectable()
export class NodeFetchWrapper implements MarkupFetcher {
	@logExecution()
	async getMarkup(url: string): Promise<string> {
		try {
			const response = await fetch(url);
			const markup = await response.text();
			return markup;
		} catch (e) {
			throw new Error(e);
		}
	}
}
