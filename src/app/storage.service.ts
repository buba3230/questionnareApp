import { Injectable } from "@angular/core";


@Injectable()
export class StorageService {

    constructor() { }

    public saveData(key: string, value: any[]) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getData(key: string) {
        return localStorage.getItem(key)
    }
    public removeData(key: string) {
        localStorage.removeItem(key);
    }

    public clearData() {
        localStorage.clear();
    }

}