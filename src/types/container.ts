import "reflect-metadata";
import { Container } from "inversify";
import { AxiosMarkupFetcher, MarkupFetcher } from "../services/MarkupFetcher";
import { TYPES } from "./types";
import { LocalJSONStorage, WebsiteRepository } from "../services/Repository";
import { Crawler, WebCrawler } from "../services/Crawler";

const container = new Container();

container.bind<WebCrawler>(TYPES.WebCrawler).to(Crawler);
container.bind<MarkupFetcher>(TYPES.MarkupFetcher).to(AxiosMarkupFetcher);
container.bind<WebsiteRepository>(TYPES.WebsiteRepository).to(LocalJSONStorage);

export default container;