/**
 * @name          主方法
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   等所有的方法弄好，就整体封装在这里
 * @Date          2023-08-02 11:01:50
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-03 11:30:24
 */
(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("QuKie requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    "use strict";

    class QuKie {
        constructor() {
            this.init();
        }
        init() {
            this._version = '0.0.1';
            this._debug = true;
            // ...未完成
        }
    }
    if (typeof noGlobal === "undefined") {
        window.qukie = window._ = new QuKie();
    }
    return new QuKie;
});