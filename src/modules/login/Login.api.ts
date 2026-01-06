import type IApi from "../../shared/http/IApi";
import type { AuthCredentials } from "../../shared/types/AuthCredentials";

type LoginResponse = {
    token: string;
    userId: string;
    role: string;
};
type Credentials = {
    Username: string;
    Password: string;
};

export default class{
    
    private api: IApi;

    constructor(api: IApi){
        this.api = api;
    }

    async login(data: Credentials): Promise<LoginResponse>{
        return this.api.post<LoginResponse, Credentials>('/auth', data);
    }

    async verify() {
        return this.api.get<Omit<AuthCredentials, 'token'>>('/auth/me');
    }
}