/**
 * @file            IQDB.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     QDB接口
 * @Date            2023/8/14 15:36
 */

import {QApi} from "../QApi.js";

export interface IQDB {
    /**
     * 选择仓库
     * @param{string} storeName 仓库名称
     * @returns {QApi}
     */
    setStoreName(storeName: string): QApi;

    /**
     * 获取仓库名称
     * @returns {string}
     */
    getStoreName(): string;

    /**
     * 插入数据
     * @param {object} data 数据
     * @returns {Promise}
     */
    add(data: object)

    /**
     * 通过主键读取数据
     * @param {number|string} key 主键值
     * @returns {Promise}
     */
    getKey(key: number | string)

    /**
     * 通过游标获取全部数据
     * @returns {Promise}
     */
    getAll()

    /**
     * 通过索引查询单个数据
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @returns {Promise}
     */
    getIndex(indexName: string, indexValue: string)

    /**
     * 通过索引和游标查询
     * 输出可多个值
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @returns {Promise}
     */
    search(indexName: string, indexValue: string)

    /**
     * 通过索引和游标分页查询
     * 输出可多个值
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @param {number} page 页码
     * @param {number} pageSize 查询条数
     * @returns {Promise}
     */
    page(indexName: string, indexValue: string, page: number, pageSize: number)

    /**
     * 更新数据
     * 记得主键要一样，否则会创建
     * @param {object} data 数据
     * @returns {Promise}
     */
    update(data: object);

    /**
     * 通过主键删除数据
     * @param {number|string} id 主键值
     * @returns {Promise}
     */
    delete(id: number | string);

    /**
     * 通过索引和游标删除指定多个数据
     * @param {string} indexName 索引名称
     * @param {string} indexValue 索引值
     * @returns {Promise}
     */
    deletes(indexName: string, indexValue: string)

    /**
     * 关闭数据库
     * @returns {Promise}
     */
    close()

    /**
     * 删除数据库
     * @returns {Promise}
     */
    deleteDB()
}

export interface IParam {
    name: string,
    version: number
}

export interface IIndex {
    // 索引名
    name: string,
    // 配置对象（可选）
    options?: {
        // 如果设为true，将不允许重复的值
        unique?: boolean,
        // 如果设为true，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目
        multiEntry?: boolean
    }
}

export interface IStores {
    // 存储库名
    name: string,
    // 索引
    indexs: IIndex[],
    // 配置对象（可选）
    options?: {
        // 主键
        keyPath: string,
        // 是否自增
        autoIncrement?: boolean
    },
}