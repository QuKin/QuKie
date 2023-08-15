/**
 * @file            VFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     虚拟文件系统
 * @Date            2023/8/14 14:04
 */
import QDB from "../systemCallInterface/QDB.js";
import ATree from "./abstract/ATree.js";
export default class VFS extends ATree {
    file;
    constructor() {
        super();
        this.init();
    }
    init() {
        this.file = new QDB({
            name: 'file',
            version: 1
        }, [
            {
                name: 'app',
                options: { keyPath: 'id', autoIncrement: true },
                indexs: [
                    { name: 'id', options: { unique: true } },
                    { name: 'level', options: { unique: true } },
                    { name: 'pid', options: { unique: true } },
                    { name: 'path', options: { unique: true } },
                    { name: 'name', options: { unique: true } },
                    { name: 'type', options: { unique: true } },
                    { name: 'file', options: { unique: true } },
                    { name: 'size', options: { unique: true } },
                    { name: 'time', options: { unique: true } },
                    { name: 'date', options: { unique: true } },
                    { name: 'version', options: { unique: true } },
                    { name: 'des' },
                ]
            },
            {
                name: 'home',
                options: { keyPath: 'id', autoIncrement: true },
                indexs: [
                    { name: 'id', options: { unique: true } },
                    { name: 'level', options: { unique: true } },
                    { name: 'pid', options: { unique: true } },
                    { name: 'path', options: { unique: true } },
                    { name: 'name', options: { unique: true } },
                    { name: 'type', options: { unique: true } },
                    { name: 'file', options: { unique: true } },
                    { name: 'size', options: { unique: true } },
                    { name: 'time', options: { unique: true } },
                    { name: 'date', options: { unique: true } },
                    { name: 'des' },
                ]
            },
            {
                name: 'cache',
                options: { keyPath: 'id', autoIncrement: true },
                indexs: [
                    { name: 'id', options: { unique: true } },
                    { name: 'level', options: { unique: true } },
                    { name: 'pid', options: { unique: true } },
                    { name: 'path', options: { unique: true } },
                    { name: 'name', options: { unique: true } },
                    { name: 'type', options: { unique: true } },
                    { name: 'file', options: { unique: true } },
                    { name: 'version', options: { unique: true } },
                    { name: 'des' },
                ]
            },
        ]);
    }
    /**
     * 展示当前文件的内容
     * @param {string} path 路径
     * @returns {any}
     */
    cat(path) {
    }
    /**
     * 进入或者退出目录
     * @param {string} path 路径
     * @returns {boolean}
     */
    cd(path) {
        return false;
    }
    /**
     * 清除命令行
     * @returns {boolean}
     */
    clear() {
        return false;
    }
    cp(source, target, type) {
        return false;
    }
    /**
     * 查看当前目录以及子目录的大小
     * @returns {object[]}
     */
    du() {
        return [];
    }
    find(name, path) {
        return [];
    }
    /**
     * 是ls('l')的快速方式
     * @returns {object[]}
     */
    ll() {
        return [];
    }
    ls(type) {
        return [];
    }
    /**
     * 创建目录
     * @param {string} name 目录名称
     * @returns {boolean}
     */
    mkdir(name) {
        return false;
    }
    mv(source, target, type) {
        return false;
    }
    /**
     * 返回当前目录路径
     * @returns {string}
     */
    pwd() {
        return "";
    }
    rm(path, type) {
        return false;
    }
    /**
     * 删除空目录
     * @param {string} name 目录名称
     * @returns {boolean}
     */
    rmdir(name) {
        return false;
    }
    /**
     * 创建文件
     * @param {string} name 文件名
     */
    touch(name) {
        return false;
    }
}
//# sourceMappingURL=VFS.js.map