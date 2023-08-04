/**
 * @name          Volume
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   音量管理
 * @Date          2023-08-02 12:45:27
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-03 10:44:36
 */
export default class Volume {
    #volume;
    constructor() {
        this.init();
    }
    /**
     * 初始化
     */
    init() {
        this.#volume = 0.5;
    }
    /**
     * 设置音量
     * @param {Number} val 音量大小（0-1）
     * @returns {QApi}
     */
    set(val) {
        if (val < 0 || val > 1) {
            if (qukie.logDissociation > 0) QLog.add('系统音量', '系统音量调整失败');
            return QApi([], '系统音量调整失败', 501);
        } else {
            this.#volume = val;
            if (qukie.logDissociation > 1) QLog.add('系统音量', '系统音量调整成功');
            return QApi(this.#volume);
        }
    }
    /**
     * 获取音量
     * @returns {QApi}
     */
    get() {
        if (qukie.logDissociation > 2) QLog.add('系统音量', '获取系统音量成功');
        return QApi(this.#volume);
    }
}
