/**
 * @file            INotice.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Notice接口
 * @Date            2023/8/8 9:48
 */

import {QApi} from "../../systemCallInterface/QApi.js";

export interface INotice{
    set(tf:boolean):QApi;
    get():QApi;
    setRange(num:number):QApi;
    getRange():QApi;
    seed(title:string,options:{typeColor?:any,body?:string,icon?:string},typeColor:any):QApi;
}