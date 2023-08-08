/**
 * @name            QApi
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     js文件进行传输的API格式
 * @Date            2023/8/7 7:46
 */
import { CodeE } from "../mode/codeE.js";
import { getConfig } from "./_QCommon.js";
let QApiL = null;
await import("../../language/" + getConfig('Language') + "/kernel/systemCallInterface/QApiL.js").then(e => {
    QApiL = e.QApiL;
});
/**
 * Api
 * @param {any} [data=[]] 数据
 * @param {string} [message=success] 信息
 * @param {CodeE|number} [code=Code.Success] 识别码
 * @returns {QApi} api
 */
export const Api = (data = [], message = 'success', code = CodeE.Success) => {
    // 判断是否在Code里面
    if (Object.values(CodeE).includes(code)) {
        return {
            data, message, code
        };
    }
    else {
        throw new Error(QApiL.FailedToSetCodeParameter);
    }
};
//# sourceMappingURL=QApi.js.map