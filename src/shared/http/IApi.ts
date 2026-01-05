export default interface IApi{
    get<T,U>(path:string, params?: Record<string, U>):Promise<T>;
    post<T,U>(path:string,body:U):Promise<T>;
    patch<T,U>(path:string,body:U):Promise<T>;
    delete<T>(path:string):Promise<T>;
}