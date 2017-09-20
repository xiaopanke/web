;(function(){
	if("id" in window.console && obj.id == "com.czzdit")
		return;
	
	
	/* style */
	var styleObj = document.createElement("style");
	styleObj.type = "text/css";
	styleObj.innerHTML = ".console{position: fixed; z-index: 9999; left: 0; top: 2em;width: 100%; height: 64px; overflow: auto; opacity: 0.7; background: white; word-wrap: break-word; word-break: break-all;}" +
		".console > div{padding: 0.2em;}" +
		".console > div:nth-child(even){background: #EEEEEE}" +
		".console > div > .line-number{display: inline-block; width: 2em}" +
		".toolbox{position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 2em; line-height: 2em; opacity: 0.7; background: #AAAAAA;}" +
		".toolbox > .btn{display: inline-block; height: 100%; border-radius: 0.2em; padding: 0 0.5em; border-left: solid 1px white;}" +
		".toolbox > .btn:nth-child(1){border-left: none;}";
	document.head.appendChild(styleObj);
	
	/* wrapper */
	var domObj = document.createElement("div");
	domObj.className = "console";
	document[document.body? "body": "documentElement"].appendChild(domObj);
	
	var index = 1;
	var log = function(){
		var s = "";
		for(var i = 0; i < arguments.length; i++)
			s += ", " + arguments[i];
		s = s.length > 0? s.substring(1): s;
		
		var wrapper = document.createElement("div");
		var lineNumObj = document.createElement("span");
		lineNumObj.className = "line-number";
		lineNumObj.innerHTML = index++;
		
		wrapper.appendChild(lineNumObj);
		wrapper.appendChild(document.createTextNode(s));
		domObj.appendChild(wrapper);
	};
	
	var warn = function(){
		var s = "";
		for(var i = 0; i < arguments.length; i++)
			s += ", " + arguments[i];
		s = s.length > 0? s.substring(1): s;
		
		var wrapper = document.createElement("div");
		wrapper.style.cssText = "color: yellow";
		var lineNumObj = document.createElement("span");
		lineNumObj.className = "line-number";
		lineNumObj.innerHTML = index++;
		
		wrapper.appendChild(lineNumObj);
		wrapper.appendChild(document.createTextNode(s));
		domObj.appendChild(wrapper);
	};
	
	var error = function(){
		var s = "";
		for(var i = 0; i < arguments.length; i++)
			s += ", " + arguments[i];
		s = s.length > 0? s.substring(1): s;
		
		var wrapper = document.createElement("div");
		wrapper.style.cssText = "color: red";
		var lineNumObj = document.createElement("span");
		lineNumObj.className = "line-number";
		lineNumObj.innerHTML = index++;
		
		wrapper.appendChild(lineNumObj);
		wrapper.appendChild(document.createTextNode(s));
		domObj.appendChild(wrapper);
	};
	
	var clear = function(){
		domObj.innerHTML = "";
		index = 1;
	};
	
	/* 工具栏 */
	var toolBoxObj = document.createElement("div");
	toolBoxObj.className = "toolbox";
	/* 工具按钮：清空控制台 */
	var toolClearObj = document.createElement("span");
	toolClearObj.innerHTML = "清空";
	toolClearObj.className = "btn";
	toolClearObj.addEventListener("touchstart", clear);
	toolBoxObj.appendChild(toolClearObj);
	/* 工具按钮：显示/隐藏控制台 */
	var toolHideObj = document.createElement("span");
	toolHideObj.state = "closed";
	toolHideObj.innerHTML = "显示";
	toolHideObj.className = "btn";
	toolHideObj.addEventListener("touchstart", function(){
		if(this.state == "open"){
			domObj.style.display = "none";
			this.state = "closed";
			this.innerHTML = '显示';
		}else{
			domObj.style.display = "block";
			this.state = "open";
			this.innerHTML = '隐藏';
		}
	});
	toolBoxObj.appendChild(toolHideObj);
	document[document.body? "body": "documentElement"].appendChild(toolBoxObj);
	/* 工具按钮：半透明控制 */
	// var toolOpacityObj = document.createElement("input");
	// toolOpacityObj.style.cssText = "vertical-align: middle;";
	// toolOpacityObj.type = "checkbox";
	// toolOpacityObj.checked = true;
	// var toolOpacityLabelObj = document.createElement("label");
	// toolOpacityLabelObj.style.cssText = "display: inline-block; height: 100%; padding: 0 0.5em;";
	// toolOpacityLabelObj.innerHTML = "半透明";
	var toolOpacityWrapperObj = document.createElement("span");
	toolOpacityWrapperObj.style.cssText = "position: absolute; display: inline-block; height: 100%; padding: 0; right: 0";
	// var _toogleOpacity = function(e){
	// 	if(!toolOpacityObj.checked){
	// 		domObj.style.opacity = "0.7";
	// 		toolBoxObj.style.opacity = "0.7";
	// 		toolOpacityObj.checked = true;
	// 	}else{
	// 		domObj.style.opacity = "1";
	// 		toolBoxObj.style.opacity = "1";
	// 		toolOpacityObj.checked = false;
	// 	}
		
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// };
	// toolOpacityWrapperObj.addEventListener("touchstart", _toogleOpacity, true);
	// toolOpacityWrapperObj.appendChild(toolOpacityObj);
	// toolOpacityWrapperObj.appendChild(toolOpacityLabelObj);
	toolBoxObj.appendChild(toolOpacityWrapperObj);
	/* 工具按钮：位置控制 */
	var toolPositionObj = document.createElement("span");
	toolPositionObj.state = "top";
	toolPositionObj.innerHTML = "保存图像";
	toolPositionObj.className = "save";
	// toolPositionObj.addEventListener("touchstart", function(){
	// 	if(this.state == "top"){
	// 		toolBoxObj.style.top = "100%";
	// 		toolBoxObj.style.marginTop = "-2em";
	// 		domObj.style.top = "0";
			
	// 		this.state = "bottom";
	// 		this.innerHTML = '顶部';
	// 	}else{
	// 		toolBoxObj.style.top = "0";
	// 		toolBoxObj.style.marginTop = "0";
	// 		domObj.style.top = "2em";
			
	// 		this.state = "top";
	// 		this.innerHTML = '底部';
	// 	}
	// });
	toolBoxObj.appendChild(toolPositionObj);
	
	var obj = {};
	Object.defineProperty(obj, "id", {value: "com.czzdit", configurable: false, enumerable: false, writable: false});
	obj.log = log;
	obj.warn = warn;
	obj.error = error;
	obj.clear = clear;
	window.console = obj;
})();