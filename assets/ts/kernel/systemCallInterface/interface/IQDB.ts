/**
 * @file            IQDB.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     QDB接口
 * @Date            2023/8/14 15:36
 */

export interface IQDB{

}

export interface IParam{
    name:string,
    version:number
}
export interface IIndex{
    // 索引名
    name:string,
    // 配置对象（可选）
    options?:{
        // 如果设为true，将不允许重复的值
        unique?:boolean,
        // 如果设为true，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目
        multiEntry?:boolean
    }
}
export interface IStores{
    // 存储库名
    name:string,
    // 索引
    indexs:IIndex[],
    // 配置对象（可选）
    options?:{
        // 主键
        keyPath:string,
        // 是否自增
        autoIncrement?:boolean
    },
}