/**
 * @name            ISysVal
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     main接口
 * @Date            2023/8/7 10:43
 */

import {Language} from "../language/language.js";

export interface ISysVal {
    // 系统最多日志数量
    logLength: number;
    // 系统强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
    logDissociation: number;
    // 语言
    language: Language;
}