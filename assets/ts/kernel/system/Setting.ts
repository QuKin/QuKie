/**
 * @file            Setting.ts
 * @copyright       QuKie 2023
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     设置
 * @Date            2023/8/8 10:52
 */


import Volume from './Volume.js'
import Notice from './Notice.js'

class Setting{
    volume:Volume;
    notice:Notice;
    constructor() {
        this.volume=new Volume();
        this.notice=new Notice();
    }
}
export default new Setting();