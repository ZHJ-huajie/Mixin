
import extend from '@/modules/extend'
import type from '@/modules/type'
import alert from '@/modules/alert/alert'
import loading from '@/modules/loading/loading'
import tips from '@/modules/tips/tips'

const option = {
	extend:extend,
	type:type,
	alert:alert,
	loading:loading,
	tips:tips,
	init (name,ready){
		const plugins = {
			laydate (){require.ensure([], () => {
				require("@/plugins/laydate/laydate.js")
				require("@/plugins/laydate/theme/default/laydate.css")
				laydate.path = window.location.href;
			})},
			swiper (){require.ensure([], () => {
				window.Swiper = require("@/plugins/swiper/swiper.min.js").Swiper
				require("@/plugins/swiper/swiper.min.css")
			})},
			vue (){require.ensure([], () => window.Vue = require("vue/dist/vue.js"))},
			clipboard (){require.ensure([], () => window.Clipboard = require("clipBoard"))},
			jquery (){require.ensure([], () => window.$ = window.jQuery = require("jquery"))},
		}
		if(type(name) == 'array'){
			for (var i = 0; i < name.length; i++) {
				try{
					plugins[name[i]]();
				}catch(e){
					throw('未定义插件'+name[i])
				}
			}
		}else{
			for (var i = 0; i < arguments.length - 1; i++) {
				try{
					plugins[arguments[i]]();
				}catch(e){
					throw('未定义插件'+name[i])
				}
			}
			var ready = arguments[arguments.length - 1];
		}
		window.onload = ready;
	},
	
}

window.mixin = function(elem){
	return document.querySelectorAll(elem)
} 
extend(window.mixin,option)
