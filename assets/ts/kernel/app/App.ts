/**
 * @file            App.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     App信息
 * @Date            2023/8/9 10:50
 */

import appLog from './appLog.js';
import {IApp} from "./interface/IApp.js";

export default class App {
    private app: IApp;
    private log: appLog;

    constructor(app: IApp) {
        this.init(app);
    }

    private init(app: IApp) {
        this.app = app;
        this.log = new appLog(this.app.name);
    }
}