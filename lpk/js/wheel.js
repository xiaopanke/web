function wheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',_wheel,false);
	}else{
		obj.onmousewheel=_wheel;
	}
	
	function _wheel(ev){
		var oEvent=ev||event;
		var down=false;
		if(oEvent.detail){
			down=oEvent.detail>0?false:true;
		}else{
			down=oEvent.wheelDelta>0?true:false;
		}
		fn&&fn(down);
		oEvent.preventDefault&&oEvent.preventDefault();;
		return false;
	}
}