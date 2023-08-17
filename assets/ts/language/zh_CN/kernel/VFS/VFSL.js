/**
 * @file            VFSL.ts
 * @name            VFSL
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     VFS语言
 * @Date            2023/8/16 10:24
 */
export var VFSL;
(function (VFSL) {
    VFSL["type"] = "\u865A\u62DF\u6587\u4EF6\u7CFB\u7EDF";
    VFSL["lsTypeError"] = "ls\u547D\u4EE4\u7C7B\u578B\u9519\u8BEF";
    VFSL["cdError"] = "\u8FD9\u4E2A\u5730\u5740/\u6587\u4EF6\u4E0D\u662F\u76EE\u5F55";
    VFSL["cdIsError"] = "\u6CA1\u6709\u8FD9\u4E2A\u76EE\u5F55";
    VFSL["cdSuccess"] = "\u8FDB\u5165\u8BE5\u76EE\u5F55\u6210\u529F";
    VFSL["mkdirRemainError"] = "\u5DF2\u5B58\u5728\u8BE5\u76EE\u5F55";
    VFSL["mkdirSuccess"] = "\u521B\u5EFA\u76EE\u5F55\u6210\u529F";
    VFSL["mkdirError"] = "\u521B\u5EFA\u76EE\u5F55\u5931\u8D25";
    VFSL["rmdirNotError"] = "\u8BE5\u6587\u4EF6\u4E0D\u662F\u76EE\u5F55";
    VFSL["rmdirSuccess"] = "\u5220\u9664\u76EE\u5F55\u6210\u529F";
    VFSL["rmdirError"] = "\u5220\u9664\u76EE\u5F55\u5931\u8D25";
    VFSL["rmdirQuantitiesError"] = "rmdir\u53EA\u80FD\u5220\u9664\u7A7A\u76EE\u5F55\uFF0C\u5982\u6709\u5185\u5BB9\uFF0C\u8BF7\u7528rm\u547D\u4EE4";
    VFSL["fileNotFound"] = "\u6587\u4EF6\u4E0D\u5B58\u5728";
    VFSL["isPathNotFound"] = "\u8BE5\u8DEF\u5F84\u4E0D\u5B58\u5728";
    VFSL["isPathSearchError"] = "isPath\u65B9\u6CD5\u641C\u7D22\u5931\u8D25";
    VFSL["isPathSuccess"] = "\u8BE5\u8DEF\u5F84\u5B58\u5728";
    VFSL["isFileSearchError"] = "isFile\u65B9\u6CD5\u641C\u7D22\u5931\u8D25";
    VFSL["isFileNotFound"] = "\u8BE5\u6587\u4EF6/\u76EE\u5F55\u4E0D\u5B58\u5728";
    VFSL["isFileSuccess"] = "\u8BE5\u6587\u4EF6/\u76EE\u5F55\u5B58\u5728";
    VFSL["lsSearchError"] = "ls\u65B9\u6CD5\u641C\u7D22\u5931\u8D25";
    VFSL["lsSuccess"] = "\u5217\u8868\u6570\u636E\u83B7\u53D6\u6210\u529F";
})(VFSL || (VFSL = {}));
//# sourceMappingURL=VFSL.js.map