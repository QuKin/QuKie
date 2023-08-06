"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            QAjax
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     Ajax自定义封装
 * @Date            2023/8/4 15:52
 */
var QAjax = /** @class */ (function () {
    /**
     * @param {Object} json
     * @param {String} [json.method=GET] - 类型
     * @param {String} json.url - URL
     * @param {Object} json.data - 数据
     * @param {Function} json.success - 正确
     * @param {Function} json.error - 错误
     * @param {Boolean} [json.async=true] - 异步
     */
    function QAjax(json) {
        var _this = this;
        this.method = json.method === undefined ? 'GET' : json.method.toUpperCase();
        this.url = json.url === undefined ? '' : json.url;
        this.data = json.data === undefined ? null : this.params(json.data);
        this.success = json.success === undefined ? null : json.success;
        this.error = json.error === undefined ? null : json.error;
        this.async = json.async === undefined ? true : json.async;
        this.QAjaxs = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        this.QAjaxs.onreadystatechange = function () {
            if (_this.QAjaxs.readyState === 4) {
                var status_1 = _this.QAjaxs.status;
                var data = JSON.parse(_this.QAjaxs.responseText);
                if (status_1 >= 200 && status_1 < 300) {
                    _this.success && _this.success({ data: data, status: status_1 });
                }
                else {
                    _this.error && _this.error({ data: data, status: status_1 });
                }
            }
        };
        if (this.method === 'GET' || this.method === 'DELETE') {
            this.QAjaxs.open(this.method, this.url + '?' + this.data, this.async);
            this.QAjaxs.send(null);
        }
        else if (this.method === 'POST' || this.method === 'PUT') {
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
    QAjax.prototype.params = function (data) {
        var arr = [];
        for (var i in data) {
            /*
            hasOwnProperty() 只会检查对象的自有属性，对象原形上的属性其不会检测
            这里用到的主要原因就是：PHPStorm会提醒有问题，其实也可以省略掉这个if判断
             */
            if (data.hasOwnProperty(i)) {
                arr.push(i + "=" + data[i]);
            }
        }
        return arr.join("&");
    };
    return QAjax;
}());
exports.default = QAjax;
//# sourceMappingURL=QAjax.js.map