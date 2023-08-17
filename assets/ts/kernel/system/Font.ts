/**
 * @file            Font.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     字体
 * @Date            2023/8/8 11:36
 */

import {QApi} from "../systemCallInterface/QApi.js";
import {FontConfig} from "../../config/fontConfig.js";
import {QAL} from "../systemCallInterface/_QCommon.js";
import {FontL} from "../../language/zh_CN/kernel/system/FontL.js";

export default class Font {
    private fonts = [];
    private font;

    constructor() {
        this.init();
    }

    private init() {

    }

    // add(font:FontConfig):QApi{
    //
    // }
    // option(font:FontConfig):QApi{
    //
    // }
    show(): QApi {
        return QAL(window.LogIntensityE.All, FontL.type, FontL.showSuccess, this.fonts);
    }
}