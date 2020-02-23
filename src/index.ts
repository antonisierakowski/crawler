import { WebCrawler } from "./services/Crawler";
import container from "./types/container";
import { TYPES } from "./types/types";

const startingUrl = process.argv[3] || 'https://medium.com/';

const crawler = container.get<WebCrawler>(TYPES.WebCrawler);

crawler.initialize(startingUrl);