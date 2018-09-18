const TYPES = {  
    'undefined'        : 'undefined',  
    'number'           : 'number',  
    'boolean'          : 'boolean',  
    'string'           : 'string',  
    '[object Function]': 'function',  
    '[object RegExp]'  : 'regexp',  
    '[object Array]'   : 'array',  
    '[object Date]'    : 'date',  
    '[object Error]'   : 'error'  
};
export const isFunction = function(o) {  
    return type(o) === 'function';  
};  
  
function type(obj) {  
	try{
		
    return typeof obj === "object" || typeof obj === "function" ?
			TYPES[ {}.toString.call(obj) ] || "object" :
			typeof obj;
	}catch(e){
		console.log(e)
		//TODO handle the exception
	}
};  

export default type