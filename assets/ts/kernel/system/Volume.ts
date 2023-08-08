/**
 * @file            Volume.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     音量管理
 * @Date            2023/8/8 9:14
 */

import {getConfig, QAL} from "../systemCallInterface/_QCommon.js";
import {QApi} from "../systemCallInterface/QApi.js";
import {IVolume} from "./interface/IVolume.js";

let VolumeL=null;
await import("../../language/"+getConfig('Language')+"/kernel/system/VolumeL.js").then(e=>{
    VolumeL=e.VolumeL;
})

export default class Volume implements IVolume{
    private volume:number;
    constructor() {
        this.init();
    }
    /**
     * 初始化
     */
    private init() {
        this.volume = 0.5;
    }
    /**
     * 设置音量
     * @param {Number} val 音量大小（0-1）
     * @returns {QApi}
     */
    set(val:number):QApi {
        if (val < 0 || val > 1) {
            return QAL(window.LogIntensityE.Error,VolumeL.type, VolumeL.setError,[],VolumeL.setError, window.CodeE.Error)
        } else {
            this.volume = val;
            return QAL(window.LogIntensityE.SuccessError,VolumeL.type, VolumeL.setSuccess,this.volume)
        }
    }
    /**
     * 获取音量
     * @returns {QApi}
     */
    get():QApi {
        return QAL(window.LogIntensityE.All,VolumeL.type, VolumeL.getSuccess,this.volume)
    }
}
