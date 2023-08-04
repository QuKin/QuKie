/**
 * @name            _QCommon
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     私有的公共方法
 * @Date            2023/8/4 11:07
 */


/**
 * 封装QLog和QApi
 * @param {Number} dissociation 系统强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
 * @param {String} QLogType 操作类型
 * @param {String} QLogParticulars 详情
 * @param {Array} data 数据
 * @param {String} message 信息
 * @param {Number} code 识别码
 * @param {Boolean} tf 是否控制台报错(只有≥300)
 * @returns {QApi}
 * @constructor
 */
export const QAL = (dissociation, QLogType, QLogParticulars, data = [], message = 'success', code = 200,tf=false) => {
    if (qukie.logDissociation > dissociation) QLog.add(QLogType, QLogParticulars);
    if (tf && code>=300){
        throw new Error(message);
    }
    return QApi(data, message, code);
}