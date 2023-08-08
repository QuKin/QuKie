/**
 * @file            NoticeL.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Notice语言
 * @Date            2023/8/8 10:10
 */
export enum NoticeL{
    type='系统通知',
    setSuccess='系统通知状态调整成功',
    setError='系统通知状态调整失败',
    setErrorMessage='不是布尔值',
    getSuccess='获取系统通知状态成功',
    setRangeSuccess='获取系统通知设置范围成功',
    setRangeError='无法支持本机系统通知',
    setRangeErrorMessage='无法支持本机系统通知，可能原因：1. 游览器不支持；2. 游览器禁止了通知权限',
    setRangeErrorRange='范围错误，只支持:',
    getRangeSuccess='获取系统通知范围等级成功',
    seedSuccess='发送系统通知成功',
    seedError='发送系统通知失败-参数错误',
    seedErrorUnopened='发送系统通知失败-未开启通知',
    seedErrorUnopenedMessage='未开启通知',
}