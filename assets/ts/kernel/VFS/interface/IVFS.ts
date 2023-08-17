/**
 * @file            IVFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS接口
 * @Date            2023/8/14 14:04
 */
import QDB from "../../systemCallInterface/QDB.js";

export interface IVFS {
    file: QDB;
    path: string;

    /**
     * 判断type是否存在
     * @param {string} type 类型
     * @param {string[]} arr 类型数组
     * @returns {boolean}
     */
    isType(type: string, arr: string[]): boolean

    /**
     * 判断当前是否存在该路径
     * @param {string} path 路径
     */
    isPath(path: string)

    /**
     * 判断当前是否存在该目录/文件
     * @param {string} file 目录或文件名称
     */
    isFile(file: string)
}