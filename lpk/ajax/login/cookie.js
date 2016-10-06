function setCookie(name,value,iDay){
	if(iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		
		document.cookie=name+'='+value+';path=/;expires='+oDate.toGMTString();
	}else{
		document.cookie=name+'='+value+';path=/';
	}
}

function getCookie(name){
	var arr=document.cookie.split('; ');
	
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		//arr2[0]  abc
		//arr2[1]  abc_value
		if(arr2[0]==name){
			return arr2[1];	
		}
	}
	return '';
}
function removeCookie(name){
	setCookie(name,'asdfasfd',-100);
}










