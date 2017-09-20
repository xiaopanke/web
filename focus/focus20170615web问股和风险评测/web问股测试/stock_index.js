 
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
    function ellipsis ( str, num ){
        return str.length > num ? str.substring(0, num) + "..." : str;
    }
    function leadingZero(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }
    
    function showReplyBox(btn) {
        //alert(12);
        var parentEle = btn.parents('.comment-reply-item:first');
        $('.comment-reply-trigger').show();
            if(parseInt(btn.parents().find(".comment-reply-trigger").first().attr("replyCount"))>0){
                btn.parents('.comment-reply-item:first').find('.comment-reply-trigger').show();
                //alert(1);
            }else{
                //btn.parents('.comment-reply-item:first').find('.comment-reply-trigger').hide();
                //alert(2);
            }
        
        if (parentEle.find('#editor-reply').length <= 0) {
            $('#editor-reply').appendTo(btn.parents('.comment-reply-item:first')).show();

            $('.btn-reply').removeClass('cur');
            btn.addClass('cur');
        }

        if (btn.hasClass('btn-reply')) {
            if(parseInt(btn.parents().find(".comment-reply-trigger").first().attr("replyCount"))>0){
                btn.parents('.comment-reply-item:first').find('.comment-reply-trigger').show();
                //alert(1);
            }else{
                //btn.parents('.comment-reply-item:first').find('.comment-reply-trigger').hide();
                //alert(2);
            }
           // btn.parents('.comment-reply-item:first').find('.comment-reply-trigger').hide();
            var _name = btn.parents('.comment-reply-item-cnt:first').find('.reply-name').attr("senderName");
            $('#editor-reply textarea').watermark( '回复  ' + _name + '：');

        } else {
            $('#editor-reply textarea').watermark('');
        }

        $('#editor-reply textarea').focus();

    }
    
    function dateFormat(date, formatString) {
        if (!date.valueOf())
            return '';

        var d = new Date(date);
        
        return formatString.replace(/(yyyy|mm|dd|hh|nn|ss)/gi,
            function ($1) {
                switch ($1.toLowerCase()) {
                    case 'yyyy': return d.getFullYear();
                    case 'mm': return leadingZero((d.getMonth() + 1), 2);
                    case 'dd': return leadingZero(d.getDate(), 2);
                    case 'hh': return leadingZero(((h = d.getHours() % 24) ? h : 12), 2);
                    case 'nn': return leadingZero(d.getMinutes(), 2);
                    case 'ss': return leadingZero(d.getSeconds(), 2);
                }
            }
        );
    }

    //回调函数
    function callBack(data){
        if(data.retcode!=5){
            return;
        }
        $.each(data.data, function(index,item){
            if(index<4){
                if(item.nPxChgRadio>=0){
                    $('[data-id='+item.szId+'_nLastPx]').text(item.nLastPx.toFixed(2)).removeClass("green").addClass("red");
                    $('[data-id='+item.szId+'_nPxChg]').text('+'+item.nPxChg.toFixed(2)).removeClass("green").addClass("red");  
                    $('[data-id='+item.szId+'_nPxChgRadio]').text('+'+(item.nPxChgRadio*100).toFixed(2)+'%').removeClass("green").addClass("red");
                }else{
                    $('[data-id='+item.szId+'_nLastPx]').text(item.nLastPx.toFixed(2)).removeClass("red").addClass("green");
                    $('[data-id='+item.szId+'_nPxChg]').text(item.nPxChg.toFixed(2)).removeClass("red").addClass("green");  
                    $('[data-id='+item.szId+'_nPxChgRadio]').text((item.nPxChgRadio*100).toFixed(2)+'%').removeClass("red").addClass("green");
                }
            }else if(index==4){
                //时间
                var times=item.nDate+item.nTime;
                
                if("103"==item.nStatus){
                    //正常
                    $('[data-id='+item.szId+'_nDate_nTime]').text(times.substring(4,6)+'-'+times.substring(6,8)+'  '+times.substring(8,10)+':'+times.substring(10,12)+':'+times.substring(12));
                }else if("104"==item.nStatus){
                    //未上市
                    $('[data-id='+item.szId+'_nDate_nTime]').text("未上市");
                }else if("901"==item.nStatus){
                    //暂停上市
                    $('[data-id='+item.szId+'_nDate_nTime]').text("暂停上市");
                }else if("902"==item.nStatus){
                    //终止上市
                    $('[data-id='+item.szId+'_nDate_nTime]').text("终止上市");
                }else if("2"==item.nStatus){
                    //停牌
                    $('[data-id='+item.szId+'_nDate_nTime]').text("停牌");
                }else if("105"==item.nStatus){
                    //上网竞价发行
                    $('[data-id='+item.szId+'_nDate_nTime]').text("上网竞价发行");
                }else if("106"==item.nStatus){
                    //国债挂牌分销
                    $('[data-id='+item.szId+'_nDate_nTime]').text("国债挂牌分销");
                }else if("107"==item.nStatus){
                    //长期停牌
                    $('[data-id='+item.szId+'_nDate_nTime]').text("长期停牌");
                }else if("3"==item.nStatus){
                    //恢复
                    $('[data-id='+item.szId+'_nDate_nTime]').text("恢复");
                }else{
                    //其余都为
                    $('[data-id='+item.szId+'_nDate_nTime]').text("未定义");
                }
                
                //今开大于昨收
                if(item.nPreClosePx<item.nOpenPx){
                    $('[data-id='+item.szId+'_nOpenPx]').text(item.nOpenPx.toFixed(2)).removeClass("green").addClass("red");
                }else if(item.nPreClosePx>item.nOpenPx){
                    $('[data-id='+item.szId+'_nOpenPx]').text(item.nOpenPx.toFixed(2)).removeClass("red").addClass("green");
                }else{
                    $('[data-id='+item.szId+'_nOpenPx]').text(item.nOpenPx.toFixed(2)).removeClass("red").removeClass("green"); 
                }
                
                //最高大于昨收
                if(item.nPreClosePx<item.nHighPx){
                    $('[data-id='+item.szId+'_nHighPx]').text(item.nHighPx.toFixed(2)).removeClass("green").addClass("red");
                }else if(item.nPreClosePx>item.nHighPx){
                    $('[data-id='+item.szId+'_nHighPx]').text(item.nHighPx.toFixed(2)).removeClass("red").addClass("green");
                }else{
                    $('[data-id='+item.szId+'_nHighPx]').text(item.nHighPx.toFixed(2)).removeClass("red").removeClass("green");
                }
                
                //最低大于昨收
                if(item.nPreClosePx<item.nLowPx){
                    $('[data-id='+item.szId+'_nLowPx]').text(item.nLowPx.toFixed(2)).removeClass("green").addClass("red");
                }else if(item.nPreClosePx>item.nLowPx){
                    $('[data-id='+item.szId+'_nLowPx]').text(item.nLowPx.toFixed(2)).removeClass("red").addClass("green");
                }else{
                    $('[data-id='+item.szId+'_nLowPx]').text(item.nLowPx.toFixed(2)).removeClass("red").removeClass("green");
                }
                //昨收
                $('[data-id='+item.szId+'_nPreClosePx]').text(item.nPreClosePx.toFixed(2)).removeClass("green").removeClass("red");
                //成交量
                $('[data-id='+item.szId+'_llVolume]').text((item.llVolume/10000).toFixed(2)).removeClass("green").removeClass("red");
                //流通市值
                $('[data-id='+item.szId+'_llPfShare]').text((item.llPfShare/10000).toFixed(2)).removeClass("green").removeClass("red");
                //成交额
                $('[data-id='+item.szId+'_llValue]').text((item.llValue/100000000).toFixed(2)).removeClass("green").removeClass("red");
                //市盈率
                $('[data-id='+item.szId+'_nPE]').text(item.nPE.toFixed(2)).removeClass("green").removeClass("red");
                //行情数据
                if(item.nPxChgRadio>0){
                    //现价
                    $('[data-id='+item.szId+'_nLastPx]').text(item.nLastPx.toFixed(2)).removeClass("green").addClass("red");
                    //涨跌额
                    $('[data-id='+item.szId+'_nPxChg]').text('+'+item.nPxChg.toFixed(2)).removeClass("green").addClass("red");
                    //涨跌幅
                    $('[data-id='+item.szId+'_nPxChgRadio]').text('+'+(item.nPxChgRadio*100).toFixed(2)).removeClass("green").addClass("red");
                    $('[data-id='+item.szId+'_nPxChg_nPxChgRadio]').removeClass("green").addClass("red");
                }else if(item.nPxChgRadio<0){
                    //现价
                    $('[data-id='+item.szId+'_nLastPx]').text(item.nLastPx.toFixed(2)).removeClass("red").addClass("green");
                    //涨跌额
                    $('[data-id='+item.szId+'_nPxChg]').text(item.nPxChg.toFixed(2)).removeClass("red").addClass("green");
                    //涨跌幅
                    $('[data-id='+item.szId+'_nPxChgRadio]').text((item.nPxChgRadio*100).toFixed(2)).removeClass("red").addClass("green");
                    $('[data-id='+item.szId+'_nPxChg_nPxChgRadio]').removeClass("red").addClass("green");
                }else{
                    //现价
                    $('[data-id='+item.szId+'_nLastPx]').text(item.nLastPx.toFixed(2)).removeClass("red").removeClass("green");
                    //涨跌额
                    $('[data-id='+item.szId+'_nPxChg]').text(item.nPxChg.toFixed(2)).removeClass("red").removeClass("green");
                    //涨跌幅
                    $('[data-id='+item.szId+'_nPxChgRadio]').text((item.nPxChgRadio*100).toFixed(2)).removeClass("red").removeClass("green");
                    $('[data-id='+item.szId+'_nPxChg_nPxChgRadio]').removeClass("red").removeClass("green");
                }
            }
        });
    }
    //获取行情
    function initStockHq(stockCode_8){
        var i = stockCode_8 + "";
        var url="http://sjhq.itougu.jrj.com.cn/web/snapshot?stock=sh000001,sz399001,sz399006,sz399005,"+i;
        //行业
        $.ajax({
            url:url,
            dataType:'jsonp',
            type:'GET',
            success:function(data){
                callBack(data);
            },
            error:function(data){
//              alert(data);
            }
        });
    }
    
    function initStockBlock(stockCode){
        var i = stockCode + "";
        var HYurl="http://q.jrjimg.cn/?q=cn|bk|s"+i+",xcfhy&n=_hangye";
        var BKurl="http://stock.jrj.com.cn/action/concept/getConceptBoardOfStock.jspa?stockCode="+i;
        var content = new StringBuffer();
        //行业
        $.getScript(HYurl, function() {
            var hangye = window["_hangye"];
            if (hangye==undefined || hangye==null) {
                return;
            }
            //当有股票的行业数据时
            if(hangye.HqData.length>0){
                for ( var m = 0; m < hangye.HqData.length; m++){
                    //code表示行业代码，pl表示涨跌幅度，name表示行业名称
                    var code = hangye.HqData[m][hangye.Column.code];
                    var pl = hangye.HqData[m][hangye.Column.pl];
                    var name = hangye.HqData[m][hangye.Column.name];
                    if(pl>=0){
                        content.append('<li>')
                            .append('<div class="fr red">'+pl.toFixed(2)+"%</div>")
                            .append('<div><a href="http://summary.jrj.com.cn/hybk/'+code+'.shtml" target="_blank">'+name+'</a></div>')
                            .append('</li>');
                    }else{
                        content.append('<li>')
                        .append('<div class="fr green">'+pl.toFixed(2)+"%</div>")
                        .append('<div><a href="http://summary.jrj.com.cn/hybk/'+code+'.shtml" target="_blank">'+name+'</a></div>')
                        .append('</li>');
                    }
                }
            }
            //概念
            $.getScript(BKurl, function() {
                //概念
                var _stock_concept = window["_stock_concept"];
                if (_stock_concept==undefined || _stock_concept==null) {
                    return;
                }
                //
                if(_stock_concept.data.length>0){
                    for ( var m = 0; m < _stock_concept.data.length; m++){
                        //conceptcode表示板块名字缩写，pl表示涨跌幅度
                        var pl_2 = _stock_concept.data[m][_stock_concept.column.pl];
                        var conceptcode_2 = _stock_concept.data[m][_stock_concept.column.conceptcode];
                        var name_2 = _stock_concept.data[m][_stock_concept.column.name];
                        if(pl_2>=0){
                            content.append('<li>')
                                .append('<div class="fr red">'+pl_2.toFixed(2)+"%</div>")
                                .append('<div><a href="http://stock.jrj.com.cn/concept/conceptdetail/conceptDetail_'+conceptcode_2+'.shtml" target="_blank">'+name_2+'</a></div>')
                                .append('</li>');
                        }else{
                            content.append('<li>')
                            .append('<div class="fr green">'+pl_2.toFixed(2)+"%</div>")
                            .append('<div><a href="http://stock.jrj.com.cn/concept/conceptdetail/conceptDetail_'+conceptcode_2+'.shtml" target="_blank">'+name_2+'</a></div>')
                            .append('</li>');
                        }
                    }
                }
//              var dddd=content.toString();
//              alert(dddd);
                $('#about_block').empty().append(content.toString());
            }); 
        }); 
        
        
    }
    //使用参数
    function getHq(){
        var stockCode=$('#stockCode').attr('data-code');
            initStockBlock(stockCode);
    }
    function getStockHq(){
         var stockCode_8=$('#stockCode_8').attr('data-code');
            initStockHq(stockCode_8);
    }
     $(function (){
         $('#txtComment').watermark('有话不说，憋着难受！');
         var stockName=$('#stockName').attr('data-name');
         var stockCode=$('#stockCode').attr('data-code');
         var stockCode_8=$('#stockCode_8').attr('data-code');
         loadQuesData(0);
         initStockBlock(stockCode);
         initStockHq(stockCode_8);
//       initStockBlock(stockCode);
         setInterval("getHq()",20000);
         setInterval("getStockHq()",5000);
//       var codes1=$('#stockCodes_1').val();
//       var codes2=$('#stockCodes_2').val();
//       var codes;
//       if(codes2.length>0){
//          codes=codes1+','+codes2;
//       }else{
//          codes=codes1;
//       }
//       initIndexHq(codes);
//       setInterval("getHq()",5000);
//       var maPageCount = $('[data-id=maTotalPage]').val();
//       var naPageCount = $('[data-id=naTotalPage]').val();
         
         (function(){
             
             $('.indie-nav li, .stickTop-nav li').click(function(){
                 
                 var _index = $(this).attr('data-index');

                 $('.indie-nav li[data-index="'+_index+'"]').addClass('curr').siblings().removeClass('curr');
                 $('.stickTop-nav li[data-index="'+_index+'"]').addClass('curr').siblings().removeClass('curr');
                 
                 $('#con2_1,#con2_2,#con2_3,#con2_4').hide();
                 $('#con2_'+_index).show();
                 
                 
             });
             
             
         })();
         
         F.hoverCls( '.headImageClass1' , 'aitgid' );
        
        //获取个股问答的数据
        function loadQuesData(from){ 
            var quesPageCount;
            var p=(from/10)+1;
            $('#q-ques-list-inner').append($('<div style="text-align:center;margin-top:30px;"><img src="http://i0.jrjimg.cn/zqt-red-1000/misc/loading3.gif" alt="loading..."/></div>'));
            
            $.ajax({
                url:'http://itougu.jrj.com.cn/stock/stockans.jspa?from='+from+'&code='+stockCode,
                type:'GET',
                dataType:'json',
                success:function(data){
                    console.log(data);
                    if(data.recordnum>0){
                                var totalNum=data.recordnum;
//                              int total = (count + limit - 1) / limit;
                                var totalPage=Math.floor((totalNum+10-1)/10);
                                var content = new StringBuffer();
                                content.append('<input type="hidden" data-id="quesTotalPage" value="'+totalNum+'"/>');
                                $.each(data.list, function(idx,obj){
                                    content.append('<li>')
                                        .append('<div class="ask-ans">')
                                        .append('<dl class="ask clearfix">')
                                        .append('<dt>问</dt>')
                                        .append('<dd><a href="http://itougu.jrj.com.cn/ques/'+obj.askId+'.jspa" target="_blank"><em>'+obj.askContent+'</em></a></dd>')
                                        .append('</dl>')
                                        .append('<dl class="ans clearfix">')
                                        .append('<dt>答</dt>')
                                        .append('<dl class="ans clearfix">');
                                        
                                    //关注与未关注
                                    if(obj.user.relationStatus==4){ //已关注
                                        content.append('<dd><span>'+obj.answerContent+'</span>');
                                         //填充看张看跌
                                        if(typeof(obj.riseDrop)!='undefined'){
                                            if(obj.riseDrop==1){
                                                content.append('<small class="up">看涨</small>');
                                            }
                                            else if(obj.riseDrop==-1){
                                                content.append('<small class="down">看跌</small>');
                                            }
                                            else{
                                                //啥都不做2016年5月13日14:01:32
                                            }
                                        }
                                    }else if(obj.user.relationStatus==0){//未关注
                                        content.append('<dd><em>关注'+obj.userName +' 查看回答详情 '+'<a href="javascript:;" style="color:#3c9af2;" class="goflow" data-advisterIld="'+obj.userId+'">关注并查看>></a></em><span style="display:none;">'+obj.answerContent+'</span>');
                                         //填充看张看跌
                                        if(typeof(obj.riseDrop)!='undefined'){
                                            if(obj.riseDrop==1){
                                                content.append('<small style="display:none;" class="up">看涨</small>');
                                            }
                                            else if(obj.riseDrop==-1){
                                                content.append('<small style="display:none;" class="down">看跌</small>');
                                            }
                                            else{
                                                //啥都不做2016年5月13日14:01:32
                                            }
                                        }
                                    }
                                   
                                    content.append('</dl>')
                                        .append('</div>')
                                        .append('<div class="user">')
                                        .append('<p class="date fr">'+obj.pubTime.substring(4,6)+'-'+obj.pubTime.substring(6,8)+' '+obj.pubTime.substring(8,10)+':'+obj.pubTime.substring(10,12)+'</p>')
                                        .append('<p class="name"><a>')
                                        .append('<img src="'+obj.user.headImage+'" alt="" class="headImageClass1" aitgid="'+obj.userId+'"/></a><a href="http://itougu.jrj.com.cn/account/adviser/'+obj.userId+'/" target="_blank">'+obj.userName+'</a>')
                                    if(typeof(obj.user.company)!='undefined'){
                                        content.append('<span>'+obj.user.company+'</span>');
                                    }   
                                    content.append('</p></div></li>');
                                        
                                });
                                $('#q-ques-list-inner').empty().append(content.toString());
                            quesPageCount=totalNum;
                            F.hoverCls( '.headImageClass1' , 'aitgid' );
                         $('.indie-faq>li .ask dd a,.indie-consult-content .text').each(function(){
                                var text = $(this).text();
                                $(this).text(ellipsis(text, 70));
                            });

                         $('.indie-faq>li .ans dd span').each(function(){
                            var text = $(this).text();
                            $(this).text(ellipsis(text,100));
                        }); 
                        $('.ans').each(function(){
                            var a=$(this).find('.goflow');
                            if(a.attr('data-advisterild')==getCookie('itg_passport_userid')){
                                $(this).find('em').hide();
                                $(this).find('span').show();
                            }
                        });
                    }else{
                        var content = new StringBuffer();
                        content.append('<div class="nocontent">')
                        .append('<p>暂无相关问答</p>')
                        .append('<p><a href="javascript:;" onclick = "Question.clickEvent(\''+stockCode+'\',\''+stockName+'\')">立即提问</a></p></div>');
                        $('#q-ques-list-inner').empty().append(content.toString());
                        }
                    //分页
                    $("#blockPageId1").pagefoot({
                        pagesize:10,
                        count:quesPageCount>100?100:quesPageCount,
                        css:"",
                        current : p,
                        displaynum : 10, 
                        displaylastNum :2,
                        previous:"上一页",
                        next:"下一页", 
                        enableArrowKey: true, 
                        paging:function(page){ 
                            loadQuesData((page.current-1)*10);
                            $('html,body').scrollTop($('#q-ques-list-inner').offset().top-100);
                            $('#quesFrom').val((page.current-1)*10);
                        }
                     });
                },
                error:function(data){
                    alert("服务器繁忙，请稍后再试！");
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
    JRJ.ui.isLogin(function(){
        ($).ajax({
          url : 'http://itougu.jrj.com.cn/account/service/focusChange.jspa?adviserId='+o.attr('data-advisterIld')+'&commonId='+getCookie('itg_passport_userid')+'&focusFlag=1', //1表示加关注，0表示取消,
          type : 'get',
          cache : false,
          data : {
              
          },
          success : function(ret) {
            console.log(ret);
             if(ret.retCode==2 || ret.retCode==-3){
                JRJ.MiniAlerts.prompt({message:'<p>关注成功</p>'});
                $('.goflow').each(function(){
                    if($(this).attr('data-advisterild')==o.attr('data-advisterIld')){
                        $(this).parent('em').hide().siblings('span').show();
                        if($(this).parent('em').siblings('small')){
                            $(this).parent('em').siblings('small').show();
                        }
                    }
                });
                
             }else{
                JRJ.MiniAlerts.prompt({message:'<p>'+ret.msg+'</p>'});
             }
          },
          error : function() {
              JRJ.MiniAlerts.prompt({message:'<p>系统繁忙，请稍后重试</p>'});
              return;
          }
      });
    });
}); 

        //获取观点列表页
        function loadViewData(from){
            var viewPageCount;
            var p=(from/10)+1;
            $('#view-list-wrap').append($('<div style="text-align:center;margin-top:30px;"><img src="http://i0.jrjimg.cn/zqt-red-1000/misc/loading3.gif" alt="loading..."/></div>'));
            
            $.ajax({
                url:'http://itougu.jrj.com.cn/view/gvpbs.jspa?from='+from+'&code='+stockCode,
                type:'GET',
                dataType:'json',
                success:function(data){
                    if(data.totalCount>0){
                                var totalNum=data.totalCount;
//                              int total = (count + limit - 1) / limit;
                                var totalPage=Math.floor((totalNum+10-1)/10);
                                var content = new StringBuffer();
                                content.append('<input type="hidden" data-id="viewTotalPage" value="'+totalNum+'"/>');
                                $.each(data.data, function(idx,obj){
                                    content.append('<li>')
                                        .append('<h4><a href="http://itougu.jrj.com.cn/view/'+obj.id+'.jspa" target="_blank">'+obj.title+'</a>');   
                                    if(typeof(obj.riseDrop)!='undefined'){
                                        if(obj.riseDrop==1){
                                            content.append('<em class="up">看涨</em>');
                                        }
                                        else if(obj.riseDrop==-1){
                                            content.append('<em class="down">看跌</em>');
                                        }
                                        else{
                                        }
                                    }
                                    content.append('</h4><div class="user">')
                                        .append('<p class="statics fr"><span>阅读 '+obj.readCount+'</span><a href="javascript:;"><i class="thumb" data-viewid="'+obj.id+'" data-adUserid="'+obj.userId+'"></i><span>'+obj.likeCount+'</span></a></p>')
                                        .append('<p class="name"><a><img src="'+obj.user.headImage+'" alt="" class="headImageClass1" aitgid="'+obj.userId+'"></a><a href="http://itougu.jrj.com.cn/account/adviser/'+obj.userId+'/" target="_blank">'+obj.userName+'</a>');  
                                    //填充所属机构
                                    if(typeof(obj.user.company)!='undefined'){
                                        content.append('<span>'+obj.user.company+'</span>');
                                    }
                                    content.append('<small>&nbsp;&nbsp;&nbsp;&nbsp;'+obj.stringTime+'</small></p>')
                                            .append('</div>')
                                            .append('<p>'+obj.summary+'</p>')
                                            .append('</li>');
                                        
                                });
                                $('#view-list-wrap').empty().append(content.toString());
                            viewPageCount=totalNum;
                            F.hoverCls( '.headImageClass1' , 'aitgid' );
                        }
                    else{
                            var content = new StringBuffer();
                            content.append('<div class="nocontent"><p>暂无相关观点</p></div>')
                            $('#view-list-wrap').empty().append(content.toString());
                        }
                    //分页
                    $("#blockPageId2").pagefoot({
                        pagesize:10,
                        count:viewPageCount>100?100:viewPageCount,
                        css:"",
                        current : p,
                        displaynum : 10, 
                        displaylastNum :2,
                        previous:"上一页",
                        next:"下一页", 
                        enableArrowKey: true, 
                        paging:function(page){ 
                            loadViewData((page.current-1)*10);
                            $('html,body').scrollTop($('#view-list-wrap').offset().top-100);
                            $('#viewFrom').val((page.current-1)*10);
                        }
                     });
                },
                error:function(data){
                    alert("服务器繁忙，请稍后再试！");
                }
            });
            
        }
        //获取擅长投顾
        function loadAdviserData(){
            $('#adviser-list-wrap').append($('<div style="text-align:center;margin-top:30px;"><img src="http://i0.jrjimg.cn/zqt-red-1000/misc/loading3.gif" alt="loading..."/></div>'));
            $.ajax({
                url:'http://itougu.jrj.com.cn/stock/skilledadviser.jspa?code='+stockCode,
                type:'GET',
                dataType:'json',
                success:function(data){
                    if(data.recordnum>0){
                                var totalNum=data.recordnum;
//                              int total = (count + limit - 1) / limit;
//                              var totalPage=Math.floor((totalNum+10-1)/10);
                                var content = new StringBuffer();
                                content.append('<input type="hidden" data-id="adviserTotalNum" value="'+totalNum+'"/>');
                                $.each(data.list, function(idx,obj){
                                    content.append('<li class="clearfix">')
                                        .append('<div class="indie-consult-avatar fl"><a><img src="'+obj.adviser.headImage+'" alt="" class="headImageClass1" aitgid="'+obj.adviserId+'"></a></div>')
                                        .append('<div class="indie-consult-content">')
                                        .append('<p class="user"><a href="http://itougu.jrj.com.cn/account/adviser/'+obj.adviserId+'/" target="_blank">'+obj.adviser.userName+'</a>')
//                                       长江证券
                                        if(typeof(obj.adviser.company)!='undefined'){
                                            content.append('<span>'+obj.adviser.company+'</span>');
                                        }
                                    content.append('</p>').
                                            append('<p class="text">'+obj.adviser.intro+'</p>')
                                            .append('<div class="others">')
                                            .append('<p class="btns fr">')
                                            .append('<span>相关回答 <i>'+obj.docCount+'</i></span>')
                                            .append('<a class="guanzhu " itgid="'+obj.adviserId+'" >关注TA</a>')
                                            .append('<a onclick="Question.clickEvent(false,\''+obj.adviser.userName+'\',\''+obj.adviserId+'\')">向TA提问</a>')
                                            .append('</p>')
                                            .append('</div>')
                                            .append('</div></li>')
                                        
                                });
                                $('#adviser-list-wrap').empty().append(content.toString());
                                F.update.attention( '.guanzhu','itgid','关注TA','取消关注');
                                F.hoverCls( '.headImageClass1' , 'aitgid' );
                            $('.indie-faq>li .ask dd span, .indie-faq>li .ans dd span,.indie-consult-content .text').each(function(){
                                var text = $(this).text();
                                $(this).text(ellipsis(text, 100));
                            }); 
                        }
                    else{
                        var content = new StringBuffer();
                        content.append('<div class="nocontent"><p>暂无相关投顾</p></div>')
                        $('#adviser-list-wrap').empty().append(content.toString());
                        }
                },
                error:function(data){
                    alert("服务器繁忙，请稍后再试！");
                }
            });
            
        }
        
        //获取评论列表
        function getCommentList(_currentPage){
            var _obj=membership.getUserInfo();
            var _userId = _obj.userId==null?"":_obj.userId;
            var _stockCode8=$('#stockCode_8').attr('data-code');
            var _replyCount=0;
            if(_currentPage<0){_currentPage=1;} 
            $.ajax({
                url: '/comment/commentList.jspa',
                type: 'GET',
                dataType: 'json',
                data: {
                    appId:"201410221",
                    bizType:6,
                    appItemId:_stockCode8,
                    pageSize:10,
                    currentPage:_currentPage,
                    userId:_userId,
                    frm:"web",
                    orderType:0,
                    appType:0
                },
                error: function(){
                    JRJ.MiniAlerts.prompt({message:'<p>抱歉，系统繁忙，请稍后再试</p>'});
                    var content = new StringBuffer();
                    content.append('<div class="itg-comment-box-empty">暂无评论</div>')
                    $('#comment-list-wrap').empty().append(content.toString());
                },
                success: function(data) {
                    if(data.success && data.totalCount>0){
                        $('#commentTotalCount').html('('+data.totalCount+')');
                        //拼接评论内容
                        var content = new StringBuffer();
                        $.each(data.data, function(idx,obj){
                            content.append('<div class="comment-item clearfix" id="main_'+obj.id+'">')
                            if(obj.userType!=0){
                                content.append('<a href="/account/adviser/'+obj.senderId+'/" class="avatar fl" target="_blank"><img src="'+obj.senderHeadImage+'" itgid="'+obj.senderId+'"></a>');
                            }else{
                                content.append('<span class="avatar fl" target="_blank"><img src="'+obj.senderHeadImage+'" itgid="'+obj.senderId+'"></span>');
                            }
                                 //href="/account/adviser/'+list[i].senderId+'/"
                            //.append('<a class="avatar fl" target="_blank"><img src="'+obj.senderHeadImage+'" itgid="'+obj.senderId+'"></a>')
                            content.append('<div class="comment-item-cnt">')
                            .append('<div class="comment-item-cnt-inner">')
                            if(obj.userType!=0){
                                content.append('<p class="name clearfix"><a href="/account/adviser/'+obj.senderId+'/">'+obj.senderName+'</a></p>');
                            }else{
                                content.append('<p class="name clearfix"><span>'+obj.senderName+'</span></p>');
                            }
                            //.append('<p class="name clearfix"><span>'+obj.senderName+'</span></p>')
                            content.append('<p class="ask-cnt" style="word-break:break-all;">'+obj.content+'</p>')
                            .append('<div class="time-row clearfix">')
                            if(obj.replyCount>0){
                                _replyCount=obj.replyCount;
                                content.append('<span class="itg-icon itg-comment-expand fr" style="margin-left:15px;" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'" data-rpcount="'+obj.replyCount+'">回复('+obj.replyCount+')</span>');
                            }else if(obj.showReplyButton){
                                content.append('<span class="itg-icon itg-comment-expand fr" style="margin-left:15px;" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'">回复</span>');
                            }else{
                                content.append('<span class="itg-icon itg-comment-expand fr" style="margin-left:15px;" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'"></span>');
                            }
                            //.append('<span class="itg-icon itg-comment-expand fr" style="margin-left:15px;" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'">回复</span>');
                            if(obj.hit){
                                content.append('<i class="itg-icon-like itg-icon-like-cur fr" data-id="'+obj.id+'" data-canlike="false" >'+obj.supportNum+'</i>');
                            }else{
                                content.append('<i class="itg-icon-like fr" data-id="'+obj.id+'" data-canlike="true" >'+obj.supportNum+'</i>');
                            }
                            //判断是否可以删除此主评
                            if(obj.canDelete){
                                content.append('<i class="itg-icon-del-2 fr" data-id="'+obj.id+'" data-replyid="'+obj.id+'">删除</i>');
                            }
                            var _date=new Date(obj.ctime);
                            if(_date.getFullYear() == new Date().getFullYear()){
                                content.append('<span class="time">'+dateFormat(obj.ctime,'MM-dd HH:nn')+'</span>');
                            }else{
                                content.append('<span class="time">'+dateFormat(obj.ctime,'yyyy-MM-dd HH:nn')+'</span>');
                            }
                            content.append('</div></div>');
                            // 加子评开始
                            if(obj.replyCount>0 && obj.replyCount<=3){
                                //只显示三条
                                content.append('<div class="comment-reply-item" style="word-break: break-all; display: block;">');
                                $.each(obj.reply, function(idx2,reply){
                                    content.append('<div class="comment-reply-item-cnt">')
                                    //判断是否回复自己
                                    if(reply.replyRootId.length==reply.replyToId.length){
                                        //回复自己不显示回复XX字段
                                        if(reply.sendUserType!=0){//发送的人是投顾时进入
                                            content.append('<a href="/account/adviser/'+reply.senderId+'/" class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></a>');
                                            content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a></p>');
                                        }else {
                                            content.append('<span class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></span>');
                                            content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+'</p>')
                                        }
                                    }else{
                                        if(reply.sendUserType!=0){
                                            content.append('<a href="/account/adviser/'+reply.senderId+'/" class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></a>');
                                            if(reply.receiveUserType!=0){
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a>'+" 回复 "+'<a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a>'+" 回复 "+reply.receiverName+'</p>')
                                            }
                                        }else {
                                            content.append('<span class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></span>');
                                            if(reply.receiveUserType!=0){
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+" 回复 "+'<a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+" 回复 "+reply.receiverName+'</p>')
                                            }
                                        }
                                    }
                                    content.append('<p class="reply-cnt">'+reply.content+'</p>')
                                    .append('<div class="time-row">')
                                    //不能回复自己
                                    if(reply.showReplyButton){
                                        content.append('<a class="btn btn-reply fr" data-id="'+obj.id+'" data-replyid="'+reply.id+'" data-uid="'+reply.senderId+'" data-uname="'+reply.senderName+'" data-mainname="'+obj.senderName+'">回复</a>');
                                    }
//                                  else{
//                                      content.append('<a class="btn btn-reply fr" data-id="'+obj.id+'" data-replyid="'+reply.id+'" data-uid="'+reply.senderId+'" data-uname="'+reply.senderName+'"></a>');
//                                  }
                                    if(reply.canDelete){
                                        content.append('<i class="itg-icon-del-2 fr" data-id="'+obj.id+'" data-replyid="'+reply.id+'">删除</i>');
                                    }
                                    var _date=new Date(reply.ctime);
                                    if(_date.getFullYear() == new Date().getFullYear()){
                                        content.append('<span class="time">'+dateFormat(reply.ctime,'MM-dd HH:nn')+'</span>');
                                    }else{
                                        content.append('<span class="time">'+dateFormat(reply.ctime,'yyyy-MM-dd HH:nn')+'</span>');
                                    }
                                    content.append('</div>')
                                    .append('</div>');
                                });
                                content.append('<div class="comment-reply-trigger clearfix">')
                                if(obj.showReplyButton){
                                    content.append('<a class="btn btn-red fr" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'" data-mainname="'+obj.senderName+'">回复</a>')
                                }else{
                                    content.append('<a class="btn fr" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'"></a>')
                                }
                                content.append('</div>')
                                .append('</div>');
                            }else if(obj.replyCount>3){
                                //超过3条，添加翻页查询翻页的功能
                                //只显示三条
                                content.append('<div class="comment-reply-item" style="word-break: break-all; display: block;">');
                                $.each(obj.reply, function(idx2,reply){
                                    content.append('<div class="comment-reply-item-cnt">')
                                    //判断是否回复自己
                                    if(reply.replyRootId.length==reply.replyToId.length){
                                        //回复自己不显示回复XX字段
                                        if(reply.sendUserType!=0){
                                            content.append('<a href="/account/adviser/'+reply.senderId+'/" class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></a>');
                                            if(reply.receiveUserType!=0){
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a></p>');
                                            }else{
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+'</p>');
                                            }
                                        }else {
                                            content.append('<span class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></span>');
                                            if(reply.receiveUserType!=0){
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+'</p>')
                                            }
                                        }
                                    }else{
                                        if(reply.sendUserType!=0){
                                            content.append('<a href="/account/adviser/'+reply.senderId+'/" class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></a>');
                                            if(reply.receiveUserType!=0){
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a>'+" 回复 "+'<a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a>'+" 回复 "+reply.receiverName+'</p>')
                                            }
                                        }else {
                                            content.append('<span class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></span>');
                                            if(reply.receiveUserType!=0){
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+" 回复 "+'<a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+" 回复 "+reply.receiverName+'</p>')
                                            }
                                        }
                                    }
                                    content.append('<p class="reply-cnt">'+reply.content+'</p>')
                                    .append('<div class="time-row">')
                                    //不能回复自己
                                    if(reply.showReplyButton){
                                        content.append('<a class="btn btn-reply fr" data-id="'+obj.id+'" data-replyid="'+reply.id+'" data-uid="'+reply.senderId+'" data-uname="'+reply.senderName+'" data-mainname="'+obj.senderName+'">回复</a>');
                                    }
//                                  else{
//                                      content.append('<a class="btn btn-reply fr" data-id="'+obj.id+'" data-replyid="'+reply.id+'" data-uid="'+reply.senderId+'" data-uname="'+reply.senderName+'"></a>');
//                                  }
                                    if(reply.canDelete){
                                        content.append('<i class="itg-icon-del-2 fr" data-id="'+obj.id+'" data-replyid="'+reply.id+'">删除</i>');
                                    }
                                    var _date=new Date(reply.ctime);
                                    if(_date.getFullYear() == new Date().getFullYear()){
                                        content.append('<span class="time">'+dateFormat(reply.ctime,'MM-dd HH:nn')+'</span>');
                                    }else{
                                        content.append('<span class="time">'+dateFormat(reply.ctime,'yyyy-MM-dd HH:nn')+'</span>');
                                    }
                                    content.append('</div>')
                                    .append('</div>')
                                    if(idx2==2){return;}
                                });
                                //超过3条加上显示更多
                                content.append('<div class="comment-reply-trigger clearfix" replyCount="'+(obj.replyCount-3)+'"  data-id="'+obj.id+'" data-mainname="'+obj.senderName+'">')
                                .append('<span>还有'+(obj.replyCount-3)+'条回复，<a class="link-v2">查看更多</a></span>')
                                .append('<div class="itg-comment-pager fl" sytle="display:none;" id="page_'+obj.id+'"></div>')
                                if(obj.showReplyButton){
                                    content.append('<a class="btn btn-red fr" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'" data-mainname="'+obj.senderName+'">回复</a>');
                                }else{
                                    //自己不能回复自己
                                    content.append('<a class="btn fr" data-replyid="'+obj.id+'" data-id="'+obj.id+'" data-uid="'+obj.senderId+'" data-uname="'+obj.senderName+'"></a>');
                                }
                                content.append('</div>')
                                .append('</div>')
                            }
                            // 加子评结束
                            content.append('</div></div>');
                        });
                        $('#comment-list-wrap').empty().append(content.toString());
                    }else{
                        var content = new StringBuffer();
                        content.append('<div class="itg-comment-box-empty">暂无评论</div>')
                        $('#comment-list-wrap').empty().append(content.toString());
                    }
                    //分页
                    $("#blockPageId3").pagefoot({
                        pagesize:10,
                        count:data.totalCount>100?100:data.totalCount,
                        css:"",
                        current : data.currentPage,
                        displaynum : 10, 
                        displaylastNum :2,
                        previous:"上一页",
                        next:"下一页", 
                        enableArrowKey: true, 
                        paging:function(page){
                            getCommentList(page.current);
                            $('html,body').scrollTop($('#comment-list-wrap').offset().top-100);
                            $('#commentPage').val(page.current);
                        }
                     });
                },
                complete:function(){
                    setTimeout(function(){
                        //显示评论框
                        $('.itg-comment-textarea').bind('click',function () {
                            $(this).removeClass('itg-comment-textarea-compact');
//                          $('.btn-wrap-hide').removeClass('btn-wrap-hide');
                        });
                        $('.btn-reply, .comment-reply-trigger .btn').bind('click',function (e) {
                            e.preventDefault();
                            var _id=$(this).attr('data-id');
                            var _uid=$(this).attr('data-uid');
                            var _uname=$(this).attr('data-uname');
                            var _replyid=$(this).attr('data-replyid');
                            var _mainname=$(this).attr('data-mainname');
                            //不同的数据到回复框中
                            $('#btnPostReply').attr('data-id',_id);
                            $('#btnPostReply').attr('data-uid',_uid);
                            $('#btnPostReply').attr('data-uname',_uname);
                            $('#btnPostReply').attr('data-replyid',_replyid);
                            $('#btnPostReply').attr('data-mainname',_mainname);
                            showReplyBox($(this));
                            updateClickEvent();
                        });
                        //查看更多 
                        $('.link-v2').bind('click',function(){
                            var _id=$(this).parent().parent().attr('data-id');
                            var _name=$(this).parent().parent().attr('data-mainname');
                            getSubCommentList(_id,1,_name);
                        });
                        
                        
                        $('.itg-comment-expand').click(function (e) {
                            e.preventDefault();
                            var replyCnt = $(this).parent().parent().next();
                            var parent = $(this).parent().parent();
                            var _id=$(this).attr('data-id');
                            var _uid=$(this).attr('data-uid');
                            var _uname=$(this).attr('data-uname');
                            var _replyid=$(this).attr('data-replyid');
                            //不同的数据到回复框中
                            $('#btnPostReply').attr('data-id',_id);
                            $('#btnPostReply').attr('data-uid',_uid);
                            $('#btnPostReply').attr('data-uname',_uname);
                            $('#btnPostReply').attr('data-replyid',_replyid);
                            $('#btnPostReply').attr('data-mainname',_uname);

                            if(replyCnt.length == 0){
                                $('#editor-reply').appendTo(parent);
                                updateClickEvent();
                                $('#editor-reply textarea').attr({'placeholder':''});
                                setTimeout(function(){
                                    $('#editor-reply textarea').focus();
                                },0);
                                $('#editor-reply').show();return;
                            }

                            if (replyCnt.is(':visible')) {
                                replyCnt.hide();
                                $(this).text("回复("+$(this).attr('data-rpcount')+")");
                                $('#editor-reply textarea').val('');
                                replyCnt.find('.comment-reply-trigger .btn').click();
                            } else {
                                replyCnt.show();
                                $(this).text("收起回复");
                                $('#editor-reply textarea').val('');
                                if(parseInt(replyCnt.find(".comment-reply-trigger").first().attr("replyCount"))>0){
                                    replyCnt.find('.comment-reply-trigger .btn').click();
                                    replyCnt.find(".comment-reply-trigger").show();
                                    return;
                                }
                                replyCnt.find('.comment-reply-trigger .btn').click();
                            }

                        });
                        superlike();
                        deleteClickEvent();
                        
                        $('body').append($(replyTmp));
                        
                        //测试回复复评计数器 start
                          window.counter = new Util.Counter({
                                txtboxId: "#txtCommentReply",
                                counterId: '#counterReply',
                                limit: 200,
                                template: '{num} / 200',
                                beyondTemplate: '<b class="red-v2">{num}</b> / 200',
                                customFunc: function (obj) {
                                  //var len = Math.floor(obj.calculateNum($(obj.config.txtboxId).val().replace(/\s/g, '')) / 2);
//                                  var len = Math.floor(obj.calculateNum($(obj.config.txtboxId).val().replace(/\s/g, '')));
                                    var len = $(obj.config.txtboxId).val().length;
                                    var num = obj.config.limit - len;
                                    if (num > 0) {
                                        $(obj.config.counterId).html(obj.config.template.replace('{num}', len));
                                    } else {
                                        $(obj.config.counterId).html(obj.config.beyondTemplate.replace('{num}', len));
                                    }
                                }
                            });
                        //测试回复复评计数器 start
                          
                          
                    },0);
                }
            });
        }
        
        //按钮事件
        $('#menu1_1').click(function(){
             var quesFrom=$('#quesFrom').val();
            loadQuesData(quesFrom);
        });
        $('#menu1_2').click(function(){
             var quesFrom=$('#quesFrom').val();
             loadQuesData(quesFrom);
        });
        
        $('#menu2_1').click(function(){
             var viewFrom=$('#viewFrom').val();
            loadViewData(viewFrom);
        });
        $('#menu2_2').click(function(){
             var viewFrom=$('#viewFrom').val();
             loadViewData(viewFrom);
        });
        
        $('#menu3_1').click(function(){
            loadAdviserData();
        });
        $('#menu3_2').click(function(){
            loadAdviserData();
        });
        
        $('#menu4_1').click(function(){
            var _currentPage=$('#commentPage').val();
            getCommentList(_currentPage);
        });
        $('#menu4_2').click(function(){
            var _currentPage=$('#commentPage').val();
            getCommentList(_currentPage);
        });
        
        //+自选股
        $(".addMyStock").bind('click',function(e) {
            //判断登录
            JRJ.ui.isLogin(function(){
                
                var stockCode = $(".addMyStock").attr("data-stockcode");
                var url = "http://itougu.jrj.com.cn/mystock/addstock.jspa";
                $.ajax({
                  type: 'POST',
                  url: url,
                  data: {"stockid":stockCode},
                  timeout : 10000,
                  success: function(data) {
                            if (typeof(data) == "number"){
                                if(data==4){
                                    JRJ.MiniAlerts.prompt({message:"组合中的自选股数量达到上限"});
                                }else if(data==6){
                                    JRJ.MiniAlerts.prompt({message:"您已添加过这只股票！"});
                                }else{
                                    JRJ.MiniAlerts.prompt({message:"添加失败!错误码：" + data});
                                }
                            }else if(typeof(data) == "object"){
                                JRJ.MiniAlerts.prompt({message:"添加成功!"});
                            }else{
                                JRJ.MiniAlerts.prompt({message:"添加失败!"});
                            }
                        }
                });
             });
        });
        //ip
        function getIp(){
            $.getScript('http://pv.sohu.com/cityjson?ie=utf-8', function(){
                var ipinfo = window["returnCitySN"];
                if (ipinfo==undefined || ipinfo==null) {
                    return;
                }
                $('#currentIp').val(ipinfo.cip);
            });
       }
       getIp();
     
     //提交评论
     $('#btnPost').click(function(e){
         JRJ.ui.isLogin(function(){
             var _text=$('#txtComment');
             var _content=_text.val();
             var _obj=membership.getUserInfo();
             var _userId=_obj.userId;
             var _userName=_obj.userName;
             var _stockCode8=$('#stockCode_8').attr('data-code');
             var _stockName=$('#stockName').attr('data-name');
             var _ip=$('#currentIp').val();
             
             if(_content.length<1){
                 JRJ.MiniAlerts.prompt({message:"您的评论太短了"});
                 return;
             }
             if(_content.length>200){
                 JRJ.MiniAlerts.prompt({message:"您的评论太长了"});
                 return;
             }
             $.ajax({
                 url:'/comment/addComment.jspa',
                 type:'GET',
                 dataType:'json',
                 data:{
                     appId:"201410221",
                     bizType:6,
                     appItemId:_stockCode8,
                     itemUrl:"http://itougu.jrj.com.cn/stock/"+_stockCode8+".jspa",
                     itemTitle:_stockName,
                     senderId:_userId,
                     senderName:_userName,
                     content:_content,
                     ip:_ip,
                     frm:"web",
                     appType:0
                 },
                 success:function(data){
                     if(data.success){
                            JRJ.MiniAlerts.prompt({message:'<p>提交评论成功!</p>'});
                        }else{
                            JRJ.MiniAlerts.prompt({message:data.message});
                        }
                        setTimeout(function(){
                            $('#txtComment').val("");
                            $('#counter').text("0 / 200");
                            getCommentList(1);
                            },2000);
                 },
                 error:function(){
                     JRJ.MiniAlerts.prompt({message:"网络繁忙，请稍后再试"});
                 }
             });
         });
     });  
     //回复评论(包括子评)
     function updateClickEvent(){
         $('#btnPostReply').unbind().bind('click',function(){
             JRJ.ui.isLogin(function(){
                 var _text=$('#txtCommentReply');
                 var _content=_text.val();
                 var _obj=membership.getUserInfo();
                 var _userId=_obj.userId;
                 var _userName=_obj.userName;
                 var _stockCode8=$('#stockCode_8').attr('data-code');
                 var _stockName=$('#stockName').attr('data-name');
                 var _ip=$('#currentIp').val();
                 //被回复的评论的信息
                 var _id=$('#btnPostReply').attr('data-id');
                 var _replyId=$('#btnPostReply').attr('data-replyid');
                 var _receiverId=$('#btnPostReply').attr('data-uid');
                 var _receiverName=$('#btnPostReply').attr('data-uname');
                 if(_content.length<1){
                     JRJ.MiniAlerts.prompt({message:"您的评论太短了"});
                     return;
                 }
                 if(_content.lenght>200){
                     JRJ.MiniAlerts.prompt({message:"您的评论太长了"});
                     return;
                 }
//               alert(_content);
                 $.ajax({
                     url:'/comment/addComment.jspa',
                     type:'GET',
                     dataType:'json',
                     data:{
                         appId:"201410221",
                         bizType:6,
                         appItemId:_stockCode8,
                         itemUrl:"http://itougu.jrj.com.cn/stock/"+_stockCode8+".jspa",
                         itemTitle:_stockName,
                         senderId:_userId,
                         senderName:_userName,
                         content:_content,
                         ip:_ip,
                         frm:"web",
                         appType:0,
                         replyRootId:_id,
                         replyToId:_replyId,
                         receiverId:_receiverId,
                         receiverName:_receiverName
                     },
                     success:function(data){
                         if(data.success){
                                $('#txtCommentReply').val("");
                                $('#counterReply').text("0 / 200");
                                JRJ.MiniAlerts.prompt({message:'<p>提交评论成功!</p>'});
                                
                                if($('#main_'+_id).find('.comment-reply-item').length > 0){
                                    var content=new StringBuffer();
                                    content.append('<div class="comment-reply-item-cnt">')
                                    //判断是否回复自己
                                    if(data.data.replyRootId.length==data.data.replyToId.length){
                                        //回复自己不显示回复XX字段
                                        if(data.data.sendUserType!=0){
                                            content.append('<a href="/account/adviser/'+data.data.senderId+'/" class="avatar fl"><img src="'+data.data.senderHeadImage+'" itgid="'+data.data.senderId+'"></a>');
                                            content.append('<p class="reply-name" senderName='+data.data.senderName+' receiverName='+data.data.receiverName+'><a  href="/account/adviser/'+data.data.senderId+'/" >'+data.data.senderName+'</a></p>');
                                        }else{
                                            content.append('<a class="avatar fl"><img src="'+data.data.senderHeadImage+'" itgid="'+data.data.senderId+'"></a>');
                                            content.append('<p class="reply-name" senderName='+data.data.senderName+' receiverName='+data.data.receiverName+'>'+data.data.senderName+'</p>');
                                        }
                                    }else{
                                        if(data.data.sendUserType!=0){
                                            content.append('<a href="/account/adviser/'+data.data.senderId+'/" class="avatar fl"><img src="'+data.data.senderHeadImage+'" itgid="'+data.data.senderId+'"></a>');
                                            if(data.data.receiveUserType!=0){
                                                content.append('<p class="reply-name" senderName='+data.data.senderName+' receiverName='+data.data.receiverName+'><a  href="/account/adviser/'+data.data.senderId+'/" >'+data.data.senderName+'</a>'+" 回复 "+'<a  href="/account/adviser/'+data.data.receiverId+'/" >'+data.data.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" senderName='+data.data.senderName+' receiverName='+data.data.receiverName+'><a href="/account/adviser/'+data.data.senderId+'/" >'+data.data.senderName+" 回复 "+data.data.receiverName+'</p>')
                                            }   
                                        }else{
                                            content.append('<a class="avatar fl"><img src="'+data.data.senderHeadImage+'" itgid="'+data.data.senderId+'"></a>');
                                            if(data.data.receiveUserType!=0){
                                                content.append('<p class="reply-name" senderName='+data.data.senderName+' receiverName='+data.data.receiverName+'>'+data.data.senderName+" 回复 "+'<a href="/account/adviser/'+data.data.receiverId+'/">'+data.data.receiverName+'</a></p>')
                                            }else{
                                                content.append('<p class="reply-name" senderName='+data.data.senderName+' receiverName='+data.data.receiverName+'>'+data.data.senderName+" 回复 "+data.data.receiverName+'</p>')
                                            }
                                        }
                                    }
                                    //
                                    content.append('<p class="reply-cnt">'+data.data.content+'</p>')
                                    .append('<div class="time-row">')
                                    if(!data.data.showReplyButton){
                                        content.append('<a class="btn btn-reply fr" data-id="'+data.data.replyRootId+'" data-replyid="'+data.data.id+'" data-uid="'+data.data.senderId+'" data-uname="'+data.data.senderName+'">回复</a>');
                                    }else{
                                        content.append('<a class="btn btn-reply fr" data-id="'+data.data.replyRootId+'" data-replyid="'+data.data.id+'" data-uid="'+data.data.senderId+'" data-uname="'+data.data.senderName+'"></a>');
                                    }
                                    //以下是源代码
                                    //.append('<a class="btn btn-reply fr" data-id="'+data.data.replyRootId+'" data-replyid="'+data.data.id+'" data-uid="'+data.data.senderId+'" data-uname="'+data.data.senderName+'">回复</a>');
                                    if(data.data.canDelete){
                                        content.append('<i class="itg-icon-del-2 fr" data-id="'+data.data.replyRootId+'" data-replyid="'+data.data.id+'">删除</i>');
                                    }
                                    var _date=new Date(data.data.ctime);
                                    if(_date.getFullYear() == new Date().getFullYear()){
                                        content.append('<span class="time">'+dateFormat(data.data.ctime,'MM-dd HH:nn')+'</span>');
                                    }else{
                                        content.append('<span class="time">'+dateFormat(data.data.ctime,'yyyy-MM-dd HH:nn')+'</span>');
                                    }
                                    content.append('</div>')
                                    .append('</div>')
                                    $('#main_'+_id).find('.comment-reply-item').prepend(content.toString());
                                    deleteClickEvent();
                                }else{
                                    setTimeout(function(){
                                        var _pageCurrent=$('#commentPage').val();
                                        getCommentList(_pageCurrent);
                                        },2000);
                                }
                                
                            }else{
                                JRJ.MiniAlerts.prompt({message:data.message});
                            }
                     },
                     error:function(){
                         JRJ.MiniAlerts.prompt({message:"网络繁忙，请稍后再试"});
                     }
                 });
             });
         }); 
     }
      //删除评论的方法
      function delComment(_delbtn){
             var _obj=membership.getUserInfo();
             var _userId=_obj.userId;
             var _stockCode8=$('#stockCode_8').attr('data-code');
             var _replyRootId=_delbtn.attr('data-id');
             var _delid=_delbtn.attr('data-replyid');
             $.ajax({
                 url:'/comment/delComment.jspa',
                 type:'GET',
                 dataType:'json',
                 data:{
                     appId:"201410221",
                     bizType:6,
                     appItemId:_stockCode8,
                     userId:_userId,
                     frm:"web",
                     appType:0,
                     id:_delid,
                     replyRootId:_replyRootId
                 },
                 success:function(data){
                     if(data.success){
                            JRJ.MiniAlerts.prompt({message:'<p>删除成功!</p>'});
                        }else{
                            JRJ.MiniAlerts.prompt({message:data.message});
                        }
                     setTimeout(function(){
                         var _pageCurrent=$('#commentPage').val();
                         getCommentList(_pageCurrent);
                         },2000);
                 },
                 error:function(){
                     JRJ.MiniAlerts.prompt({message:"网络繁忙，请稍后再试"});
                 }
             });
         }
      function cancleCallback(){
          return;
      };
      
    //删除评论
     function deleteClickEvent(){
     $('.itg-icon-del-2').unbind().bind('click',function(){
         var _delbtn=$(this);
         var _obj=membership.getUserInfo();
         var _userId=_obj.userId;
         if(_userId==null || _userId==""){ JRJ.ui.isLogin()}
         else{
              JRJ.Alerts.confirm({
                  message: '<p class="tl">确认删除评论?</p>',
                  okCallback: function () {
                      delComment(_delbtn);
//                    console.log('ok');
                  },
                  cancelCallback: function () {
//                    cancelCallback();
//                    console.log('cancel');
                  }
              });
         }
     }); 
    }
    //点赞（子评不做点赞操作）
    function superlike(){
        $('.itg-icon-like').unbind().bind('click',function(){
            var _likeBtn=$(this);
            var _id=_likeBtn.attr('data-id');
            var _canlike=_likeBtn.attr('data-canlike');
            //1-点赞（对应true）
            var _likeType = _canlike=="true"?1:2;
            JRJ.ui.isLogin(function(){
                var _userId=membership.getUserInfo().userId;
                 $.ajax({
                     url:'/comment/superLike.jspa',
                     type:'GET',
                     dataType:'json',
                     data:{
                         userId:_userId,
                         likeType:_likeType,//1对应true白哦啊还点赞 2取消点赞
                         frm:"web",
                         appType:0,
                         id:_id,
                         rootId:_id
                     },
                     success:function(data){
                        if(data.success){
                            if(data.hit){
                                //hit为true表示已经点赞过
                                _likeBtn.attr('data-canlike',false);
                                _likeBtn.addClass('itg-icon-like-cur');
                                _likeBtn.text(data.supportNum);
                            }else{
                                _likeBtn.attr('data-canlike',true);
                                _likeBtn.removeClass('itg-icon-like-cur');
                                _likeBtn.text(data.supportNum);
                            }
                        }
                     },
                     error:function(){
                         JRJ.MiniAlerts.prompt({message:"网络繁忙，请稍后再试"});
                     }
                 });
            });
        });
    }
    //查看更多
    function getSubCommentList(_mainId,_currentPage,_mainName){
        var _mainDiv=$('#main_'+_mainId);
        var _obj=membership.getUserInfo();
        var _userId = _obj.userId==null?"":_obj.userId;
        var _stockCode8=$('#stockCode_8').attr('data-code');
        if(_currentPage<0){_currentPage=1;}
        $.ajax({
            url: '/comment/subList.jspa',
            type: 'GET',
            dataType: 'json',
            data: {
                appId:"201410221",
                bizType:6,
                appItemId:_stockCode8,
                pageSize:5,
                currentPage:_currentPage,
                userId:_userId,
                frm:"web",
                appType:0,
                id:_mainId,
                viewType:0,
                orderType:0
            },
            error: function(){
                JRJ.MiniAlerts.prompt({message:'<p>抱歉，系统繁忙，请稍后再试</p>'});
            },
            success:function(data){
                if(data.success){
                    $('#'+_mainId).parent().empty().a
                    _mainDiv.find('.comment-reply-item-cnt').remove();
                }
                //拼接数据
                var content=new StringBuffer();
                $.each(data.data, function(idx,reply){
                        content.append('<div class="comment-reply-item-cnt">');
                        //判断是否回复自己
                        if(reply.replyRootId.length==reply.replyToId.length){
                            //回复自己不显示回复XX字段
                            if(reply.sendUserType!=0){
                                content.append('<a href="/account/adviser/'+reply.senderId+'/" class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></a>');
                                if(reply.receiveUserType!=0){
                                    content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a></p>');
                                }else{
                                    content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+'</p>');
                                }
                            }else {
                                content.append('<span class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></span>');
                                content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+'</p>')
                            }
                        }else{
                            if(reply.sendUserType!=0){
                                content.append('<a href="/account/adviser/'+reply.senderId+'/" class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></a>');
                                if(reply.receiveUserType!=0){
                                    content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a>'+" 回复 "+'<a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                }else{
                                    content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'><a href="/account/adviser/'+reply.senderId+'/" >'+reply.senderName+'</a>'+" 回复 "+reply.receiverName+'</p>')
                                }
                            }else {
                                content.append('<span class="avatar fl"><img src="'+reply.senderHeadImage+'" itgid="'+reply.senderId+'"></span>');
                                if(reply.receiveUserType!=0){
                                    content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+" 回复 "+'<a href="/account/adviser/'+reply.receiverId+'/" >'+reply.receiverName+'</a></p>')
                                }else{
                                    content.append('<p class="reply-name" loginUserName='+_obj.userName+' senderName='+reply.senderName+' receiverName='+reply.receiverName+'>'+reply.senderName+" 回复 "+reply.receiverName+'</p>')
                                }
                            }
                        }
                        //
                        content.append('<p class="reply-cnt">'+reply.content+'</p>')
                        .append('<div class="time-row">');
                        if(reply.showReplyButton){
                            content.append('<a class="btn btn-reply fr" data-id="'+_mainId+'" data-replyid="'+reply.id+'" data-uid="'+reply.senderId+'" data-uname="'+reply.senderName+'">回复</a>');
                        }else{
                            content.append('<a class="btn btn-reply fr" data-id="'+_mainId+'" data-replyid="'+reply.id+'" data-uid="'+reply.senderId+'" data-uname="'+reply.senderName+'"></a>');
                        }
                        if(reply.canDelete){
                            content.append('<i class="itg-icon-del-2 fr" data-id="'+_mainId+'" data-replyid="'+reply.id+'">删除</i>');
                        }
                        var _date=new Date(reply.ctime);
                        if(_date.getFullYear() == new Date().getFullYear()){
                            content.append('<span class="time">'+dateFormat(reply.ctime,'MM-dd HH:nn')+'</span>');
                        }else{
                            content.append('<span class="time">'+dateFormat(reply.ctime,'yyyy-MM-dd HH:nn')+'</span>');
                        }
                        content.append('</div>')
                        .append('</div>')
                });
                _mainDiv.find('.comment-reply-item').prepend($(content.toString()));
                deleteClickEvent();
                $('.btn-reply, .comment-reply-trigger .btn').bind('click',function (e) {
                    e.preventDefault();
                    var _id=$(this).attr('data-id');
                    var _uid=$(this).attr('data-uid');
                    var _uname=$(this).attr('data-uname');
                    var _replyid=$(this).attr('data-replyid');
                    //不同的数据到回复框中
                    $('#btnPostReply').attr('data-id',_id);
                    $('#btnPostReply').attr('data-uid',_uid);
                    $('#btnPostReply').attr('data-uname',_uname);
                    $('#btnPostReply').attr('data-replyid',_replyid);
                    showReplyBox($(this));
                    
                    //计数器（回复）  start 
                    window.counter = new Util.Counter({
                        txtboxId: "#txtCommentReply",
                        counterId: '#counterReply',
                        limit: 200,
                        template: '{num} / 200',
                        beyondTemplate: '<b class="red-v2">{num}</b> / 200',
                        customFunc: function (obj) {
                           // var len = Math.floor(obj.calculateNum($(obj.config.txtboxId).val().replace(/\s/g, '')) / 2);
//                            var len = Math.floor(obj.calculateNum($(obj.config.txtboxId).val().replace(/\s/g, '')));
                            var len = $(obj.config.txtboxId).val().length;
                            var num = obj.config.limit - len;
                            if (num > 0) {
                                $(obj.config.counterId).html(obj.config.template.replace('{num}', len));
                            } else {
                                $(obj.config.counterId).html(obj.config.beyondTemplate.replace('{num}', len));
                            }
                        }
                    });
                  //计数器是否能成功 end
                    updateClickEvent();
                });
                //分页
                $('#page_'+_mainId).pagefoot({
                    pagesize:5,
                    count:data.totalPage*5,
                    css:"",
                    current : data.currentPage,
                    displaynum : 10, 
                    displaylastNum :2,
                    previous:"上一页",
                    next:"下一页", 
                    enableArrowKey: true, 
                    paging:function(page){
                        getSubCommentList(_mainId,page.current,_mainName);
                    }
                 }).show().prev().hide();
            }
        });
    }
}); 