/**
 * @name            devTest
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     开发环境测试生成
 * @Date            2023/8/7 10:54
 */

import { getTimestamp } from './kernel/systemCallInterface/QCommon.js'
import VFS from './kernel/VFS/VFS.js'

export default class devTest {
  constructor() {
    localStorage.setItem('username', 'root')
  }

  /**
   * 生成普通目录等结构的测试文件
   */
  vfs() {
    let vfs = new VFS()
    vfs.init().then(async () => {
      await vfs.file.add({
        id: 1,
        pid: 0,
        path: '/',
        name: 'test1.txt',
        type: 'f',
        file: '内容测试1',
        size: 9,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 2,
        pid: 0,
        path: '/',
        name: 'test2.txt',
        type: 'f',
        file: '内容测试2',
        size: 9,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 3,
        pid: 0,
        path: '/',
        name: '.test3.txt',
        type: 'f',
        file: '内容测试3',
        size: 9,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 4,
        pid: 0,
        path: '/',
        name: 'test4',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 5,
        pid: 4,
        path: '/test4/',
        name: 'test5.txt',
        type: 'f',
        file: '内容测试5',
        size: 9,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 6,
        pid: 0,
        path: '/test4/',
        name: 'test6',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 7,
        pid: 0,
        path: '/',
        name: 'test7',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 8,
        pid: 0,
        path: '/test7/',
        name: 'test8',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 9,
        pid: 0,
        path: '/test7/test8/',
        name: 'test9',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 10,
        pid: 0,
        path: '/test7/test8/',
        name: 'test10.txt',
        type: 'f',
        file: '123',
        size: 3,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 11,
        pid: 0,
        path: '/test7/',
        name: 'test10',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
      await vfs.file.add({
        id: 12,
        pid: 0,
        path: '/test4/',
        name: 'test10',
        type: 'd',
        file: '',
        size: 0,
        created_at: getTimestamp().data,
        update_at: getTimestamp().data,
      })
    })
  }
}
