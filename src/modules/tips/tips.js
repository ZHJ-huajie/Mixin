require('./tips.css')
import type from '../type'
import extend from '../extend'
import { creatElement, setStyles, camelCase, $, getStyles, fadeOut, fadeIn } from '../tools'

function tips(elem,opts){
	
	var opt = {
		'content'   : '',	//内容
		'position'	: 'top',//定位
		'width'     : 'auto', //宽度
		'height'    : 'auto', //高度
		"className" : '', //添加类名light
		'time'    	: null, //自动关闭时间（默认不关闭）
		'event'		: 'hover',	//触发气泡的事件，hover：浮上，click：点击
		'zIndex'	: null,	//层叠值
		'success'	:function(){},	//成功回调
		'close'	:function(){}	//关闭回调
	}
	
	//传入字符串
	if(type(opts) === 'object'){
		// 参数合并
		var option = extend({},opt,opts);
	}else{
		var option = opt;
		opt.shade = false;
		option.content = opts;
	}
	if(option.event == 'hover'){
		option.showEvent = 'mouseenter';
		option.hideEvent = 'mouseleave';
	} else if(option.event == 'click'){
		option.showEvent = option.hideEvent = 'click';
	}
	
	if(elem.nodeType){
		creatTips(elem);
	} else {
		var $elem = $(elem);
		for (var i = 0; i < $elem.length; i++) {
			creatTips($elem[i]);
		}
	}
	
	
	/**
	 * 创建tips节点
	 * @param {Object} elem
	 */
	function creatTips(elem){
		var $container = creatElement('div','mixin-tips-container '+option.className);
		var $content = creatElement('div','mixin-tips-content');
		$content.innerHTML = type(option.content) == 'function' ? option.content(elem) : option.content;
		$container.appendChild($content);
		//节点的是相对定位设置成relative
		var position = getStyles(elem,'position')
		if(position != 'absolute' && position != 'relative' && position != 'fixed'){
			setStyles(elem,'position','relative');
		}
		setStyles($container,{
			width:option.width,
			height:option.height,
			zIndex:option.zIndex
		})
		elem.appendChild($container);
		elem.addEventListener(option.showEvent,bindShowEvent,false);
	
	
		function bindShowEvent(e){
			var ev = e || event;
			
			setStyles($container,'display','block')
			
			var topStyle = {
					top: '-'+$container.clientHeight+'px',
					bottom: 'auto',
					left: '50%',
					right: 'auto',
					marginLeft: '-'+$container.clientWidth/2+'px'
				},
				bottomStyle = {
					top: 'auto',
					bottom: '-'+$container.clientHeight+'px',
					left: '50%',
					right: 'auto',
					marginLeft: '-'+$container.clientWidth/2+'px'
				},
				leftStyle = {
					top: '50%',
					bottom: 'auto',
					left: '-'+$container.clientWidth+'px',
					right: 'auto',
					marginTop: '-'+$container.clientHeight/2+'px'
				},
				rightStyle = {
					top: '50%',
					bottom: 'auto',
					left: 'auto',
					right: '-'+$container.clientWidth+'px',
					marginTop: '-'+$container.clientHeight/2+'px'
				};
				
			
			switch (option.position){
				case 'bottom':
					if((ev.clientY - ev.offsetY) > $container.clientHeight&&(window.innerHeight-(ev.clientY-ev.offsetY+ev.target.clientHeight))<$container.clientHeight){
						$container.className = 'mixin-tips-container arrow-top '+option.className;
						setStyles($container,topStyle)
					}else{
						$container.className = 'mixin-tips-container  arrow-bottom '+option.className;
						setStyles($container,bottomStyle)
					}
					break;
				case 'left':
					if((ev.clientX - ev.offsetX) < $container.clientWidth&&(window.innerWidth-40-(ev.clientX-ev.offsetX+ev.target.clientWidth))>$container.clientWidth){
						$container.className = 'mixin-tips-container arrow-right '+option.className;
						setStyles($container,rightStyle)
					}else{
						$container.className = 'mixin-tips-container  arrow-left '+option.className;
						setStyles($container,leftStyle)
					}
					break;
				case 'right':
					if((ev.clientX - ev.offsetX) > $container.clientWidth&&(window.innerWidth-40-(ev.clientX-ev.offsetX+ev.target.clientWidth))<$container.clientWidth){
						$container.className = 'mixin-tips-container arrow-left '+option.className;
						setStyles($container,leftStyle)
					}else{
						$container.className = 'mixin-tips-container  arrow-right '+option.className;
						setStyles($container,rightStyle)
					}
					break;
				default:
					if((ev.clientY - ev.offsetY) < $container.clientHeight&&(window.innerHeight-(ev.clientY-ev.offsetY+ev.target.clientHeight))>$container.clientHeight){
						$container.className = 'mixin-tips-container arrow-bottom '+option.className;
						setStyles($container,bottomStyle)
					}else{
						$container.className = 'mixin-tips-container  arrow-top '+option.className;
						setStyles($container,topStyle)
					}
					break;
			}
			fadeIn($container,300);
			option.success(elem,$container);
			if(option.time){
				setTimeout(() => {
					fadeOut($container,300,function(){
						setStyles($container,'display','none');
						option.close(elem,$container);
					})
				},option.time)
			}
			elem.removeEventListener(option.showEvent,bindShowEvent);
			elem.addEventListener(option.hideEvent,bindHideEvent,false)
		}
		
		function bindHideEvent(){
			fadeOut($container,300,function(){
				setStyles($container,'display','none');
				option.close(elem,$container);
				elem.removeEventListener(option.hideEvent,bindHideEvent)
				elem.addEventListener(option.showEvent,bindShowEvent,false);
			})
		}
	}
}



export default tips