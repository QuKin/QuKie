/**
 * @name            IQAjax
 * @version         1.0
 * @author          QuKie <13606184008@163.com>
 * @description     QAjax接口
 * @Date            2023/8/7 9:51
 */
export default interface IQAjax{
    method: string;
    url: string;
    data: object | null | string;
    success: Function;
    error: Function;
    async: boolean;
    QAjaxs: any;

    params(data): string;
}