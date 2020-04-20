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
import { PostgresClient } from '../clients/PostgresClient';
import { ExitHandlerInterface } from '../interfaces/ExitHandlerInterface';
import { ExitHandler } from '../services/ExitHandler';
import { LoggerInterface } from '../interfaces/Logger';
import { Logger } from '../services/Logger';
import { PersistenceClient } from '../interfaces/PersistenceClient';
import { LocalJSONStorageClient } from '../clients/LocalJSONStorageClient';
import { QueueRepository } from '../repositories/QueueRepository';
import { QueueRepositoryInterface } from '../interfaces/QueueRepositoryInterface';

const container = new Container();

container.bind<WebCrawler>(TYPES.WebCrawler).to(Crawler);
container.bind<MarkupFetcher>(TYPES.MarkupFetcher).to(AxiosMarkupFetcher);
container.bind<WebsiteRepositoryInterface>(TYPES.WebsiteRepository).to(WebsiteRepository);
container.bind(QueueRepositoryInterface)(TYPES.QueueRepositoryInterface).to(QueueRepository).inSingletonScope();
container.bind<MarkupTraverser>(TYPES.MarkupTraverser).to(CheerioTraverser);
container.bind<DBClient>(TYPES.DBClient).to(PostgresClient);
container.bind<ExitHandlerInterface>(TYPES.ExitHandlerInterface).to(ExitHandler);
container.bind<LoggerInterface>(TYPES.LoggerInterface).to(Logger).inSingletonScope();
container.bind<PersistenceClient>(TYPES.PersistenceClient).to(LocalJSONStorageClient).inSingletonScope();


export default container;
