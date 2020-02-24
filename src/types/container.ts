import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { LocalJSONStorage } from "../services/LocalJSONStorage";
import { Crawler, WebCrawler } from "../services/Crawler";
import { AxiosMarkupFetcher } from "../services/AxiosMarkupFetcher";
import { WebsiteRepository } from "../interfaces/WebsiteRepository";
import { MarkupFetcher } from "../interfaces/MarkupFetcher";

const container = new Container();

container.bind<WebCrawler>(TYPES.WebCrawler).to(Crawler);
container.bind<MarkupFetcher>(TYPES.MarkupFetcher).to(AxiosMarkupFetcher);
container.bind<WebsiteRepository>(TYPES.WebsiteRepository).to(LocalJSONStorage);

export default container;
