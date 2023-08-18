/**
 * @file            Notice.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     通知管理
 * @Date            2023/8/8 9:50
 */

import QRange from '../systemCallInterface/QRange.js'
import PopUp from '../desktop/PopUp.js'
import { getConfig, QAL } from '../systemCallInterface/_QCommon.js'
import { QApi } from '../systemCallInterface/QApi'
import { INotice } from './interface/INotice.js'
import { isEmptyValue } from '../systemCallInterface/QCommon.js'
import { CodeE } from '../mode/codeE.js'

let { NoticeL } = await import(
  '../../language/' + getConfig('Language') + '/kernel/system/NoticeL.js'
)
let { publicL } = await import(
  '../../language/' + getConfig('Language') + '/publicL.js'
)

export default class Notice implements INotice {
  private range: number
  private status: boolean
  private qrange: QRange

  /**
   * 构造函数
   * @param {number} range 范围，1：顶部通知；2：右下角通知；3：本机系统通知
   */
  constructor(range: number = 3) {
    this.qrange = new QRange(1, 2, 3)
    this.init(range)
  }

  /**
   * 初始化
   * @param {number} range 范围，1：顶部通知；2：右下角通知；3：本机系统通知
   */
  private init(range: number) {
    this.setRange(range)
    // 通知是否开启状态
    this.status = false
    this.range = range
  }

  /**
   * 设置是否开启通知
   * @param {boolean} tf 是否开启
   * @returns {QApi}
   */
  set(tf: boolean): QApi {
    if (typeof tf === 'boolean') {
      this.status = tf
      return QAL(
        window.LogIntensityE.SuccessError,
        NoticeL.type,
        NoticeL.setSuccess,
        this.status,
      )
    } else {
      return QAL(
        window.LogIntensityE.Error,
        NoticeL.type,
        NoticeL.setError,
        [],
        NoticeL.setErrorMessage,
        502,
      )
    }
  }

  /**
   * 获取是否开启通知
   * @returns {QApi}
   */
  get(): QApi {
    return QAL(
      window.LogIntensityE.All,
      NoticeL.type,
      NoticeL.getSuccess,
      this.status,
    )
  }

  /**
   * 设置范围
   * @param {number} num 范围，1：顶部通知；2：右下角通知；3：本机系统通知
   * @returns {QApi}
   */
  setRange(num: number): QApi {
    if (this.qrange.is(num)) {
      if (
        num === 3 &&
        !window.Notification &&
        Notification.permission === 'denied'
      ) {
        return QAL(
          window.LogIntensityE.Error,
          NoticeL.type,
          NoticeL.setRangeError,
          [],
          NoticeL.setRangeErrorMessage,
          501,
        )
      } else {
        this.range = num
        return QAL(
          window.LogIntensityE.SuccessError,
          NoticeL.type,
          NoticeL.setRangeSuccess,
          this.range,
        )
      }
    } else {
      return QAL(
        window.LogIntensityE.Error,
        NoticeL.type,
        publicL.RangeError,
        [],
        NoticeL.setRangeErrorRange + this.qrange.show(),
        503,
      )
    }
  }

  /**
   * 获取范围
   * @name getRange
   * @returns {QApi}
   */
  getRange(): QApi {
    return QAL(
      window.LogIntensityE.All,
      NoticeL.type,
      NoticeL.getRangeSuccess,
      this.range,
    )
  }

  /**
   * 发送通知
   * @name seed
   * @param {string} title 标题
   * @param {{
   *  typeColor?:any,
   *  body?:string,
   *  icon?:string
   * }} options body：主题内容；icon：图标
   * @param {any} typeColor? 类型，success：成功；error：失败；warning：警告：info：信息；？：自定义类型
   * @returns {QApi}
   */
  seed(
    title: string,
    options: { typeColor?: any; body?: string; icon?: string },
    typeColor?: any,
  ): QApi {
    if (isEmptyValue(title).data) {
      return QAL(
        window.LogIntensityE.Error,
        NoticeL.type,
        publicL.EmptyValue,
        title,
        publicL.EmptyValue,
        CodeE.EmptyValue,
      )
    }
    if (this.status) {
      switch (this.range) {
        case 1:
          new PopUp(title, options, 't', typeColor)
          break
        case 2:
          new PopUp(title, options, 'rb', typeColor)
          break
        case 3:
          switch (arguments.length) {
            case 1:
              new Notification(title)
              break
            case 2:
              new Notification(title, options)
              break
            default:
              return QAL(
                window.LogIntensityE.Error,
                NoticeL.type,
                NoticeL.seedError,
                [],
                publicL.ParametricError,
                504,
              )
          }
          break
        default:
          return QAL(
            window.LogIntensityE.Error,
            NoticeL.type,
            NoticeL.seedError,
            [],
            publicL.ParametricError,
            504,
          )
      }
      return QAL(
        window.LogIntensityE.SuccessError,
        NoticeL.type,
        NoticeL.seedSuccess,
        { title, options },
      )
    } else {
      return QAL(
        window.LogIntensityE.Error,
        NoticeL.type,
        NoticeL.seedErrorUnopened,
        [],
        NoticeL.seedErrorUnopenedMessage,
        501,
      )
    }
  }
}
