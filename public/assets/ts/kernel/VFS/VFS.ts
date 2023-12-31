/**
 * @file            VFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     虚拟文件系统
 * @Date            2023/8/14 14:04
 */

import QDB from '../systemCallInterface/QDB.js'
import { IVFS } from './interface/IVFS.js'
import { ICommand } from './interface/ICommand.js'
import { IFileFormat } from './interface/IFileFormat.js'
import ATree from './abstract/ATree.js'
import {
  getTimestamp,
  isEmptyValue,
  isFileNameCorrect,
} from '../systemCallInterface/QCommon.js'
import { QApi } from '../systemCallInterface/QApi.js'
import { getConfig, QAL } from '../systemCallInterface/_QCommon.js'
import { CodeE } from '../mode/codeE.js'
import { EFileType } from './enum/EFileType.js'
import { ELs } from './enum/ELs.js'
import { ECp } from './enum/ECp.js'

let { VFSL } = await import(
  '../../language/' + getConfig('Language') + '/kernel/VFS/VFSL.js'
)
let { publicL } = await import(
  '../../language/' + getConfig('Language') + '/publicL.js'
)

export default class VFS extends ATree implements IVFS, ICommand {
  file: QDB
  path: string = '/'

  constructor() {
    super()
  }

  /**
   * 初始化
   * @param {string} [storeName=home] 仓库名
   */
  init(storeName: string = 'home') {
    return new Promise((resolve, reject) => {
      this.file = new QDB(
        {
          name: 'file',
          version: 1,
        },
        [
          {
            name: 'app',
            options: { keyPath: 'id', autoIncrement: true },
            indexs: [
              { name: 'id', options: { unique: true } },
              { name: 'pid' },
              { name: 'path' },
              { name: 'name' },
              { name: 'type' },
              { name: 'file' },
              { name: 'size' },
              { name: 'created_at' },
              { name: 'update_at' },
              { name: 'version' },
              { name: 'des' },
            ],
          },
          {
            name: 'home',
            options: { keyPath: 'id', autoIncrement: true },
            indexs: [
              { name: 'id', options: { unique: true } },
              { name: 'pid' },
              { name: 'path' },
              { name: 'name' },
              { name: 'type' },
              { name: 'file' },
              { name: 'size' },
              { name: 'created_at' },
              { name: 'update_at' },
              { name: 'des' },
            ],
          },
          {
            name: 'cache',
            options: { keyPath: 'id', autoIncrement: true },
            indexs: [
              { name: 'id', options: { unique: true } },
              { name: 'pid' },
              { name: 'path' },
              { name: 'name' },
              { name: 'type' },
              { name: 'file' },
              { name: 'version' },
              { name: 'des' },
            ],
          },
        ],
      )
      this.file
        .open()
        .then(() => {
          this.file.setStoreName(storeName)
          resolve(true)
        })
        .catch(() => {
          reject(false)
        })
    })
  }

  /**
   * 判断当前是否存在该目录/文件/路径
   * @param {string} val 目录或文件名称或路径
   */
  is(val: string) {
    return new Promise((resolve, reject) => {
      if (val.indexOf('/') === -1) {
        // 目录或文件名称
        this.isFile(val)
          .then((e) => {
            resolve(e)
          })
          .catch((e) => {
            reject(e)
          })
      } else {
        // 路径
        this.isPath(val)
          .then((e) => {
            resolve(e)
          })
          .catch((e) => {
            reject(e)
          })
      }
    })
  }

  /**
   * 判断当前是否存在该目录/文件
   * @param {string} file 目录或文件名称
   */
  isFile(file: string) {
    return new Promise((resolve, reject) => {
      if (isEmptyValue(file).data) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            publicL.EmptyValue,
            file,
            publicL.EmptyValue,
            CodeE.EmptyValue,
          ),
        )
      }
      // 目录或文件名称
      this.ls('li')
        .then((e) => {
          let len: number = e.data.length
          for (let i = 0; i < len; i++) {
            if (e.data[i].name === file) {
              // 必须加return否则会继续
              return resolve(
                QAL(
                  window.LogIntensityE.SuccessError,
                  VFSL.type,
                  VFSL.isFileSuccess,
                  e.data[i],
                ),
              )
            }
          }
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.isFileNotFound,
              false,
              VFSL.isFileNotFound,
              CodeE.NotFound,
            ),
          )
        })
        .catch((e) => {
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.isFileSearchError,
              e,
              VFSL.isFileSearchError,
              CodeE.Error,
            ),
          )
        })
    })
  }

  /**
   * 判断当前是否存在该路径
   * @param {string} path 路径
   */
  isPath(path: string) {
    return new Promise((resolve, reject) => {
      if (isEmptyValue(path).data) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            publicL.EmptyValue,
            path,
            publicL.EmptyValue,
            CodeE.EmptyValue,
          ),
        )
      }

      let pathTemp: string = path
      // 没有任何/，说明当前目录进入到下一层目录
      if (path.indexOf('/') === -1) {
        if (this.path === '/') {
          pathTemp = this.path + path
        } else {
          this.path = this.addSlash(this.path)
          pathTemp = this.path + path
        }
      }
      path = this.addSlash(path)
      // 当前目录
      if (path.indexOf('./') === 0) {
        // 去掉"./"，进行拼接原路径
        pathTemp = this.path + pathTemp.substring(2)
      }
      // 返回上一级目录
      if (path.indexOf('../') === 0) {
        let arrPathTemp: string[] = path.split('/')
        // 计算多少个../
        let arrPathTempNum: number = 0
        for (let i = 0; i < arrPathTemp.length; i++) {
          if (arrPathTemp[i] === '..') {
            arrPathTempNum++
            arrPathTemp.splice(i, 1)
            i--
            continue
          }
          // 防止出现："../test/../test"
          break
        }

        let arrPath: string[] = this.path.split('/')
        // 去掉后面的''
        if (arrPath[arrPath.length - 1] === '') arrPath.pop()
        // 判断../是否超出
        if (arrPath.length <= arrPathTempNum) {
          // 超出或等于直接到根目录
          pathTemp = '/'
        } else {
          // 未超出删除指定大小，从最后开始删
          arrPath = arrPath.slice(0, -arrPathTempNum)
          // 把上面删掉的''给补回来
          arrPath.push('')

          pathTemp = arrPath.join('/') + arrPathTemp.join('/')
        }
        if (pathTemp === '/') {
          this.path = pathTemp
          return resolve(
            QAL(
              window.LogIntensityE.SuccessError,
              VFSL.type,
              VFSL.cdSuccess,
              this.path,
            ),
          )
        }
      }
      pathTemp = this.addSlash(pathTemp)
      // 当最后一个本身是一个目录
      let arr: string[] = pathTemp.split('/')
      // 最后一个目录名称
      let downDir: string = arr.splice(arr.length - 2, 1)[0]
      let pathTempJoin: string = arr.join('/')
      this.file
        .search('path', pathTempJoin)
        .then((e: QApi) => {
          if (e.data.length === 0) {
            // 该路径不存在
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.isPathNotFound,
                e,
                VFSL.isPathNotFound,
                CodeE.NotFound,
              ),
            )
          } else {
            for (const item of e.data) {
              if (item.name === downDir) {
                return resolve(
                  QAL(
                    window.LogIntensityE.SuccessError,
                    VFSL.type,
                    VFSL.isPathSuccess,
                    item,
                  ),
                )
              }
            }
            // 该路径不存在
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.isPathNotFound,
                e,
                VFSL.isPathNotFound,
                CodeE.NotFound,
              ),
            )
          }
        })
        .catch((e) => {
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.isPathSearchError,
              e,
              VFSL.isPathSearchError,
              CodeE.Error,
            ),
          )
        })
    })
  }

  /**
   * 添加判断路径最后一个字符是否是/，否就添加
   * @param {string} str 字符
   * @returns {string}
   */
  addSlash(str: string): string {
    if (!str.endsWith('/')) str += '/'
    return str
  }

  /**
   * 判断type是否存在
   * @param {string} type 类型
   * @param {string[]} arr 类型数组
   * @returns {boolean}
   */
  isType(type: string, arr: string[]): boolean {
    let typeArr: string[] = type.split('')
    let typeArrLen = typeArr.length
    let arrJoin = arr.join('')
    for (let i = 0; i < typeArrLen; i++) {
      if (arrJoin.indexOf(typeArr[i]) === -1) {
        return false
      }
    }
    return true
  }

  /**
   * 展示当前文件的内容
   * @param {string} path 路径
   */
  cat(path: string) {
    return new Promise((resolve, reject) => {
      this.is(path)
        .then((e: QApi) => {
          resolve(
            QAL(
              window.LogIntensityE.SuccessError,
              VFSL.type,
              VFSL.catSuccess,
              e.data.file,
            ),
          )
        })
        .catch((e) => {
          reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.catError,
              e,
              VFSL.catError,
              CodeE.Error,
            ),
          )
        })
    })
  }

  /**
   * 进入或者退出目录
   * @param {string} path 路径
   */
  cd(path: string) {
    return new Promise((resolve, reject) => {
      if (isEmptyValue(path).data) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            publicL.EmptyValue,
            path,
            publicL.EmptyValue,
            CodeE.EmptyValue,
          ),
        )
      }
      // 根目录直接输出
      if (path === '/') {
        this.path = path
        return resolve(
          QAL(
            window.LogIntensityE.SuccessError,
            VFSL.type,
            VFSL.cdSuccess,
            this.path,
          ),
        )
      }

      this.isPath(path)
        .then((e: QApi) => {
          if (e.data === '/') {
            this.path = '/'
            return resolve(
              QAL(
                window.LogIntensityE.SuccessError,
                VFSL.type,
                VFSL.cdSuccess,
                e,
              ),
            )
          }
          if (e.data.type === EFileType.directory) {
            this.path = e.data.path + e.data.name
            this.path = this.addSlash(this.path)
            return resolve(
              QAL(
                window.LogIntensityE.SuccessError,
                VFSL.type,
                VFSL.cdSuccess,
                e,
              ),
            )
          } else {
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.cdError,
                e,
                VFSL.cdError,
                CodeE.Error,
              ),
            )
          }
        })
        .catch((e) => {
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.cdIsError,
              e,
              VFSL.cdIsError,
              CodeE.NotFound,
            ),
          )
        })
    })
  }

  /**
   * 清除命令行
   * @returns {boolean}
   */
  clear(): boolean {
    return false
  }

  /**
   * 判断是否有该路径
   * @param {string} path 路径
   * @returns {Promise<boolean>}
   */
  async isPathTF(path: string): Promise<boolean> {
    let temp: boolean = true
    await this.is(path).catch(() => {
      temp = false
    })
    return temp
  }

  /**
   * 创建多层节点
   * @param {IFileFormat[]} node 节点
   * @param {string} paths 路径
   * @param {string} source 源文件
   * 有bug，创建时无法正确pid
   */
  createNestedNodes(
    node: IFileFormat[],
    paths: string,
    source: string,
  ): Promise<QApi> {
    return new Promise(async (resolve, reject) => {
      let { path, name } = this.getNamePath(paths)

      // 当不存在时创建目录
      await this.is(paths).catch(async () => {
        // 创建目录
        await this.add(
          name,
          'd',
          VFSL.mkdirSuccess,
          VFSL.mkdirError,
          VFSL.mkdirRemainError,
          path,
        )
      })

      function addLevelField(tree: IFileFormat[], level: number = 0) {
        for (let i = 0; i < tree.length; i++) {
          const node: IFileFormat = tree[i]
          node.level = level

          if (node.children && node.children.length > 0) {
            addLevelField(node.children, level + 1)
          }
        }
      }
      // 添加层级
      addLevelField(node)
      // 转换为扁平化
      let nodeArr: IFileFormat[] = this.toFlat(node)
      // 排序，level最小的在最上面
      nodeArr.sort(function (a, b) {
        // if (a.level === b.level) return a.id - b.id;
        return a.level - b.level
      })
      // debugger;
      // // 获取层级结构最大值
      // let levelMax:number=nodeArr[nodeArr.length-1].level;
      let levelNum: number = -1
      let id: number = await this.getId(paths)
      if (id === -1) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            VFSL.createNestedNodesError,
            id,
            VFSL.createNestedNodesError,
            CodeE.Error,
          ),
        )
      }
      let pid: number = 0
      paths = this.addSlash(paths)
      for (const item of nodeArr) {
        if (levelNum !== item.level) {
          levelNum = item.level
          pid = id
        }

        let sourcePath: string = item.path.split(this.addSlash(source))[1]
        let pathTemp: string = paths + sourcePath
        id = (
          await this.file.add({
            pid: pid,
            path: pathTemp,
            name: item.name,
            type: item.type,
            file: item.file,
            size: item.size,
            created_at: item.created_at,
            update_at: getTimestamp().data,
          })
        ).data.id
      }
      return resolve(
        QAL(
          window.LogIntensityE.SuccessError,
          VFSL.type,
          VFSL.createNestedNodesSuccess,
        ),
      )
    })
  }

  /**
   * 复制目录或文件
   * @param {string} source 源文件
   * @param {string} target 目标文件
   */
  cp(source: string, target: string)
  /**
   * 根据类型，复制目录或文件
   * f:强制覆盖文件或目录<br>
   * r:将目录下所有文件与子目录一并处理<br>
   * l:建立连接<br>
   * @param {string} source 源文件
   * @param {string} target 目标文件
   * @param {ECp|string} type 类型 f|r|l
   */
  cp(source: string, target: string, type: ECp | string)
  cp(source: string, target: string, type?: ECp | string) {
    return new Promise(async (resolve, reject) => {
      if (isEmptyValue(source).data || isEmptyValue(target).data) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            publicL.EmptyValue,
            [],
            publicL.EmptyValue,
            CodeE.EmptyValue,
          ),
        )
      }
      if (
        arguments.length === 3 &&
        !this.isType(type, [ECp.forced, ECp.recursive, ECp.link])
      ) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            VFSL.cpTypeError,
            type,
            VFSL.cpTypeError,
            CodeE.TypeError,
          ),
        )
      }
      // 判断源文件是否存在
      const sourceFile: QApi = await this.is(source).catch((e) => {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            VFSL.cpSourceNotFound,
            [source, e],
            VFSL.cpSourceNotFound,
            CodeE.NotFound,
          ),
        )
      })
      if (sourceFile === undefined) return

      const addFile = (
        paths: string,
        type: EFileType,
        file: string,
        size: number,
      ): void => {
        let { path, name } = this.getNamePath(paths)
        this.is(path)
          .then(async (e: QApi) => {
            await this.file.add({
              pid: e.data.id,
              path: path,
              name: name,
              type: type,
              file: file,
              size: size,
              created_at: getTimestamp().data,
              update_at: getTimestamp().data,
            })
            return resolve(
              QAL(window.LogIntensityE.SuccessError, VFSL.type, VFSL.cpSuccess),
            )
          })
          .catch((e) => {
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.cpTargetNotError,
                e,
                VFSL.cpTargetNotError,
                CodeE.NotFound,
              ),
            )
          })
      }
      if (arguments.length === 2) {
        await this.is(target)
          .then((e) => {
            // 存在目标文件
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.cpTargetNotError,
                e,
                VFSL.cpTargetNotError,
                CodeE.NotFound,
              ),
            )
          })
          .catch(async () => {
            let { name, path } = this.getNamePath(target)
            await this.file.add({
              pid: sourceFile.data.pid,
              path: path,
              name: name,
              type: sourceFile.data.type,
              file: sourceFile.data.file,
              size: sourceFile.data.size,
              created_at: sourceFile.data.created_at,
              update_at: getTimestamp().data,
            })
            return resolve(
              QAL(window.LogIntensityE.SuccessError, VFSL.type, VFSL.cpSuccess),
            )
          })
      }
      // 建立连接
      if (arguments.length === 3 && !!type && type.indexOf(ECp.link) !== -1) {
        if (await this.isPathTF(target)) {
          if (type.indexOf(ECp.forced) !== -1) {
            await this.is(target).then((e: QApi): void => {
              // 如有先进行删除在创建
              this.file.delete(e.data.id).then(() => {
                addFile(target, EFileType.link, source, 0)
              })
            })
          } else {
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.cpTargetError,
                [],
                VFSL.cpTargetError,
                CodeE.NotFound,
              ),
            )
          }
        } else {
          addFile(target, EFileType.link, source, 0)
        }
      } else {
        if (
          arguments.length !== 3 &&
          !!type &&
          type.indexOf(ECp.forced) === -1
        ) {
          // 判断目标文件是否存在，存在报错
          return await this.is(target)
            .then((e) => {
              return reject(
                QAL(
                  window.LogIntensityE.Error,
                  VFSL.type,
                  VFSL.cpTargetError,
                  [target, e],
                  VFSL.cpTargetError,
                  CodeE.NotFound,
                ),
              )
            })
            .catch(() => {
              // 必须catch引出来，否则会报错
            })
        }
        if (arguments.length === 3) {
          const addTemp = async (path: string, name: string) => {
            await this.file.add({
              pid: sourceFile.data.pid,
              path: path,
              name: name,
              type: sourceFile.data.type,
              file: sourceFile.data.file,
              size: sourceFile.data.size,
              created_at: sourceFile.data.created_at,
              update_at: getTimestamp().data,
            })
            return reject(
              QAL(window.LogIntensityE.SuccessError, VFSL.type, VFSL.cpSuccess),
            )
          }
          // 强制覆盖文件或目录
          if (type.indexOf(ECp.forced) !== -1) {
            await this.is(target)
              .then((e: QApi) => {
                // 如有先进行删除在创建
                this.file.delete(e.data.id).then(() => {
                  addTemp(e.data.path, sourceFile.data.name)
                })
              })
              .catch(() => {
                let { name, path } = this.getNamePath()
                addTemp(path, name)
              })
          }
          // 将目录下所有文件与子目录一并处理
          if (type.indexOf(ECp.recursive) !== -1) {
            // 源目录树形结构
            let sourceTree: any[] = this.toTree(
              await this.searchAllChildren(sourceFile.data.id),
            )
            // console.log(sourceTree, JSON.stringify(sourceTree))
            this.is(target)
              .then(async (e: QApi) => {
                let targetTree = this.toTree(
                  await this.searchAllChildren(e.data.id),
                )
                console.log(sourceTree)
                console.log(targetTree)
              })
              .catch(() => {
                this.createNestedNodes(sourceTree, target, source)
                // let sourceData=await this.searchAllChildren(sourceFile.data.id);
                // console.log(sourceTree);
                // addR(sourceTree);
              })
          }
        }
      }
    })
  }

  /**
   * 查找所有子节点
   * @param {number} id 当前节点id
   */
  async searchAllChildren(id: number): Promise<IFileFormat[]> {
    let arr: IFileFormat[] = []
    // 使用一个队列来存储待搜索的id
    let queue: number[] = [id]
    // 当队列不为空时，循环搜索
    while (queue.length > 0) {
      // 取出队列头部的id
      let curId = queue.shift()
      // 使用await等待异步操作的结果
      let e: QApi = await this.file.search('pid', curId)
      // 遍历e.data，将其加入到arr和queue中
      for (const item of e.data) {
        arr.push(item)
        queue.push(item.id)
      }
    }
    // 返回arr
    return arr
  }

  /**
   * 查看当前目录以及子目录的大小
   */
  du() {
    return new Promise((resolve, reject) => {
      this.file
        .search('path', this.path)
        .then(async (e: QApi) => {
          let data: IFileFormat[] = e.data
          let count: number = 0
          let list: {
            size: number
            name: string
            type: string
            path: string
          }[] = []

          for (const item of data) {
            let { type, size, name, path } = item
            list.push({
              type,
              size,
              name,
              path,
            })
            count += item.size
            for (const itemSAC of await this.searchAllChildren(item.id)) {
              let { type, size, name, path } = itemSAC
              list.push({ type, size, name, path })
              count += size
            }
          }
          resolve(
            QAL(window.LogIntensityE.SuccessError, VFSL.type, VFSL.duSuccess, {
              count,
              list,
            }),
          )
        })
        .catch((e) => {
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.duError,
              e,
              VFSL.duError,
              CodeE.Error,
            ),
          )
        })
    })
  }

  /**
   * 当前目录包括所有子目录下查找文件
   * @param {string} name 文件名称
   * @returns {object[]}
   */
  find(name: string)
  /**
   * 自定义目录路径包括所有子目录下查找文件
   * @param {string} name 文件名称
   * @param {string} path 目录路径
   * @returns {object[]}
   */
  find(name: string, path: string)
  find(name: string, path?: string) {
    return []
  }

  /**
   * 是ls('l')的快速方式
   * @returns {object[]}
   */
  ll() {
    return new Promise((resolve, reject) => {
      this.ls(ELs.list)
        .then((e) => {
          resolve(e)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  /**
   * 输出当前目录的列表
   */
  ls()
  /**
   * 根据类型，输出当前目录的列表<br>
   * a:可看见以"."开头的隐藏文件<br>
   * i:显示文件id<br>
   * l:{文件个数,文件大小,创建日期,文件名,文件名}
   * @param {ELs|string} type 类型 a|l|i
   */
  ls(type: ELs | string)
  ls(type?: ELs | string) {
    return new Promise((resolve, reject) => {
      if (
        arguments.length !== 0 &&
        !this.isType(type, [ELs.alpho, ELs.list, ELs.id])
      ) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            VFSL.lsTypeError,
            type,
            VFSL.lsTypeError,
            CodeE.TypeError,
          ),
        )
      }
      this.path = this.addSlash(this.path)
      this.file
        .search('path', this.path)
        .then(async (e: QApi) => {
          let data: IFileFormat[] = []
          for (const item of e.data) {
            let temp: IFileFormat = {}

            if (arguments.length !== 0) {
              if (
                type.indexOf(ELs.alpho) === -1 &&
                item.name.indexOf('.') === 0
              ) {
                continue
              }
              if (type.indexOf(ELs.id) !== -1) temp.id = item.id
              if (type.indexOf(ELs.list) !== -1) {
                // 判断是否是目录
                if (item.type === EFileType.directory) {
                  const res: QApi = await this.file
                    .search('pid', item.id)
                    .catch((e) => {
                      return reject(
                        QAL(
                          window.LogIntensityE.Error,
                          VFSL.type,
                          VFSL.lsSearchError,
                          e,
                          VFSL.lsSearchError,
                          CodeE.Error,
                        ),
                      )
                    })
                  temp.quantities = res.data.length
                } else {
                  temp.quantities = 0
                }
                temp.type = item.type
                temp.size = item.size
                temp.created_at = item.created_at
                temp.update_at = item.update_at
              }
            } else {
              // 文件名开头为"."是隐藏文件，如要展示：ls('a')
              if (item.name.indexOf('.') === 0) continue
            }

            temp.name = item.name
            data.push(temp)
          }
          return resolve(
            QAL(
              window.LogIntensityE.SuccessError,
              VFSL.type,
              VFSL.lsSuccess,
              data,
            ),
          )
        })
        .catch((e: QApi) => {
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.lsSearchError,
              e,
              VFSL.lsSearchError,
              CodeE.Error,
            ),
          )
        })
    })
  }

  /**
   * 创建目录
   * @param {string} name 目录名称
   */
  mkdir(name: string) {
    return new Promise((resolve, reject) => {
      this.add(
        name,
        'd',
        VFSL.mkdirSuccess,
        VFSL.mkdirError,
        VFSL.mkdirRemainError,
      )
        .then((e) => {
          resolve(e)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  /**
   * 剪贴目录或文件
   * @param {string} source 源文件
   * @param {string} target 目标文件
   * @returns {boolean}
   */
  mv(source: string, target: string): boolean
  /**
   * 根据类型，剪贴目录或文件
   * f:忽略提示<br>
   * r:所有目录下所有文件与子目录删除<br>
   * @param {string} source 源文件
   * @param {string} target 目标文件
   * @param {string} type 类型 f|r
   * @returns {boolean}
   */
  mv(source: string, target: string, type: string): boolean
  mv(source: string, target: string, type?: string): boolean {
    return false
  }

  /**
   * 返回当前目录路径
   * @returns {string}
   */
  pwd(): string {
    // 判断路径最后一个字符是否是/
    if (this.path !== '/' && this.path.endsWith('/')) {
      this.path = this.path.slice(0, -1)
    }
    return this.path
  }

  /**
   * 删除文件
   * @param {string} path 路径
   * @returns {boolean}
   */
  rm(path: string): boolean
  /**
   * 根据类型，删除文件
   * f:忽略提示<br>
   * r:所有目录下所有文件与子目录删除<br>
   * @param {string} path 路径
   * @param {string} type 类型 f|r
   * @returns {boolean}
   */
  rm(path: string, type: string): boolean
  rm(path: string, type?: string): boolean {
    return false
  }

  /**
   * 删除空目录
   * @param {string} name 目录名称
   */
  rmdir(name: string) {
    return new Promise((resolve, reject) => {
      let ifnc: QApi = isFileNameCorrect(name)
      if (!ifnc.data) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            ifnc.message,
            ifnc,
            ifnc.message,
            CodeE.Error,
          ),
        )
      }
      this.is(name)
        .then((e: IFileFormat) => {
          if (e.type === EFileType.directory) {
            if (e.quantities === 0) {
              this.file
                .delete(e.id)
                .then((e) => {
                  return resolve(
                    QAL(
                      window.LogIntensityE.SuccessError,
                      VFSL.type,
                      VFSL.rmdirSuccess,
                      e,
                    ),
                  )
                })
                .catch((e) => {
                  return reject(
                    QAL(
                      window.LogIntensityE.Error,
                      VFSL.type,
                      VFSL.rmdirError,
                      e,
                      VFSL.rmdirError,
                      CodeE.Error,
                    ),
                  )
                })
            } else {
              return reject(
                QAL(
                  window.LogIntensityE.Error,
                  VFSL.type,
                  VFSL.rmdirQuantitiesError,
                  e,
                  VFSL.rmdirQuantitiesError,
                  CodeE.Error,
                ),
              )
            }
          } else {
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                VFSL.rmdirNotError,
                e,
                VFSL.rmdirNotError,
                CodeE.Error,
              ),
            )
          }
        })
        .catch((e) => {
          return reject(
            QAL(
              window.LogIntensityE.Error,
              VFSL.type,
              VFSL.fileNotFound,
              e,
              VFSL.fileNotFound,
              CodeE.Error,
            ),
          )
        })
    })
  }

  /**
   * 创建文件
   * @param {string} name 文件名
   */
  touch(name: string) {
    return new Promise((resolve, reject) => {
      this.add(
        name,
        'f',
        VFSL.touchSuccess,
        VFSL.touchError,
        VFSL.touchRemainError,
      )
        .then((e) => {
          resolve(e)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  /**
   * 获取路径上的最后一个字符和去除后的路径
   * @param {string} [path=this.path] 路径
   * @returns {{name:string,path:string}}
   */
  getNamePath(path: string = this.path): { name: string; path: string } {
    // 去掉最后面的''
    let pathArr: string[] = path.split('/').filter((item) => item !== '')
    // 去掉最后一个字段
    let name: string = pathArr.at(-1)
    // 去掉最后一个字段后的路径
    pathArr[pathArr.length - 1] = ''
    path = '/' + pathArr.join('/')
    return { name, path }
  }

  /**
   * 获取pid
   * @param {string} [paths=this.path] 路径
   */
  async getPid(paths: string = this.path): Promise<number> {
    let { path } = this.getNamePath(paths)
    if (path === '/') return 0
    let res: QApi = await this.is(path)
    return res.data.id
  }

  /**
   * 根据path获取id
   * @param {string} [paths=this.path] 路径
   */
  getId(paths: string = this.path): Promise<number> {
    return new Promise((resolve, reject) => {
      if (paths === '/') return resolve(0)
      let { name, path } = this.getNamePath(paths)

      this.file
        .search('path', path)
        .then((e: QApi) => {
          for (const item of e.data) {
            if (item.name === name) return resolve(item.id)
          }
          return reject(-1)
        })
        .catch(() => {
          return reject(-1)
        })
    })
  }

  /**
   * 私有创建文件或目录
   * @param {string} name 名称
   * @param {string} type 类型
   * @param {string} successMessage 正确消息
   * @param {string} errorMessage1 错误消息
   * @param {string} errorMessage2 存在错误消息
   * @param {string} [paths=this.path] 路径
   * @private
   */
  private add(
    name: string,
    type: string,
    successMessage: string,
    errorMessage1: string,
    errorMessage2: string,
    paths: string = this.path,
  ) {
    return new Promise((resolve, reject) => {
      let ifnc: QApi = isFileNameCorrect(name)
      if (!ifnc.data) {
        return reject(
          QAL(
            window.LogIntensityE.Error,
            VFSL.type,
            ifnc.message,
            ifnc,
            ifnc.message,
            CodeE.Error,
          ),
        )
      }
      const add = async () => {
        paths = this.addSlash(paths)
        this.file
          .add({
            pid: await this.getId(),
            path: paths,
            name: name,
            type: type,
            file: '',
            size: 0,
            created_at: getTimestamp().data,
            update_at: getTimestamp().data,
          })
          .then((e) => {
            return resolve(
              QAL(
                window.LogIntensityE.SuccessError,
                VFSL.type,
                successMessage,
                e,
              ),
            )
          })
          .catch((e) => {
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                errorMessage1,
                e,
                errorMessage1,
                CodeE.Error,
              ),
            )
          })
      }
      this.is(name)
        .then((e: QApi) => {
          if (e.data.type !== type && e.data.name !== name) {
            return add()
          } else {
            return reject(
              QAL(
                window.LogIntensityE.Error,
                VFSL.type,
                errorMessage2,
                e,
                errorMessage2,
                CodeE.Error,
              ),
            )
          }
        })
        .catch(() => {
          // 没有就创建
          return add()
        })
    })
  }
}
