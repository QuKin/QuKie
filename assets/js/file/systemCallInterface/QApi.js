/**
 * @name          QApi
 * @description   js文件进行传输的API格式
 * @version       1.0
 * @author        QuKie
 * @Date          2022-11-16 10:00:22
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-02 15:43:55
 */

/**
 * Api
 * @param {Array} [data=[]] 数据
 * @param {String} [message=success] 信息
 * @param {Number} [code=200] 识别码
 * @returns {{code: Number, data: Array, message: String}} api
 * 
 * code
 *  2**
 *      200：正常
 *  
 *  4**
 *      404：空
 *  
 *  5**
 *      501：错误
 *      502：类型错误
 *      503：范围错误
 */
export const Api = (data = [], message = 'success', code = 200) => {
    if (code>300){
        throw new Error(message);
    }
    return {
        data, message, code
    }
}