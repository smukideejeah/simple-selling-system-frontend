import HTTPError from "../../shared/http/HTTPError";
import type DiscountsApi from "./Discounts.api";
import type { CreateDiscount, DiscountsFilter, UpdateDiscount } from "./Discounts.types";

export class DiscountsService {
    private api: DiscountsApi;
    constructor(api: DiscountsApi) {
        this.api = api;
    }

    list(searchParams?: DiscountsFilter) {
        return this.api.getAll(searchParams);
    }

    getById(id: string) {
        return this.api.getById(id);
    }

    create(discount: CreateDiscount){
        try{
            return this.api.create(discount);
        }catch(err){
            if(err instanceof HTTPError){
                if(err.status === 400) throw new HTTPError(400, 'Datos inválidos para crear el producto');
            }
            throw err;
        }
    }

    update(id: string, discount: UpdateDiscount){
        return this.api.update(id, discount);
    }

    delete(id: string){
        return this.api.delete(id);
    }
}