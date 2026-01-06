import type ReportsApi from "./Reports.api";
import type { Top10ReportType } from "./Reports.types";

export default class ReportsService{
    private api: ReportsApi;

    constructor(api: ReportsApi){
        this.api = api;
    }

    async getTop10Products(): Promise<Top10ReportType[]> {
        return await this.api.getTop10Products();
    }
}