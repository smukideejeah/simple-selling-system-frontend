import HTTPError from "../../shared/http/HTTPError";
import type IApi from "../../shared/http/IApi";
import type { Top10ReportType } from "./Reports.types";

export default class ReportsApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getTop10Products(): Promise<Top10ReportType[]> {
        try{
            return await this.api.get<Top10ReportType[]>('/reports/top10Products');
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }
}