import { getConfig, QAL } from './_QCommon.js'
import { trim } from './QCommon.js'
import { CodeE } from '../mode/codeE.js'
let { QClickL } = await import(
  '../../language/' +
    getConfig('Language') +
    '/kernel/systemCallInterface/QClickL.js'
)
export default class QClick {
  name
  callback
  constructor(name, callback) {
    this.init(name, callback)
  }
  init(name, callback) {
    this.setName(name)
    this.setCallback(callback)
  }
  /**
   * 获取名称
   * @returns {QApi}
   */
  getName() {
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
  setName(name) {
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
  setCallback(click) {
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
  click() {
    this.callback()
  }
}
//# sourceMappingURL=QClick.js.map
