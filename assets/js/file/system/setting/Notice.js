/**
 * @name          Notice
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   通知管理
 * @Date          2023-08-03 10:44:57
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-03 12:15:35
 */
import QRange from "../../systemCallInterface/QRange.js";
import PopUp from "../../desktop/PopUp.js"

export default class Notice{
    #range;
    #status;
    /**
     * 构造函数
     * @param {Number} range 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     * @returns {QApi}
     */
    constructor(range=3) {
        this.qrange=new QRange(1,2,3);
        if (this.qrange.is(range)){
            this.init(range);
        }else{
            if (qukie.logDissociation > 0) QLog.add('系统通知', '范围错误');
            return QApi([], '范围错误，只支持:'+this.qrange.show(), 503);
        }
    }
    /**
     * 初始化
     * @param {Number} range 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     */
    init(range) {
        if (range === 3 && !window.Notification && Notification.permission === "denied") {
            if (qukie.logDissociation > 0) QLog.add('系统通知', '无法支持本机系统通知');
            return QApi([], '无法支持本机系统通知，可能原因：1. 游览器不支持；2. 游览器禁止了通知权限', 501);
        }
        // 通知是否开启状态
        this.#status = false;
        this.#range = range;
    }
    /**
     * 设置是否开启通知
     * @param {Boolean} tf 是否开启
     * @returns {QApi}
     */
    set(tf) {
        if (typeof tf === "boolean") {
            this.#status = tf;
            if (qukie.logDissociation > 1) QLog.add('系统通知', '系统通知状态调整成功');
            return QApi(this.#status);
        } else {
            if (qukie.logDissociation > 0) QLog.add('系统通知', '系统通知状态调整失败');
            return QApi([], '不是布尔值', 502);
        }
    }
    /**
     * 获取是否开启通知
     * @returns {QApi}
     */
    get() {
        if (qukie.logDissociation > 2) QLog.add('系统通知', '获取系统通知状态成功');
        return QApi(this.#status);
    }

    /**
     * 设置范围
     * @param {Number} num 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     * @returns {QApi}
     */
    setRange(num){
        if (this.qrange.is(num)){
            if (num === 3 && !window.Notification && Notification.permission === "denied") {
                if (qukie.logDissociation > 0) QLog.add('系统通知', '无法支持本机系统通知');
                return QApi([], '无法支持本机系统通知，可能原因：1. 游览器不支持；2. 游览器禁止了通知权限', 501);
            }else{
                this.#range=num;
            }
        }else{
            if (qukie.logDissociation > 0) QLog.add('系统通知', '范围错误');
            return QApi([], '范围错误，只支持:'+this.qrange.show(), 503);
        }
    }

    /**
     * 获取范围
     * @returns {QApi}
     */
    getRange(){
        if (qukie.logDissociation > 2) QLog.add('系统通知', '获取系统通知范围等级成功');
        return QApi(this.#range);
    }
    /**
     * 发送通知
     * @param {*} title 标题
     * @param {{
     *  body?:string,
     *  icon?:string
     * }} options body：主题内容；icon：图标
     */
    seed(title, options) {
        if (this.#status){
            switch (this.#range) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    switch (arguments.length) {
                        case 1:
                            new Notification(title);
                            break;
                        case 2:
                            new Notification(title, options);
                            break;
                        default:
                            if (qukie.logDissociation > 0) QLog.add('系统通知', '发送系统通知失败-参数错误');
                            return QApi([], '参数错误', 501);
                    }
                    break;
                default:
                    if (qukie.logDissociation > 0) QLog.add('系统通知', '发送系统通知失败-参数错误');
                    return QApi([], '参数错误', 501);
            }
            if (qukie.logDissociation > 1) QLog.add('系统通知', '发送系统通知成功');
        }else{
            if (qukie.logDissociation > 0) QLog.add('系统通知', '发送系统通知失败-未开启通知');
            return QApi([], '未开启通知', 501);
        }
    }
}
