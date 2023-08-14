/**
 * @name            IQAjax
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     QAjax接口
 * @Date            2023/8/7 9:51
 */
export default interface IQAjax {
    // 请求方式
    method: string;
    // 地址
    url: string;
    // 请求数据
    data: object | null | string;
    // 成功方法
    success: Function;
    // 失败方法
    error: Function;
    // 是否异步
    async: boolean;
    // XMLHttpRequest
    QAjaxs: any;

    /**
     * 对象转字符串
     * @param {object} data 数据
     * @returns {string}
     */
    params(data): string;
}