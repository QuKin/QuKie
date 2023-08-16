/**
 * @file            IATree.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     ATree接口
 * @Date            2023/8/15 14:25
 */

export interface IATree {
    /**
     * 扁平化转换成树形结构
     * @param {any[]} list 列表
     */
    toTree(list: any[])

    /**
     * 当前节点查找单个
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     */
    search(data: any[], val: string | number, key: string)

    /**
     * 获取当前节点及以下的所有节点的某个键名
     * 一般是size大小
     * @param {any[]} data 数据
     * @param {string} key 键名
     */
    getChildren(data: any[], key: string)

    /**
     * 判断是否存在
     * @param {any[]} data 数据
     * @param {any[]} val 键值
     * @param {string} [key=id] 键名
     */
    isTree(data: any[], val: any[], key: string): boolean

    /**
     * 树形结构转换扁平化
     * @param {any[]} data
     */
    toFlat(data: any[])

    /**
     * 查找当前节点的父节点
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     */
    getParent(data: any[], val: string | number, key: string)

    /**
     * 查找当前节点的所有父节点
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     */
    getAllParent(data: any[], val: string | number, key: string)

    /**
     * 深度层级
     * @param {any[]} data 数据
     * @returns {number}
     */
    getDeepRank(data: any[]): number

    /**
     * 当前节点查找多个
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     * @param {any[]} [arr=[]] 不填，递归使用
     */
    searchAll(data: any[], val: string | number, key: string, arr: any[])
}