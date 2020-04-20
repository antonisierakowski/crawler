import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Crawler, WebCrawler } from '../services/Crawler';
import { AxiosMarkupFetcher } from '../services/AxiosMarkupFetcher';
import { WebsiteRepositoryInterface } from '../interfaces/WebsiteRepositoryInterface';
import { MarkupFetcher } from '../interfaces/MarkupFetcher';
import { MarkupTraverser } from '../interfaces/MarkupTraverser';
import { CheerioTraverser } from '../services/CheerioTraverser';
import { WebsiteRepository } from '../repositories/WebsiteRepository';
import { DBClient } from '../interfaces/DBClient';
import { PostgresClient } from '../services/PostgresClient';
import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { ExitHandler } from '../services/ExitHandler';
import { LoggerInterface } from '../interfaces/Logger';
import { Logger } from '../services/Logger';

const container = new Container();

container.bind<WebCrawler>(TYPES.WebCrawler).to(Crawler);
container.bind<MarkupFetcher>(TYPES.MarkupFetcher).to(AxiosMarkupFetcher);
container.bind<WebsiteRepositoryInterface>(TYPES.WebsiteRepository).to(WebsiteRepository);
container.bind<MarkupTraverser>(TYPES.MarkupTraverser).to(CheerioTraverser);
container.bind<DBClient>(TYPES.DBClient).to(PostgresClient);
container.bind<ExitHandlerInterface>(TYPES.ExitHandlerInterface).to(ExitHandler);
container.bind<LoggerInterface>(TYPES.LoggerInterface).to(Logger).inSingletonScope();

export default container;
