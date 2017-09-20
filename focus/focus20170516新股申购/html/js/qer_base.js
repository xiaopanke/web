var domain = 'https://zqttest.yun.pingan.com';

/*计算字体大小*/
function change(){
	document.documentElement.style.fontSize=20*document.documentElement.clientWidth/375+'px';
}
change();
window.addEventListener('resize',change,false);
if ('addEventListener' in document) {  
    document.addEventListener('DOMContentLoaded', function() {  
        FastClick.attach(document.body);  
    }, false);  
}
//错误提示框，一会儿就消失
function tiperror(msg){
    $('.tiperror').html(msg).show();
    setTimeout(function (){
        $('.tiperror').hide();
    }, 2000);
    return;
}
var convertToJsonObject = function(str){

    if(typeof str != 'object'){      
        return JSON.parse(str);    
    }else{
        return str;
    }
};
//错误提示框，一会儿就消失
function tiperror(msg){
    $('.tiperror').html(msg).show();
    setTimeout(function (){
        $('.tiperror').hide();
    }, 2000);
    return;
} 

