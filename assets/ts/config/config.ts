/**
 * @file            config.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     全局配置
 * @Date            2023/8/8 7:45
 */
import {Language} from "../language/language.js";

export const Config={
    Language:Language.zh_CN
}

if (localStorage.getItem('Config')==null) {
    localStorage.setItem('Config', JSON.stringify(Config))
}