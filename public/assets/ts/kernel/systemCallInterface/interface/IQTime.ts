import { getConfig } from '../_QCommon'

/**
 * @file            IQTime.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     QTime接口
 * @Date            2023/8/18 8:42
 */
export interface IQTime {
  date: Date

  // 具体时间
  year: number
  month: number
  day: number
  hour: number
  min: number
  sec: number

  // 是否补零
  zeroTF: boolean

  /**
   * 初始化
   * @param {date} date 时间
   */
  init(date: Date): void

  /**
   * 获取年份
   * @returns {number}
   */
  getYear(): number

  /**
   * 获取月份
   * @returns {number}
   */
  getMonth(): number

  /**
   * 获取日期
   * @returns {number}
   */
  getDay(): number

  /**
   * 获取小时
   * @returns {number}
   */
  getHour(): number

  /**
   * 获取分钟
   * @returns {number}
   */
  getMin(): number

  /**
   * 获取秒数
   * @returns {number}
   */
  getSec(): number

  /**
   * 补零操作，但如果zeroTF是false就不行，默认是true
   * @param i
   * @returns {number}
   */
  checkTime(i): number

  /**
   * 格式化输出
   * @param {string} format YY-MM-DD hh:mm:ss
   * @returns {string}
   */
  format(format: string): string

  /**
   * 设置补零
   * @name setZero
   * @param {boolean} tf 布尔值是否
   * @returns {void}
   */
  setZero(tf: boolean): void

  /**
   * 获取是否补零
   * @name getZero
   * @returns {boolean}
   */
  getZero(): boolean
}
