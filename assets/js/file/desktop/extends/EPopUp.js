/**
 * @name            EPopUp
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     PopUp的父类接口等
 * @Date            2023/8/4 10:42
 */

export default class EPopUp {
    constructor(content,options=undefined,range='t',typeColor='info') {}
    setRange(range){}
    getRange(){}
    setTypeColor(typeColor){}
    getTypeColor(){}
}