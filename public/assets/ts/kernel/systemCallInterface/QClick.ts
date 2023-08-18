/**
 * @file            QClick.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     点击事件
 * @Date            2023/8/14 8:34
 */
import { QApi } from './QApi.js'
import { getConfig, QAL } from './_QCommon.js'
import { trim } from './QCommon.js'
import { CodeE } from '../mode/codeE.js'
import { IQClick } from './interface/IQClick.js'

let { QClickL } = await import(
  '../../language/' +
    getConfig('Language') +
    '/kernel/systemCallInterface/QClickL.js'
)

export default class QClick implements IQClick {
  private name: string
  private callback: Function

  constructor(name: string, callback: Function) {
    this.init(name, callback)
  }

  private init(name: string, callback: Function) {
    this.setName(name)
    this.setCallback(callback)
  }

  /**
   * 获取名称
   * @returns {QApi}
   */
  getName(): QApi {
    return QAL(
      window.LogIntensityE.Success,
      QClickL.type,
      QClickL.getNameSuccess,
      this.name,
    )
  }

  /**
   * 设置名称
   * @name setName
   * @param {string} name 名称，但不能为空
   * @returns {QApi}
   */
  setName(name: string): QApi {
    if (trim(name).data === '') {
      return QAL(
        window.LogIntensityE.Error,
        QClickL.type,
        QClickL.setNameError,
        [],
        QClickL.setNameErrorMessage,
        CodeE.NotFound,
      )
    }
    this.name = name
    return QAL(
      window.LogIntensityE.SuccessError,
      QClickL.type,
      QClickL.setNameSuccess,
      this.name,
    )
  }

  /**
   * 设置点击事件
   * @param {Function} click 点击事件
   * @returns {QApi}
   */
  setCallback(click: Function): QApi {
    if (typeof click === 'function') {
      this.callback = click
      return QAL(
        window.LogIntensityE.SuccessError,
        QClickL.type,
        QClickL.setCallbackSuccess,
        this.callback,
      )
    } else {
      return QAL(
        window.LogIntensityE.Error,
        QClickL.type,
        QClickL.setCallbackError,
        [],
        QClickL.setCallbackErrorMessage,
        CodeE.ParametricError,
      )
    }
  }

  /**
   * 点击事件
   */
  click(): void {
    this.callback()
  }
}
