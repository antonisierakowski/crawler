import './envConfig';
import { WebCrawler } from './services/Crawler';
import container from './dependenciesContainer/container';
import { TYPES } from './dependenciesContainer/types';

const initialUrl = process.env.INITIAL_URL;

const crawler = container.get<WebCrawler>(TYPES.WebCrawler);

crawler.initialize(initialUrl);
