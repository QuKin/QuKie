/**
 * @file            logIntensityE
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     日志强度
 * @Date            2023/8/7 13:40
 */

/**
 * 0：不记录
 * 1：只记录失败
 * 2：只记录修改成功和失败
 * 3：记录所有包括获取成功
 */
export enum LogIntensityE{
    Not=0,
    Error=1,
    SuccessError=2,
    All=3
}