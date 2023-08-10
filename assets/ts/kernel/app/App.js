/**
 * @file            App.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     App信息
 * @Date            2023/8/9 10:50
 */
import appLog from './appLog.js';
export default class App {
    app;
    log;
    constructor(app) {
        this.init(app);
    }
    init(app) {
        this.app = app;
        this.log = new appLog(this.app.name);
    }
}
//# sourceMappingURL=App.js.map