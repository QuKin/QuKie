/// <reference path="../../global.d.ts" />
/**
 * @name            Log
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     日志
 * @Date            2023/8/7 10:55
 */

import {QSelect, QInsert,QIsSelect} from "./QStorage.js";
import {getDateTime} from "./QCommon.js";
import {ILog} from "./interface/ILog.js";
import { QApi,Api } from './QApi.js';
import {CodeE} from "../mode/codeE";
let publicL=null;
await import("../../language/"+window.qukie.language+"/publicL.js").then(e=>{
    publicL=e.publicL;
})

class Log implements ILog{
    constructor() {
        this.init();
    }
    private init(){
        // 操作日志
        this.operatingLog = [];

        if (QIsSelect('operatingLog')) {
            QInsert('operatingLog', '[]');
        }else{
            this.operatingLog=JSON.parse(QSelect('operatingLog').data);
        }
    }
    /**
     * 添加日志
     * @param {string} type 操作类型
     * @param {string} particulars 详情
     */
    add(type:string, particulars:string):void {
        this.operatingLog.unshift({
            username: QSelect('username').data,
            typeOfOperation: type,
            particulars: particulars,
            time: getDateTime().data,
            addr: window.ipJson.addr,
            ip: window.ipJson.ip
        });
        if (this.operatingLog.length > window.qukie.logLength) {
            this.operatingLog.pop();
        }
        QInsert('operatingLog', JSON.stringify(this.operatingLog));
    }
    /**
     * 展示所有日志
     * @returns {QApi}
     */
    show():QApi {
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
    clear():QApi {
        this.operatingLog = [];
        QInsert('operatingLog', '[]');
        return Api(this.operatingLog);
    }

    operatingLog: any[];
}
export default new Log();