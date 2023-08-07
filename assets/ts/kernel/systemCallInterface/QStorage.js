/**
 * @file            QStorage
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     存储封装 -> localStorage+sessionStorage
 * @Date            2023/8/7 10:19
 */
import { Api } from './QApi.js';
let publicL = null;
await import("../../language/" + window.qukie.language + "/publicL.js").then(e => {
    publicL = e.publicL;
});
var typeE;
(function (typeE) {
    typeE[typeE["int"] = 0] = "int";
    typeE[typeE["float"] = 1] = "float";
    typeE[typeE["json"] = 2] = "json";
    typeE[typeE["date"] = 3] = "date";
    typeE[typeE["null"] = 4] = "null";
})(typeE || (typeE = {}));
/**
 * 查询指定数据
 * @name QSelect
 * @param {string} key 键名
 * @param {Storage} [Storage=localStorage] 存储类型
 * @param {typeE} [type] 返回的类型（int：数字； float：浮点数； json：json格式； date：时间； null：默认不处理）
 * @returns {QApi}
 */
export const QSelect = (key, Storage = localStorage, type = typeE.null) => {
    if (QIsSelect(key, Storage)) {
        return Api([], publicL.NotFound, window.CodeE.NotFound);
    }
    switch (type) {
        case typeE.int:
            return Api(parseInt(Storage.getItem(key)));
        case typeE.float:
            return Api(parseFloat(Storage.getItem(key)));
        case typeE.json:
            return Api(JSON.parse(Storage.getItem(key)));
        case typeE.date:
            return Api(new Date(Storage.getItem(key)));
        default:
            return Api(Storage.getItem(key));
    }
};
/**
 * 判断当前查询的是否为null，是为true
 * @name QIsSelect
 * @param {string} key 键名
 * @param {Storage} [Storage=localStorage] 存储类型
 * @returns {boolean}
 * @constructor
 */
export const QIsSelect = (key, Storage = localStorage) => {
    return Storage.getItem(key) == null;
};
/**
 * 查询所有数据
 * @name QSelectAll
 * @param {Storage} [Storage=localStorage] 存储类型
 * @returns {QApi}
 */
export const QSelectAll = (Storage = localStorage) => {
    let data = [];
    let len = Storage.length;
    for (let i = 0; i < len; i++) {
        let getKey = Storage.key(i);
        let getVal = Storage.getItem(getKey);
        data.push({ key: getKey, value: getVal });
    }
    return Api(data);
};
/**
 * 插入数据
 * @name QInsert
 * @param {string} key 键名
 * @param {string} value 键值
 * @param {Storage} [Storage=localStorage] 存储类型
 * @returns {QApi}
 */
export const QInsert = (key, value, Storage = localStorage) => {
    Storage.setItem(key, value);
    return Api({ key, value });
};
/**
 * 删除指定数据
 * @name QDel
 * @param {string} key 键名
 * @param {Storage} [Storage=localStorage] 存储类型
 * @returns {QApi}
 */
export const QDel = (key, Storage = localStorage) => {
    let cval = QSelect(key);
    if (cval.code === 200) {
        Storage.removeItem(key);
        return Api(key);
    }
    else {
        return Api([], publicL.NotFound, window.CodeE.NotFound);
    }
};
/**
 * 删除所有数据
 * @name QDelAll
 * @param {Storage} [Storage=localStorage] 存储类型
 * @returns {QApi}
 */
export const QDelAll = (Storage = localStorage) => {
    Storage.clear();
    return Api();
};
//# sourceMappingURL=QStorage.js.map