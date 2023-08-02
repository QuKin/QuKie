/**
 * @name          QFetch
 * @version       1.0
 * @author        QuKie <13606184008@163.com>
 * @description   Fetch封装
 * @Date          2022-11-26 12:29:09
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-02 15:32:12
 */


/**
 * 使用接口
 * const postUser=(params)=>QFetch('user',params,'post','localhost/api/v1/')
 */
export default async (url = '', data = {}, type = 'GET', baseUrl = "localhost/") => {
    url = baseUrl + url;
    // 变小写
    type = type.toUpperCase();

    if (type == 'GET') {
        let dataString = '';
        Object.keys(data).forEach(key => {
            dataString += key + '=' + data[key] + '&';
        })
        if (dataString !== '') {
            dataString = dataString.substr(0, dataString.lastIndexOf('&'));
            url = url + '?' + dataString;
        }
    }
    let config = {
        credentials: 'same-origin',
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // 是否跨域：no-cors, *cors, same-origin
        mode: "cors",
        // 是否缓存资源： *default, no-cache, reload, force-cache, only-if-cached
        cache: "force-cache"
    }

    if (type == 'POST') {
        Object.defineProperty(config, 'body', {
            value: JSON.stringify(data)
        })
    }
    try {
        const response = await fetch(url, config);
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        throw new Error(error)
    }
}
