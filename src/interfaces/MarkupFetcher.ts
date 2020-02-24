export interface MarkupFetcher {
    getMarkup(url: string): Promise<string>;
}
