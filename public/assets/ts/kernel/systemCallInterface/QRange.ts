/**
 * @name            QRange
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     范围类，传入多个值，之后进行判断这些范围是否在里面，进行快速的判断
 * @Date            2023/8/7 9:46
 */

import IQRange from './interface/IQRange.js'

export default class QRange implements IQRange {
  // 存放范围
  arr: any[]

  constructor(...arr) {
    this.init(arr)
  }

  /**
   * 初始化定义
   * @param {any[]} arr 范围
   * @private
   */
  private init(arr): void {
    this.arr = arr
  }

  /**
   * 判断当前里面是否有num的值
   * @param {any} num
   * @returns {boolean}
   */
  is(num: any): boolean {
    return this.arr.indexOf(num) !== -1
  }

  /**
   * 展示所有范围数据
   * @param {string} join 使用什么符号进行分割
   * @returns {boolean}
   */
  show(join: string = ','): string {
    return this.arr.join(join)
  }

  /**
   * 添加范围
   * @param {any} item 值
   */
  add(item: any): void {
    this.arr.push(item)
  }
}
