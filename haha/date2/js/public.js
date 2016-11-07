;(function($){
	var menustr = '<a id="toTop"></a><ul id="menu"><li><a href="index.html" id="s_home">首页</a></li><li><a href="list.html" id="cy">创业项目</a></li><li><a href="taolun.html" id="taolun">讨论</a></li><li><a href="about.html" id="about">关于我们</a></li></ul><div id="layer"></div>';
	$(menustr).appendTo("body");
	$("#sort").click(function(){
		var flag = $(this).attr("title");
		if(flag=="open"){
			$("#menu").show();	
			$("#layer").show();
			$(this).attr("title","close");
		}else{
			$("#menu").hide();
			$("#layer").hide();	
			$(".p_nav").hide();
			$(this).attr("title","open");
		}
	});
	$("#layer").click(function(){
		$("#menu").hide();
		$("#layer").hide();	
		$(".p_nav").hide();
		$("#sort").attr("title","open");
	});
	//项目支持显示隐藏效果
	$('.details a.title').each(function(index){
       $(this).click(function(){
		   $(".details").removeClass("cur");
		   $(".showDetail").hide();
		   $(this).next().show();
		   $(this).parents().addClass("cur");
		});
    })

	$(window).scroll(function(){
		var scrolltop=$(this).scrollTop();		
		if(scrolltop>=300){		
			$("#toTop").show();
		}else{
			$("#toTop").hide();
		}
	});		
	$("#toTop").click(function(){	
		document.documentElement.scrollTop = document.body.scrollTop =0;
	});		
	
	//创业项目效果
	$("#projectMenu a").click(function(){
		var nav = $(this).attr("rel");
		var navState = $(this).attr("title");
		if(navState=="open"){
			$(this).siblings("a").removeClass("cur");		
			$(this).addClass("cur");
			$(".p_nav").hide();
			$("#layer").show();
			$("#"+nav).show();
			$(this).siblings("a").attr("title","open");
			$(this).attr("title","close");
		}else{
			$(this).removeClass("cur");
			$(".p_nav").hide();
			$("#layer").hide();
			$(this).attr("title","open");
		}
	});
	
})(Zepto)