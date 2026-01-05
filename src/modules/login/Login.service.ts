import HTTPError from "../../shared/http/HTTPError";
import type IStorage from "../../shared/storage/IStorage";
import type { AuthCredentials } from "../../shared/types/AuthCredentials";
import type AuthApi from "./Login.api";

export default class {
    private api: AuthApi;
    private storage: IStorage;

    constructor(api: AuthApi, storage: IStorage){
        this.api = api;
        this.storage = storage;
    }
    
    async login(Username: string, Password: string){
        try{
            const response = await this.api.login({Username, Password});
            this.storage.setObject<AuthCredentials>("auth", {
                token: response.token,
                userId: response.userId,
                role: response.role
            });
            return response;
        }catch(error){
            if(error instanceof HTTPError && error.status === 401){
                throw new HTTPError(401, 'Credenciales inválidas');
            }
            throw error;
        }
    }

    logout(){
        this.storage.remove("auth");
    }

    isAuthenticated(): boolean {
        const credentials = this.storage.getObject("auth");
        return !!credentials;
    }
}