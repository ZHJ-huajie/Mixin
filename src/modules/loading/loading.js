require('./loading.css')

loading.index = 0;

function loading(type){
	var type = type || 1;
	if(document.getElementById("mixin-loading" + loading.index)){
		return loading.index;
	}
	loading.index ++;
	var wrap = document.createElement("div");
	wrap.className = "mixin-loading";
	if(type == 2){
		wrap.className += " mixin-loading2";
	}
	wrap.setAttribute("id","mixin-loading"+loading.index);
	document.querySelector("body").appendChild(wrap)
	return loading.index;
}

loading.close = function(index){
	var loadingElem = document.getElementById("mixin-loading" + loading.index)
	if(loadingElem){
		try{
			loadingElem.remove();
		}catch(e){
			loadingElem.removeNode();
		}
	}
}

export default loading