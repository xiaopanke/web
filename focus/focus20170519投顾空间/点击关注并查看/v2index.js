
    function StringBuffer(){
		this.data_ = [];
	}
	StringBuffer.prototype.append = function(){
		this.data_.push(arguments[0]);
		return this;
	}
	StringBuffer.prototype.toString = function(){
		return this.data_.join("");
	}
	alert(11);
    //获取股票行情数据
    function initIndexHq(stockCodeStr){
    	var i = stockCodeStr + "";
		var url="http://q.jrjimg.cn/?q=cn|s&n=hotStocks&c=id,code,lcp,np,hlp,pl,stp&i="+i;
		$.getScript(url, function() {
			if(hotStocks.Summary.mstat==0){//休市为0
				$('#stockOpen').val("close");
			}else{
				$('#stockOpen').val("open");
			}
			if(hotStocks.HqData.length==0){
				$(".q-side-block-stocks").hide();
				$(".q-side-block-tabswitch").hide();
			}else{
				$(".q-side-block-stocks").show();
				$(".q-side-block-tabswitch").show();
				for ( var m = 0; m < hotStocks.HqData.length; m++){
						//np表示现价，pl表示涨跌额，hlp表示涨跌幅,lcp是昨收价,stockCode是股票代码
						var np = hotStocks.HqData[m][hotStocks.Column.np];
						var pl = hotStocks.HqData[m][hotStocks.Column.pl];
						var hlp = hotStocks.HqData[m][hotStocks.Column.hlp];
						var stockCode=hotStocks.HqData[m][hotStocks.Column.code];
						var lcp=hotStocks.HqData[m][hotStocks.Column.lcp];
						var stp=hotStocks.HqData[m][hotStocks.Column.stp];
						if(pl>=0){
							$("[data-id='"+stockCode+"']").removeClass("down");
							$("[data-id='"+stockCode+"']").addClass("up");
							$("[data-id='"+stockCode+"_lcp']").removeClass("down");
							$("[data-id='"+stockCode+"_lcp']").addClass("up");
						}else if(pl<0){
							$("[data-id='"+stockCode+"']").removeClass("up");
							$("[data-id='"+stockCode+"']").addClass("down");
							$("[data-id='"+stockCode+"_lcp']").removeClass("up");
							$("[data-id='"+stockCode+"_lcp']").addClass("down");
						}
						//停牌时
						if(stp==1){
							np=lcp;
							pl="--";
							hlp="--";
							$("[data-id='"+stockCode+"']").removeClass("up");
							$("[data-id='"+stockCode+"']").removeClass("down");
							$("[data-id='"+stockCode+"_lcp']").removeClass("up");
							$("[data-id='"+stockCode+"_lcp']").removeClass("down");
//							.css({'font-size':'14px'})
							$("[data-id='"+stockCode+"_np']").text(np);
							$("[data-id='"+stockCode+"_hlp_pl']").text("停牌");
							$("[data-id='"+stockCode+"_lcp']").text(np+"(停牌)");
						}else{
							$("[data-id='"+stockCode+"_np']").text(np);
							$("[data-id='"+stockCode+"_hlp_pl']").text(hlp+"("+pl+"%)");
							$("[data-id='"+stockCode+"_lcp']").text(np+"("+pl+"%)");
//							$("[data-id="+stockCode+"_lcp]").text(np+"("+pl+"%)");
						}
				}
			}

		});			
	}
	function getCookie(name){
    var bikky = document.cookie;
    name += "=";
    var i = 0;
    while (i < bikky.length)
    {
    var offset = i + name.length;
    if (bikky.substring(i, offset) == name)
    {
    var endstr = bikky.indexOf(";", offset);
    if (endstr == -1) endstr = bikky.length;
    return unescape(bikky.substring(offset, endstr));
    }
    i = bikky.indexOf(" ", i) + 1;
    if (i == 0) break;
    }
    return null;
}
//点击关注并查看
$('body').delegate('.goflow','click',function(){
    var o=$(this);
    JRJ.Dialogs.standardDialog({
        title: "关注投顾",
        width: 350,
        customClass: 'dialog-auth',
        content: '<div class="dialog-cnt">确定要关注这个投顾吗？</div>',
        okBtnText: "确认",
        cancelBtnText: "取消",
        hasCloseBtn: true,
        hasOkBtn: true,
        hasCancelBtn: false,
        okCallback: function (e) {
            ($).ajax({
              url : 'http://itougu.jrj.com.cn/account/service/focusChange.jspa?adviserId='+o.attr('data-advisterIld')+'&commonId='+getCookie('itg_passport_userid')+'&focusFlag=1', //1表示加关注，0表示取消,
              type : 'get',
              cache : false,
              data : {
                  
              },
              success : function(ret) {
              		console.log(ret);
                 if(ret.retCode==2){
                    JRJ.MiniAlerts.prompt({message:'<p>关注成功啦</p>'});
                    o.parent('em').hide().siblings('span').show();
                 }else if(ret.retCode==-3){
                    o.parent('em').hide().siblings('span').show();
                 }else{
                 	JRJ.MiniAlerts.prompt({message:'<p>'+ret.msg+'</p>'});
                 }
              },
              error : function() {
                  JRJ.MiniAlerts.prompt({message:'<p>系统繁忙，请稍后重试</p>'});
                  return;
              }
          });
        },
        cancelCallback: function () {
            return true;
        } 
    });
}); 
    function initIndexHq2(stockCodeStr){
    	var i = stockCodeStr + "";
		var url="http://q.jrjimg.cn/?q=cn|s&n=hotStocks&c=id,code,lcp,np,hlp,pl,stp&i="+i;
		$.getScript(url, function() {
			if(hotStocks.Summary.mstat==0){//休市为0
				$('#stockOpen').val("close");
			}else{
				$('#stockOpen').val("open");
			}
			if(hotStocks.HqData.length==0){
				$(".q-side-block-tabswitch").hide();
			}else{
				$(".q-side-block-tabswitch").show();
				for ( var m = 0; m < hotStocks.HqData.length; m++){
// 					if (hotStocks.Summary.mstat!=1) {
// 						status=false;
						//np表示现价，pl表示涨跌额，hlp表示涨跌幅,lcp是昨收价,stockCode是股票代码
						var np = hotStocks.HqData[m][hotStocks.Column.np];
						var pl = hotStocks.HqData[m][hotStocks.Column.pl];
						var hlp = hotStocks.HqData[m][hotStocks.Column.hlp];
						var stockCode=hotStocks.HqData[m][hotStocks.Column.code];
						var lcp=hotStocks.HqData[m][hotStocks.Column.lcp];
						var stp=hotStocks.HqData[m][hotStocks.Column.stp];
						if(pl>=0){
							$("[data-id='"+stockCode+"_lcp']").removeClass("down");
							$("[data-id='"+stockCode+"_lcp']").addClass("up");
						}else if(pl<0){
							$("[data-id='"+stockCode+"_lcp']").removeClass("up");
							$("[data-id='"+stockCode+"_lcp']").addClass("down");
						}
						//停牌时
						if(stp==1){
							np=lcp;
							pl="--";
							hlp="--";
							$("[data-id='"+stockCode+"_lcp']").removeClass("up");
							$("[data-id='"+stockCode+"_lcp']").removeClass("down");
//							.css({'font-size':'14px'})
							$("[data-id='"+stockCode+"_lcp']").text(np+"(停牌)");
						}else{
							$("[data-id='"+stockCode+"_lcp']").text(np+"("+pl+"%)");
						}
// 					}
				}
			}

		});			
	}
    //使用参数
    function getHq(){
		var codes1=$('#stockCodes_1').val();
		var codes2=$('#stockCodes_2').val();
		var codes;
		if(codes2.length>0){
			//alert(codes2.length);
			codes=codes1+','+codes2;
		}else{
			//alert(codes);
			codes=codes1;
		}
        var Switch=$('#stockOpen').val();
        if(Switch=="open"){
        	initIndexHq(codes);
        }
	}
    
	 $(function (){
		 var codes1=$('#stockCodes_1').val();
		 var codes2=$('#stockCodes_2').val();
		 var codes;
		 if(codes2.length>0){
			codes=codes1+','+codes2;
		 }else{
			codes=codes1;
		 }
	     initIndexHq(codes);
	     setInterval("getHq()",5000);
	     var maPageCount = $('[data-id=maTotalPage]').val();
	     var naPageCount = $('[data-id=naTotalPage]').val();
	     
	     (function(){
	    	 
	    	 $('.q-condition .q-condition-item, .q-condition-fixed .q-condition-item').click(function(){
	    		 
	    		 var _index = $(this).attr('data-index');

	    		 $('.q-condition .q-condition-item[data-index="'+_index+'"]').addClass('cur').siblings().removeClass('cur');
	    		 $('.q-condition-fixed .q-condition-item[data-index="'+_index+'"]').addClass('cur').siblings().removeClass('cur');
	    		 
	    		 $('.q-ques-tab-cnt').hide();
	    		 $('#con2_'+_index).show();
	    		 
	    		 
	    	 });
	    	 
	    	 
	     })();
	     
	     F.hoverCls( '.headImageClass1' , 'aitgid' );
	    
	    $("#blockPageId1").pagefoot({
			pagesize:1,
		    count:maPageCount,
		    css:"",
		    current : 1,
		    displaynum : 10, 
		    displaylastNum :2,
		    previous:"上一页",
		    next:"下一页", 
		    enableArrowKey: true, 
		    paging:function(page){ 
	        	$.ajax({
	                url: page.current==1?'ma.shtml':'ma_'+page.current+'.shtml',
	                type: 'GET',
	                dataType: 'html',
	                success: function(data){
	                  	$('#q-ques-list-inner-1').html(data);
	                  	$('html,body').scrollTop($('#q-ques-list-inner-1').offset().top-100);
	                  	F.hoverCls( '.headImageClass1' , 'aitgid' );
	                  	$('.q-ques-item-a span').each(function () {
    			            var _span = $(this).find('span.q-img');
    			            $(this).text($(this).cutoff({
    			                text: $(this).text(),
    			                limit: 200,
    			                ellipse: '...'
    			            }));

    			            $(this).append(_span);
    			        });
	                  	$('.q-ques-item-q').each(function () {
    						var _a=$(this).find('a');
    						_a.text(_a.cutoff({
    			                text: _a.text(),
    			                limit: 122,
    			                ellipse: '...'
    			            }));
    			        });
	                },
	                error: function(msg){
	                }
	         	});
		   	}
		 });
	    $("#blockPageId3").pagefoot({
			pagesize:1,
		    count:naPageCount,
		    css:"",
		    current : 1,
		    displaynum : 10, 
		    displaylastNum :2,
		    previous:"上一页",
		    next:"下一页", 
		    enableArrowKey: true, 
		    paging:function(page){ 
	        	$.ajax({
	                url: page.current==1?'na.shtml':'na_'+page.current+'.shtml',
	                type: 'GET',
	                dataType: 'html',
	                success: function(data){
	                  	$('#q-ques-list-inner-3').html(data);
	                  	$('html,body').scrollTop($('#q-ques-list-inner-3').offset().top-100);
	                  	F.hoverCls( '.headImageClass1' , 'aitgid' );
	                  	$('.q-ques-item-a span').each(function () {
    			            var _span = $(this).find('span.q-img');
    			            $(this).text($(this).cutoff({
    			                text: $(this).text(),
    			                limit: 200,
    			                ellipse: '...'
    			            }));

    			            $(this).append(_span);
    			        });
	                  	$('.q-ques-item-q').each(function () {
    						var _a=$(this).find('a');
    			           _a.text(_a.cutoff({
    			                text: _a.text(),
    			                limit: 122,
    			                ellipse: '...'
    			            }));
    			        });
	                },
	                error: function(msg){
	                }
	         	});
		   	}
		 });
	    //获取感兴趣的数据
	    function loadData(from){
	    	console.log("12345678!");
	    	var iaPageCount;
	    	var p=(from/10)+1;
	    	$('#q-ques-list-inner-2').append($('<div style="text-align:center;margin-top:30px;"><img src="http://i0.jrjimg.cn/zqt-red-1000/misc/loading3.gif" alt="loading..."/></div>'));
	    	
	    	$.ajax({
	    		url:'/ques/myIA.jspa'+'?from='+from,
	    		type:'GET',
	    		dataType:'json',
	    		success:function(data){
	    			console.log(data);
	    			switch (data.retCode){
	    				case 0:{
	    						var subContent;
	    						var totalNum=data.IAData.recordnum;
//	    						int total = (count + limit - 1) / limit;
	    						var totalPage=Math.floor((totalNum+10-1)/10);
								var content = new StringBuffer();
								content.append('<div class="q-ques-list mt20">')
									   .append('<input type="hidden" data-id="iaTotalPage" value="'+totalNum+'"/>');
								$.each(data.IAData.list, function(idx,obj){
									content.append('<div class="q-block q-ques-item mt20">')
										.append('<div class="row-1">')
										.append('<div class="q-ques-item-q">')
										.append('<a href="http://itougu.jrj.com.cn/ques/'+obj.askId+'.jspa" target="_blank">'+obj.askContent+'</a>')
										.append('</div>')
										.append('<div class="q-ques-item-a mt20 middle"><em>'+obj.userName +' 回答了这个问题，'+'<a href="javascript:;" style="color:#3c9af2;" class="goflow" data-advisterIld="'+obj.userId+'">关注并查看>></a></em>')
										.append('<span style="display:none">'+obj.answerContent+'</span>');
//										if(obj.answerContent.length>200){
//											subContent=obj.answerContent.substring(0,200)+"...";
//										}else{
//											subContent=obj.answerContent;
//										}
//										content.append(''+subContent);
									//填充看张看跌
									if(typeof(obj.riseDrop)!='undefined'){
										if(obj.riseDrop==1){
											content.append('<span class="q-img q-icon-looksgreat" style="margin-left:5px;"></span>');
										}
										else if(obj.riseDrop==-1){
											content.append('<span class="q-img q-icon-looksbad" style="margin-left:5px;"></span>');
										}
										else{
											//啥都不做
										}
									//20160304172559
									}
									content.append('</div>')
										.append('</div>')
										.append('<div class="row-2 clearfix">')
										.append('<span class="time fr">'+obj.pubTime.substring(4,6)+'-'+obj.pubTime.substring(6,8)+' '+obj.pubTime.substring(8,10)+':'+obj.pubTime.substring(10,12)+'</span>')
										.append('<a href="http://itougu.jrj.com.cn/account/adviser/'+obj.userId+'/" class="avatar" target="_blank"><img src="'+obj.user.headImage+'" alt="" class="headImageClass1" aitgid="'+obj.userId+'"/></a>')
										.append('<a class="name fl" href="http://itougu.jrj.com.cn/account/adviser/'+obj.userId+'/" target="_blank">'+obj.userName+'</a>');
									if(typeof(obj.user.company)!='undefined'){
										content.append('<span class="corp fl">'+obj.user.company+'</span>');
									}	
									content.append('</div>')
										.append('</div>');
										
								});
								content.append('</div>');
								$('#q-ques-list-inner-2').empty().append(content.toString());
	    					iaPageCount=totalNum;
	    					F.hoverCls( '.headImageClass1' , 'aitgid' );
	    					$('.q-ques-item-a span').each(function () {
	    			            var _span = $(this).find('span.q-img');
	    			            $(this).text($(this).cutoff({
	    			                text: $(this).text(),
	    			                limit: 200,
	    			                ellipse: '...'
	    			            }));

	    			            $(this).append(_span);
	    			        });
	    					$('.q-ques-item-q').each(function () {
	    						var _a=$(this).find('a');
	    			           _a.text(_a.cutoff({
	    			                text: _a.text(),
	    			                limit: 122,
	    			                ellipse: '...'
	    			            }));
	    			        });
	    			        $('.q-ques-item-a').each(function(){
	    			        	var a=$(this).find('.goflow');
	    			        	if(a.attr('data-advisterild')==getCookie('itg_passport_userid')){
	    			        		$(this).find('em').hide();
	    			        		$(this).find('span').show();
	    			        	}
	    			        });
	    					break;
	    				}
	    				case 1:{
	    					var content2 = new StringBuffer();
	    					content2.append('<div class="question-empty middle tc" style="padding:200px 0 200px 0;">')
	    						   .append('<span class="f16 ml20 mr20">请您登录后查看!</span>')
	    						   .append('<a onclick="JRJ.ui.isLogin()" class="btn btn-red question-empty-btn-login">登 录</a>')
	    						   .append('</div>');
	    					$('#q-ques-list-inner-2').empty().append(content2.toString());
		            		break;
	    				}
		            	default:{
		            		var content = new StringBuffer();
		            		content.append('<div class="question-empty middle tc" style="padding:200px 0 200px 0;">')
		            		.append('<span class="f16 ml20">暂无您提问和自选股股票相关问答！</span>')
		            		.append('</div>');
		            		$('#q-ques-list-inner-2').empty().append(content.toString());
		            		break;
		            	}
           		}
	    			//分页
	    			$("#blockPageId2").pagefoot({
	    				pagesize:10,
	    			    count:iaPageCount>100?100:iaPageCount,
	    			    css:"",
	    			    current : p,
	    			    displaynum : 10, 
	    			    displaylastNum :2,
	    			    previous:"上一页",
	    			    next:"下一页", 
	    			    enableArrowKey: true, 
	    			    paging:function(page){ 
	    			    	loadData((page.current-1)*10);
	    			    	$('html,body').scrollTop($('#q-ques-list-inner-2').offset().top-100);
	    			    	$('#iaFrom').val((page.current-1)*10);
	    			   	}
	    			 });
	    		},
	    		error:function(data){
	    			alert("服务器繁忙，请稍后再试！");
	    		}
	    	});
	    	
	    }
	    
	    $('#menu2_2').click(function(){
	    	 var iaFrom=$('#iaFrom').val();
	    	loadData(iaFrom);
	    });
	    $('#menu2_2_2').click(function(){
	    	 var iaFrom=$('#iaFrom').val();
	    	loadData(iaFrom);
	    });
	 });
	