/**
 * @file            VFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     虚拟文件系统
 * @Date            2023/8/14 14:04
 */
import QDB from "../systemCallInterface/QDB.js";
export default class VFS {
    file;
    constructor() {
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
                    { name: 'version', options: { unique: true } },
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
}
//# sourceMappingURL=VFS.js.map