import HTTPError from "../../shared/http/HTTPError";
import type IApi from "../../shared/http/IApi";
import type { CreateDiscount, Discount, DiscountPagination, DiscountsFilter, UpdateDiscount } from "./Discounts.types";

export default class DiscountsApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getById(id: string): Promise<Discount> {
        try{
            return await this.api.get<Discount>(`/discounts/${id}`);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async getAll(searchParams?: DiscountsFilter): Promise<DiscountPagination> {
        try{
            const parsedParams = searchParams ? {
                ...searchParams,
                cursor: searchParams.cursor ? JSON.stringify(searchParams.cursor) : undefined
            } : undefined;
            return await this.api.get<DiscountPagination, object | undefined>('/discounts', parsedParams);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async create(discount: CreateDiscount): Promise<Discount> {
        try{
            return await this.api.post<Discount, CreateDiscount>('/discounts', discount);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async update(id: string, discount: UpdateDiscount): Promise<Discount> {
        try{
            return await this.api.patch<Discount, UpdateDiscount>(`/discounts/${id}`, discount);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async delete(id: string): Promise<void> {
        try{
            return await this.api.delete<void>(`/discounts/${id}`);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }
}