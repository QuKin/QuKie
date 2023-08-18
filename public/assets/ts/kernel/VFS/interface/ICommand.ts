/**
 * @file            ICommand.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS命令接口
 * @Date            2023/8/15 14:39
 */
export interface ICommand {
  /**
   * 判断当前是否存在该目录/文件
   * @param {string} val 目录或文件名称
   */
  is(val: string)

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

  /**
   * 是ls('l')的快速方式
   * @returns {object[]}
   */
  ll()

  /**
   * 进入或者退出目录
   * @param {string} path 路径
   */
  cd(path: string)

  /**
   * 创建目录
   * @param {string} name 目录名称
   */
  mkdir(name: string)

  /**
   * 删除空目录
   * @param {string} name 目录名称
   */
  rmdir(name: string)

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

  /**
   * 查看当前目录以及子目录的大小
   * @returns {object[]}
   */
  du()

  /**
   * 展示当前文件的内容
   * @param {string} path 路径
   * @returns {any}
   */
  cat(path: string): any

  /**
   * 返回当前目录路径
   * @returns {string}
   */
  pwd(): string

  /**
   * 清除命令行
   * @returns {boolean}
   */
  clear(): boolean

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

  /**
   * 创建文件
   * @param {string} name 文件名
   */
  touch(name: string)
}
