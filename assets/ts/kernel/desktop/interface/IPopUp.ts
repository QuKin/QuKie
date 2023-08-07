/**
 * @name            IPopUp
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     PopUp弹窗接口
 * @Date            2023/8/4 13:29
 */

import {QApi} from "../../systemCallInterface/QApi.js";

export default interface IPopUp{
    setRange:(range:string)=>QApi;
    getRange():QApi;
    setTypeColor(typeColor:any):QApi;
    getTypeColor():QApi;
    setTitle(title:string):QApi;
    getTitle():QApi;
    getOptions(): QApi;
    setOptions(options:{body?:string,icon?:string}): QApi;
}