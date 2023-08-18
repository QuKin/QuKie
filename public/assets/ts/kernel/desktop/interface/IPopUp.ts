/**
 * @name            IPopUp
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     PopUp弹窗接口
 * @Date            2023/8/4 13:29
 */

import { QApi } from '../../systemCallInterface/QApi.js'

export default interface IPopUp {
  /**
   * 设置范围类型
   * @param {string} range 范围，t：顶部；l：左边；r：右边：b：底部；tl/lt：左上角；tr/rt：右上角；br/rb：右下角；bl/lb：左下角
   * @returns {QApi}
   */
  setRange: (range: string) => QApi

  /**
   * 获取范围类型
   * @returns {QApi}
   */
  getRange(): QApi

  /**
   * 设置颜色类型
   * @param {String|{
   *     border:String,
   *     background:String,
   *     color:String
   * }|{
   *     allColor:String
   * }} [typeColor=info] 类型，success：成功；error：失败；warning：警告：info：信息；？：自定义颜色
   *
   * ```javascript
   * setTypeColor('success')
   * setTypeColor({
   *     allColor:'red'
   * })
   * setTypeColor({
   *     border:'red',
   *     background:'black',
   *     color:'white'
   * })
   * setTypeColor({
   *     border:'1px solid red',
   *     background:'black',
   *     color:'white'
   * })
   * ```
   *
   * @returns {QApi}
   */
  setTypeColor(typeColor: any): QApi

  /**
   * 获取颜色类型
   * @returns {QApi}
   */
  getTypeColor(): QApi

  /**
   * 设置标题
   * @param {string} title 标题
   * @returns {QApi}
   */
  setTitle(title: string): QApi

  /**
   * 获取标题
   * @returns {QApi}
   */
  getTitle(): QApi

  /**
   * 获取参数
   * @returns {QApi}
   */
  getOptions(): QApi

  /**
   * 设置参数
   * @param {undefined|{
   *     body?:string,
   *     icon?:string
   * }} [options=undefined] 标题
   * @returns {QApi}
   */
  setOptions(options: { body?: string; icon?: string }): QApi

  /**
   * 展示弹窗
   */
  show(): void

  /**
   * 关闭弹窗
   */
  close(): void
}
