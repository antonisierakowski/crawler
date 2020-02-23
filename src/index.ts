import dotenv from 'dotenv';
import { WebCrawler } from "./services/Crawler";
import container from "./types/container";
import { TYPES } from "./types/types";

dotenv.config();

const initialUrl = process.env.INITIAL_URL;

const crawler = container.get<WebCrawler>(TYPES.WebCrawler);

crawler.initialize(initialUrl);