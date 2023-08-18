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
export var LogIntensityE
;(function (LogIntensityE) {
  LogIntensityE[(LogIntensityE['Not'] = 0)] = 'Not'
  LogIntensityE[(LogIntensityE['Error'] = 1)] = 'Error'
  LogIntensityE[(LogIntensityE['SuccessError'] = 2)] = 'SuccessError'
  LogIntensityE[(LogIntensityE['All'] = 3)] = 'All'
})(LogIntensityE || (LogIntensityE = {}))
//# sourceMappingURL=logIntensityE.js.map
