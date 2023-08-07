/**
 * @name            QAjax
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Ajax自定义封装
 * @Date            2023/8/4 15:52
 */

import IQAjax from "./interface/IQAjax.js";

export default class QAjax implements IQAjax{
    method: string;
    url: string;
    data: object | null | string;
    success: Function;
    error: Function;
    async: boolean;
    QAjaxs: any;

    /**
     * 构造函数
     * @param {Function} [success=null] success
     * @param {string} [method='GET'] method
     * @param {string} [url=''] url
     * @param {object} [data=null] data
     * @param {Function} [error=null] error
     * @param {boolean} [async=true] async
     */
    constructor({
                    success = null,
                    method = 'GET',
                    url = '',
                    data = null,
                    error = null,
                    async = true
                }: {
            success: Function,
            method?: string,
            url?: string,
            data?: object,
            error?: Function,
            async?: boolean
        }) {
        this.method=method;
        this.url=url;
        this.data=null;
        if (data!=null) this.data=this.params(data);
        this.success=success;
        this.error=error;
        this.async=async;

        this.QAjaxs = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        this.QAjaxs.onreadystatechange = () => {
            if (this.QAjaxs.readyState === 4) {
                let status = this.QAjaxs.status;
                let data = JSON.parse(this.QAjaxs.responseText);
                if (status >= 200 && status < 300) {
                    this.success && this.success({data, status});
                } else {
                    this.error && this.error({data, status});
                }
            }
        };

        if (this.method === 'GET' || this.method === 'DELETE') {
            this.QAjaxs.open(this.method, this.url + '?' + this.data, this.async);
            this.QAjaxs.send(null);
        } else if (this.method === 'POST' || this.method === 'PUT') {
            /**
             *打开请求
             * */
            this.QAjaxs.open(this.method, this.url, this.async);
            /**
             * POST请求设置请求头
             * */
            this.QAjaxs.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            /**
             * 发送请求参数
             */
            this.QAjaxs.send(this.data);
        }

    }

    params(data): string {
        let arr: string[] = [];
        for (let i in data) {
            /*
            hasOwnProperty() 只会检查对象的自有属性，对象原形上的属性其不会检测
            这里用到的主要原因就是：PHPStorm会提醒有问题，其实也可以省略掉这个if判断
             */
            if (data.hasOwnProperty(i)) {
                arr.push(i + "=" + data[i]);
            }
        }
        return arr.join("&");
    }
}