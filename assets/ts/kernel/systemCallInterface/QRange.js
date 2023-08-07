/**
 * @name            QRange
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     范围类，传入多个值，之后进行判断这些范围是否在里面，进行快速的判断
 * @Date            2023/8/7 9:46
 */
export default class QRange {
    arr;
    constructor(...arr) {
        this.arr = arr;
    }
    is(num) {
        return this.arr.indexOf(num) !== -1;
    }
    show(join = ',') {
        return this.arr.join(join);
    }
}
//# sourceMappingURL=QRange.js.map