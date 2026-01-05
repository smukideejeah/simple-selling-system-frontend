
import LoginApi from "../../modules/login/Login.api";
import LoginService from "../../modules/login/Login.service";
import Api from "../http/Api";
import type IApi from "../http/IApi";
import type IStorage from "../storage/IStorage";
import LocalStorage from "../storage/LocalStorage";

const storage: IStorage = new LocalStorage();
const api: IApi = new Api(storage);

export const authService = new LoginService(new LoginApi(api), storage);