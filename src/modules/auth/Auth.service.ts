import type IStorage from "../../shared/storage/IStorage";
import type { AuthCredentials } from "../../shared/types/AuthCredentials";
import type AuthApi from "./Auth.api";

export default class {
    private api: AuthApi;
    private storage: IStorage;

    constructor(api: AuthApi, storage: IStorage){
        this.api = api;
        this.storage = storage;
    }
    
    async login(Username: string, Password: string){
        const response = await this.api.login({Username, Password});
        this.storage.setObject<AuthCredentials>("auth", {
            token: response.token,
            userId: response.userId,
            role: response.role
        });
        return response;
    }

    logout(){
        this.storage.remove("auth");
    }

    isAuthenticated(): boolean {
        const credentials = this.storage.getObject("auth");
        return !!credentials;
    }
}