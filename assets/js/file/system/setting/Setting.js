/**
 * @name          Setting
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   设置
 * @Date          2023-08-02 12:51:11
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-03 11:07:40
*/
import Volume from './Volume.js'
import Notice from './Notice.js'
class Setting {
    constructor() {
        this.volume = new Volume();
        this.notice = new Notice();
    }
}
export default new Setting();