/**
 * @file            IVolume.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Volume接口
 * @Date            2023/8/8 9:27
 */

import {QApi} from "../../systemCallInterface/QApi.js";

export interface IVolume{
    set(val:number):QApi;
    get():QApi;
}