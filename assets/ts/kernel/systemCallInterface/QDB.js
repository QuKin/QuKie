import { getConfig } from "./_QCommon";
/**
 * @name            QDB
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     indexedDB封装
 * @Date            2023/8/7 9:21
 */
let QDBL = null;
await import("../../language/" + getConfig('Language') + "/kernel/systemCallInterface/QDBL.js").then(e => {
    QDBL = e.QApiL;
});
export default class QDB {
    dbName;
    dbVersion;
    dbStoreName;
    db;
    indexedDB;
    /**
     * 生成indexedDB
     *
     * ```js
     * let qdb=new QDB({dbName: 'QuKin',dbVersion: 1,dbStoreName: 'Student'})
     * ```
     *
     * @param {String|{
     *  dbName:string,
     *  dbVersion:number,
     *  dbStoreName:string
     * }} param 配置
     * @param {{
     *  indexNames?:string,
     *  keyPath?:string,
     *  name?:string,
     *  transaction?:string,
     *  autoIncrement?:boolean
     * }} options 创建数据库时的参数
     *
     * @param {Array} index 创建多个索引
     *
     * @param {String} index.indexName 索引名
     * @param {String} index.keyPath 主键
     * @param {JSON} index.objectParameters 配置对象（可选）
     * @param {Boolean} index.objectParameters.unique 如果设为true，将不允许重复的值
     * @param {Boolean} index.objectParameters.multiEntry 如果设为true，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目。
     *
     * @param {Function} upgradeneeded 创建数据库
     */
    constructor(param, options = { autoIncrement: true }, index = [{
            "indexName": null,
            "keyPath": null,
            "objectParameters": { unique: false }
        }], upgradeneeded = (event) => {
    }) {
        if (typeof param === 'string')
            this.dbName = param;
        else
            this.dbName = param.dbName;
        this.dbVersion = param.dbVersion == undefined ? 1 : param.dbVersion;
        this.dbStoreName = param.dbStoreName == undefined ? ('QDB_' + new Date().getTime()) : param.dbStoreName;
        switch (arguments.length) {
            case 3:
                this.open(options, index);
                break;
            case 4:
                this.open(options, index, upgradeneeded);
                break;
            default:
                this.open(options);
                break;
        }
    }
    /**
     * 开启数据库
     * @param {*} options 创建数据库的参数
     * @param {Array} index 创建多个索引
     *
     * @param {String} index.indexName 索引名
     * @param {String} index.keyPath 主键
     * @param {JSON} index.objectParameters 配置对象（可选）
     * @param {Boolean} index.objectParameters.unique 如果设为true，将不允许重复的值
     * @param {Boolean} index.objectParameters.multiEntry 如果设为true，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目。
     *
     * @param {Function} upgradeneeded 创建数据库
     *
     * @returns {Promise}
     */
    open(options, index = [{
            "indexName": null,
            "keyPath": null,
            "objectParameters": { unique: false }
        }], upgradeneeded = (event) => {
    }) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this);
            }
            else {
                // 兼容
                // @ts-ignore
                this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                if (!this.indexedDB) {
                    reject(QDBL.browserNotSupportIndexedDB);
                }
                const request = window.indexedDB.open(this.dbName, this.dbVersion);
                // 成功
                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    resolve(this);
                };
                // 创建数据库
                if (arguments.length === 3) {
                    request.onupgradeneeded = upgradeneeded;
                }
                else {
                    request.onupgradeneeded = (event) => {
                        this.db = event.target.result;
                        // 先判断某个对象仓库是否存在，如果不存在就创建该对象仓库
                        if (!this.db.objectStoreNames.contains(this.dbStoreName)) {
                            this.db.createObjectStore(this.dbStoreName, options);
                            if (arguments.length !== 1) {
                                for (let i = 0; i < index.length; i++) {
                                    /**
                                     * indexName：索引名
                                     * keyPath：主键
                                     * objectParameters：配置对象（可选）
                                     *      unique：如果设为true，将不允许重复的值
                                     *      multiEntry：如果设为true，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目。
                                     */
                                    this.db.createIndex(index[i].indexName, index[i].keyPath, index[i].objectParameters);
                                }
                            }
                        }
                    };
                }
                // 失败
                request.onerror = (event) => {
                    reject(event);
                };
            }
        });
    }
    /**
     * 获取store
     * @param {String} mode 模式：readonly读和readwrite写
     * @param {String} dbStoreName 数据库名
     * @returns db
     */
    getStore(mode = 'readonly', dbStoreName = this.dbStoreName) {
        return this.db.transaction(dbStoreName, mode).objectStore(dbStoreName);
    }
    /**
     * 输出
     * @param {Object} request 事务
     * @callback callback 回调函数
     * @returns {Promise}
     */
    getRequest(request, callback) {
        return new Promise((resolve, reject) => {
            const success = value => {
                if (callback && typeof callback === 'function') {
                    callback(false, value);
                }
                resolve(value);
            };
            const error = event => {
                if (callback && typeof callback === 'function') {
                    callback(event);
                }
                reject(event);
            };
            return this.open().then(() => {
                request(success, error);
            }).catch(error);
        });
    }
    /**
     * 查询数据
     *
     * ```js
     // Promise版本
     qdb.get('aaa').then((value) => {
            console.log(value);
        })

     // async版本
     const value = await qdb.get('aaa');
     console.log(value);

     // 回调版本
     qdb.get('aaa', (err,value) => {
            console.log(err, value);
        });

     // 输出全部
     qdb.get().then((value) => {
            console.log(value);
        })

     * ```
     *
     * @param {Number|String} [key=null] key值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    get(key = null, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = key == null ? this.getStore().getAll() : this.getStore().get(key);
            request.onsuccess = () => success(request.result);
            request.onerror = error;
        }, callback);
    }
    /**
     * 索引查询数据
     *
     * @param {Number|String} indexName 索引名称
     * @param {Number|String} indexValue 索引值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    getIndex(indexName, indexValue, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = this.getStore().index(indexName).get(indexValue);
            request.onsuccess = () => success(request.result);
            request.onerror = error;
        }, callback);
    }
    /**
     * 索引游标查询数据
     *
     * @param {Number|String} indexName 索引名称
     * @param {Number|String} indexValue 索引值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    getIndexCursor(indexName, indexValue, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            let list = [];
            const request = this.getStore()
                .index(indexName) // 索引对象
                .openCursor(IDBKeyRange.only(indexValue)); // 指针对象，条件查询
            request.onsuccess = function (e) {
                let cursor = e.target.result;
                if (cursor) {
                    list.push(cursor.value);
                    cursor.continue(); // 遍历了存储对象中的所有内容
                }
                else {
                    success(list);
                }
            };
            request.onerror = error;
        }, callback);
    }
    /**
     * 索引删除
     *
     * @param {Number|String} indexName 索引名称
     * @returns null
     */
    delIndex(indexName) {
        this.db.deleteIndex(indexName);
        return null;
    }
    /**
     * 修改数据或增加数据
     *
     * ```js
     // Promise版本
     qdb.set('aaa').then(function(value) {
            console.log(value);
        })
     // 回调版本
     qdb.set('bbb', function(err,value) {
            console.log(err, value);
        });

     // 修改
     qdb.set('ccc',1).then(function(value) {
            console.log(value);
        })

     * ```
     *
     * @param {*} value 值
     * @param {Number|String} [key=null] key值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    set(value, key = null, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = key == null ? this.getStore('readwrite').put(value) : this.getStore('readwrite').put(value, key);
            request.onsuccess = () => success(value);
            request.onerror = error;
        }, callback);
    }
    /**
     * 增加数据
     *
     * ```js
     // Promise版本
     qdb.add({'key':'aaa'}).then(function(value) {
            console.log(value);
        })
     // 回调版本
     qdb.add({'key':'aaa'}, function(err,value) {
            console.log(err, value);
        });

     * ```
     *
     * @param {JSON} value 值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    add(value, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = this.getStore('readwrite').add(value);
            request.onsuccess = () => success(value);
            request.onerror = error;
        }, callback);
    }
    /**
     * 增加多条数据
     * 如果是多个数据，建议用这个方法
     *
     * ```js
     // Promise版本
     qdb.sets(['aaa',{'name':'bbb'}]);
     // 回调版本
     qdb.sets(['aaa','bbb'], function(err,value) {
            console.log(err, value);
        });

     * ```
     *
     * @param {Array} datas 值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    sets(datas, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            // const request = this.getStore('readwrite').put(datas[0][Object.keys(datas[0])[0]], Object.keys(datas[0])[0]);
            const adds = this.getStore('readwrite');
            datas.forEach(data => {
                if (typeof data === 'string') {
                    adds.add(data);
                }
                else {
                    adds.add(data[Object.keys(data)[0]], Object.keys(data)[0]);
                }
            });
            // 随便获取一个值，否则添加了不会有回调
            const request = this.getStore().count();
            request.onsuccess = () => success(datas);
            request.onerror = error;
        }, callback);
    }
    /**
     * 删除数据
     *
     * ```js
     // Promise版本
     qdb.del('aaa').then(function(value) {
            console.log(value);
        })
     // 回调版本
     qdb.del('bbb', function(err,value) {
            console.log(err, value);
        });
     * ```
     *
     * @param {Number|String} key key值
     * @callback callback 回调函数
     * @returns {Promise}
     */
    del(key, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = this.getStore('readwrite').delete(key);
            request.onsuccess = () => success(key);
            request.onerror = error;
        }, callback);
    }
    /**
     * 清除数据
     *
     * ```js
     // Promise版本
     qdb.clear().then(function(value) {
            console.log(value);
        })
     // 回调版本
     qdb.clear(function(err,value) {
            console.log(err, value);
        });
     * ```
     *
     * @callback callback 回调函数
     * @returns {Promise}
     */
    clear(callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = this.getStore('readwrite').clear();
            request.onsuccess = () => success(null);
            request.onerror = error;
        }, callback);
    }
    /**
     * 统计数据
     *
     * ```js
     // Promise版本
     qdb.count().then(function(value) {
            console.log(value);
        })
     // 回调版本
     qdb.count(function(err,value) {
            console.log(err, value);
        });
     * ```
     *
     * @callback callback 回调函数
     * @returns {Promise}
     */
    count(callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = this.getStore().count();
            request.onsuccess = () => success(request.result);
            request.onerror = error;
        }, callback);
    }
    /**
     * 删除数据库
     *
     * ```js
     // Promise版本
     qdb.delDB().then(function(value) {
            console.log(value);
        })
     // 回调版本
     qdb.delDB(function(err,value) {
            console.log(err, value);
        });
     * ```
     *
     * @param {String} [dbName=this.dbName] 数据库名
     * @callback callback 回调函数
     * @returns {Promise}
     */
    delDB(dbName = this.dbName, callback = () => {
    }) {
        return this.getRequest((success, error) => {
            const request = this.db.deleteDatabase(dbName);
            request.onsuccess = () => success(null);
            request.onerror = error;
        }, callback);
    }
    /**
     * 关闭数据库
     * @param {Object} [db=this.db] 数据库实例
     */
    close(db = this.db) {
        db.close();
    }
}
//# sourceMappingURL=QDB.js.map