/**
 * @file            QCommon
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     常用的方法封装
 * @Date            2023/8/7 7:49
 */

import {QApi, Api} from './QApi.js';

/**
 * 获取格式化时间
 * @name getDateTime
 * @param {Date} [date=new Date()] 时间
 * @returns {QApi}
 */
export const getDateTime = (date: Date = new Date()): QApi => {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
    month = checkTime(month);
    day = checkTime(day);
    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);

    function checkTime(i) {
        if (i < 10) i = "0" + i;
        return i;
    }

    return Api(year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒")
}

/**
 * 获取格式化时间-日期
 * @name getDate
 * @param {Date} [date=new Date()] 时间
 * @returns {QApi}
 */
export const getDate = (date: Date = new Date()): QApi => {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    month = checkTime(month);
    day = checkTime(day);

    function checkTime(i) {
        if (i < 10) i = "0" + i;
        return i;
    }

    return Api(year + "年" + month + "月" + day + "日")
}

/**
 * 获取格式化时间-时间
 * @name getTime
 * @param {Date} [date=new Date()] 时间
 * @returns {QApi}
 */
export const getTime = (date: Date = new Date()): QApi => {
    let hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);

    function checkTime(i) {
        if (i < 10) i = "0" + i;
        return i;
    }

    return Api(hour + "时" + minute + "分" + second + "秒")
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
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (typeof phone === 'number') {
        phone = phone.toString();
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
    return Api(str.replace(/(^\s*)|(\s*$)/g, ""));
}

/**
 * 是否为空
 * @name isNull
 * @param {string} str 字符串
 * @returns {QApi}
 */
export const isNull = (str: string): QApi => {
    return Api(trim(str) === '');
}