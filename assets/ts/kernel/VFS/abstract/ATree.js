/**
 * @file            ATree.ts
 * @copyright       QuKie 2023
 * @version         1.0.0
 * @author          QuKie <13606184008@163.com>
 * @description     树型结构抽象，教程：https://juejin.cn/post/7123844106517741599、https://blog.csdn.net/weixin_38845058/article/details/103777581
 * @Date            2023/8/15 13:17
 */
export default class ATree {
    /**
     * 扁平化转换成树形结构
     * @param {any[]} list 列表
     */
    toTree(list) {
        let treeData = [];
        let map = {};
        list.forEach(function (item) {
            map[item.id] = item;
        });
        list.forEach(function (item) {
            let parent = map[item.pid];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            }
            else {
                treeData.push(item);
            }
        });
        return treeData;
    }
    /**
     * 当前节点查找单个
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     */
    search(data, val, key = 'id') {
        const queue = JSON.parse(JSON.stringify(data));
        while (queue.length) {
            const len = queue.length;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                if (node[key] === val) {
                    return node;
                }
                else {
                    node.children && queue.push(...node.children);
                }
            }
        }
        return null;
    }
    /**
     * 获取当前节点及以下的所有节点的某个键名
     * 一般是size大小
     * @param {any[]} data 数据
     * @param {string} key 键名
     */
    getChildren(data, key) {
        const idArr = [];
        const queue = JSON.parse(JSON.stringify(data));
        while (queue.length) {
            const len = queue.length;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                idArr.push(node[key]);
                node.children && queue.push(...node.children);
            }
        }
        return idArr;
    }
    /**
     * 判断是否存在
     * @param {any[]} data 数据
     * @param {any[]} val 键值
     * @param {string} [key=id] 键名
     */
    isTree(data, val, key = 'id') {
        const queue = JSON.parse(JSON.stringify(data));
        while (queue.length) {
            const len = queue.length;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                if (val.includes(node[key])) {
                    return true;
                }
                else {
                    node.children?.length && queue.push(...node.children);
                }
            }
        }
        return false;
    }
    /**
     * 树形结构转换扁平化
     * @param {any[]} data
     */
    toFlat(data) {
        const queue = JSON.parse(JSON.stringify(data));
        const result = [];
        while (queue.length) {
            const node = queue.shift();
            if (node.children?.length) {
                queue.push(...node.children);
                Reflect.deleteProperty(node, "children");
            }
            result.push(node);
        }
        return result;
    }
    /**
     * 查找当前节点的父节点
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     */
    getParent(data, val, key = 'id') {
        const queue = JSON.parse(JSON.stringify(data));
        while (queue.length) {
            const len = queue.length;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                const childIdArr = (node.children || []).map((el) => el[key]);
                if (childIdArr.includes(val)) {
                    return node;
                }
                else {
                    node.children?.length && queue.push(...node.children);
                }
            }
        }
        return null;
    }
    /**
     * 查找当前节点的所有父节点
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     */
    getAllParent(data, val, key = 'id') {
        const arr = [];
        const fn = (data, val) => {
            const p = this.getParent(data, val, key);
            if (p && p[key]) {
                arr.push(p);
                fn(data, p[key]);
            }
        };
        fn(data, val);
        return arr;
    }
    /**
     * 深度层级
     * @param {any[]} data 数据
     * @returns {number}
     */
    getDeepRank(data) {
        let deepRank = 0;
        const queue = JSON.parse(JSON.stringify(data));
        while (queue.length) {
            const len = queue.length;
            deepRank++;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                node.children?.length && queue.push(...node.children);
            }
        }
        return deepRank;
    }
    /**
     * 当前节点查找多个
     * @param {any[]} data 数据
     * @param {string|number} val 键值
     * @param {string} [key=id] 键名
     * @param {any[]} [arr=[]] 不填，递归使用
     */
    searchAll(data, val, key = 'id', arr = []) {
        data.forEach((el) => {
            if (el[key] === val) {
                // 筛选条件
                const newNode = {
                    ...el,
                    children: [],
                };
                arr.push(newNode);
                el.children?.length && this.searchAll(el.children, val, key, newNode.children);
            }
        });
        return arr;
    }
}
//# sourceMappingURL=ATree.js.map