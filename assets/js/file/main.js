/**
 * @name          main
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   主方法
 * @Date          2023-08-02 12:51:11
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-02 15:58:47
 */
import Log from "./system/log/Log.js";
import Setting from "./system/setting/Setting.js";
import md5 from "./systemCallInterface/md5.js";
import { Api } from "./systemCallInterface/QApi.js";
import QFetch from "./systemCallInterface/QFetch.js";

class QuKie {
    constructor() {
        this.init();
    }
    init() {
        this._version = '0.0.1';
        this._debug = true;
        // 系统值
        this.sysVal();
        // 系统方法
        this.sysFun();
        // app值
        this.appVal();
    }
    sysVal() {
        // 系统最多日志数量
        this.logLength = 300;
        // 系统强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
        this.logDissociation = 3;
    }
    sysFun() {
        this.setting = Setting;
        this.md5 = md5;
        this.QFetch = QFetch;
    }
    appVal() {
        // app每个最多日志数量
        this.appLogLength = 50;
        // app强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
        this.appLogDissociation = 1;
    }
}
window.QLog = Log;
window.QApi = Api;
window.qukie = window._ = new QuKie();
console.log(Setting);