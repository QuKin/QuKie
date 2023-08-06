/**
 * @name            PopUp
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     弹窗
 * @Date            2023/8/4 13:28
 */

import IPopUp from './implements/IPopUp'

export default class PopUp implements IPopUp{
    /**
     * 构造函数
     * @param {String} content 内容
     * @param {undefined|{
     *     body?:string,
     *     icon?:string
     * }} [options=undefined] 参数
     * @param {String} [range=t] 范围，t：顶部；l：左边；r：右边：b：底部；tl/lt：左上角；tr/rt：右上角；br/rb：右下角；bl/lb：左下角
     * @param {String|{
     *     border:String,
     *     background:String,
     *     color:String
     * }|{
     *     allColor:String
     * }} [typeColor=info] 类型，success：成功；error：失败；warning：警告：info：信息；？：自定义类型
     *
     * ```js
     * new PopUp('t')
     * new PopUp('t','success')
     * new PopUp('t',{
     *     allColor:'red'
     * })
     * new PopUp('t',{
     *     border:'red',
     *     background:'black',
     *     color:'white'
     * })
     * new PopUp('t',{
     *     border:'1px solid red',
     *     background:'black',
     *     color:'white'
     * })
     * ```
     */
    constructor(content:string,options:undefined|object=undefined,range:string='t',typeColor:string='info') {

    }
    public setRange(range:string){

    }
}