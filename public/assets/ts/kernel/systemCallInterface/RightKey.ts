/**
 * @file            RightKey.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     右键管理
 * @Date            2023/8/14 8:30
 *
 * show方法未写
 */

import QClick from './QClick.js'
import { QApi } from './QApi.js'
import { getConfig, QAL } from './_QCommon.js'
import { CodeE } from '../mode/codeE.js'
import { IRightKey } from './interface/IRightKey.js'

let { RightKeyL } = await import(
  '../../language/' +
    getConfig('Language') +
    '/kernel/systemCallInterface/RightKeyL.js'
)

export default class RightKey implements IRightKey {
  protected list: QClick[]

  constructor(list: QClick[] = []) {
    this.init(list)
  }

  private init(list: QClick[]): void {
    this.list = list
  }

  /**
   * 添加右键管理列表
   * @name add
   * @param {QClick} QC 点击类
   * @returns {QApi}
   */
  add(QC: QClick): QApi {
    this.list.push(QC)
    return QAL(
      window.LogIntensityE.SuccessError,
      RightKeyL.type,
      RightKeyL.addSuccess,
      this.list,
    )
  }

  /**
   * 删除右键管理列表-重载
   * @param {string} key 右键列表名称
   * @returns {QApi}
   */
  remove(key: string): QApi
  /**
   * 删除右键管理列表-重载
   * @param {number} key 右键列表下标
   * @returns {QApi}
   */
  remove(key: number): QApi
  /**
   * 删除右键管理列表
   * @name remove
   * @param {string|number} key key值
   * @returns {QApi}
   */
  remove(key: string | number): QApi {
    if (typeof key === 'number') {
      if (this.isList(key)) {
        let l = this.listNotFound()
        return QAL(l[0], l[1], l[2], l[3], l[4])
      }
      this.list.splice(key, 1)
      return QAL(
        window.LogIntensityE.SuccessError,
        RightKeyL.type,
        RightKeyL.removeSuccess,
        this.list,
      )
    } else if (typeof key === 'string') {
      let n: number = this.getListName(key)
      if (n === -1) {
        let l = this.listNotFound()
        return QAL(l[0], l[1], l[2], l[3], l[4])
      } else {
        this.list.splice(n, 1)
        return QAL(
          window.LogIntensityE.SuccessError,
          RightKeyL.type,
          RightKeyL.removeSuccess,
          this.list,
        )
      }
    } else {
      return QAL(
        window.LogIntensityE.Error,
        RightKeyL.type,
        RightKeyL.removeError,
        [],
        RightKeyL.removeErrorMessage,
        CodeE.ParametricError,
      )
    }
  }

  /**
   * 清空右键管理列表
   * @name clear
   * @returns {QApi}
   */
  clear(): QApi {
    this.list = []
    return QAL(
      window.LogIntensityE.SuccessError,
      RightKeyL.type,
      RightKeyL.clearSuccess,
    )
  }

  /**
   * 获取指定右键管理列表-重载
   * @param {number} key 右键列表下标
   * @returns {QApi}
   */
  get(key: number): QApi
  /**
   * 获取指定右键管理列表-重载
   * @param {number} key 右键列表名称
   * @returns {QApi}
   */
  get(key: string): QApi
  /**
   * 获取指定右键管理列表
   * @param {number|string} key
   * @returns {QApi}
   */
  get(key: number | string): QApi {
    if (typeof key === 'number') {
      if (this.isList(key)) {
        let l = this.listNotFound()
        return QAL(l[0], l[1], l[2], l[3], l[4])
      }
      return QAL(
        window.LogIntensityE.Success,
        RightKeyL.type,
        RightKeyL.getSuccess,
        this.list[key],
      )
    } else if (typeof key === 'string') {
      let n: number = this.getListName(key)
      if (n === -1) {
        let l = this.listNotFound()
        return QAL(l[0], l[1], l[2], l[3], l[4])
      } else {
        this.list.splice(n, 1)
        return QAL(
          window.LogIntensityE.Success,
          RightKeyL.type,
          RightKeyL.getSuccess,
          this.list[n],
        )
      }
    } else {
      return QAL(
        window.LogIntensityE.Error,
        RightKeyL.type,
        RightKeyL.getError,
        [],
        RightKeyL.getErrorMessage,
        CodeE.ParametricError,
      )
    }
  }

  /**
   * 获取全部右键管理列表
   * @name getAll
   * @returns {QApi}
   */
  getAll(): QApi {
    return QAL(
      window.LogIntensityE.Success,
      RightKeyL.type,
      RightKeyL.getAllSuccess,
      this.list,
    )
  }

  /**
   * 获取右键管理列表下标
   * @name getListName
   * @param {string} name 点击类名称
   * @private
   * @returns {number} 当没有返回-1，有返回对应下标
   */
  private getListName(name: string): number {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].getName().data == name) {
        return i
      }
    }
    return -1
  }

  /**
   * 判断是否为空
   * @name isList
   * @param {number} key
   * @returns {boolean}
   */
  isList(key: number): boolean {
    return this.list[key] === undefined
  }

  /**
   * 修改指定右键管理列表-重载
   * @param {number} num
   * @param {QClick} QC
   * @returns {QApi}
   */
  update(num: number, QC: QClick): QApi
  /**
   * 修改指定右键管理列表-重载
   * @param {string} num
   * @param {QClick} QC
   * @returns {QApi}
   */
  update(num: string, QC: QClick): QApi
  /**
   * 修改指定右键管理列表
   * @param {number|string} num
   * @param {QClick} QC
   * @returns {QApi}
   */
  update(num: number | string, QC: QClick): QApi {
    if (typeof num === 'number') {
      if (this.isList(num)) {
        let l = this.listNotFound()
        return QAL(l[0], l[1], l[2], l[3], l[4])
      }
      this.list[num] = QC
      return QAL(
        window.LogIntensityE.SuccessError,
        RightKeyL.type,
        RightKeyL.updateSuccess,
        this.list,
      )
    } else if (typeof num === 'string') {
      let n: number = this.getListName(num)
      if (n === -1) {
        let l = this.listNotFound()
        return QAL(l[0], l[1], l[2], l[3], l[4])
      } else {
        this.list[num] = QC
        return QAL(
          window.LogIntensityE.SuccessError,
          RightKeyL.type,
          RightKeyL.updateSuccess,
          this.list,
        )
      }
    } else {
      return QAL(
        window.LogIntensityE.Error,
        RightKeyL.type,
        RightKeyL.updateError,
        [],
        RightKeyL.updateErrorMessage,
        CodeE.ParametricError,
      )
    }
  }

  /**
   * 列表为空
   * @name listNotFound
   * @protected
   * @description ts报错写法：QAL(...this.listNotFound());
   */
  protected listNotFound(): any[] {
    return [
      window.LogIntensityE.Error,
      RightKeyL.type,
      RightKeyL.listNotFound,
      [],
      RightKeyL.listNotFound,
      CodeE.NotFound,
    ]
  }

  /**
   * 展示功能
   */
  show(): void {}
}
