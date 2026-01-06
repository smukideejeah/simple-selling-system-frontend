import type IStorage from "./IStorage";

export default class localStorage implements IStorage {
    set(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }

    get(key: string): string | null {
        return window.localStorage.getItem(key);
    }

    remove(key: string): void {
        window.localStorage.removeItem(key);
    }

    setObject<T>(key: string, value: T): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    getObject<T>(key: string): T | null {
        const item = window.localStorage.getItem(key);
        if (item)  return JSON.parse(item) as T;
        return null;
    }
}