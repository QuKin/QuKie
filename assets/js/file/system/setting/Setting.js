/**
 * @name          Setting
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   设置
 * @Date          2023-08-02 12:51:11
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-02 15:45:38
 */
import Volume from './Volume.js'
class Setting {
    constructor() {
        this.volume = new Volume();
    }
}
export default new Setting();