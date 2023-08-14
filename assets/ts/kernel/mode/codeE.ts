/**
 * @name            CodeE
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     QApi返回编码语言
 * @Date            2023/8/7 8:21
 */

/**
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
 *      504：参数错误
 */
export enum CodeE {
    Success = 200,

    NotFound = 404,

    Error = 501,
    TypeError = 502,
    RangeError = 503,
    ParametricError = 504,
}