/**
 * @name            test
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     ts测试
 * @Date            2023/8/4 15:43
 */
// function aaa(a:string|object):void {
//     console.log(a);
// }
// aaa({
//     asdf:aaa
// })
// import {Api} from './kernel/systemCallInterface/QApi.js';
// import {CodeE} from "./kernel/mode/codeE.js";
//
// Api([],'success',200);
// Api([],'success',CodeE.Success);
//
// import {QAL} from "./kernel/systemCallInterface/_QCommon.js";
// QAL(0,'aaa','bbb',[],'success',CodeE.Success,true);
// import PopUp from "./kernel/desktop/PopUp.js";
// setTimeout(()=>{
//     let test:PopUp=new PopUp('aaa', {
//         body:'1'
//     });
// },2000)
// import QDB from "./kernel/systemCallInterface/QDB.js";
// let qdb=new QDB({
//     name:'test',
//     version:1
// },[{
//     name:'s1',
//     options:{
//         keyPath:'sid',
//         autoIncrement:true
//     },
//     indexs:[{
//         name:'sid',
//         options:{
//             unique:true
//         }
//     },{
//         name:'name',
//         options:{
//             unique:true
//         }
//     }]
// }])
// qdb.open().then(()=>{
//     qdb.setStoreName('s1')
//     qdb.add({
//         sid: 2,
//         name: 'bbb'
//     }).then(e=>{
//         console.log(e)
//     }).catch(e=>{
//         console.log(e)
//     })
//     qdb.getAll().then(e=>{
//         console.log(e);
//     })
// })
// setTimeout(()=>{
//     a.add({
//         sid:'1'
//     })
// },100)
import VFS from "./kernel/VFS/VFS.js";
setTimeout(() => {
    let vfs = new VFS();
    vfs.init().then(async () => {
        // vfs.ls().then(e=>{
        //     console.log(e);
        // })
        // vfs.ls('ali').then(e=>{
        //     console.log(e);
        // })
        // vfs.ll().then(e=>{
        //     console.log(e);
        // })
        // vfs.cd('/test4').then(e=>{
        //     console.log(e);
        //     console.log(vfs.pwd());
        //     vfs.ls().then(e=>{
        //         console.log(e);
        //     })
        // })
        // vfs.rmdir('test5').then(e=>{
        //     console.log(e);
        // })
        await vfs.cd('/test4');
        // await vfs.rmdir('test6');
        // await vfs.mkdir('test6');
        await vfs.cd('/test4/test6');
        // await vfs.mkdir('test7');
    });
}, 100);
//# sourceMappingURL=test.js.map