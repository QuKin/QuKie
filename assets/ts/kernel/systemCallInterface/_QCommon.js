/**
 * @file            _QCommon
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     私有的公共方法
 * @Date            2023/8/7 11:27
 */
import { typeE } from "../mode/typeE.js";
let publicL = null;
/**
 * 封装QLog和QApi
 * @name QAL
 * @param {number} dissociation 系统强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
 * @param {string} QLogType 操作类型
 * @param {string} QLogParticulars 详情
 * @param {any} data 数据
 * @param {string} message 信息
 * @param {number} codes 识别码
 * @param {boolean} tf 是否控制台报错(只有≥300)
 * @returns {QApi}
 */
export const QAL = (dissociation, QLogType, QLogParticulars, data = [], message = publicL.Success, codes = window.CodeE.Success, tf = false) => {
    if (window.qukie.logDissociation >= dissociation)
        window.QLog.add(QLogType, QLogParticulars);
    if (tf && codes >= 300) {
        throw new Error(message);
    }
    return window.QApi(data, message, codes);
};
/**
 * 获取配置文件
 * @name getConfig
 * @param {string} key 配置名
 * @param {typeE} [type=typeE.json] 返回的类型（int：数字； float：浮点数； json：json格式； date：时间）
 * @returns {any}
 */
export const getConfig = (key, type = typeE.json) => {
    let data = JSON.parse(localStorage.getItem('Config'))[key];
    switch (type) {
        case typeE.int:
            return parseInt(data);
        case typeE.float:
            return parseFloat(data);
        case typeE.date:
            return new Date(data);
        default:
            return data;
    }
};
/**
 * 修改配置文件
 * @name setConfig
 * @param {string} key 键名
 * @param {string} value 值
 * @returns {boolean}
 */
export const setConfig = (key, value) => {
    let data = JSON.parse(localStorage.getItem('Config'));
    try {
        data[key] = value;
        localStorage.setItem('Config', JSON.stringify(data));
    }
    catch (e) {
        return false;
    }
    return true;
};
await import("../../language/" + getConfig('Language') + "/publicL.js").then(e => {
    publicL = e.publicL;
});
//# sourceMappingURL=_QCommon.js.map