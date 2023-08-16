/**
 * @file            VFSL.ts
 * @name            VFSL
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS语言
 * @Date            2023/8/16 10:24
 */
export enum VFSL{
    type='虚拟文件系统',
    lsTypeError='ls命令类型错误',
    cdError='这个地址/文件不是目录',
    cdIsError='没有这个目录',
    mkdirRemainError='已存在该目录',
    mkdirSuccess='创建目录成功',
    mkdirError='创建目录失败',
    rmdirNotError='该文件不是目录',
    rmdirSuccess='删除目录成功',
    rmdirError='删除目录失败',
    rmdirQuantitiesError='rmdir只能删除空目录，如有内容，请用rm命令',
    fileNotFound='文件不存在',
}