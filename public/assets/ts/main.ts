/**
 * @name            main
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     主方法
 * @Date            2023/8/4 15:51
 */

import { ISysVal } from './mainInterface/ISysVal.js'
import { IAppVal } from './mainInterface/IAppVal.js'
import { ISysFun } from './mainInterface/ISysFun.js'
import devTest from './devTest.js'
import { CodeE } from './kernel/mode/codeE.js'
import Log from './kernel/systemCallInterface/Log.js'
import { Api } from './kernel/systemCallInterface/QApi.js'
import { LogIntensityE } from './kernel/mode/logIntensityE.js'
import { Language } from './language/language.js'
import { typeE } from './kernel/mode/typeE.js'
import md5 from './kernel/systemCallInterface/Md5.js'
import { getConfig } from './kernel/systemCallInterface/_QCommon.js'

class QuKie implements ISysVal, IAppVal, ISysFun {
  _version: string
  _debug: boolean

  constructor() {
    this.init()
  }

  init() {
    this._version = '0.0.1'
    this._debug = true
    // 系统值
    this.sysVal()
    // 系统方法
    this.sysFun()
    // app值
    this.appVal()
  }

  sysVal() {
    // 系统最多日志数量
    this.logLength = getConfig('logLength', typeE.int)
    // 系统强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
    this.logDissociation = getConfig('logDissociation', typeE.int)
    // 语言
    this.language = getConfig('Language')
  }

  sysFun() {
    this.md5 = md5
  }

  appVal() {
    // app每个最多日志数量
    this.appLogLength = getConfig('appLogLength', typeE.int)
    // app强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
    this.appLogDissociation = getConfig('appLogDissociation', typeE.int)
  }

  logDissociation: number
  logLength: number
  appLogDissociation: number
  appLogLength: number
  language: Language
  md5: any
}

window.devTest = new devTest() // 测试开发环境配置
window.QLog = new Log()
window.QApi = Api
window.CodeE = CodeE
window.typeE = typeE
window.LogIntensityE = LogIntensityE
window.qukie = window._ = new QuKie()
