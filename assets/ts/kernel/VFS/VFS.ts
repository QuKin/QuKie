/**
 * @file            VFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     虚拟文件系统
 * @Date            2023/8/14 14:04
 *
 * Promise返回QAL没写
 * cd没写回退
 */

import QDB from "../systemCallInterface/QDB.js";
import {IVFS} from "./interface/IVFS.js";
import {ICommand} from "./interface/ICommand.js";
import {IFileFormat} from "./interface/IFileFormat.js";
import ATree from "./abstract/ATree.js";
import {getDate, getTime} from "../systemCallInterface/QCommon.js";
import {QApi} from "../systemCallInterface/QApi.js";
import {getConfig, QAL} from "../systemCallInterface/_QCommon.js";
import {CodeE} from "../mode/codeE.js";

let VFSL = null;
await import("../../language/" + getConfig('Language') + "/kernel/VFS/VFSL.js").then(e => {
    VFSL = e.VFSL;
})

export default class VFS extends ATree implements IVFS, ICommand {
    file: QDB;
    path: string = '/';
    // fileData: any[];

    constructor() {
        super();
        // this.init();
    }

    /**
     * 初始化
     * @param {string} [storeName=home] 仓库名
     */
    init(storeName:string='home') {
        return new Promise((resolve, reject) => {
            this.file = new QDB({
                name: 'file',
                version: 1
            }, [
                {
                    name: 'app',
                    options: {keyPath: 'id', autoIncrement: true},
                    indexs: [
                        {name: 'id', options: {unique: true}},
                        {name: 'pid'},
                        {name: 'path'},
                        {name: 'name'},
                        {name: 'type'},
                        {name: 'file'},
                        {name: 'size'},
                        {name: 'time'},
                        {name: 'date'},
                        {name: 'version'},
                        {name: 'des'},
                    ]
                },
                {
                    name: 'home',
                    options: {keyPath: 'id', autoIncrement: true},
                    indexs: [
                        {name: 'id', options: {unique: true}},
                        {name: 'pid'},
                        {name: 'path'},
                        {name: 'name'},
                        {name: 'type'},
                        {name: 'file'},
                        {name: 'size'},
                        {name: 'time'},
                        {name: 'date'},
                        {name: 'des'},
                    ]
                },
                {
                    name: 'cache',
                    options: {keyPath: 'id', autoIncrement: true},
                    indexs: [
                        {name: 'id', options: {unique: true}},
                        {name: 'pid'},
                        {name: 'path'},
                        {name: 'name'},
                        {name: 'type'},
                        {name: 'file'},
                        {name: 'version'},
                        {name: 'des'},
                    ]
                },
            ])
            this.file.open().then(() => {
                this.file.setStoreName(storeName);
                // this.test();
                resolve(true);
            }).catch(()=>{
                reject(false);
            })
        })
    }

    /**
     * 测试文件
     * @name test
     * @private
     */
    private test() {
        this.file.add({
            id: 1,
            pid: 0,
            path: '/',
            name: 'test1.txt',
            type: 'f',
            file: '内容测试1',
            size: 5,
            time: getTime().data,
            date: getDate().data
        }).then(r => {
            console.log(r);
        })
        this.file.add({
            id: 2,
            pid: 0,
            path: '/',
            name: 'test2.txt',
            type: 'f',
            file: '内容测试2',
            size: 5,
            time: getTime().data,
            date: getDate().data
        }).then(r => {
            console.log(r);
        })
        this.file.add({
            id: 3,
            pid: 0,
            path: '/',
            name: '.test3.txt',
            type: 'f',
            file: '内容测试3',
            size: 5,
            time: getTime().data,
            date: getDate().data
        }).then(r => {
            console.log(r);
        })
        this.file.add({
            id: 4,
            pid: 0,
            path: '/',
            name: 'test4',
            type: 'd',
            file: '',
            size: 0,
            time: getTime().data,
            date: getDate().data
        }).then(r => {
            console.log(r);
        })
        this.file.add({
            id: 5,
            pid: 4,
            path: '/test4/',
            name: 'test5.txt',
            type: 'f',
            file: '内容测试5',
            size: 5,
            time: getTime().data,
            date: getDate().data
        }).then(r => {
            console.log(r);
        })
    }

    /**
     * 判断当前是否存在该目录/文件/路径
     * @param {string} val 目录或文件名称或路径
     */
    is(val: string){
        return new Promise((resolve, reject) => {
            if (val.indexOf('/')===-1){
                // 目录或文件名称
                this.ls('li').then(e=>{
                    let len:number=e.length;
                    for (let i = 0; i < len; i++) {
                        if (e[i].name===val){
                            resolve(e[i]);
                        }
                    }
                    reject(false);
                })
            }else{
                // 路径

                // 判断字符串最后一个字符是否存在
                if (!val.endsWith('/')) val+='/';
                this.file.getIndex('path', val).then((e: QApi) => {
                    if (e.data.length===0){
                        reject(false);
                    }else{
                        this.file.getKey(e.data.pid).then(e=>{
                            resolve(e);
                        })
                    }
                }).catch(e=>{
                    reject(e);
                })
            }
        })
    }

    /**
     * 判断type是否存在
     * @param {string} type 类型
     * @param {string[]} arr 类型数组
     * @returns {boolean}
     */
    isType(type: string, arr: string[]): boolean {
        let typeArr: string[] = type.split('');
        let typeArrLen = typeArr.length;
        let arrJoin = arr.join('');
        for (let i = 0; i < typeArrLen; i++) {
            if (arrJoin.indexOf(typeArr[i]) === -1) {
                return false;
            }
        }
        return true;
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
     */
    cd(path: string) {
        return new Promise((resolve, reject) => {
            if (path === '/') {
                this.path = '/';
                return true;
            }
            this.is(path).then((e:QApi)=>{
                if (e.data.type==='d'){
                    // 判断路径最后一个字符是否是/
                    if (!path.endsWith('/')) path+='/';
                    this.path=path;
                    resolve(e);
                }else{
                    reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.cdError, path, VFSL.cdError, CodeE.Error))
                }
            }).catch((e)=>{
                reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.cdIsError, e, VFSL.cdIsError, CodeE.NotFound))
            })
        })
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
    du() {
        return [];
    }

    /**
     * 当前目录包括所有子目录下查找文件
     * @param {string} name 文件名称
     * @returns {object[]}
     */
    find(name: string);
    /**
     * 自定义目录路径包括所有子目录下查找文件
     * @param {string} name 文件名称
     * @param {string} path 目录路径
     * @returns {object[]}
     */
    find(name: string, path: string);
    find(name: string, path?: string) {
        return [];
    }

    /**
     * 是ls('l')的快速方式
     * @returns {object[]}
     */
    ll() {
        return new Promise((resolve, reject) => {
            this.ls('l').then(e => {
                resolve(e);
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * 输出当前目录的列表
     * @returns {object[]}
     */
    ls();
    /**
     * 根据类型，输出当前目录的列表<br>
     * a:可看见以"."开头的隐藏文件<br>
     * i:显示文件id<br>
     * l:{文件个数,文件大小,创建日期,文件名}
     * @param {string} type 类型 a|l|i
     * @returns {object[]}
     */
    ls(type: string);
    ls(type?: string) {
        return new Promise((resolve, reject) => {
            if (arguments.length !== 0 && !this.isType(type, ['a', 'l', 'i'])) {
                reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.lsTypeError, type, VFSL.lsTypeError, CodeE.TypeError))
            }
            this.file.search('path', this.path).then((e: QApi) => {
                let data: IFileFormat[] = [];
                for (const item of e.data) {
                    let temp: IFileFormat = {};

                    if (arguments.length !== 0) {
                        if (type.indexOf('a') === -1 && item.name.indexOf('.') === 0) continue;
                        if (type.indexOf('i') !== -1) temp.id = item.id;
                        if (type.indexOf('l') !== -1) {
                            // 判断是否是目录
                            if (item.type === 'd') {
                                this.file.search('pid', item.id).then((e: QApi) => {
                                    temp.quantities = e.data.length;
                                })
                            } else {
                                temp.quantities = 0;
                            }
                            temp.type = item.type;
                            temp.size = item.size;
                            temp.date = item.date;
                            temp.time = item.time;
                        }
                    } else {
                        // 文件名开头为"."是隐藏文件，如要展示：ls('a')
                        if (item.name.indexOf('.') === 0) continue;
                    }

                    temp.name = item.name;
                    data.push(temp)
                }
                resolve(data);
            }).catch((e: QApi) => {
                reject(e);
            })
        })
    }

    /**
     * 创建目录
     * @param {string} name 目录名称
     */
    mkdir(name: string) {
        return new Promise((resolve, reject) => {
            const add=()=>{
                this.file.getIndex('path',this.path).then((e:QApi)=>{
                    let pid:number=0;
                    if (this.path!=='/') pid = e.data.id;
                    this.file.add({
                        pid: pid,
                        path: this.path,
                        name: name,
                        type: 'd',
                        file: '',
                        size: 0,
                        time: getTime().data,
                        date: getDate().data
                    }).then(e=>{
                        resolve(QAL(window.LogIntensityE.SuccessError, VFSL.type, VFSL.mkdirSuccess, e))
                    }).catch(e=>{
                        reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.mkdir2Error, e, VFSL.mkdir2Error, CodeE.Error))
                    })
                }).catch(e=>{
                    reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.mkdir2Error, e, VFSL.mkdir2Error, CodeE.Error))
                })
            }
            this.is(name).then((e:IFileFormat)=>{
                if (e.type==='f'){
                    add();
                }else{
                    reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.mkdirError, e, VFSL.mkdirError, CodeE.Error))
                }
            }).catch(()=>{
                // 没有该目录就创建
                add();
            })
        })
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
        return this.path;
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
     */
    rmdir(name: string) {
        return new Promise((resolve, reject) => {
            this.is(name).then((e:IFileFormat)=>{
                if (e.type==='d'){
                    console.log(e);
                    console.log(
                        e.id,
                        e.quantities,
                        e.date,
                        e.name,
                        e.size,
                        e.time,
                        e.type
                    );
                    if (e.quantities===0){
                        this.file.delete(e.id).then(e=>{
                            resolve(QAL(window.LogIntensityE.SuccessError, VFSL.type, VFSL.rmdirSuccess, e))
                        }).catch(e=>{
                            reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.rmdirError, e, VFSL.rmdirError, CodeE.Error))
                        })
                    }else{
                        reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.rmdirQuantitiesError, e, VFSL.rmdirQuantitiesError, CodeE.Error))
                    }
                }else{
                    reject(QAL(window.LogIntensityE.Error, VFSL.type, VFSL.rmdirNotError, e, VFSL.rmdirNotError, CodeE.Error))
                }
            }).catch(()=>{

            })
        })
    }

    /**
     * 创建文件
     * @param {string} name 文件名
     * @returns {boolean}
     */
    touch(name: string): boolean {
        return false;
    }
}