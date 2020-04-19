import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Crawler, WebCrawler } from '../services/Crawler';
import { AxiosMarkupFetcher } from '../services/AxiosMarkupFetcher';
import { WebsiteRepository } from '../interfaces/WebsiteRepository';
import { MarkupFetcher } from '../interfaces/MarkupFetcher';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';
import { CheerioTraverser } from '../services/CheerioTraverser';
import { LocalJSONStorage } from '../services/LocalJSONStorage';
import { DBClient } from '../interfaces/DBClient';
import { PostgresClient } from '../services/PostgresClient';
import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { ExitHandler } from '../services/ExitHandler';

const container = new Container();

container.bind<WebCrawler>(TYPES.WebCrawler).to(Crawler);
container.bind<MarkupFetcher>(TYPES.MarkupFetcher).to(AxiosMarkupFetcher);
container.bind<WebsiteRepository>(TYPES.WebsiteRepository).to(LocalJSONStorage);
container.bind<MarkupTraverser>(TYPES.MarkupTraverser).to(CheerioTraverser);
container.bind<DBClient>(TYPES.DBClient).to(PostgresClient);
container.bind<ExitHandlerInterface>(TYPES.ExitHandlerInterface).to(ExitHandler);

export default container;
