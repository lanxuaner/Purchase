import * as cc from "cc";
import { ILTPackData, PACK2List, storeTitles } from "./Define";
import { Model } from "./Model";
const { ccclass, property } = cc._decorator;
@ccclass("store")
export class store extends cc.Component {
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Node)
    content2: cc.Node = null;
    @property(cc.Label)
    title: cc.Label = null;
    @property(cc.Prefab)
    pack1Pre: cc.Prefab = null;
    @property(cc.Prefab)
    pack2Pre: cc.Prefab = null;

    private productsId: number[] = [];
    private pack1List: number[] = [];
    private pack2List: number[] = [];
    private _col1: number = 2;
    private _col2: number = 3;

    /**
     *
     * @param type 类型。1：每日、2：每周
     */
    public init(type: number, productsId: number[]): void {
        this.productsId = productsId;
        this.title.string = storeTitles[type];
        this.aaa();
        this._bbb();

        for (let p1 = 0; p1 < this.pack1List.length; p1++) {
            // const node = cc.instantiate(this.pack1Pre);
            // this.content.addChild(node);
            // const rowInd = Math.floor(p1 / this._col1);
            // const colInd = p1 % this._col1;
        }

        for (let p2 = 0; p2 < this.pack2List.length; p2++) {
            // const node = cc.instantiate(this.pack2Pre);
            // this.content.addChild(node);
        }
    }

    private aaa() {
        for (let i = 0; i < this.productsId.length; i++) {
            const id = this.productsId[i];
            if (PACK2List.indexOf(id) > -1) {
                this.pack2List.push(id);
            } else {
                this.pack1List.push(id);
            }
        }
    }

    /**
     * 计算每行每个item的所占的高度
     */
    private _bbb() {
        let rowPackData: Map<number, ILTPackData> = new Map();
        /**每行对应什么礼包，是什么size */
        const size1 = cc.size(300, 400); //item个数小于5
        const size2 = cc.size(640, 360); //item个数大于等于5

        //TODO算出总格子高度

        //每个礼包的奖励项数量
        console.log("lxr-pack1List:", this.pack1List);
        let tempList: number[] = []; //[2,4,3,5,2,3,5,2,3]
        for (let p1 = 0; p1 < this.pack1List.length; p1++) {
            const purchaseId = this.pack1List[p1];
            const staticData = Model.Instance.staticData[purchaseId];
            const itemsId = staticData.itemsId;
            tempList.push(itemsId.length);
        }
        /**对应tempList的索引值 */
        let tempIndList: number[] = this.search(tempList, 5); //[3,6]
        let startInd = 0;
        let rowIndex = 0;
        let index = 0;
        let heightSum = 0;
        const cb = (arr: number[]) => {
            //[2,4,3]
            for (let a = 0; a < arr.length; a++) {
                let rowInd = rowIndex + Math.floor(a / 2);
                let colInd = 0;
                const itemNum = arr[a];
                let size = itemNum >= 5 ? size2 : size1;
                if (a === arr.length - 1 && arr.length % 2 !== 0) {
                    colInd = 1;
                } else {
                    colInd = a % 2 === 0 ? 0 : 2;
                }
                heightSum += a % 2 === 0 ? size1.height : 0;

                if (a === arr.length - 1) {
                    rowIndex += rowInd - rowIndex; //第一小段：1
                }
                //赋值
                const purchaseId = this.pack1List[index];
                rowPackData.set(purchaseId, { rowInd, colInd, size });
                index++; //3
            }
        };
        for (let t = 0; t < tempIndList.length; t++) {
            const ind = tempIndList[t]; //3、6
            const arr = tempList.slice(startInd, ind); //[2,4,3]  [2,3]
            cb(arr);
            //itemNum为5的情况
            const purchaseId = this.pack1List[index];
            rowIndex++;
            rowPackData.set(purchaseId, { rowInd: rowIndex, colInd: 1, size: size2 });
            startInd += arr.length + 1;
            index++;
            rowIndex++;
            heightSum += size2.height;
        }
        const arr1 = tempList.slice(startInd, tempList.length); //[2,3]
        cb(arr1);

        console.log("lxr-rowPackData:", rowPackData);
        console.log("heightSum:", heightSum);

        return {
            tempIndList,
            rowIndex,
            heightSum,
        };
    }

    /**
     * 计算某个值在数组中出现的索引值，该值会在数组中出现N次
     * @param arr
     * @param dst
     * @returns
     */
    search(arr, dst) {
        const list: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element >= dst) {
                list.push(i);
            }
        }
        console.log("lxr-search-数量5在数组中出现的索引位置:", list);
        return list;
    }
}
