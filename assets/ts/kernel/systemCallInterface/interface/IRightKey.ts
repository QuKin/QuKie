/**
 * @file            IRightKey.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     RightKey接口
 * @Date            2023/8/14 9:40
 */

import QClick from "../QClick.js";
import {QApi} from "../QApi.js";

export interface IRightKey {
    /**
     * 添加右键管理列表
     * @param {QClick} QC 点击类
     * @returns {QApi}
     */
    add(QC: QClick): QApi

    /**
     * 删除右键管理列表-重载
     * @param {string} key 右键列表名称
     * @returns {QApi}
     */
    remove(key: string): QApi

    /**
     * 删除右键管理列表-重载
     * @param {number} key 右键列表下标
     * @returns {QApi}
     */
    remove(key: number): QApi

    /**
     * 删除右键管理列表
     * @name remove
     * @param {string|number} key key值
     * @returns {QApi}
     */
    remove(key: string | number): QApi

    /**
     * 清空右键管理列表
     * @name clear
     * @returns {QApi}
     */
    clear(): QApi

    /**
     * 获取指定右键管理列表-重载
     * @param {number} key 右键列表下标
     * @returns {QApi}
     */
    get(key: number): QApi

    /**
     * 获取指定右键管理列表-重载
     * @param {number} key 右键列表名称
     * @returns {QApi}
     */
    get(key: string): QApi

    /**
     * 获取指定右键管理列表
     * @param {number|string} key
     * @returns {QApi}
     */
    get(key: number | string): QApi

    /**
     * 获取全部右键管理列表
     * @name getAll
     * @returns {QApi}
     */
    getAll(): QApi

    /**
     * 判断是否为空
     * @name isList
     * @param {number} key
     * @returns {boolean}
     */
    isList(key: number): boolean

    /**
     * 修改指定右键管理列表-重载
     * @param {number} num
     * @param {QClick} QC
     * @returns {QApi}
     */
    update(num: number, QC: QClick): QApi

    /**
     * 修改指定右键管理列表-重载
     * @param {string} num
     * @param {QClick} QC
     * @returns {QApi}
     */
    update(num: string, QC: QClick): QApi

    /**
     * 修改指定右键管理列表
     * @param {number|string} num
     * @param {QClick} QC
     * @returns {QApi}
     */
    update(num: number | string, QC: QClick): QApi

    /**
     * 展示功能
     */
    show(): void
}