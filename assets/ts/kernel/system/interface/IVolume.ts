/**
 * @file            IVolume.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Volume接口
 * @Date            2023/8/8 9:27
 */

import {QApi} from "../../systemCallInterface/QApi.js";

export interface IVolume {
    /**
     * 设置音量
     * @param {Number} val 音量大小（0-1）
     * @returns {QApi}
     */
    set(val: number): QApi;

    /**
     * 获取音量
     * @returns {QApi}
     */
    get(): QApi;
}