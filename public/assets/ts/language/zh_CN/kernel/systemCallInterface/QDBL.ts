/**
 * @name            QDBL
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     QDB语言
 * @Date            2023/8/7 9:29
 */
export enum QDBL {
  type = 'QDB',
  browserNotSupportIndexedDB = '你的游览器不支持indexedDB,请更换',
  openErr = '数据库打开报错',
  isErr = '没有指定仓库名称',
  setStoreNameSuccess = '选择仓库成功',
  addSuccess = '数据写入成功',
  addErr = '数据写入失败',
  closeSuccess = '关闭数据库成功',
  closeErr = '关闭数据库失败',
  deleteSuccess = '数据删除成功',
  deleteErr = '数据删除失败',
  deleteDBSuccess = '删除数据库成功',
  deleteDBErr = '删除数据库失败',
  deletesSuccess = '游标删除记录成功',
  deletesErr = '游标删除该记录失败',
  getAllSuccess = '游标读取全部数据成功',
  getAllErr = '游标读取全部数据失败',
  getIndexSuccess = '索引查询结果成功',
  getIndexErr = '索引查询结果失败',
  getKeySuccess = '主键查询结果成功',
  getKeyErr = '主键查询结果失败',
  pageSuccess = '分页查询结果成功',
  pageErr = '分页查询结果失败',
  searchSuccess = '游标索引查询结果成功',
  searchErr = '游标索引查询结果失败',
  updateSuccess = '数据更新成功',
  updateErr = '数据更新失败',
}
