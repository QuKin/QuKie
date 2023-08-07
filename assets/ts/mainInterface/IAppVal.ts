/**
 * @name            IAppVal
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     main接口
 * @Date            2023/8/7 10:49
 */
export interface IAppVal{
    // app每个最多日志数量
    appLogLength:number;
    // app强度，0：不记录；1：只记录失败；2：只记录修改成功和失败；3：记录所有包括获取成功
    appLogDissociation:number;
}