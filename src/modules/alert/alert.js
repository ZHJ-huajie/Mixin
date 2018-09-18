import type from '../type'
import extend from '../extend'
import { creatElement, setStyles, camelCase, $, getStyles, fadeOut } from '../tools'
require('./alert.css')

extend(alert,{
	index: 0,
	zIndex: 1000,
	timeId: [],
})
function alert(opts){
	//禁止重复弹出
	if(document.getElementById('mixin-alert' + alert.index)){
		for (var i = 0; i < alert.timeId.length; i++) {
			clearTimeout(alert.timeId[i]);
			alert.timeId.splice(i,1)
		}
		try{
			document.getElementById('mixin-alert' + alert.index).remove();
		}catch(e){
			document.getElementById('mixin-alert' + alert.index).removeNode();
		}
	}
	alert.index++;
	// 设置默认参数
	var opt = {
		'style'        : 'pc', //移动端和PC端
		'title'        : '',    //标题
		'content'      : '',	//内容
		'contentTextAlign' : 'center', //内容对齐方式
		'width'        : 'auto', //宽度
		'height'       : 'auto', //高度
		'minWidth'     : '0', //最小宽度
		"className"    : '', //添加类名
		'anim'  : '0',	//动画0,1
		'shade'        : true, //是否存在蒙层
		'shadeClose'   : false, //点击蒙层是否关闭
		'bodyScroll'   : false, //是否关闭body的滚动条
		'time'    	   : 3000, //当没有按钮时关闭时间
		'closeBtn'	   : '',	//关闭按钮
		'zIndex'	   : null,	//层叠值
		'buttons'      : {}, //按钮对象</pre>
		'success'	   :function(){},	//成功回调
		'cancel'	   :function(){}	//关闭回调
	}
	//传入字符串
	if(type(opts) === 'string'){
		var option = opt;
		opt.shade = false;
		option.content = opts;
	}else{
		// 参数合并
		var option = extend({},opt,opts);
	}
	switch (option.anim){
		case 0:
			option.animateType = 'scale'
			break;
		case 1:
			option.animateType = 'linear'
			break;
		default:
			option.animateType = 'scale'
			break;
	}
	
	if(option.title && option.closeBtn+'' != 'false'){
		option.closeBtn = true;
	}

	var dialog = {

	}

	dialog.time = 450;//动画关闭时间
	dialog.init = function(){
		dialog.framework();
	}

	// 事件处理
//	var isHaveTouch = "ontouchend" in document ? true : false;
//	if(isHaveTouch){
//		dialog.event = 'touchstart';
//	}else{
		dialog.event = 'click';
//	}

	var $shade = creatElement('div','alert-shade')
	var $container = creatElement('div','alert-container animated');
	var $title = creatElement('div','alert-title',option.title);
	var $content = creatElement('div','alert-content');
	var $buttonBox = creatElement('div','alert-btn-box');
	var $closeBtn = creatElement('a','alert-btn-close','×');
	//设置id
	$container.setAttribute('id','mixin-alert' + alert.index)
	$shade.setAttribute('id','mixin-alert-shade')
	//content 传入的是模板
	if(option.content.nodeType == 1){
		var $newContent = option.content.cloneNode(true);
		$content.appendChild($newContent)
	}else{
		$content.innerHTML += option.content;
	}
	
	if(option.title || option.buttons.length>0){
		$container.style.minWidth = '260px';
	}

	dialog.framework = function(){

		dialog.buttons = [];
		for(var key in option.buttons){
			dialog.buttons.push(key);
		}
		dialog.buttonsLength = dialog.buttons.length;
		if(option.title || option.closeBtn)
			$container.appendChild($title);
		$container.appendChild($content);

		if(option.closeBtn){
			$container.appendChild($closeBtn)
			$closeBtn.addEventListener(dialog.event,() => alert.close(alert.index))
		}
		
		if(option.style == 'pc'){
			$container.className += ' pcAlert';
		}
		if(option.shade || option.shade == 'true'){
			$('body')[0].appendChild($shade)
			option.bodyScroll && setStyles($('body')[0],'overflow','hidden');
		}
		$('body')[0].appendChild($container)
		if(parseInt(option.minWidth) > parseInt(getStyles($container,'width'))){
			option.width = option.minWidth;
		}

		setStyles($shade,'position',option.position);
		option.zIndex ? setStyles($shade,'z-index',option.zIndex)
		:setStyles($shade,'z-index',alert.zIndex);

		++alert.zIndex;
		
		
		setStyles($container,'width',option.width);
//		if((window.innerWidth*0.79) <=  parseInt(getStyles($container,'width'))){
//			setStyles($container,'width','80vh')
//		}
		setStyles($container,'height',option.height);
		if((window.innerHeight*0.79) <=  parseInt(getStyles($container,'height'))){
			setStyles($container,'height','80vh')
		}

		// 设置class
		(!!option.className) && ($container.className += (' '+ option.className));

	    // 设置button内容
		for(var key in option.buttons){

			var $button = creatElement('a','alert-btn',key);
			if(option.style != 'pc'){
				setStyles($button,'width',(Math.floor(($container.clientWidth) / dialog.buttonsLength) + 'px'))
			}
			//绑定点击后的事件
			$button.addEventListener(dialog.event,() => {option.buttons[key](alert.index,$container)});
			$buttonBox.appendChild($button);

		}

		if(dialog.buttonsLength > 0){
			$container.appendChild($buttonBox);
		}

		if(dialog.buttonsLength <= 0 && option.title == ''){
			$container.className += ' alert-container-black';
		}
		 // 设置定位
		setStyles($container,{
			'left' : (window.innerWidth-parseInt(getStyles($container,'width')))/2 + 'px',
			'top' : (window.innerHeight-parseInt(getStyles($container,'height')))/2 + 'px',
			'zIndex' : alert.zindex
		})
		//解决定位不准bug
		setStyles($container,{
			'left' : (window.innerWidth-parseInt(getStyles($container,'width')))/2 + 'px',
			'top' : (window.innerHeight-parseInt(getStyles($container,'height')))/2 + 'px',
		})
		window.onresize = function(){
			setStyles($container,{
				'left' : (window.innerWidth-parseInt(getStyles($container,'width')))/2 + 'px',
				'top' : (window.innerHeight-parseInt(getStyles($container,'height')))/2 + 'px',
				'zIndex' : alert.zindex
			})
		}

		if(option.animateType == 'scale'){
			$container.className += ' bounceIn';
		}

		if(option.animateType == 'linear'){
			$container.className += ' linearTop';
		}
		
		isSelfClose($container,$shade);

	};

	// 判断是否满足自动关闭的条件
	function isSelfClose(container,shade){
		if(dialog.buttonsLength <= 0){
			var timeId = setTimeout(function(){
				fadeOut(container,300);
				fadeOut(shade,300);
				alert.close(alert.index);
			},option.time)
			alert.timeId.push(timeId)
		}
	}

	dialog.toggleAnimate = function(elem){
		var className = elem.className;
		if(className.indexOf('linearTop') != -1){
			elem.className = className.replace('linearTop','linearBottom')
		}else {
			elem.className = className.replace('bounceIn','bounceOut')
		}
	}

	option.shadeClose && $shade.addEventListener(dialog.event,() => alert.close(alert.index));

	alert.close = function(index){
		var elem = document.getElementById('mixin-alert' + index);
		dialog.toggleAnimate(elem)
		fadeOut(elem,dialog.time);
		var timeId = setTimeout(function(){
			try{
				elem.remove();
			}catch(e){
				elem.removeNode();
			}
			if(option.shade){
				try{
					document.getElementById("mixin-alert-shade").remove();
				}catch(e){
					document.getElementById("mixin-alert-shade").removeNode();
				}
			}
			option.bodyScroll && setStyles($('body')[0],'overflow','auto');
			option.cancel(alert.index,$container);
		},dialog.time)
		alert.timeId.push(timeId)
	}

	dialog.init();
	option.success(alert.index,$container);
	
	return alert.index;

}

export default alert
