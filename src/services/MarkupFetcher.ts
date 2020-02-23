import axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";

export interface MarkupFetcher {
  getMarkup(url: string): Promise<string>;
}

@injectable()
export class AxiosMarkupFetcher implements MarkupFetcher {
  async getMarkup(url: string): Promise<string> {
     try {
       const response: AxiosResponse = await axios.get(url);
       return response.data;
     } catch (e) {
       throw new Error(e);
     }
  }
}