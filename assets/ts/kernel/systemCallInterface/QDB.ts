/**
 * @file            QDB.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     indexedDB封装
 * @Date            2023/8/14 15:06
 */

import {getConfig, QAL} from "./_QCommon.js";
import {IParam, IQDB, IStores} from "./interface/IQDB.js";
import {CodeE} from "../mode/codeE.js";
import QRange from "./QRange.js";
import {QApi} from "./QApi.js";

let QDBL = null;
await import("../../language/" + getConfig('Language') + "/kernel/systemCallInterface/QDBL.js").then(e => {
    QDBL = e.QDBL;
})
let PublicL = null;
await import("../../language/" + getConfig('Language') + "/publicL.js").then(e => {
    PublicL = e.publicL;
})

export default class QDB implements IQDB {
    dbName: string;
    dbVersion: number;
    db: any;
    indexedDB: any;
    stores: IStores[];
    qrange: QRange = new QRange();
    storeName: string = '';

    /**
     * 构造函数
     ```js
     new QDB({
        name:'test',
        version:1
     },[{
     name:'s1',
     options:{
         keyPath:'sid',
         autoIncrement:true
     },
     indexs:[{
     name:'sid',
     options:{
                 unique:true
             }
     },{
         name:'name',
         options:{
             unique:true
         }
        }]
     }])
     ```
     * @param {IParam} param
     * @param {IStores[]} stores
     */
    constructor(param: IParam, stores: IStores[]) {
        this.dbName = param.name;
        this.dbVersion = param.version;
        this.stores = stores;

        this.open().catch(e => {
            QAL(window.LogIntensityE.Error, QDBL.type, e, [], e, CodeE.Error)
        })
    }

    /**
     * 打开数据库
     * @returns {QApi}
     */
    open() {
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
                for (const item of _this.db.objectStoreNames) {
                    _this.qrange.add(item)
                }
                resolve(true);
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
     * 选择仓库
     * @param{string} storeName 仓库名称
     * @returns {QApi}
     */
    setStoreName(storeName: string): QApi {
        let b: boolean = this.qrange.is(storeName);
        if (b) {
            this.storeName = storeName;
            return QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.setStoreNameSuccess, this.storeName)
        } else {
            console.log(storeName, this.qrange.show());
            return QAL(window.LogIntensityE.Error, QDBL.type, PublicL.RangeError, b, QDBL.isErr, CodeE.RangeError)
        }
    }

    /**
     * 获取仓库名称
     * @returns {string}
     */
    getStoreName(): string {
        if (this.storeName === '') {
            throw new Error('请先选择仓库')
        }
        return this.storeName;
    }

    /**
     * 插入数据
     * @param {object} data 数据
     */
    add(data: object) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction([this.getStoreName()], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
                .objectStore(this.getStoreName()) // 仓库对象
                .add(data);

            request.onsuccess = function () {
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.addSuccess, data))
            };

            request.onerror = function () {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.addErr, data, QDBL.addErr, CodeE.Error))
            };
        })
    }

    /**
     * 关闭数据库
     * @returns {Promise}
     */
    close() {
        return new Promise((resolve, reject) => {
            try {
                this.db.close();
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.closeSuccess));
            } catch (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.closeErr, e, QDBL.closeErr, CodeE.Error));
            }
        })
    }

    /**
     * 通过主键删除数据
     * @param {number|string} id 主键值
     * @returns {Promise}
     */
    delete(id: number | string) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction([this.getStoreName()], "readwrite")
                .objectStore(this.getStoreName())
                .delete(id);

            request.onsuccess = function () {
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.deleteSuccess, id));
            };

            request.onerror = function () {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.deleteErr, id, QDBL.deleteErr, CodeE.Error));
            };
        })
    }

    /**
     * 删除数据库
     * @returns {Promise}
     */
    deleteDB() {
        let _this = this;
        return new Promise((resolve, reject) => {
            let deleteRequest = window.indexedDB.deleteDatabase(this.dbName);
            deleteRequest.onerror = function () {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.deleteDBErr, _this.dbName, QDBL.deleteDBErr, CodeE.Error));
            };
            deleteRequest.onsuccess = function () {
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.deleteDBSuccess, _this.dbName));
            };
        })
    }

    /**
     * 通过索引和游标删除指定多个数据
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @returns {Promise}
     */
    deletes(indexName: string, indexValue: string) {
        return new Promise((resolve, reject) => {
            const store = this.db.transaction(this.getStoreName(), "readwrite").objectStore(this.getStoreName());
            const request = store
                .index(indexName) // 索引对象
                .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
            request.onsuccess = function (e) {
                const cursor = e.target.result;
                let deleteRequest;
                let num: number = 0;
                if (cursor) {
                    deleteRequest = cursor.delete(); // 请求删除当前项
                    deleteRequest.onerror = function () {
                        reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.deletesErr, deleteRequest, QDBL.deletesErr, CodeE.Error));
                    };
                    deleteRequest.onsuccess = function () {
                        num++;
                    };
                    cursor.continue();
                } else {
                    resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.deletesSuccess, num));
                }
            };
            request.onerror = function () {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.deletesErr, [], QDBL.deletesErr, CodeE.Error));
            };
        })
    }

    /**
     * 通过游标获取全部数据
     * @returns {Promise}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            let list = [];
            const store = this.db
                .transaction(this.getStoreName(), "readwrite") // 事务
                .objectStore(this.getStoreName()); // 仓库对象
            const request = store.openCursor(); // 指针对象
            // 游标开启成功，逐行读数据
            request.onsuccess = function (e) {
                const cursor = e.target.result;
                if (cursor) {
                    // 必须要检查
                    list.push(cursor.value);
                    cursor.continue(); // 遍历了存储对象中的所有内容
                } else {
                    resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.getAllSuccess, list));
                }
            };
            request.onerror = function (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.getAllErr, e, QDBL.getAllErr, CodeE.Error));
            }
        })
    }

    /**
     * 通过索引查询单个数据
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @returns {Promise}
     */
    getIndex(indexName: string, indexValue: string) {
        return new Promise((resolve, reject) => {
            const store = this.db.transaction(this.getStoreName(), "readwrite").objectStore(this.getStoreName());
            const request = store.index(indexName).get(indexValue);
            request.onerror = function (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.getIndexErr, e, QDBL.getIndexErr, CodeE.Error));
            };
            request.onsuccess = function (e) {
                const result = e.target.result;
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.getIndexSuccess, result));
            };
        })
    }

    /**
     * 通过主键读取数据
     * @param {number|string} key 主键值
     * @returns {Promise}
     */
    getKey(key: number | string) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.getStoreName()]); // 事务
            const objectStore = transaction.objectStore(this.getStoreName()); // 仓库对象
            const request = objectStore.get(key); // 通过主键获取数据

            request.onerror = function (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.getKeyErr, e, QDBL.getKeyErr, CodeE.Error));
            };

            request.onsuccess = function () {
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.getKeySuccess, request.result));
            };
        })
    }

    /**
     * 通过索引和游标分页查询
     * 输出可多个值
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @param {number} page 页码
     * @param {number} pageSize 查询条数
     * @returns {Promise}
     */
    page(indexName: string, indexValue: string, page: number, pageSize: number) {
        return new Promise((resolve, reject) => {
            let list = [];
            let counter = 0; // 计数器
            let advanced = true; // 是否跳过多少条查询
            const store = this.db.transaction(this.getStoreName(), "readwrite").objectStore(this.getStoreName()); // 仓库对象
            const request = store
                .index(indexName) // 索引对象
                .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
            request.onsuccess = function (e) {
                let cursor = e.target.result;
                if (page > 1 && advanced) {
                    advanced = false;
                    cursor.advance((page - 1) * pageSize); // 跳过多少条
                    return;
                }
                if (cursor) {
                    // 必须要检查
                    list.push(cursor.value);
                    counter++;
                    if (counter < pageSize) {
                        cursor.continue(); // 遍历了存储对象中的所有内容
                    } else {
                        cursor = null;
                        resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.pageSuccess, list));
                    }
                } else {
                    resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.pageSuccess, list));
                }
            };
            request.onerror = function (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.pageErr, e, QDBL.pageErr, CodeE.Error));
            };
        })
    }

    /**
     * 通过索引和游标查询
     * 输出可多个值
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @returns {Promise}
     */
    search(indexName: string, indexValue: string) {
        return new Promise((resolve, reject) => {
            let list = [];
            const store = this.db.transaction(this.getStoreName(), "readwrite").objectStore(this.getStoreName()); // 仓库对象
            const request = store
                .index(indexName) // 索引对象
                .openCursor(IDBKeyRange.only(indexValue)); // 指针对象
            request.onsuccess = function (e) {
                const cursor = e.target.result;
                if (cursor) {
                    // 必须要检查
                    list.push(cursor.value);
                    cursor.continue(); // 遍历了存储对象中的所有内容
                } else {
                    resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.searchSuccess, list));
                }
            };
            request.onerror = function (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.searchErr, e, QDBL.searchErr, CodeE.Error));
            };
        })
    }

    /**
     * 更新数据
     * 记得主键要一样，否则会创建
     * @param {object} data 数据
     * @returns {Promise}
     */
    update(data: object) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction([this.getStoreName()], "readwrite") // 事务对象
                .objectStore(this.getStoreName()) // 仓库对象
                .put(data);

            request.onsuccess = function () {
                resolve(QAL(window.LogIntensityE.SuccessError, QDBL.type, QDBL.updateSuccess, data));
            };

            request.onerror = function (e) {
                reject(QAL(window.LogIntensityE.Error, QDBL.type, QDBL.updateErr, e, QDBL.updateErr, CodeE.Error));
            };
        })
    }
}