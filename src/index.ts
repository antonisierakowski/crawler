import dotenv from 'dotenv';
import { WebCrawler } from "./services/Crawler";
import container from "./dependenciesContainer/container";
import { TYPES } from "./dependenciesContainer/types";

dotenv.config();

const initialUrl = process.env.INITIAL_URL;

const crawler = container.get<WebCrawler>(TYPES.WebCrawler);

crawler.initialize(initialUrl);
