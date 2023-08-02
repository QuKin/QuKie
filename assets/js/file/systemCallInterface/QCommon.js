/**
 * @name          QCommon
 * @description   常用的方法封装
 * @version       1.0
 * @author        QuKin
 * @Date          2022-11-16 13:51:58
 * @LastEditors   QuKin
 * @LastEditTime  2022-11-29 18:40:44
 */


import { Api } from './QApi';

/**
 * 获取格式化时间
 * @param {Date} [date=new Date()] 时间
 * @returns {Api}
 */
export const getDateTime = (date = new Date()) => {
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
 * 判断邮箱是否正确
 * @param {String} email 邮件
 * @returns {Api}
 */
export const isEmail = (email) => {
    let reg = /^([\w+\.])+@\w+([.]\w+)+$/
    return Api(reg.test(email))
}

/**
 * 判断手机号是否正确
 * @param {Number} phone 手机号
 * @returns {Api}
 */
export const isPhone = (phone) => {
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return Api(reg.test(phone))
}

/**
 * 随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Api}
 */
export const random = (min, max) => {
    return Api(Math.floor(Math.random() * (max - min + 1)) + min)
}