/**
 * @name            PopUp
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     弹窗
 * @Date            2023/8/3 14:50
 */
import QRange from "../systemCallInterface/QRange.js";
import EPopUp from "./extends/EPopUp.js";
import {QAL} from "../systemCallInterface/_QCommon.js";

export default class PopUp extends EPopUp{
    #range;
    #css;
    #content;
    #options;

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
    constructor(content,options=undefined,range='t',typeColor='info') {
        super(content,options,range,typeColor);
        this.qrange=new QRange('t','l','r','b','tl','lt','tr','rt','br','rb','bl','lb');
        this.#init(range,typeColor);
    }

    #init(range,typeColor){
        this.setRange(range);
        this.setTypeColor(typeColor);
    }

    /**
     * 设置范围类型
     * @param {String} range 范围，t：顶部；l：左边；r：右边：b：底部；tl/lt：左上角；tr/rt：右上角；br/rb：右下角；bl/lb：左下角
     * @returns {QApi}
     */
    setRange(range){
        if (this.qrange.is(range)){
            this.#range=range;
        }else{
            QAL(0,'系统弹窗', '范围错误',[],'范围错误，只支持:'+this.qrange.show(), 503)
        }
    }

    /**
     * 获取范围类型
     * @returns {QApi}
     */
    getRange(){
        return QAL(2,'系统弹窗', '获取系统弹窗范围类型成功',this.#range)
    }
    /**
     * 设置颜色类型
     * @param {String|{
     *     border:String,
     *     background:String,
     *     color:String
     * }|{
     *     allColor:String
     * }} [typeColor=info] 类型，success：成功；error：失败；warning：警告：info：信息；？：自定义颜色
     *
     * ```javascript
     * setTypeColor('success')
     * setTypeColor({
     *     allColor:'red'
     * })
     * setTypeColor({
     *     border:'red',
     *     background:'black',
     *     color:'white'
     * })
     * setTypeColor({
     *     border:'1px solid red',
     *     background:'black',
     *     color:'white'
     * })
     * ```
     *
     * @returns {QApi}
     */
    setTypeColor(typeColor){
        switch (typeColor) {
            case 'success':
                this.#css={
                    border:'1px solid #67c23a',
                    background:'#9aeb72',
                    color:'#419915'
                }
                break;
            case 'error':
                this.#css={
                    border:'1px solid #c23a3a',
                    background:'#eb7272',
                    color:'#991515'
                }
                break;
            case 'warning':
                this.#css={
                    border:'1px solid #c2ab3a',
                    background:'#ebd772',
                    color:'#998315'
                }
                break;
            case 'info':
                this.#css={
                    border:'1px solid #b8b7b7',
                    background:'#eae9e9',
                    color:'#9a9999'
                }
                break;
            default:
                if (typeColor.allColor===undefined){
                    let length=typeColor.border.split(' ').length;
                    switch (length) {
                        case 1:
                            this.#css={
                                border:'1px solid '+typeColor.border,
                                background:typeColor.background,
                                color:typeColor.color
                            }
                            break;
                        case 3:this.#css=typeColor;break;
                        default:
                            return QAL(0,'系统弹窗', 'border参数错误',[], 'border参数错误，border参数只能一个颜色，或者三个整体参数：1px solid red', 504)
                    }
                }else{
                    this.#css={
                        border:typeColor.allColor,
                        background:typeColor.allColor,
                        color:typeColor.allColor
                    }
                }
                break;
        }
    }

    /**
     * 设置颜色类型
     * @returns {QApi}
     */
    getTypeColor(){
        return QAL(2,'系统弹窗', '获取系统弹窗颜色类型成功',this.#css)
    }
}