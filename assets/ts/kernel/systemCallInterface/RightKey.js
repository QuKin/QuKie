/**
 * @file            RightKey.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     右键管理
 * @Date            2023/8/14 8:30
 *
 * show方法未写
 */
import { getConfig, QAL } from "./_QCommon.js";
import { CodeE } from "../mode/codeE.js";
let RightKeyL = null;
await import("../../language/" + getConfig('Language') + "/kernel/systemCallInterface/RightKeyL.js").then(e => {
    RightKeyL = e.RightKeyL;
});
export default class RightKey {
    list;
    constructor(list = []) {
        this.init(list);
    }
    init(list) {
        this.list = list;
    }
    /**
     * 添加右键管理列表
     * @name add
     * @param {QClick} QC 点击类
     * @returns {QApi}
     */
    add(QC) {
        this.list.push(QC);
        return QAL(window.LogIntensityE.SuccessError, RightKeyL.type, RightKeyL.addSuccess, this.list);
    }
    /**
     * 删除右键管理列表
     * @name remove
     * @param {string|number} key key值
     * @returns {QApi}
     */
    remove(key) {
        if (typeof key === 'number') {
            if (this.isList(key)) {
                let l = this.listNotFound();
                return QAL(l[0], l[1], l[2], l[3], l[4]);
            }
            this.list.splice(key, 1);
            return QAL(window.LogIntensityE.SuccessError, RightKeyL.type, RightKeyL.removeSuccess, this.list);
        }
        else if (typeof key === 'string') {
            let n = this.getListName(key);
            if (n === -1) {
                let l = this.listNotFound();
                return QAL(l[0], l[1], l[2], l[3], l[4]);
            }
            else {
                this.list.splice(n, 1);
                return QAL(window.LogIntensityE.SuccessError, RightKeyL.type, RightKeyL.removeSuccess, this.list);
            }
        }
        else {
            return QAL(window.LogIntensityE.Error, RightKeyL.type, RightKeyL.removeError, [], RightKeyL.removeErrorMessage, CodeE.ParametricError);
        }
    }
    /**
     * 清空右键管理列表
     * @name clear
     * @returns {QApi}
     */
    clear() {
        this.list = [];
        return QAL(window.LogIntensityE.SuccessError, RightKeyL.type, RightKeyL.clearSuccess);
    }
    /**
     * 获取指定右键管理列表
     * @param {number|string} key
     * @returns {QApi}
     */
    get(key) {
        if (typeof key === 'number') {
            if (this.isList(key)) {
                let l = this.listNotFound();
                return QAL(l[0], l[1], l[2], l[3], l[4]);
            }
            return QAL(window.LogIntensityE.Success, RightKeyL.type, RightKeyL.getSuccess, this.list[key]);
        }
        else if (typeof key === 'string') {
            let n = this.getListName(key);
            if (n === -1) {
                let l = this.listNotFound();
                return QAL(l[0], l[1], l[2], l[3], l[4]);
            }
            else {
                this.list.splice(n, 1);
                return QAL(window.LogIntensityE.Success, RightKeyL.type, RightKeyL.getSuccess, this.list[n]);
            }
        }
        else {
            return QAL(window.LogIntensityE.Error, RightKeyL.type, RightKeyL.getError, [], RightKeyL.getErrorMessage, CodeE.ParametricError);
        }
    }
    /**
     * 获取全部右键管理列表
     * @name getAll
     * @returns {QApi}
     */
    getAll() {
        return QAL(window.LogIntensityE.Success, RightKeyL.type, RightKeyL.getAllSuccess, this.list);
    }
    /**
     * 获取右键管理列表下标
     * @name getListName
     * @param {string} name 点击类名称
     * @private
     * @returns {number} 当没有返回-1，有返回对应下标
     */
    getListName(name) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].getName().data == name) {
                return i;
            }
        }
        return -1;
    }
    /**
     * 判断是否为空
     * @name isList
     * @param {number} key
     * @returns {boolean}
     */
    isList(key) {
        return this.list[key] === undefined;
    }
    /**
     * 修改指定右键管理列表
     * @param {number|string} num
     * @param {QClick} QC
     * @returns {QApi}
     */
    update(num, QC) {
        if (typeof num === 'number') {
            if (this.isList(num)) {
                let l = this.listNotFound();
                return QAL(l[0], l[1], l[2], l[3], l[4]);
            }
            this.list[num] = QC;
            return QAL(window.LogIntensityE.SuccessError, RightKeyL.type, RightKeyL.updateSuccess, this.list);
        }
        else if (typeof num === 'string') {
            let n = this.getListName(num);
            if (n === -1) {
                let l = this.listNotFound();
                return QAL(l[0], l[1], l[2], l[3], l[4]);
            }
            else {
                this.list[num] = QC;
                return QAL(window.LogIntensityE.SuccessError, RightKeyL.type, RightKeyL.updateSuccess, this.list);
            }
        }
        else {
            return QAL(window.LogIntensityE.Error, RightKeyL.type, RightKeyL.updateError, [], RightKeyL.updateErrorMessage, CodeE.ParametricError);
        }
    }
    /**
     * 列表为空
     * @name listNotFound
     * @protected
     * @description ts报错写法：QAL(...this.listNotFound());
     */
    listNotFound() {
        return [
            window.LogIntensityE.Error,
            RightKeyL.type,
            RightKeyL.listNotFound,
            [],
            RightKeyL.listNotFound,
            CodeE.NotFound
        ];
    }
    /**
     * 展示功能
     */
    show() {
    }
}
//# sourceMappingURL=RightKey.js.map