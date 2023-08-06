/**
 * @name            test
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     ts测试
 * @Date            2023/8/4 15:43
 */
function aaa(a:string|object):void {
    console.log(a);
}
aaa({
    asdf:aaa
})