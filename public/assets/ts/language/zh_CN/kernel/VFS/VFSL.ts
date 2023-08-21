/**
 * @file            VFSL.ts
 * @name            VFSL
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS语言
 * @Date            2023/8/16 10:24
 */
export enum VFSL {
  type = '虚拟文件系统',
  lsTypeError = 'ls命令-类型错误',
  cpTypeError = 'cp命令-类型错误',
  cdError = '这个地址/文件不是目录',
  cdIsError = '没有这个目录',
  cdSuccess = '进入该目录成功',
  mkdirRemainError = '已存在该目录',
  mkdirSuccess = '创建目录成功',
  mkdirError = '创建目录失败',
  touchRemainError = '已存在该文件',
  touchSuccess = '创建文件成功',
  touchError = '创建文件失败',
  rmdirNotError = '该文件不是目录',
  rmdirSuccess = '删除目录成功',
  rmdirError = '删除目录失败',
  rmdirQuantitiesError = 'rmdir只能删除空目录，如有内容，请用rm命令',
  fileNotFound = '文件不存在',
  isPathNotFound = '该路径不存在',
  isPathSearchError = 'isPath方法搜索失败',
  isPathSuccess = '该路径存在',
  isFileSearchError = 'isFile方法搜索失败',
  isFileNotFound = '该文件/目录不存在',
  isFileSuccess = '该文件/目录存在',
  lsSearchError = 'ls方法搜索失败',
  lsSuccess = '列表数据获取成功',
  catSuccess = '获取当前文件内容成功',
  catError = '获取当前文件内容失败',
  duSuccess = '获取当前文件大小成功',
  duError = '获取当前文件大小失败',
  cpSourceNotFound = 'cp命令-源文件不存在',
  cpTargetError = 'cp命令-目标文件存在，请使用f参数进行强制操作',
}
