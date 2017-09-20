
    function loadZhiBo(userId, userName){
        $.ajax({
            timeout:6000,
            type:"GET",
            cache:false,
            dataType:"json",
            url:"/xlive/queryRoomByUserId.jspa?userId=" + userId,
            error:function(jqXHR,textStatus,errorThrown){
                $("#zhiboData1").html('');
                // $("#zhiboTimes .num").html('0');
                $("#zhiboData1").removeClass();
            },
            success:function(msg){
                if(msg.success){
                    if(msg.hasRoom){
                        var temp = '<img src="http://js.jrjimg.cn/zqt-red-1000/images/v2/pic_01.jpg" class="fl" style="width:100px; height:100px;"/>';
                        temp = temp + '<div class="fl">';
                        temp = temp + '<p class="txt-tit"><a href="/live/'+msg.roomId+'">正在直播：' + userName + '的直播室</a></p>';
                        temp = temp + '<p class="txt-info" style="margin-top:13px;">';
                        temp = temp + '<span><em class="hot">'+msg.uvNum+'</em>人气</span>  ';
                        temp = temp + '<span style="display:none;"><em class="hot">'+msg.likesNum+'</em>人支持</span>';
                        temp = temp + '<span><em class="hot">'+msg.talkNum+'</em>条互动消息</span>';
                        temp = temp + '</p>';
                        temp = temp + '<a href="/live/'+msg.roomId+'" class="red-btn" >我要参与</a>';
                        temp = temp + '</div>';
                        $("#zhiboData1").html(temp);
                        // $("#zhiboTimes .num").html(msg.roomInfo.open_times);
                    }else{
                        $("#zhiboData1").html('');
                        $("#zhiboData1").removeClass();
                    }
                }else{
                    $("#zhiboData1").html('');
                    // $("#zhiboTimes .num").html('0');
                    $("#zhiboData1").removeClass();
                }
            }
        });
    }
    
    function loadView(str){
        $.ajax({
            timeout:6000,
            type:"POST",
            cache:false,
            dataType:"json",
            url:"/view/"+str+"/realtimenews.jspa",
            error:function(jqXHR,textStatus,errorThrown){
                $("#viewData").html('');
                $("#viewTimes .num").html('0');
            },
            success:function(msg){
                if(msg.length>0){
                    var temp_i = msg[0];
                    $("#viewTimes .num").html(temp_i);
                    if(temp_i>0){
                        var temp = '<ul>';
                        for(var i=0;i<msg[1].length;i++){
                            temp = temp + '<li>';
                            temp = temp + '<a href="'+msg[1][i].detailUrl+'" target="_blank" target="_blank" class="fl" data-cutoff="true" data-cutoff-limit="70" title="' + msg[1][i].title + '">'+msg[1][i].title+'</a><span class="fr">'+msg[1][i].reads+'浏览</span>';
                            temp = temp + '</li>';
                        }
                        
                        temp = temp + '</ul>';
                        $("#viewData").html(temp);
                        if($.fn.cutoff){
                            $('#viewData [data-cutoff="true"]').each(function () {
                                var result = $(this).cutoff({
                                    text: $(this).text(),
                                    limit: $(this).data('cutoff-limit'),
                                    ellipse: $(this).data('cutoff-ellipse')
                                });
                                $(this).text(result);
                            });
                        }
                    }else{
                        $("#viewData").html('');
                    }
                    
                }else{
                    $("#viewData").html('');
                    $("#viewTimes .num").html('0');
                }
            }
        });
    }
    
    function loadQues(str){
        $.ajax({
            timeout:6000,
            type:"POST",
            cache:false,
            dataType:"json",
            url:"/ques/"+str+"/realtimeasks.jspa",
            error:function(jqXHR,textStatus,errorThrown){
                $("#quesData").html('');
                $("#quesTimes .num").html('0');
            },
            success:function(msg){
                if(msg.length>0){
                    var temp_i = msg[0];
                    $("#quesTimes .num").html(temp_i);
                    if(temp_i>0){
                        var temp = '<ul>';
                        tgid=msg[1][0].answers[0].answerUserId;
                        for(var i=0;i<msg[1].length;i++){
                            temp = temp + '<li>';
                            temp = temp + '<h4><a href="/ques/'+msg[1][i].id+'.jspa" target="_blank" class="hot" data-cutoff="true" data-cutoff-limit="70" title="' + msg[1][i].textContent + '">'+msg[1][i].textContent+'</a></h4>';
                            if(msg[1][i].answers[0].voiceLength>0){
                                temp = temp + '<p id="FlashInHere">'+embedFlash(msg[1][i].answers[0].voiceMp3,msg[1][i].answers[0].id)+'</p>';
                            }else{
                                temp = temp + '<p data-cutoff="true" data-cutoff-limit="270" title="' + msg[1][i].answers[0].textContent + '">'+msg[1][i].answers[0].textContent+'</p><em style="" class="fensi">回答详情仅粉丝可见，<a href="javascript:;" style="color:#3c9af2;" class="goflowindex" data-advisterild="'+msg[1][i].answers[0].answerUserId+'">关注并查看&gt;&gt;</a></em>';        
                            }
                            temp = temp + '</li>';
                            temp = temp + '</li>';
                        }
                        
                        temp = temp + '</ul>';
                        $("#quesData").html(temp);
                        usertg(tgid);
                        if($.fn.cutoff){
                            $('#quesData [data-cutoff="true"]').each(function () {
                                var result = $(this).cutoff({
                                    text: $(this).text(),
                                    limit: $(this).data('cutoff-limit'),
                                    ellipse: $(this).data('cutoff-ellipse')
                                });
                                $(this).text(result);

                            });
                        }
                    }else{
                        $("#quesData").html('');
                    }
                    
                }else{
                    $("#quesData").html('');
                    $("#quesTimes .num").html('0');
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
function usertg(tgid){
    ($).ajax({
        url : 'http://itougu.jrj.com.cn/account/service/relationBatch.jspa?adviserIds='+tgid+'&commonId='+getCookie('itg_passport_userid'), //4表示加关注，0表示未关注,
        type : 'get',
        cache : false,
        success : function(ret) {
          if(ret[tgid]==4){
                $('.answer-cont').find('p').show();
                $('.answer-cont').find('.fensi').hide();
          }else if(ret[tgid]==0){
              $('.answer-cont').find('p').hide();
                $('.answer-cont').find('.fensi').show();
          }
           
        },
        error : function() {
            JRJ.MiniAlerts.prompt({message:'<p>系统繁忙，请稍后重试</p>'});
            return;
        }
    });     
}  
   $('body').delegate('.goflowindex','click',function(){
      var o=$(this);
      JRJ.ui.isLogin(function(){
        usertg();
        ($).ajax({
          url : 'http://itougu.jrj.com.cn/account/service/focusChange.jspa?adviserId='+o.attr('data-advisterIld')+'&commonId='+getCookie('itg_passport_userid')+'&focusFlag=1', //1表示加关注，0表示取消,
          type : 'get',
          cache : false,
          data : {
              
          },
          success : function(ret) {
             if(ret.retCode==2 || ret.retCode==-3){
                JRJ.MiniAlerts.prompt({message:'<p>关注成功</p>'});
                $('.answer-cont').find('p').show();
                $('.answer-cont').find('.fensi').hide();
                
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