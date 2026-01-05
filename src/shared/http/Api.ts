import axios from "axios";
import type IApi from "./IApi";
import env from "../config/env";
import type IStorage from "../storage/IStorage";
import HTTPError from "./HTTPError";


export default class Api implements IApi{

    private storage: IStorage;

    constructor(storage: IStorage){
        this.storage = storage;
    }

    private headers(){
        const token = this.storage.get("token");
        return {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': `Bearer ${token}`})
        };
    }

    async get<T,U>(path: string, params?: Record<string, U>): Promise<T> {
        try{
            const response = await axios.request({
                method: 'GET',
                url: `${env.ApiUrl}${path}`,
                params,
                headers: this.headers()
            });
            return response.data;
        }catch(error){
            if (axios.isAxiosError(error) && error.response)
                throw new HTTPError(error.response.status, error.response.data?.message || 'Error en la solicitud');
            throw error;
        }
    }

    async post<T, U>(path: string, body: U): Promise<T> {
        try{
            const response = await axios.request<T>({
                method: 'POST',
                url: `${env.ApiUrl}${path}`,
                data: body,
                headers: this.headers()
            });
            return response.data;
        }catch(error){
            if (axios.isAxiosError(error) && error.response)
                throw new HTTPError(error.response.status, error.response.data?.message || 'Error en la solicitud');
            throw error;
        }
    }

    async patch<T, U>(path: string, body: U): Promise<T> {
        try{
            const response = await axios.request<T>({
                method: 'PATCH',
                url: `${env.ApiUrl}${path}`,
                data: body,
                headers: this.headers()
            });
            return response.data;
        }catch(error){
            if (axios.isAxiosError(error) && error.response)
                throw new HTTPError(error.response.status, error.response.data?.message || 'Error en la solicitud');
            throw error;
        }
    }

    async delete<T>(path: string): Promise<T> {
        try{
            const response = await axios.request<T>({
                method: 'DELETE',
                url: `${env.ApiUrl}${path}`,
                headers: this.headers()
            });
            return response.data;
        }catch(error){
            if (axios.isAxiosError(error) && error.response)
                throw new HTTPError(error.response.status, error.response.data?.message || 'Error en la solicitud');
            throw error;
        }
    }
}