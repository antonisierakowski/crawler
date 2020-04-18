import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Crawler, WebCrawler } from '../services/Crawler';
import { AxiosMarkupFetcher } from '../services/AxiosMarkupFetcher';
import { WebsiteRepository } from '../interfaces/WebsiteRepository';
import { MarkupFetcher } from '../interfaces/MarkupFetcher';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';
import { CheerioTraverser } from '../services/CheerioTraverser';
import { getStorageService } from '../helpers/getStorageService';

const container = new Container();

container.bind<WebCrawler>(TYPES.WebCrawler).to(Crawler);
container.bind<MarkupFetcher>(TYPES.MarkupFetcher).to(AxiosMarkupFetcher);
container.bind<WebsiteRepository>(TYPES.WebsiteRepository).to(getStorageService());
container.bind<MarkupTraverser>(TYPES.MarkupTraverser).to(CheerioTraverser);

export default container;
