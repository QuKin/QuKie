/**
 * @name            Log
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     日志
 * @Date            2023/8/7 10:55
 */

import {QSelect, QInsert, QIsSelect} from "./QStorage.js";
import {getDateTime} from "./QCommon.js";
import {ILog} from "./interface/ILog.js";
import {QApi, Api} from './QApi.js';
import {getConfig} from "./_QCommon.js";

let {publicL} = await import("../../language/" + getConfig('Language') + "/publicL.js")

export default class Log implements ILog {
    protected operatingLog: any[];

    constructor() {
        this.init();
    }

    protected init() {
        // 操作日志
        this.operatingLog = [];

        if (QIsSelect('operatingLog')) {
            QInsert('operatingLog', '[]');
        } else {
            this.operatingLog = JSON.parse(QSelect('operatingLog').data);
        }
    }

    /**
     * 添加日志
     * @param {string} type 操作类型
     * @param {string} particulars 详情
     */
    add(type: string, particulars: string): void {
        this.operatingLogUnshift(type, particulars);
        if (this.operatingLog.length > window.qukie.logLength) {
            this.operatingLog.pop();
        }
        QInsert('operatingLog', JSON.stringify(this.operatingLog));
    }

    /**
     * 日志添加
     * @name operatingLogUnshift
     * @param {string} type 操作类型
     * @param {string} particulars 详情
     * @protected
     * @returns {boolean}
     */
    protected operatingLogUnshift(type: string, particulars: string): boolean {
        try {
            this.operatingLog.unshift({
                username: QSelect('username').data,
                typeOfOperation: type,
                particulars: particulars,
                time: getDateTime().data,
                addr: window.ipJson.addr,
                ip: window.ipJson.ip
            });
        } catch (e) {
            return false;
        }
        return false;
    }

    /**
     * 展示所有日志
     * @returns {QApi}
     */
    show(): QApi {
        this.operatingLog = JSON.parse(QSelect('operatingLog').data);
        if (this.operatingLog.length === 0) {
            return Api([], publicL.NotFound, window.CodeE.NotFound);
        }
        return Api(this.operatingLog);
    }

    /**
     * 清楚所有日志
     * @returns {QApi}
     */
    clear(): QApi {
        this.operatingLog = [];
        QInsert('operatingLog', '[]');
        return Api(this.operatingLog);
    }
}
// export default new Log();