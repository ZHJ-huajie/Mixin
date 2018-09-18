import type from './type'
/**
 * 创建Dom节点
 * @param {Object} elem
 * @param {Object} classNames
 * @param {Object} text
 */
export function creatElement (elem,classNames,text){
	var newNode  = document.createElement(elem);
	if(type(classNames) === 'array'){
		newNode.className = classNames.join(' ');
	}else if(type(classNames) === 'string'){
		newNode.className = classNames;
	}
	if(text){
		newNode.innerHTML = text;
	}
	return newNode
}
/**
 * 设置css样式
 * @param {Object} elem 
 * @param {Object} attr
 * @param {Object} value 数值要加px
 */
export function setStyles (elem,attr,value){
	if(type(attr) === 'string'){
		attr = camelCase(attr);
		if(value){
			elem.style[attr] = '';
			elem.style[attr] = value;
		}else{return}
	}else if(type(attr) === 'object'){
		for(var key in attr){
			var name = camelCase(key);
			elem.style[key] = '';
			elem.style[key] = attr[key];
		}
	}
}
/**
 * 将style属性转成驼峰格式
 * @param {Object} str
 */
export function camelCase(str){
	var rdashAlpha = /-([a-z]|[0-9])/ig,
		rmsPrefix = /^-ms-/;
	return str.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}

function fcamelCase( all, letter ) {
    return ( letter + "" ).toUpperCase();
}
/**
 * 模仿jQuery查询元素
 * @param {Object} elem
 */
export function $(elem){
	return document.querySelectorAll(elem)
}
/**
 * 获取元素的样式（已添加进DOM的）
 * @param {Object} elem
 * @param {Object} name
 */
export function getStyles(elem,name) {
	return elem.ownerDocument.defaultView.getComputedStyle( elem, null )[ name ];
}

/**
 * 动画淡出
 * @param {Object} elem 动画元素
 * @param {Object} during	动画时间长度
 */
export function fadeOut(elem,during,callback){
	var setp = 1/(during/13);
	elem.style.opacity = 1;
	var timerId = setInterval(function(){
		elem.style.opacity -= setp;
		if(elem.style.opacity <= 0){
			clearInterval(timerId);
			if(callback){
				callback();
			}
		}
	},13)
	
}
/**
 * 动画淡入
 * @param {Object} elem 动画元素
 * @param {Object} during	动画时间长度
 */
export function fadeIn(elem,during){
	var setp = 1/(during/13);
	elem.style.opacity = 0;
	var timerId = setInterval(function(){
		elem.style.opacity = parseInt(elem.style.opacity*100)/100+setp;
		if(elem.style.opacity >= 1){
			clearInterval(timerId)
		}
	},13)
	
}

