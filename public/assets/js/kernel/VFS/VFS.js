/**
 * @file            VFS.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     虚拟文件系统
 * @Date            2023/8/14 14:04
 */
import QDB from '../systemCallInterface/QDB.js'
import ATree from './abstract/ATree.js'
import {
  getDate,
  getTime,
  isEmptyValue,
  isFileNameCorrect,
} from '../systemCallInterface/QCommon.js'
import { getConfig, QAL } from '../systemCallInterface/_QCommon.js'
import { CodeE } from '../mode/codeE.js'
let { VFSL } = await import(
  '../../language/' + getConfig('Language') + '/kernel/VFS/VFSL.js'
)
let { publicL } = await import(
  '../../language/' + getConfig('Language') + '/publicL.js'
)
export default class VFS extends ATree {
  file
  path = '/'
  constructor() {
    super()
  }
  /**
   * 初始化
   * @param {string} [storeName=home] 仓库名
   */
  init(storeName = 'home') {
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
  is(val) {
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
  isFile(file) {
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
          let len = e.data.length
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
  isPath(path) {
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
      let pathTemp = path
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
        let arrPathTemp = path.split('/')
        // 计算多少个../
        let arrPathTempNum = 0
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
        let arrPath = this.path.split('/')
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
      let arr = pathTemp.split('/')
      // 最后一个目录名称
      let downDir = arr.splice(arr.length - 2, 1)[0]
      let pathTempJoin = arr.join('/')
      this.file
        .search('path', pathTempJoin)
        .then((e) => {
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
  isType(type, arr) {
    let typeArr = type.split('')
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
  cat(path) {
    return new Promise((resolve, reject) => {
      this.is(path)
        .then((e) => {
          resolve(e.data.file)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  /**
   * 进入或者退出目录
   * @param {string} path 路径
   */
  cd(path) {
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
        .then((e) => {
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
  clear() {
    return false
  }
  cp(source, target, type) {
    return false
  }
  /**
   * 查看当前目录以及子目录的大小
   * @returns {object[]}
   */
  du() {
    return []
  }
  find(name, path) {
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
  ls(type) {
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
        .then(async (e) => {
          let data = []
          for (const item of e.data) {
            let temp = {}
            if (arguments.length !== 0) {
              if (type.indexOf('a') === -1 && item.name.indexOf('.') === 0)
                continue
              if (type.indexOf('i') !== -1) temp.id = item.id
              if (type.indexOf('l') !== -1) {
                // 判断是否是目录
                if (item.type === 'd') {
                  const res = await this.file
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
    })
  }
  /**
   * 创建目录
   * @param {string} name 目录名称
   */
  mkdir(name) {
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
  mv(source, target, type) {
    return false
  }
  /**
   * 返回当前目录路径
   * @returns {string}
   */
  pwd() {
    // 判断路径最后一个字符是否是/
    if (this.path !== '/' && this.path.endsWith('/'))
      this.path = this.path.slice(0, -1)
    return this.path
  }
  rm(path, type) {
    return false
  }
  /**
   * 删除空目录
   * @param {string} name 目录名称
   */
  rmdir(name) {
    return new Promise((resolve, reject) => {
      let ifnc = isFileNameCorrect(name)
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
        .then((e) => {
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
  touch(name) {
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
  add(name, type, successMessage, errorMessage1, errorMessage2) {
    return new Promise((resolve, reject) => {
      let ifnc = isFileNameCorrect(name)
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
          .then((e) => {
            let pid = 0
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
        .then((e) => {
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
//# sourceMappingURL=VFS.js.map
