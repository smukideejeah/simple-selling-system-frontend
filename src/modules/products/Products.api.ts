import HTTPError from "../../shared/http/HTTPError";
import type IApi from "../../shared/http/IApi";
import type { CreateProduct, Product, ProductsFilter, ProductsPagination, UpdateProduct } from "./Products.types";

export default class ProductsApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getById(id: string): Promise<Product> {
        try{
            return await this.api.get<Product>(`/products/${id}`);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async getAll(searchParams?: ProductsFilter): Promise<ProductsPagination> {
        try{
            const parsedParams = searchParams ? {
                ...searchParams,
                cursor: searchParams.cursor ? JSON.stringify(searchParams.cursor) : undefined
            } : undefined;
            return await this.api.get<ProductsPagination, object | undefined>('/products', parsedParams);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async create(product: CreateProduct): Promise<Product> {
        try{
            return await this.api.post<Product, CreateProduct>('/products', product);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async update(id: string, product: UpdateProduct): Promise<Product> {
        try{
            return await this.api.patch<Product, UpdateProduct>(`/products/${id}`, product);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }

    async delete(id: string): Promise<void> {
        try{
            return await this.api.delete<void>(`/products/${id}`);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }
}