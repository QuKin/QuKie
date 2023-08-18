/**
 * @name            IQRange
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     QRange接口
 * @Date            2023/8/7 9:48
 */
export default interface IQRange {
  // 存放范围
  arr: any[]

  /**
   * 判断当前里面是否有num的值
   * @param {any} num
   * @returns {boolean}
   */
  is(num: any): boolean

  /**
   * 展示所有范围数据
   * @param {string} join 使用什么符号进行分割
   * @returns {boolean}
   */
  show(join: string): string

  /**
   * 添加范围
   * @param {any} item 值
   */
  add(item: any): void
}
