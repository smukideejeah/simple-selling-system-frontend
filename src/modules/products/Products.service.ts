import HTTPError from "../../shared/http/HTTPError";
import type ProductsApi from "./Products.api";
import type { CreateProduct, ProductsFilter, UpdateProduct } from "./Products.types";

export class ProductsService {
    private api: ProductsApi;
    constructor(api: ProductsApi) {
        this.api = api;
    }

    list(searchParams?: ProductsFilter) {
        return this.api.getAll(searchParams);
    }

    getById(id: string) {
        return this.api.getById(id);
    }

    create(product: CreateProduct){
        try{
            return this.api.create(product);
        }catch(err){
            if(err instanceof HTTPError){
                if(err.status === 400) throw new HTTPError(400, 'Datos inválidos para crear el producto');
            }
            throw err;
        }
    }

    update(id: string, product: UpdateProduct){
        return this.api.update(id, product);
    }

    delete(id: string){
        return this.api.delete(id);
    }
}