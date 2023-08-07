/**
 * @name            ILog
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Log接口
 * @Date            2023/8/7 10:56
 */

import {QApi} from "../QApi.js";

export interface ILog{
    operatingLog:any[];
    add(type:string, particulars:string):void;
    show():QApi;
    clear():QApi;
}