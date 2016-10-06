var oCarouse=document.getElementById('carouse');
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var oUl=oCarouse.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var oOl=oCarouse.getElementsByTagName('ol')[0];
	var aBtn=oOl.children;
	
	var iNow=0;
	
	//复制一份内容
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
	
	var W=oUl.offsetWidth/2;
	
	//选项卡
	for(var i=0; i<aBtn.length; i++){
		(function(index){
			aBtn[i].onclick=function(){
				if(iNow%aBtn.length==aBtn.length-1 && index==0){
					iNow++;	
				}
				if(iNow%aBtn.length==0 && index==aBtn.length-1){
					iNow--;	
				}
				iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
				tab();
			}
		})(i);
	}
	function tab(){
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].className='';
		}
		if(iNow<0){
			aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='active';
		}else{
			aBtn[iNow%aBtn.length].className='active';	
		}
		//oUl.style.left=-iNow*aLi[i].offsetWidth+'px';
		move(oUl,-iNow*aLi[i].offsetWidth);	
	}
	var timer=null;
	timer=setInterval(function(){
		iNow++;
		tab();
	},3000);
	//next
	oNext.onclick=function(){
		iNow++;
		tab();
	};
	oPrev.onclick=function(){
		iNow--;
		tab();
	};
	var left=0;
	function move(obj,iTarget){
		var count=Math.round(500/30);
		var start=left;
		var dis=iTarget-start;
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			var a=1-n/count;
			left=start+dis*(1-Math.pow(a,3));
			
			if(left<0){
				obj.style.left=left%W+'px';	
			}else{
				obj.style.left=(left%W-W)%W+'px';	
			}
			if(n==count){
				clearInterval(obj.timer);	
			}
		},30);
	}
window.onscroll=function(){
	var oFixBox=document.getElementById('fixed');
	var oFixUl=oFixBox.getElementsByTagName('ul')[0];
	var aFixLi=oFixUl.children;
	var clientHeight=document.documentElement.clientHeight;

	for(var i=0;i<aFixLi.length;i++){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop+350>=getPos(aFixLi[i]).top){
			aFixLi[i].className='cur';
		}else{
			aFixLi[i].className='';
		}
	}
	function getPos(obj){
		var top=0;
		var left=0;
		while(obj){
			top+=obj.offsetTop;
			left+=obj.offsetLeft;
			obj=obj.offsetParent;
		}
		return {top:top,left:left};
	}
}
var oBtn1=document.getElementById('js-product');
var oBtn2=document.getElementById('js-contact');
var oBtn3=document.getElementById('js-gotop');
var oBody=document.getElementsByTagName('body')[0];
oBtn3.onclick=function(){
	getTop(0,500);
}
var timer=null;
var userScroll=false;
function getTop(target,time){
	var start=document.body.scrollTop||document.documentElement.scrollTop;
	var dis=target-start;
	var count=Math.floor(time/30);
	var n=0;
	
	timer=setInterval(function(){
		n++;
		var cur=start+dis*n/count;
		document.documentElement.scrollTop=cur;
		document.body.scrollTop=cur;
		if(n==count){
			clearInterval(timer);
		}
	},30);
}
window.onscroll=function(){
	document.onmousewheel=function(){
	 	clearInterval(timer);
	}
	document.onkeydown=function(){
		clearInterval(timer);
	}
}

window.onscroll=function(){
	var oFixBox=document.getElementById('fixed');
	var oFixUl=oFixBox.getElementsByTagName('ul')[0];
	var aFixLi=oFixUl.children;
	var clientHeight=document.documentElement.clientHeight;

	for(var i=0;i<aFixLi.length;i++){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop+446>=getPos(aFixLi[i]).top){
			aFixLi[i].className='cur';
		}else{
			aFixLi[i].className='';
		}
	}
	function getPos(obj){
		var top=0;
		var left=0;
		while(obj){
			top+=obj.offsetTop;
			left+=obj.offsetLeft;
			obj=obj.offsetParent;
		}
		return {top:top,left:left};
	}
}