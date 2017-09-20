var arr= [
            {
                "a": "恭喜",
                "b": "157****6332",
                "c": "fill耳机"
            },
            {
                "a": "恭喜",
                "b": "138****6588",
                "c": "Apple Watch"
            },
            {
                "a": "恭喜",
                "b": "158****2376",
                "c": "小米电源"
            },
            {
                "a": "恭喜",
                "b": "136****9020",
                "c": "Surface Pro4"
            }
        ]
$(function(){
	 var str='';
      for(var i=0;i<arr.length;i++){
          str+='<li>'+arr[i].a+arr[i].b+'<span>获得</span>'+arr[i].c+'</li>'
      }
      $('.item5fr .subtit ul').html(str);
      $('.item5fr .subtit .ulbox').jCarouselLite({
          auto: 2000,
          speed: 500,
          circular: true,
          vertical:true,
          visible: 1,
          pauseOnHover:true
      });
});