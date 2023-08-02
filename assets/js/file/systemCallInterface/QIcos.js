/**
 * @name          QIcos
 * @description   根据后缀，返回图标地址
 * @version       1.0
 * @author        QuKin
 * @Date          2022-11-07 20:41:20
 * @LastEditors   QuKin
 * @LastEditTime  2022-11-19 14:51:46
 */

/**
 * 根据后缀，返回图标地址
 * @param {String} name 文件名
 * @returns {String}
 */
export const ico = (name) => {
	let suffix = name.split('.')[name.split('.').length - 1]
	switch (suffix) {
		case 'js': return 'suffix/application-javascript.svg';
		case 'json': return 'suffix/application-json.svg';
		case 'pdf': return 'suffix/application-pdf.svg';
		case 'anki': return 'suffix/application-x-anki.svg';
		case 'bittorrent': return 'suffix/application-x-bittorrent.svg';
		case 'deb': return 'suffix/application-x-deb.svg';
		case 'iso': return 'suffix/application-x-iso.svg';
		case 'plasma': return 'suffix/application-x-plasma.svg';
		case 'ruby': return 'suffix/application-x-ruby.svg';
		case 'theme': return 'suffix/application-x-theme.svg';
		case 'zip': return 'suffix/application-zip.svg';
		case 'mp3': return 'suffix/audio-x-generic.svg';
		case 'jpg': case 'png': case 'jpeg': case 'gif': case 'bmp': return 'suffix/image-x-generic.svg';
		case 'svg': case 'xml': return 'suffix/image-x-svg+xml.svg';
		case 'html': return 'suffix/text-html.svg';
		case 'c++': case 'cpp': return 'suffix/text-x-c++.svg';
		case 'c++hdr': return 'suffix/text-x-c++hdr.svg';
		case 'csrc': return 'suffix/text-x-csrc.svg';
		case 'css': return 'suffix/text-x-css.svg';
		case 'lisp': return 'suffix/text-x-emacs-lisp.svg';
		case 'txt': return 'suffix/text-x-generic.svg';
		case 'java': return 'suffix/text-x-java.svg';
		case 'md': return 'suffix/text-x-markdown.svg';
		case 'py': return 'suffix/text-x-python.svg';
		case 'sass': return 'suffix/text-x-sass.svg';
		case 'sh': return 'suffix/text-x-script.svg';
		case 'docx': return 'suffix/x-office-document.svg';
		case 'xlsx': return 'suffix/x-office-spreadsheet.svg';
	}
}