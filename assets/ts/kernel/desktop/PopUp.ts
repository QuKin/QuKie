/**
 * @name            PopUp
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     弹窗
 * @Date            2023/8/4 13:28
 */

import IPopUp from './interface/IPopUp'
import QRange from "../systemCallInterface/QRange.js";
import {QAL} from "../systemCallInterface/_QCommon.js";
import {QApi} from "../systemCallInterface/QApi.js";
let PopUpL=null;
await import("../../language/"+window.qukie.language+"/kernel/desktop/PopUpL.js").then(e=>{
    PopUpL=e.PopUpL;
})
let publicL=null;
await import("../../language/"+window.qukie.language+"/publicL.js").then(e=>{
    publicL=e.publicL;
})

export default class PopUp implements IPopUp{
    private qrange:QRange;
    private css:object;
    private options:{body?:string,icon?:string};
    private range:string;
    private title:string;

    /**
     * 构造函数
     * @param {String} title 标题
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
     * new PopUp('title',{
     *     body:'bodyTest',
     *     icon:'test.jpg'
     * },'t')
     * new PopUp('title',null,'t','success')
     * new PopUp('title',null,'t',{
     *     allColor:'red'
     * })
     * new PopUp('title',null,'t',{
     *     border:'red',
     *     background:'black',
     *     color:'white'
     * })
     * new PopUp('title',null,'t',{
     *     border:'1px solid red',
     *     background:'black',
     *     color:'white'
     * })
     * ```
     */
    constructor(title:string,options:{body?:string,icon?:string},range:string='t',typeColor:any='info') {
        this.qrange=new QRange('t','l','r','b','tl','lt','tr','rt','br','rb','bl','lb');
        this.init(title,options,range,typeColor);
    }
    private init(title,options:{body?:string,icon?:string},range:string,typeColor:any){
        this.setTitle(title);
        this.setOptions(options);
        this.setRange(range);
        this.setTypeColor(typeColor);
    }
    /**
     * 设置范围类型
     * @param {string} range 范围，t：顶部；l：左边；r：右边：b：底部；tl/lt：左上角；tr/rt：右上角；br/rb：右下角；bl/lb：左下角
     * @returns {QApi}
     */
    setRange(range:string):QApi{
        if (this.qrange.is(range)){
            this.range=range;
            return QAL(window.LogIntensityE.SuccessError,PopUpL.type, '设置系统弹窗范围类型成功',this.range)
        }else{
            return QAL(window.LogIntensityE.Error,PopUpL.type, PopUpL.rangeError,[],PopUpL.rangeErrorOnlySupported+':'+this.qrange.show(), window.CodeE.rangeError)
        }
    }

    /**
     * 获取范围类型
     * @returns {QApi}
     */
    getRange(): QApi {
        return QAL(window.LogIntensityE.All,PopUpL.type, '获取系统弹窗范围类型成功',this.range)
    }

    /**
     * 获取颜色类型
     * @returns {QApi}
     */
    getTypeColor(): QApi {
        return QAL(window.LogIntensityE.All,PopUpL.type, '获取系统弹窗颜色类型成功',this.css)
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
    setTypeColor(typeColor:any): QApi {
        switch (typeColor) {
            case 'success':
                this.css={
                    border:'1px solid #67c23a',
                    background:'#9aeb72',
                    color:'#419915'
                }
                break;
            case 'error':
                this.css={
                    border:'1px solid #c23a3a',
                    background:'#eb7272',
                    color:'#991515'
                }
                break;
            case 'warning':
                this.css={
                    border:'1px solid #c2ab3a',
                    background:'#ebd772',
                    color:'#998315'
                }
                break;
            case 'info':
                this.css={
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
                            this.css={
                                border:'1px solid '+typeColor.border,
                                background:typeColor.background,
                                color:typeColor.color
                            }
                            break;
                        case 3:this.css=typeColor;break;
                        default:
                            return QAL(window.LogIntensityE.Error,PopUpL.type, 'border参数错误',[], 'border参数错误，border参数只能一个颜色，或者三个整体参数：1px solid red', 504)
                    }
                }else{
                    this.css={
                        border:typeColor.allColor,
                        background:typeColor.allColor,
                        color:typeColor.allColor
                    }
                }
                break;
        }
        return QAL(window.LogIntensityE.SuccessError,PopUpL.type, '设置系统弹窗颜色类型成功',this.css)
    }

    /**
     * 获取标题
     * @returns {QApi}
     */
    getTitle(): QApi {
        return QAL(window.LogIntensityE.All,PopUpL.type, '获取系统弹窗标题成功',this.title)
    }

    /**
     * 设置标题
     * @param {string} title 标题
     * @returns {QApi}
     */
    setTitle(title: string): QApi {
        this.title=title;
        return QAL(window.LogIntensityE.SuccessError,PopUpL.type, '设置系统弹窗标题成功',this.title)
    }

    /**
     * 获取参数
     * @returns {QApi}
     */
    getOptions(): QApi {
        return QAL(window.LogIntensityE.All,PopUpL.type, '获取系统弹窗参数成功',this.options)
    }

    /**
     * 设置参数
     * @param {undefined|{
     *     body?:string,
     *     icon?:string
     * }} [options=undefined] 标题
     * @returns {QApi}
     */
    setOptions(options:{body?:string,icon?:string}): QApi {
        this.options=options;
        return QAL(window.LogIntensityE.SuccessError,PopUpL.type, '设置系统弹窗参数成功',this.options)
    }
}