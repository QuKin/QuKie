/**
 * @file            QDB.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     indexedDB封装
 * @Date            2023/8/14 15:06
 */

import {getConfig, QAL} from "./_QCommon.js";
import {IParam, IStores} from "./interface/IQDB.js";
import {CodeE} from "../mode/codeE.js";
import QRange from "./QRange.js";
import {QApi, Api} from "./QApi.js";

let QDBL = null;
await import("../../language/" + getConfig('Language') + "/kernel/systemCallInterface/QDBL.js").then(e => {
    QDBL = e.QDBL;
})
let PublicL = null;
await import("../../language/" + getConfig('Language') + "/publicL.js").then(e => {
    PublicL = e.publicL;
})

export default class QDB {
    dbName: string;
    dbVersion: number;
    db: any;
    indexedDB: any;
    stores: IStores[];
    qrange: QRange = new QRange();

    /**
     * 构造函数
     * ```js
     new QDB({
        name:'test',
        version:1
     },[{
     name:'s1',
     options:{
            keyPath:'id',
            autoIncrement:true
        },
     indexs:[{
     name:'sid',
     options:{
                unique:true
            }
     }]
     }])
     * ```
     * @param {IParam} param
     * @param {IStores[]} stores
     */
    constructor(param: IParam, stores: IStores[]) {
        this.dbName = param.name;
        this.dbVersion = param.version;
        this.stores = stores;

        this.init().catch(e => {
            return QAL(window.LogIntensityE.Error, QDBL.type, e, [], e, CodeE.Error)
        })
    }

    private init() {
        let _this = this;
        return new Promise((resolve, reject) => {
            //  兼容浏览器
            this.indexedDB =
                window.indexedDB ||
                window.mozIndexedDB ||
                window.webkitIndexedDB ||
                window.msIndexedDB;
            if (!this.indexedDB) {
                reject(QDBL.browserNotSupportIndexedDB);
            }
            // 打开数据库，若没有则会创建
            const request = indexedDB.open(this.dbName, this.dbVersion);
            // 数据库打开成功回调
            request.onsuccess = function (event: any) {
                _this.db = event.target.result; // 数据库对象
            };
            // 数据库打开失败的回调
            request.onerror = function () {
                reject(QDBL.openErr)
            };
            // 数据库有更新时候的回调
            request.onupgradeneeded = function (event: any) {
                // 数据库创建或升级的时候会触发
                _this.db = event.target.result; // 数据库对象
                for (const store of _this.stores) {
                    let objectStore: any = _this.db.createObjectStore(store.name, store.options);
                    // 添加到范围，之后添加等操作进行判断是否有值
                    _this.qrange.add(store.name);
                    for (const index of store.indexs) {
                        objectStore.createIndex(index.name, index.name, index.options);
                    }
                }
            };
        });
    }

    /**
     * 判断是否有仓库名称
     * @name isStoreName
     * @param {string} item
     * @returns {boolean}
     */
    isStoreName(item: string): QApi {
        let b: boolean = this.qrange.is(item);
        if (!b) {
            return QAL(window.LogIntensityE.Error, QDBL.type, PublicL.RangeError, b, QDBL.isErr, CodeE.RangeError)
        }
        return Api(b);
    }

    /**
     * 插入数据
     * @param {string} storeName 仓库名称
     * @param {object} data 数据
     */
    add(storeName: string, data: object) {
        let b: QApi = this.isStoreName(storeName);
        if (b.data) {
            let request = this.db
                .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
                .objectStore(storeName) // 仓库对象
                .add(data);

            request.onsuccess = function () {
                console.log("数据写入成功");
            };

            request.onerror = function () {
                console.log("数据写入失败");
            };
        } else {
            return b;
        }
    }
}