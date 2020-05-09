import cheerio from 'cheerio';
import { AnalysedWebsite } from '../models/AnalysedWebsite';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';
import { inject, injectable } from 'inversify';
import { TYPES } from '../dependenciesContainer/types';
import { MarkupFetcher } from '../interfaces/MarkupFetcher';

@injectable()
export class CheerioTraverser implements MarkupTraverser {
	constructor(
		@inject(TYPES.MarkupFetcher) private fetcher: MarkupFetcher,
	) { }

	async analyseWebsite(url: string): Promise<AnalysedWebsite> {
		const body = await this.fetcher.getMarkup(url);
		const wrapper: CheerioStatic = cheerio.load(body);
		return {
			url: url,
			title: this.getSiteTitle(wrapper),
			anchors: this.getAllAnchors(wrapper),
			description: this.getSiteDescription(wrapper),
		};
	}

	private getAllAnchors(wrapper: CheerioStatic): string[] {
		const allAnchorTags = wrapper('a');
		const allUrls = allAnchorTags.toArray().map((a) => (
			a.attribs.href
		));
		try {
			return allUrls.filter(url => url.includes('http'));
		} catch (e) {
			return [];
		}
	}

	private getSiteTitle(wrapper: CheerioStatic): string {
		return wrapper('title').text();
	}

	private getSiteDescription(wrapper: CheerioStatic): string {
		return wrapper('meta[name="description"]').attr('content');
	}
}
