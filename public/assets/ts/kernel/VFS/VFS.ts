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
  getDate,
  getTime,
  isEmptyValue,
  isFileNameCorrect,
} from '../systemCallInterface/QCommon.js'
import { QApi } from '../systemCallInterface/QApi.js'
import { getConfig, QAL } from '../systemCallInterface/_QCommon.js'
import { CodeE } from '../mode/codeE.js'

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
              { name: 'time' },
              { name: 'date' },
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
              { name: 'time' },
              { name: 'date' },
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
          pathTemp = this.path + '/' + path
        }
      }
      // 判断路径最后一个字符是否是/
      if (!path.endsWith('/')) path += '/'
      // 当前目录
      if (path.indexOf('./') === 0) {
        // 去掉"./"，进行拼接原路径
        pathTemp = this.path + pathTemp.substr(2)
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
      // // 判断字符串最后一个字符是否存在
      if (!pathTemp.endsWith('/')) pathTemp += '/'
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
          if (e.data.type === 'd') {
            this.path = e.data.path + e.data.name
            if (!this.path.endsWith('/')) this.path += '/'
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
   * 复制目录或文件
   * @param {string} source 源文件
   * @param {string} target 目标文件
   * @returns {boolean}
   */
  cp(source: string, target: string): boolean
  /**
   * 根据类型，复制目录或文件
   * f:强制覆盖文件或目录<br>
   * r:将目录下所有文件与子目录一并处理<br>
   * l:建立硬连接<br>
   * @param {string} source 源文件
   * @param {string} target 目标文件
   * @param {string} type 类型 f|r|l
   * @returns {boolean}
   */
  cp(source: string, target: string, type: string): boolean
  cp(source: string, target: string, type?: string): boolean {
    return false
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
          const DG = async (path: string) => {
            if (!path.endsWith('/')) path += '/'
            const res: QApi = await this.file.search('path', path)
            const resArr: IFileFormat[] = res.data
            for (const item of resArr) {
              let { type, size, name, path } = item
              list.push({
                type,
                size,
                name,
                path,
              })
              if (item.type === 'd') await DG(path + name)
            }
          }
          for (const item of data) {
            let { type, size, name, path } = item
            list.push({
              type,
              size,
              name,
              path,
            })
            if (item.type === 'd') await DG(path + name)
            count += item.size
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
      this.ls('l')
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
   * @returns {object[]}
   */
  ls()
  /**
   * 根据类型，输出当前目录的列表<br>
   * a:可看见以"."开头的隐藏文件<br>
   * i:显示文件id<br>
   * l:{文件个数,文件大小,创建日期,文件名}
   * @param {string} type 类型 a|l|i
   * @returns {object[]}
   */
  ls(type: string)
  ls(type?: string) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 0 && !this.isType(type, ['a', 'l', 'i'])) {
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
      if (!this.path.endsWith('/')) this.path += '/'
      this.file
        .search('path', this.path)
        .then(async (e: QApi) => {
          let data: IFileFormat[] = []
          for (const item of e.data) {
            let temp: IFileFormat = {}

            if (arguments.length !== 0) {
              if (type.indexOf('a') === -1 && item.name.indexOf('.') === 0)
                continue
              if (type.indexOf('i') !== -1) temp.id = item.id
              if (type.indexOf('l') !== -1) {
                // 判断是否是目录
                if (item.type === 'd') {
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
                temp.date = item.date
                temp.time = item.time
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
    if (this.path !== '/' && this.path.endsWith('/'))
      this.path = this.path.slice(0, -1)
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
          if (e.type === 'd') {
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
   * 私有创建文件或目录
   * @param {string} name 名称
   * @param {string} type 类型
   * @param {string} successMessage 正确消息
   * @param {string} errorMessage1 错误消息
   * @param {string} errorMessage2 存在错误消息
   * @private
   */
  private add(
    name: string,
    type: string,
    successMessage: string,
    errorMessage1: string,
    errorMessage2: string,
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
      const add = () => {
        this.file
          .getIndex('path', this.path)
          .then((e: QApi) => {
            let pid: number = 0
            if (this.path !== '/') pid = e.data.id
            // 判断路径最后一个字符是否是/
            if (!this.path.endsWith('/')) this.path += '/'
            this.file
              .add({
                pid: pid,
                path: this.path,
                name: name,
                type: type,
                file: '',
                size: 0,
                time: getTime().data,
                date: getDate().data,
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
            add()
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
          add()
        })
    })
  }
}
