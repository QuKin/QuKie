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

export default class VFS implements IVFS{
    DB:QDB
    constructor() {
        this.init();
    }
    private init(){
        // this.DB=new QDB({
        //     dbName: 'QuKin',
        //     dbVersion: 1,
        //     dbStoreName: 'Student'
        // })
    }
}