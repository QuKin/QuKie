/**
 * @name          QStorage
 * @description   存储封装 -> localStorage+sessionStorage
 * @version       1.0
 * @author        QuKin
 * @Date          2022-11-16 09:13:24
 * @LastEditors   QuKin
 * @LastEditTime  2022-11-29 18:40:56
 */

import { Api } from './QApi';

/**
 * 查询指定数据
 * @param {String} key 键名
 * @param {Object} [Storage=localStorage] 存储类型
 * @param {String} [type] 返回的类型（int：数字； float：浮点数； json：json格式； date：时间； null：默认不处理）
 * @returns {Api}
 */
export const QSelect = (key, Storage = localStorage, type = null) => {
    if (Storage.getItem(key) == null) {
        return Api([], '没有值', 404);
    }
    switch (type) {
        case 'int':
            return Api(parseInt(Storage.getItem(key)));
        case 'float':
            return Api(parseFloat(Storage.getItem(key)));
        case 'json':
            return Api(JSON.parse(Storage.getItem(key)));
        case 'date':
            return Api(new Date(Storage.getItem(key)));
        default:
            return Api(Storage.getItem(key));
    }
}

/**
 * 查询所有数据
 * @param {Object} [Storage=localStorage] 存储类型
 * @returns {Api}
 */
export const QSelectAll = (Storage = localStorage) => {
    let data = [];
    let len = Storage.length;
    for (let i = 0; i < len; i++) {
        let getKey = Storage.key(i);
        let getVal = Storage.getItem(getKey);
        data.push({ key: getKey, value: getVal })
    }
    return Api(data);
}

/**
 * 插入数据
 * @param {String} key 键名
 * @param {String} value 键值
 * @param {Object} [Storage=localStorage] 存储类型
 * @returns {Api}
 */
export const QInsert = (key, value, Storage = localStorage) => {
    Storage.setItem(key, value);
    return Api({ key, value })
}

/**
 * 删除指定数据
 * @param {String} key 键名
 * @param {Object} [Storage=localStorage] 存储类型
 * @returns {Api}
 */
export const QDel = (key, Storage = localStorage) => {
    let cval = QSelect(key)
    if (cval.code === 200) {
        Storage.removeItem(key)
        return Api(key)
    } else {
        return Api([], '没有值', 404);
    }
}

/**
 * 删除所有数据
 * @param {Object} [Storage=localStorage] 存储类型
 * @returns {Api}
 */
export const QDelAll = (Storage = localStorage) => {
    Storage.clear();
    return Api();
}