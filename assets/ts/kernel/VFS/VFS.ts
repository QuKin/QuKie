/**
 * @file            VFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     虚拟文件系统
 * @Date            2023/8/14 14:04
 */

import QDB from "../systemCallInterface/QDB.js";
import {IVFS} from "./interface/IVFS.js";
import {ICommand} from "./interface/ICommand.js";
import ATree from "./abstract/ATree.js";

export default class VFS extends ATree implements IVFS, ICommand {
    file: QDB

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.file = new QDB({
            name: 'file',
            version: 1
        }, [
            {
                name: 'app',
                options: {keyPath: 'id', autoIncrement: true},
                indexs: [
                    {name: 'id', options: {unique: true}},
                    {name: 'level', options: {unique: true}},
                    {name: 'pid', options: {unique: true}},
                    {name: 'path', options: {unique: true}},
                    {name: 'name', options: {unique: true}},
                    {name: 'type', options: {unique: true}},
                    {name: 'file', options: {unique: true}},
                    {name: 'size', options: {unique: true}},
                    {name: 'time', options: {unique: true}},
                    {name: 'date', options: {unique: true}},
                    {name: 'version', options: {unique: true}},
                    {name: 'des'},
                ]
            },
            {
                name: 'home',
                options: {keyPath: 'id', autoIncrement: true},
                indexs: [
                    {name: 'id', options: {unique: true}},
                    {name: 'level', options: {unique: true}},
                    {name: 'pid', options: {unique: true}},
                    {name: 'path', options: {unique: true}},
                    {name: 'name', options: {unique: true}},
                    {name: 'type', options: {unique: true}},
                    {name: 'file', options: {unique: true}},
                    {name: 'size', options: {unique: true}},
                    {name: 'time', options: {unique: true}},
                    {name: 'date', options: {unique: true}},
                    {name: 'des'},
                ]
            },
            {
                name: 'cache',
                options: {keyPath: 'id', autoIncrement: true},
                indexs: [
                    {name: 'id', options: {unique: true}},
                    {name: 'level', options: {unique: true}},
                    {name: 'pid', options: {unique: true}},
                    {name: 'path', options: {unique: true}},
                    {name: 'name', options: {unique: true}},
                    {name: 'type', options: {unique: true}},
                    {name: 'file', options: {unique: true}},
                    {name: 'version', options: {unique: true}},
                    {name: 'des'},
                ]
            },
        ])
    }

    /**
     * 展示当前文件的内容
     * @param {string} path 路径
     * @returns {any}
     */
    cat(path: string): any {
    }

    /**
     * 进入或者退出目录
     * @param {string} path 路径
     * @returns {boolean}
     */
    cd(path: string): boolean {
        return false;
    }

    /**
     * 清除命令行
     * @returns {boolean}
     */
    clear(): boolean {
        return false;
    }

    /**
     * 复制目录或文件
     * @param {string} source 源文件
     * @param {string} target 目标文件
     * @returns {boolean}
     */
    cp(source: string, target: string): boolean;
    /**
     * 根据类型，复制目录或文件
     * f:强制覆盖文件或目录<br>
     * r:将目录下所有文件与子目录一并处理<br>
     * l:建立硬连接<br>
     * @param {string} source 源文件
     * @param {string} target 目标文件
     * @param {string} type 类型 f|r|l
     * @returns {boolean}
     */
    cp(source: string, target: string, type: string): boolean;
    cp(source: string, target: string, type?: string): boolean {
        return false;
    }

    /**
     * 查看当前目录以及子目录的大小
     * @returns {object[]}
     */
    du(): object[] {
        return [];
    }

    /**
     * 当前目录包括所有子目录下查找文件
     * @param {string} name 文件名称
     * @returns {object[]}
     */
    find(name: string): object[];
    /**
     * 自定义目录路径包括所有子目录下查找文件
     * @param {string} name 文件名称
     * @param {string} path 目录路径
     * @returns {object[]}
     */
    find(name: string, path: string): object[];
    find(name: string, path?: string): object[] {
        return [];
    }

    /**
     * 是ls('l')的快速方式
     * @returns {object[]}
     */
    ll(): object[] {
        return [];
    }

    /**
     * 输出当前目录的列表
     * @returns {object[]}
     */
    ls(): object[];
    /**
     * 根据类型，输出当前目录的列表<br>
     * a:可看见以"."开头的隐藏文件<br>
     * i:显示文件id<br>
     * l:{文件个数,文件大小,创建日期,文件名}
     * @param {string} type 类型 a|l|i
     * @returns {object[]}
     */
    ls(type: string): object[];
    ls(type?: string): object[] {
        return [];
    }

    /**
     * 创建目录
     * @param {string} name 目录名称
     * @returns {boolean}
     */
    mkdir(name: string): boolean {
        return false;
    }

    /**
     * 剪贴目录或文件
     * @param {string} source 源文件
     * @param {string} target 目标文件
     * @returns {boolean}
     */
    mv(source: string, target: string): boolean;
    /**
     * 根据类型，剪贴目录或文件
     * f:忽略提示<br>
     * r:所有目录下所有文件与子目录删除<br>
     * @param {string} source 源文件
     * @param {string} target 目标文件
     * @param {string} type 类型 f|r
     * @returns {boolean}
     */
    mv(source: string, target: string, type: string): boolean;
    mv(source: string, target: string, type?: string): boolean {
        return false;
    }

    /**
     * 返回当前目录路径
     * @returns {string}
     */
    pwd(): string {
        return "";
    }

    /**
     * 删除文件
     * @param {string} path 路径
     * @returns {boolean}
     */
    rm(path: string): boolean;
    /**
     * 根据类型，删除文件
     * f:忽略提示<br>
     * r:所有目录下所有文件与子目录删除<br>
     * @param {string} path 路径
     * @param {string} type 类型 f|r
     * @returns {boolean}
     */
    rm(path: string, type: string): boolean;
    rm(path: string, type?: string): boolean {
        return false;
    }

    /**
     * 删除空目录
     * @param {string} name 目录名称
     * @returns {boolean}
     */
    rmdir(name: string): boolean {
        return false;
    }

    /**
     * 创建文件
     * @param {string} name 文件名
     */
    touch(name: string): boolean {
        return false;
    }
}