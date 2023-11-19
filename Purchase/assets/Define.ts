import * as cc from "cc";
export const storeTitles = {
    2: "每日",
    3: "每周",
};

export interface PurchaseInfoResp {
    //商品购买信息
    products: { [key: string]: PurchaseProduct };

    //每日刷新剩余时间，单位ms
    dailyRefreshTime: number;

    //每周刷新剩余时间，单位ms
    weeklyRefreshTime: number;

    //每月刷新剩余时间，单位ms
    monthlyRefreshTime: number;
}

export interface PurchaseProduct {
    //内购ID
    purchaseId: number;

    //当前是否解锁
    unlocked: boolean;

    //已购买次数，解锁时填写
    purchaseTimes: number;

    //内购商品剩余时间，单位ms，-1表示无时间限制，解锁时填写
    remainingTime: number;
}

export interface IstaticDataInfo {
    itemsId: number[];
}

/**限时商店，每一行对应的礼包是什么size */
export interface ILTPackData {
    /**行 */
    rowInd: number;
    /**列 0,1,2 ，，枚举，1表示posX为0*/
    colInd: number;
    size: cc.Size;
}
//[2,4,3,5,2,3,5,2,3]
export const dataId = {
    2: [5, 6, 7],
    3: [8, 9, 10, 11, 12, 13, 14,     17, 18, 19, 20, 21, 22],
};

export const PACK2List = [17, 18, 19, 20, 21, 22];

export const LTPACK_PADDING: cc.Vec2 = cc.v2(40, 10);
export const LTPACK_SPACING: cc.Vec2 = cc.v2(40, 40);
export const LTSPACK_PADDING: cc.Vec2 = cc.v2(40, 10);
export const LTSPACK_SPACING: cc.Vec2 = cc.v2(20, 20);
