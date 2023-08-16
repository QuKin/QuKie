/**
 * @file            IVFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS接口
 * @Date            2023/8/14 14:04
 */
import QDB from "../../systemCallInterface/QDB.js";

export interface IVFS{
    file: QDB;
    path: string;

    /**
     * 判断type是否存在
     * @param {string} type 类型
     * @param {string[]} arr 类型数组
     * @returns {boolean}
     */
    isType(type: string, arr: string[]): boolean
}