import {QApi} from "../QApi";

/**
 * @file            IQClick.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     QClick接口
 * @Date            2023/8/14 10:56
 */
export interface IQClick{
    /**
     * 获取名称
     * @returns {QApi}
     */
    getName():QApi
    /**
     * 设置名称
     * @name setName
     * @param {string} name 名称，但不能为空
     * @returns {QApi}
     */
    setName(name:string):QApi
    /**
     * 设置点击事件
     * @param {Function} click 点击事件
     * @returns {QApi}
     */
    setCallback(click:Function):QApi
    /**
     * 点击事件
     */
    click():void
}