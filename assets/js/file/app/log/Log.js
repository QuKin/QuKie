/**
 * @name          Log
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   app日志
 * @Date          2023-08-02 12:51:11
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-02 16:13:45
*/

import {QSelect, QInsert, QIsSelect} from '../../systemCallInterface/QStorage.js'
import { getDateTime } from '../../systemCallInterface/QCommon.js'

class Log {
    #name;
    constructor(app) {
        this.#init();
        if (typeof app === "undefined") {
            throw new Error('必须传入app对象')
        }
        this.#name = app.name;
    }
    #init() {
        // 操作日志
        this.operatingLog = [];

        if (QIsSelect(this.#name + '-operatingLog')) {
            QInsert(this.#name + '-operatingLog', '[]');
        }else{
            this.operatingLog=JSON.parse(QSelect(this.#name + '-operatingLog').data);
        }
    }
    /**
     * 添加日志
     * @param {String} type 操作类型
     * @param {String} particulars 详情
     */
    add(type, particulars) {
        this.operatingLog.push({
            username: QSelect('username').data,
            typeOfOperation: type,
            particulars: particulars,
            time: getDateTime().data,
            addr: ipJson.addr,
            ip: ipJson.ip
        });
        if (this.operatingLog.length > qukie.appLogLength) {
            this.operatingLog.pop();
        }
        QInsert(this.#name + '-operatingLog', JSON.stringify(this.operatingLog));
    }
    /**
     * 展示所有日志
     * @returns {QApi}
     */
    show() {
        this.operatingLog = JSON.parse(QSelect(this.#name + '-operatingLog').data);
        if (this.operatingLog.length === 0) {
            return QApi([], 'not found', 404);
        }
        return QApi(this.operatingLog);
    }
    /**
     * 清楚所有日志
     * @returns {QApi}
     */
    clear() {
        this.operatingLog = [];
        QInsert(this.#name + '-operatingLog', '[]');
        return QApi(this.operatingLog);
    }
}
export default new Log();