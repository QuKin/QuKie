/**
 * @name          QIcos
 * @description   根据后缀，返回图标地址
 * @version       1.0
 * @author        QuKie
 * @Date          2022-11-07 20:41:20
 * @LastEditors   QuKie
 * @LastEditTime  2023-08-02 13:22:53
 */

/**
 * 根据后缀，返回图标地址
 * @param {String} name 文件名
 * @returns {String}
 */
export const ico = (name) => {
    let suffix = name.split('.')[name.split('.').length - 1]
    switch (suffix) {
        case 'js': return 'icon/types/application-javascript.svg';
        case 'json': return 'icon/types/application-json.svg';
        case 'pdf': return 'icon/types/application-pdf.svg';
        case 'anki': return 'icon/types/application-x-anki.svg';
        case 'bittorrent': return 'icon/types/application-x-bittorrent.svg';
        case 'deb': return 'icon/types/application-x-deb.svg';
        case 'iso': return 'icon/types/application-x-iso.svg';
        case 'plasma': return 'icon/types/application-x-plasma.svg';
        case 'ruby': return 'icon/types/application-x-ruby.svg';
        case 'theme': return 'icon/types/application-x-theme.svg';
        case 'zip': return 'icon/types/application-zip.svg';
        case 'mp3': return 'icon/types/audio-x-generic.svg';
        case 'jpg': case 'png': case 'jpeg': case 'gif': case 'bmp': return 'icon/types/image-x-generic.svg';
        case 'svg': case 'xml': return 'icon/types/image-x-svg+xml.svg';
        case 'html': return 'icon/types/text-html.svg';
        case 'c++': case 'cpp': return 'icon/types/text-x-c++.svg';
        case 'c++hdr': return 'icon/types/text-x-c++hdr.svg';
        case 'csrc': return 'icon/types/text-x-csrc.svg';
        case 'css': return 'icon/types/text-x-css.svg';
        case 'lisp': return 'icon/types/text-x-emacs-lisp.svg';
        case 'txt': return 'icon/types/text-x-generic.svg';
        case 'java': return 'icon/types/text-x-java.svg';
        case 'md': return 'icon/types/text-x-markdown.svg';
        case 'py': return 'icon/types/text-x-python.svg';
        case 'sass': return 'icon/types/text-x-sass.svg';
        case 'sh': return 'icon/types/text-x-script.svg';
        case 'docx': return 'icon/types/x-office-document.svg';
        case 'xlsx': return 'icon/types/x-office-spreadsheet.svg';
    }
}