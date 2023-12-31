/**
 * @file            IVFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS接口
 * @Date            2023/8/14 14:04
 */
import QDB from '../../systemCallInterface/QDB.js'
import { IFileFormat } from './IFileFormat.js'
import { QApi } from '../../systemCallInterface/QApi.js'

export interface IVFS {
  file: QDB
  path: string

  /**
   * 初始化
   * @param {string} [storeName=home] 仓库名
   */
  init(storeName: string)

  /**
   * 判断type是否存在
   * @param {string} type 类型
   * @param {string[]} arr 类型数组
   * @returns {boolean}
   */
  isType(type: string, arr: string[]): boolean

  /**
   * 判断当前是否存在该路径
   * @param {string} path 路径
   */
  isPath(path: string)

  /**
   * 判断当前是否存在该目录/文件
   * @param {string} file 目录或文件名称
   */
  isFile(file: string)

  /**
   * 根据path获取id
   * @param {string} [paths=this.path] 路径
   */
  getId(paths: string): Promise<number>

  /**
   * 添加判断路径最后一个字符是否是/，否就添加
   * @param {string} str 字符
   * @returns {string}
   */
  addSlash(str: string): string

  /**
   * 查找所有子节点
   * @param {number} id 当前节点id
   */
  searchAllChildren(id: number)

  /**
   * 获取路径上的最后一个字符和去除后的路径
   * @returns {{name:string,path:string}}
   */
  getNamePath(): { name: string; path: string }

  /**
   * 创建多层节点
   * @param {IFileFormat[]} node 节点
   * @param {string} paths 路径
   * @param {string} source 源文件
   */
  createNestedNodes(
    node: IFileFormat[],
    paths: string,
    source: string,
  ): Promise<QApi>

  /**
   * 根据路径获取pid
   * @param {string} [paths=this.path] 路径
   */
  getPid(paths: string): Promise<number>

  /**
   * 判断是否有该路径
   * @param {string} path 路径
   * @returns {Promise<boolean>}
   */
  isPathTF(path: string): Promise<boolean>
}
