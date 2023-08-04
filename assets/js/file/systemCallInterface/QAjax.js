/**
 * @name            QAjax
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Ajax自定义封装
 * @Date            2023/8/3 13:36
 */

export default class QAjax {
    /**
     * @param {Object} json
     * @param {String} [json.method=GET] - 类型
     * @param {String} json.url - URL
     * @param {Object} json.data - 数据
     * @param {Function} json.success - 正确
     * @param {Function} json.error - 错误
     * @param {Boolean} [json.async=true] - 异步
     */
    constructor(json) {
        this.method=json.method===undefined?'GET':json.method.toUpperCase();
        this.url=json.url===undefined?'':json.url;
        this.data=json.data===undefined?null:this.params(json.data);
        this.success=json.success===undefined?null:json.success;
        this.error=json.error===undefined?null:json.error;
        this.async=json.async===undefined?true:json.async;

        this.QAjaxs=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        this.QAjaxs.onreadystatechange = ()=> {
            if (this.QAjaxs.readyState === 4) {
                let status = this.QAjaxs.status;
                let data = JSON.parse(this.QAjaxs.responseText);
                if (status >= 200 && status < 300 ){
                    this.success && this.success({data,status});
                }else{
                    this.error && this.error({data,status});
                }
            }
        };

        if (this.method === 'GET'||this.method === 'DELETE'){
            this.QAjaxs.open(this.method,this.url + '?' + this.data ,this.async);
            this.QAjaxs.send(null);
        }else if (this.method === 'POST'||this.method === 'PUT'){
            /**
             *打开请求
             * */
            this.QAjaxs.open(this.method,this.url,this.async);
            /**
             * POST请求设置请求头
             * */
            this.QAjaxs.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            /**
             * 发送请求参数
             */
            this.QAjaxs.send(this.data);
        }

    }
    params(data){
        let arr = [];
        for(let i in data){
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