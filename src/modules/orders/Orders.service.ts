import HTTPError from "../../shared/http/HTTPError";
import type ProductsApi from "./Orders.api";
import type { OrderInput, ProductsFilter } from "./Orders.types";

export class OrdersService {
    private api: ProductsApi;
    constructor(api: ProductsApi) {
        this.api = api;
    }

    listProducts(searchParams?: ProductsFilter) {
        return this.api.getAllProducts(searchParams);
    }

    create(product: OrderInput){
        try{
            return this.api.create(product);
        }catch(err){
            if(err instanceof HTTPError){
                if(err.status === 400) throw new HTTPError(400, 'Datos inválidos para crear el producto');
            }
            throw err;
        }
    }
}