import { IstaticDataInfo, PurchaseInfoResp } from "./Define";

export class Model {
    private static _instance: Model = null;
    public static get Instance(): Model {
        this._instance = this._instance || new Model();
        return this._instance;
    }

    public dynamicData: Map<number, PurchaseInfoResp> = new Map();
    public staticData: {
        [key: number]: IstaticDataInfo;
    } = null;
}
