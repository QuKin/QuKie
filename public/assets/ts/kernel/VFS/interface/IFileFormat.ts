/**
 * @file            IFileFormat.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     文件格式接口
 * @Date            2023/8/16 10:34
 */
export interface IFileFormat {
  // 唯一
  id?: number
  // 父id
  pid?: number
  // 文件路径
  path?: string
  // 文件名
  name?: string
  // 类型
  type?: string
  // 文件
  file?: any
  // 大小
  size?: number
  // 创建时间
  created_at?: string
  // 修改时间
  update_at?: string
  // 描述
  des?: string
  // 版本
  version?: number
  // 文件数量，主要用在ls返回
  quantities?: number
  // 子节点，主要用在cp
  children?: IFileFormat[]
  // 层结构，主要用在cp
  level?: number
}
