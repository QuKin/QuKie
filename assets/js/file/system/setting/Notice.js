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
import {QAL} from "../../systemCallInterface/_QCommon.js";

export default class Notice{
    #range;
    #status;
    /**
     * 构造函数
     * @param {Number} range 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     */
    constructor(range=3) {
        this.qrange=new QRange(1,2,3);
        this.#init(range);
    }
    /**
     * 初始化
     * @param {Number} range 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     */
    #init(range) {
        this.setRange(range);
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
            return QAL(1,'系统通知', '系统通知状态调整成功',this.#status)
        } else {
            return QAL(0,'系统通知', '系统通知状态调整失败',[], '不是布尔值', 502)
        }
    }
    /**
     * 获取是否开启通知
     * @returns {QApi}
     */
    get() {
        return QAL(2,'系统通知', '获取系统通知状态成功',this.#status)
    }

    /**
     * 设置范围
     * @param {Number} num 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     * @returns {QApi}
     */
    setRange(num){
        if (this.qrange.is(num)){
            if (num === 3 && !window.Notification && Notification.permission === "denied") {
                return QAL(0,'系统通知', '无法支持本机系统通知',[], '无法支持本机系统通知，可能原因：1. 游览器不支持；2. 游览器禁止了通知权限', 501)
            }else{
                this.#range=num;
            }
        }else{
            return QAL(0,'系统通知', '范围错误',[], '范围错误，只支持:'+this.qrange.show(), 503)
        }
    }

    /**
     * 获取范围
     * @returns {QApi}
     */
    getRange(){
        return QAL(2,'系统通知', '获取系统通知范围等级成功',this.#range)
    }
    /**
     * 发送通知
     * @param {*} title 标题
     * @param {{
     *  body?:string,
     *  icon?:string
     * }} options body：主题内容；icon：图标
     * @returns {QApi}
     */
    seed(title, options) {
        if (this.#status){
            switch (this.#range) {
                case 1:
                    new PopUp(title, options)
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
                            return QAL(0,'系统通知', '发送系统通知失败-参数错误',[], '参数错误', 504)
                    }
                    break;
                default:
                    return QAL(0,'系统通知', '发送系统通知失败-参数错误',[], '参数错误', 504)
            }
            return QAL(1,'系统通知', '发送系统通知成功', [{title, options}])
        }else{
            return QAL(0,'系统通知', '发送系统通知失败-未开启通知',[], '未开启通知', 501)
        }
    }
}
