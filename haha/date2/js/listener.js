var href = document.getElementsByTagName("label");
var count = href.length;
if(count>0){
	for(var i=0; i<count;i++){
		var url = href.item(i);
		if(url.hasAttribute("data-url")){
			href.item(i).addEventListener("click",function(){
				location.href = this.getAttribute("data-url");
				this.blur();
			},false);
		}
		
	}
}