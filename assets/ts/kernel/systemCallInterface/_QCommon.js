/**
 * @file            _QCommon
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     私有的公共方法
 * @Date            2023/8/7 11:27
 */
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
export const QAL = (dissociation, QLogType, QLogParticulars, data = [], message = 'success', codes = window.CodeE.Success, tf = false) => {
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
 * @returns {string}
 */
export const getConfig = (key) => {
    return JSON.parse(localStorage.getItem('Config'))[key];
};
//# sourceMappingURL=_QCommon.js.map