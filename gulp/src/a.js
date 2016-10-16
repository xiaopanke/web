function sum(arg1,arg2){
	alert(arg1+arg2);
}
window.onload=function(){
	document.onclick=function(){
		sum(12,3);
	};
};