import * as cc from "cc";
import { store } from "./store";
import { IstaticDataInfo, PurchaseInfoResp, dataId } from "./Define";
import { Model } from "./Model";
const { ccclass, property } = cc._decorator;

@ccclass("Game")
export class Game extends cc.Component {
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Prefab)
    storePre: cc.Prefab = null;

    protected onLoad(): void {
        this._testData();
        const cnt = 1;
        for (let i = 0; i < cnt; i++) {
            const node = cc.instantiate(this.storePre);
            this.content.addChild(node);
            node.getComponent(store).init(3, dataId[3]);
        }
    }

    private _testData() {
        let obj: PurchaseInfoResp = {
            products: {},
            //每日刷新剩余时间，单位ms
            dailyRefreshTime: 12,

            //每周刷新剩余时间，单位ms
            weeklyRefreshTime: 12,

            //每月刷新剩余时间，单位ms
            monthlyRefreshTime: 12,
        };
        for (let i = 0; i < 12; i++) {
            const id = i + 5;

            obj.products[id] = {
                //内购ID
                purchaseId: id,

                //当前是否解锁
                unlocked: true,

                //已购买次数，解锁时填写
                purchaseTimes: 0,

                //内购商品剩余时间，单位ms，-1表示无时间限制，解锁时填写
                remainingTime: -1,
            };
        }
        Model.Instance.dynamicData.set(2, obj);
        //[2,4,3,5,2,3,5,2,3]
        Model.Instance.staticData = {
            5: {
                itemsId: [1],
            },
            6: {
                itemsId: [1, 1, 1, 1],
            },
            7: {
                itemsId: [1, 1, 1, 1],
            },

            8: {
                itemsId: [1, 1],
            },
            9: {
                itemsId: [1, 1, 1, 1],
            },
            10: {
                itemsId: [1, 1, 1],
            },
            11: {
                itemsId: [1, 1, 1, 1, 1],
            },
            12: {
                itemsId: [1, 1],
            },
            13: {
                itemsId: [1, 1, 1],
            },
            14: {
                itemsId: [1, 1, 1, 1, 1],
            },
            // 15: {
            //     itemsId: [1, 1],
            // },
            // 16: {
            //     itemsId: [1, 1, 1],
            // },

            17: {
                itemsId: [1],
            },
            18: {
                itemsId: [1],
            },
            19: {
                itemsId: [1],
            },
            20: {
                itemsId: [1],
            },
            21: {
                itemsId: [1],
            },
            22: {
                itemsId: [1],
            },
        };
    }
}
