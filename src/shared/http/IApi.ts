export default interface IApi{
    get<T, U = undefined>(path:string, params?: U):Promise<T>;
    post<T,U>(path:string,body:U):Promise<T>;
    patch<T,U>(path:string,body:U):Promise<T>;
    delete<T>(path:string):Promise<T>;
}