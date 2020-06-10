import { injectable } from 'inversify';
import { MarkupFetcher } from '../interfaces/MarkupFetcher';
import { logExecution } from '../helpers/logExecution';
import fetch from 'node-fetch';

@injectable()
export class NodeFetchWrapper implements MarkupFetcher {
	// @logExecution()
	async getMarkup(url: string): Promise<string> {
		try {
			const beginning = Date.now();
			const response = await fetch(url);
			console.log(`FETCH: ${Date.now() - beginning}`);
			const beginning2 = Date.now();
			const markup = await response.text();
			console.log(`PARSE: ${Date.now() - beginning2}`);
			return markup;
		} catch (e) {
			throw new Error(e);
		}
	}
}
