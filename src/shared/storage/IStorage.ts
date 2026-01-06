export default interface IStorage{
    set(key:string, value:string):void;
    get(key:string):string | null;
    remove(key:string):void;

    setObject<T>(key:string, value:T):void;
    getObject<T>(key:string):T | null;
}