/**
 * @file            QCommon
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     常用的方法封装
 * @Date            2023/8/7 7:49
 */

import { Api, QApi } from './QApi.js'
import QTime from './QTime.js'
import { getConfig } from './_QCommon.js'
import { CodeE } from '../mode/codeE.js'

let { publicL } = await import(
  '../../language/' + getConfig('Language') + '/publicL.js'
)
let { QCommonL } = await import(
  '../../language/' +
    getConfig('Language') +
    '/kernel/systemCallInterface/QCommonL.js'
)

/**
 * 获取格式化时间
 * @name getDateTime
 * @param {Date} [date=new Date()] 时间
 * @returns {QApi}
 */
export const getDateTime = (date: Date = new Date()): QApi => {
  return Api(new QTime(date).format())
}

/**
 * 获取格式化时间-日期
 * @name getDate
 * @param {Date} [date=new Date()] 时间
 * @returns {QApi}
 */
export const getDate = (date: Date = new Date()): QApi => {
  return Api(new QTime(date).format('yyyy-MM-dd'))
}

/**
 * 获取格式化时间-时间
 * @name getTime
 * @param {Date} [date=new Date()] 时间
 * @returns {QApi}
 */
export const getTime = (date: Date = new Date()): QApi => {
  return Api(new QTime(date).format('HH:mm:ss'))
}

/**
 * 判断邮箱是否正确
 * @name isEmail
 * @param {string} email 邮件
 * @returns {QApi}
 */
export const isEmail = (email: string): QApi => {
  let reg = /^([\w+\.])+@\w+([.]\w+)+$/
  return Api(reg.test(email))
}

/**
 * 判断手机号是否正确
 * @name isPhone
 * @param {number|string} phone 手机号
 * @returns {QApi}
 */
export const isPhone = (phone: number | string): QApi => {
  let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  if (typeof phone === 'number') {
    phone = phone.toString()
  }
  return Api(reg.test(phone))
}

/**
 * 随机数
 * @name random
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {QApi}
 */
export const random = (min: number, max: number): QApi => {
  return Api(Math.floor(Math.random() * (max - min + 1)) + min)
}

/**
 * 去掉两边空字符串
 * @name trim
 * @param {string} str 字符串
 * @returns {QApi}
 */
export const trim = (str: string): QApi => {
  return Api(str.replace(/(^\s*)|(\s*$)/g, ''))
}

/**
 * 是否为空
 * @name isEmptyValue
 * @param {string} str 字符串
 * @returns {QApi}
 */
export const isEmptyValue = (str: string): QApi => {
  return Api(trim(str).data === '')
}

/**
 * 判断文件名是否正确
 * @name isFileNameCorrect
 * @param {string} str 文件名
 * @returns {QApi}
 */
export const isFileNameCorrect = (str: string): QApi => {
  if (isEmptyValue(str).data) {
    return Api(false, publicL.EmptyValue, CodeE.EmptyValue)
  }
  if (new RegExp('[\\\\/:*?"<>|]').test(str)) {
    return Api(false, QCommonL.isFileNameCorrectError, CodeE.Error)
  }
  return Api(true)
}
