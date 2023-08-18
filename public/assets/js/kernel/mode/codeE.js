/**
 * @name            CodeE
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     QApi返回编码语言
 * @Date            2023/8/7 8:21
 */
/**
 * code
 *  2**
 *      200：正常
 *
 *  4**
 *      404：没有
 *      405：空
 *
 *  5**
 *      501：错误
 *      502：类型错误
 *      503：范围错误
 *      504：参数错误
 */
export var CodeE
;(function (CodeE) {
  CodeE[(CodeE['Success'] = 200)] = 'Success'
  CodeE[(CodeE['NotFound'] = 404)] = 'NotFound'
  CodeE[(CodeE['EmptyValue'] = 405)] = 'EmptyValue'
  CodeE[(CodeE['Error'] = 501)] = 'Error'
  CodeE[(CodeE['TypeError'] = 502)] = 'TypeError'
  CodeE[(CodeE['RangeError'] = 503)] = 'RangeError'
  CodeE[(CodeE['ParametricError'] = 504)] = 'ParametricError'
})(CodeE || (CodeE = {}))
//# sourceMappingURL=codeE.js.map
