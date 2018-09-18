import {isFunction} from './type'

function extend(){
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// 判断是否是深度复制
	if ( typeof target === "boolean" ) {
		deep = target;

		// 第一个值为深度复制标志，跳过
		target = arguments[ i ] || {};
		i++;
	}

	// 判断 target 字符串或者深度复制的
	if ( typeof target !== "object" && !isFunction(target) ) {
		target = {};
	}

	// 如果只传一个值则扩展本身
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// 排除null/undefined
		if ( (options = arguments[ i ]) != null ) {
			// 扩展基本对象
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// 阻止死循环
				if ( target === copy ) {
					continue;
				}

				// 合并朴素函数
				if ( deep && copy && ( (typeof copy == 'object') || (copyIsArray = Array.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && (typeof src == 'object') ? src : {};
					}

					// 递归深度复制
					target[ name ] = extend( deep, clone, copy );

				// 跳过 undefined 的值
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}
//module.exports = extend
export default extend
