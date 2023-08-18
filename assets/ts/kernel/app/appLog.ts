/**
 * @file            appLog.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     App的日志
 * @Date            2023/8/9 11:00
 */
import Log from "../systemCallInterface/Log.js";
import {QInsert, QIsSelect, QSelect} from "../systemCallInterface/QStorage.js";
import {Api, QApi} from "../systemCallInterface/QApi.js";
import {getConfig} from "../systemCallInterface/_QCommon.js";

let {publicL} = await import("../../language/" + getConfig('Language') + "/publicL.js")

export default class AppLog extends Log {
    private readonly appName: string;

    constructor(appName) {
        super();
        this.appName = appName;
        this.init();
    }

    protected init() {
        // 操作日志
        this.operatingLog = [];

        if (QIsSelect(this.appName + '-operatingLog')) {
            QInsert(this.appName + '-operatingLog', '[]');
        } else {
            this.operatingLog = JSON.parse(QSelect(this.appName + '-operatingLog').data);
        }
    }

    /**
     * 添加日志
     * @param {string} type 操作类型
     * @param {string} particulars 详情
     */
    add(type: string, particulars: string): void {
        this.operatingLogUnshift(type, particulars);
        if (this.operatingLog.length > window.qukie.appLogLength) {
            this.operatingLog.pop();
        }
        QInsert(this.appName + '-operatingLog', JSON.stringify(this.operatingLog));
    }

    /**
     * 展示所有日志
     * @returns {QApi}
     */
    show(): QApi {
        this.operatingLog = JSON.parse(QSelect(this.appName + '-operatingLog').data);
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
        QInsert(this.appName + '-operatingLog', '[]');
        return Api(this.operatingLog);
    }
}