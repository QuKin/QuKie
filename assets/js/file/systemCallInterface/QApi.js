/**
 * @name          QApi
 * @description   js文件进行传输的API格式
 * @version       1.0
 * @author        QuKin
 * @Date          2022-11-16 10:00:22
 * @LastEditors   QuKin
 * @LastEditTime  2022-11-19 14:51:33
 */

/**
 * Api
 * @param {Array} [data=[]] 数据
 * @param {String} [message] 信息
 * @param {Number} [code] 识别码
 * @returns {JSON} api
 * 
 * code
 *  2**
 *      200：正常
 *  
 *  4**
 *      404：空
 */

export const Api = (data = [], message = 'success', code = 200) => {
    return {
        data, message, code
    }
}