/**
 * @file            QTime.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     时间处理
 * @Date            2023/8/18 8:20
 */
import { getConfig } from './_QCommon.js'
export default class QTime {
  date
  // 具体时间
  year
  month
  day
  hour
  min
  sec
  // 是否补零
  zeroTF = true
  constructor(date = new Date()) {
    this.init(date)
  }
  /**
   * 初始化
   * @param {date} date 时间
   */
  init(date) {
    this.date = date
    this.year = this.date.getFullYear()
    this.month = this.date.getMonth() + 1
    this.day = this.date.getDate()
    this.hour = this.date.getHours()
    this.min = this.date.getMinutes()
    this.sec = this.date.getSeconds()
  }
  /**
   * 获取年份
   * @returns {number}
   */
  getYear() {
    return this.year
  }
  /**
   * 获取月份
   * @returns {number}
   */
  getMonth() {
    return this.month
  }
  /**
   * 获取日期
   * @returns {number}
   */
  getDay() {
    return this.day
  }
  /**
   * 获取小时
   * @returns {number}
   */
  getHour() {
    return this.hour
  }
  /**
   * 获取分钟
   * @returns {number}
   */
  getMin() {
    return this.min
  }
  /**
   * 获取秒数
   * @returns {number}
   */
  getSec() {
    return this.sec
  }
  /**
   * 补零操作，但如果zeroTF是false就不行，默认是true
   * @param i
   * @returns {number}
   */
  checkTime(i) {
    if (this.zeroTF) {
      if (i < 10) i = '0' + i
    }
    return i
  }
  /**
   * 格式化输出
   * @param {string} format 格式化：yyyy-MM-dd HH:mm:ss
   * @returns {string}
   */
  format(format = getConfig('timeFormat')) {
    // 这里没办法用dateFormat和timeFormat方法进行简化，因为不清楚如何分割
    return format
      .replace(/yyyy/g, this.year.toString())
      .replace(
        /MM/g,
        this.checkTime(this.month).toString() || this.month.toString(),
      )
      .replace(
        /dd/g,
        this.checkTime(this.day).toString() || this.day.toString(),
      )
      .replace(
        /HH/g,
        this.checkTime(this.hour).toString() || this.hour.toString(),
      )
      .replace(
        /mm/g,
        this.checkTime(this.min).toString() || this.min.toString(),
      )
      .replace(
        /ss/g,
        this.checkTime(this.sec).toString() || this.sec.toString(),
      )
  }
  /**
   * 设置补零
   * @name setZero
   * @param {boolean} tf 布尔值是否
   * @returns {void}
   */
  setZero(tf = !this.zeroTF) {
    this.zeroTF = tf
  }
  /**
   * 获取是否补零
   * @name getZero
   * @returns {boolean}
   */
  getZero() {
    return this.zeroTF
  }
}
//# sourceMappingURL=QTime.js.map
