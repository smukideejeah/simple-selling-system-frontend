import HTTPError from "../../shared/http/HTTPError";
import type IApi from "../../shared/http/IApi";
import type { Order, OrderInput, ProductsFilter, ProductsPagination} from "./Orders.types";

export default class OrdersApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getAllProducts(searchParams?: ProductsFilter): Promise<ProductsPagination> {
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

    async create(order: OrderInput): Promise<Order> {
        try{
            return await this.api.post<Order, OrderInput>('/orders', order);
        }catch(err){
            if(err instanceof HTTPError){
                throw new HTTPError(err.status, err.message);
            }
            throw err;
        }
    }
}