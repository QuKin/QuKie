/**
 * @file            INotice.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Notice接口
 * @Date            2023/8/8 9:48
 */

import {QApi} from "../../systemCallInterface/QApi.js";

export interface INotice {
    /**
     * 设置是否开启通知
     * @param {boolean} tf 是否开启
     * @returns {QApi}
     */
    set(tf: boolean): QApi;

    /**
     * 获取是否开启通知
     * @returns {QApi}
     */
    get(): QApi;

    /**
     * 设置范围
     * @param {number} num 范围，1：顶部通知；2：右下角通知；3：本机系统通知
     * @returns {QApi}
     */
    setRange(num: number): QApi;

    /**
     * 获取范围
     * @name getRange
     * @returns {QApi}
     */
    getRange(): QApi;

    /**
     * 发送通知
     * @name seed
     * @param {string} title 标题
     * @param {{
     *  typeColor?:any,
     *  body?:string,
     *  icon?:string
     * }} options body：主题内容；icon：图标
     * @param {any} typeColor? 类型，success：成功；error：失败；warning：警告：info：信息；？：自定义类型
     * @returns {QApi}
     */
    seed(title: string, options: { typeColor?: any, body?: string, icon?: string }, typeColor: any): QApi;
}