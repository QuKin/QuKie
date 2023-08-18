/**
 * @name            ILog
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Log接口
 * @Date            2023/8/7 10:56
 */

import { QApi } from '../QApi.js'

export interface ILog {
  /**
   * 添加日志
   * @param {string} type 操作类型
   * @param {string} particulars 详情
   */
  add(type: string, particulars: string): void

  /**
   * 展示所有日志
   * @returns {QApi}
   */
  show(): QApi

  /**
   * 清楚所有日志
   * @returns {QApi}
   */
  clear(): QApi
}
