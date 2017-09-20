
 /* 优惠券通用弹窗
 */
window.CouponDlg = (function () {      

    var api_buy = 'http://itougu.jrj.com.cn/order/showbuyweb.jspa?pid={pid}&orderType={type}',
        api_place = 'http://itougu.jrj.com.cn/order/buyweb.jspa?pid={pid}&cid={cid}&orderType={type}&month={month}',
        api_buy_4_gift = 'http://itougu.jrj.com.cn/order/showbuyweb2.jspa?pid={pid}&orderType={type}&tgid={tgid}&num={num}&rmb={rmb}&content={content}',
        api_place_4_gift = 'http://itougu.jrj.com.cn/order/buyweb2.jspa?pid={pid}&cid={cid}&orderType={type}&tgid={tgid}&num={num}&rmb={rmb}&uniqueid={uniqueid}',
        api_place_4_vote = 'http://itougu.jrj.com.cn/order/buyweb8.jspa?pid={pid}&cid={cid}&orderType={type}&tgid={tgid}&num={num}&rmb={rmb}&uniqueid={uniqueid}&content={content}',
        dlgTmpl = ['<div class="dialog-cnt">',
                        '<div class="product-desc">',
                            '<h2>{{tname}}：{{pname}}</h2>',
                            '{{#ismaster}}',
                            '<p>比赛时间：{{startTime}} 至 {{endTime}}</p>',
                            '{{/ismaster}}',
                            '{{^ismaster}}',
                            '{{#isGlance}}',
                            '<p>偷看时长：<span class="red">30</span> 分钟</p>',
                            '{{/isGlance}}',
                            '{{^isGlance}}',
                            '<p>最长周期：{{startTime}} 至 {{endTime}}</p>',
                            '{{/isGlance}}',
                            '{{/ismaster}}',
                            '{{#isGlance}}',
                            '<p>偷看价格：<span class="red">{{amount}}</span> 元',
                            '{{/isGlance}}',
                            '{{^isGlance}}',
                            '<p>订阅价格：<span class="red">{{amount}}</span> 元</p>',
                            '{{/isGlance}}',
                        '</div>',
                        '<div id="coupon-list" class="coupon-list"></div>',
                        '<p class="note">{{note}}</p>',
                        '<p class="agreement middle"><input id="chkAgreement" type="checkbox" checked="checked" /><span>我已阅读并同意</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/risk.html" target="_blank">风险揭示书</a><span>》</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/help.html?tag=agreement" target="_blank">服务使用协议</a><span>》</span></p>',
                        '{{#orgId}}<p class="agreement middle"><input id="chkAgreement2" type="checkbox" checked="checked" /><span>我已阅读并同意</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/help.html?tag=trader_{{orgId}}" target="_blank">{{agreementName}}</a><span>》</span></p>{{/orgId}}',
                        '<div class="btn-wrap clearfix">',
                            '<a id="btnCouponPay" href="" class="btn btn-89-31 fr">立即支付</a>',
                            '<span class="price">实付款：<span id="finalPrice" class="red">{{amount}}</span>元</span><span id="notice" class="red ml5" style="display:none;">优惠券购买商品多出金额不予退还</span>',
                        '</div>',
                    '</div>'].join(''),
		dlgTmp6 = ['<div class="dialog-cnt">',
                        '<div class="product-desc">',
                            '<h2>{{tname}}：{{pname}}</h2>',
                            '<ul class="long-term-month" id="long-term-month"></ul>',
                            '<p class="long-term-p">服务周期：<span class="start-time">{{startTime}}</span> 至 <span class="end-time">{{endTime}}</span></p>',
                            '<p class="long-term-p" id="original-disc">订阅价格：<span class="red disc">{{amount}}</span> 元<del class="line"></del></p>',
                        '</div>',
                        '<div id="coupon-list" class="coupon-list"></div>',
                        '<p class="note">订阅须知：此内容仅代表个人研究成果，供学习参考，不是投资依据，据此操作风险自担。</p>',
                        '<p class="agreement middle"><input id="chkAgreement" type="checkbox" checked="checked" /><span>我已阅读并同意</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/risk.html" target="_blank">风险揭示书</a><span>》</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/help.html?tag=agreement" target="_blank">服务使用协议</a><span>》</span></p>',
                        '{{#orgId}}<p class="agreement middle"><input id="chkAgreement2" type="checkbox" checked="checked" /><span>我已阅读并同意</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/help.html?tag=trader_{{orgId}}" target="_blank">{{agreementName}}</a><span>》</span></p>{{/orgId}}',
                        '<div class="btn-wrap clearfix">',
                            '<a id="btnCouponPay" href="" class="btn btn-89-31 fr">立即支付</a>',
                            '<span class="price">实付款：<span id="finalPrice" class="red">{{amount}}</span>元</span><span id="notice" class="red ml5" style="display:none;">优惠券购买商品多出金额不予退还</span>',
                        '</div>',
                    '</div>'].join(''),          
        dlgTmplGift = ['<div class="dialog-cnt">',
                        '<div class="product-desc"><h2>支付项目：{{pname}}</h2><p>价格：<span class="red">{{amount}}</span> 元</p></div>',
                        '<div id="coupon-list" class="coupon-list"></div>',
                        '<p class="note">{{note}}</p>',
                        '<p class="agreement middle"><input id="chkAgreement" type="checkbox" checked="checked" /><span>我已阅读并同意</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/risk.html" target="_blank">风险揭示书</a><span>》</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/help.html?tag=agreement" target="_blank">服务使用协议</a><span>》</span></p>',
                        '{{#orgId}}<p class="agreement middle"><input id="chkAgreement2" type="checkbox" checked="checked" /><span>我已阅读并同意</span><span>《</span><a class="link-v2" href="http://itougu.jrj.com.cn/site/help.html?tag=trader_{{orgId}}" target="_blank">{{agreementName}}</a><span>》</span></p>{{/orgId}}',
                        '<div class="btn-wrap clearfix">',
                            '<a id="btnCouponPay" href="" class="btn btn-89-31 fr">立即支付</a>',
                            '<span class="price">实付款：<span id="finalPrice" class="red">{{amount}}</span>元</span><span id="notice" class="red ml5" style="display:none;">优惠券购买商品多出金额不予退还</span>',
                        '</div>',
                    '</div>'].join(''),
        couponTmpl = ['<div class="tit"><a href="http://itougu.jrj.com.cn/site/help.html?tag=coupon" class="fr link-v2" target="_blank">[了解优惠券规则]</a>可用优惠券(<span class="red">{{count}}</span>)</div>',
                        '<div class="table-wrap">',
                            '<table></table>',
                        '</div>'].join(''),
        couponItemTmpl = ['<tr>',
                            '<td class="col-1"><input id="Checkbox1" type="checkbox" name="couponChk" data-price="{{price}}" data-id="{{id}}" /></td>',
                            '<td class="col-2"><span class="red">{{price}}</span> 元</td>',
                            '<td class="col-3">{{name}}</td>',
                            '<td class="col-4">有效期至{{endTime}}</td>',
                            '<td class="col-5">满{{limitPrice}}减{{price}}</td>',
                        '</tr>'].join('');

    window.dlgClone = $.extend(true, {}, JRJ.Dialogs);

    var enum_CouponType = {
        PORTFOLIO: 1,   //组合
        GIFT: 2,        //礼物
        VIEWPOINT: 3,   //观点
        REWARD: 4,      //打赏
        REFERENCE: 6,    //内参
        VOTE: 8,        //投票
        GLANCE: 9       //偷看
    };
    var enum_ReturnCode_Buy = {
        Failed: -1,     //失败
        Free: 1,        //免费订购成功
        Existed: 2,     //有未支付的订单
        GoPay: 3        //第三方支付页面
    };
    var enum_ReturnCode_Place = {
        Failed: -1,     //失败
        Free: 1,        //免费订购成功
        Existed: 2,     //有未支付的订单
        GoPay: 3,       //第三方支付页面
        CouponFree: 4   //优惠卷够支付款
    };
    var productPrice = 0;
    var ___lock = false;

    var couponConfig = {
        productId: '',
        productName: '',
        type: '',
        checkOrderUrl: '',
        tgid: '',   //投顾id
        num: '',    //礼物数量
        rmb: '',     //打赏金额（单位：分）
        uniqueid: '',     //唯一id
        month: ''     //新加,长期内参 月份
    };

    var Util = {
        leadingZero: function (num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
        },
        dateFormat: function (date, formatString) {
            if (!date.valueOf())
                return '';

            var d = date;

            return formatString.replace(/(yyyy|mm|dd|hh|nn|ss)/gi,
                function ($1) {
                    switch ($1.toLowerCase()) {
                        case 'yyyy': return d.getFullYear();
                        case 'mm': return Util.leadingZero((d.getMonth() + 1), 2);
                        case 'dd': return Util.leadingZero(d.getDate(), 2);
                        case 'hh': return Util.leadingZero(((h = d.getHours() % 12) ? h : 12), 2);
                        case 'nn': return Util.leadingZero(d.getMinutes(), 2);
                        case 'ss': return Util.leadingZero(d.getSeconds(), 2);
                    }
                }
            );
        },
        cutoff: function (text, limit) {

            if (limit == 0) {
                return text;
            }

            var temp1 = text.replace(/[^\x00-\xff]/g, "**");
            var temp2 = temp1.substring(0, limit);
            var x_length = temp2.split("\*").length - 1;
            var hanzi_num = x_length / 2;
            limit = limit - hanzi_num;
            var res = text.substring(0, limit);

            var end = '';
            if (limit < text.length) {
                end = res + '...';
            } else {
                end = res;
            }
        
            return end;
        
        }
    }

    //等待支付完成弹窗
    var showWaitingPaymentDlg = function () {
        dlgClone.close();
        dlgClone.isShow = false;
        dlgClone.standardDialog({
            title: "支付提示",
            width: 450,
            content: ['<div class="revenue-dlg-payment">',
                          '<p class="mt20">支付完成前 请不要关闭此支付验证窗口</p>',
                          '<p class="mt10"><strong>请在2小时内支付，超时将关闭订单；</strong></p>',
                          '<p class="mt10"><a class="btn btn-106-30-gray mr10" href="/site/help.html?tag=pay" target="_blank">支付遇到问题</a><a class="btn btn-97-30" id="finishPay">支付完成</a></p>',
                      '</div>'].join(''),
            okBtnText: "确定",
            cancelBtnText: "取消",
            hasCloseBtn: true,
            hasOkBtn: false,
            hasBtn: false,
            hasCancelBtn: true,
            okCallback: function () { },
            cancelCallback: function () { location.href = location.href; },
            isFixed: true
        });
        $('#finishPay').unbind('click').bind('click', function () {
            if (couponConfig.checkOrderUrl && couponConfig.checkOrderUrl != '') {
                
                var _url = couponConfig.checkOrderUrl;

                if (couponConfig.type == enum_CouponType.VIEWPOINT || 
                    couponConfig.type == enum_CouponType.REWARD ||
                    couponConfig.type == enum_CouponType.VOTE ||
                    couponConfig.type == enum_CouponType.GIFT) {
                    if (couponConfig.checkOrderUrl.indexOf('?') > 0) {
                        _url = couponConfig.checkOrderUrl + '&orderType=' + couponConfig.type;
                    } else {
                        _url = couponConfig.checkOrderUrl + '?orderType=' + couponConfig.type;
                    }
                }


                $.ajax({
                    url: _url,
                    type: 'GET',
                    data: {},
                    dataType: 'json',
                    async: false,
                    success: function (json) {
                        if (json && json.success) {
                            location.href = location.href;
                        } else {
                            //支付提示: failed
                            dlgClone.standardDialog({
                                title: "支付提示",
                                width: 450,
                                content: ['<div>',
                                              '<p class="tc mt30">支付未完成，您可以去消费记录中继续支付</p>',
                                          '</div>'].join(''),
                                okBtnText: "继续支付",
                                cancelBtnText: "取消",
                                hasCloseBtn: true,
                                hasOkBtn: true,
                                hasBtn: true,
                                hasCancelBtn: false,
                                okCallback: function () {
                                    location.href = '/order/orderList.jspa';
                                },
                                cancelCallback: function () {
                                },
                                isFixed: true
                            });
                        }
                    }
                });
            }
        });
    };

    var bindEvent = function (data) {

        $('#coupon-list').find('input[type="checkbox"]').click(function () {
            var finalPrice = $('#finalPrice'),
                notice = $('#notice'),
                btnCouponPay = $('#btnCouponPay');

            $('#coupon-list').find('input[type="checkbox"]').not(this).prop('checked', false);
            //alert(1);
            var _price = parseInt($(this).attr('data-price'), 10);

            if(data.pdType == 2){
               
                var discPrice = parseInt($('#original-disc').find("span").text(),10);
                if($(this).is(':checked')){
                    if(discPrice-_price > 0){
                        finalPrice.text(discPrice-_price);
                        notice.hide();
                     }else{
                        finalPrice.text(0);
                        notice.show();
                     }
                    if (couponConfig.type == enum_CouponType.REFERENCE || couponConfig.type == enum_CouponType.PORTFOLIO || couponConfig.type == enum_CouponType.GLANCE) {
                        btnCouponPay.text(discPrice - _price > 0 ? '立即支付' : '立即订阅');
                    } else {
                        btnCouponPay.text('立即支付');
                    }
                }else{
                    
                    finalPrice.text(discPrice);
                    notice.hide();
                    btnCouponPay.text('立即支付');
                }

            }else{
                //不是长期内参
                if ($(this).is(':checked')) {
                    if (productPrice - _price > 0) {
                       
                        finalPrice.text(productPrice - _price);
                        notice.hide();
                    } else {
                        finalPrice.text(0);
                        notice.show();
                    }

                    if (couponConfig.type == enum_CouponType.REFERENCE || couponConfig.type == enum_CouponType.PORTFOLIO || couponConfig.type == enum_CouponType.GLANCE) {
                        btnCouponPay.text(productPrice - _price > 0 ? '立即支付' : '立即订阅');
                    } else {
                        btnCouponPay.text('立即支付');
                    }
                }else{
                    finalPrice.text(productPrice);
                    notice.hide();
                    btnCouponPay.text('立即支付')
                }    
            }
        });
     

        $("#long-term-month").on('click','li',function(){
            $(this).css("border-color","#ff5050").addClass('month-border').siblings().css("border-color","#dbdbdb").removeClass('month-border');
            var index=$(this).index(),
                discountPrice=data.tipsDisCountVos[index].discountPrice/100,
                originalPrice=data.tipsDisCountVos[index].originalPrice/100,
                discount=data.tipsDisCountVos[index].discount;
              
                if(discount >= 1){
                    $(".line").hide();
                }else{
                    $(".line").show();
                }
                $("#original-disc").find("span").html(discountPrice).next().html(originalPrice+'元');
                //console.log(originalPrice*discount);
                
                //日期
                var time=data.tipsDisCountVos[index],
                    startTime=time.beginTime,
                    endTime=time.endTime;
               
                $(".start-time").html(startTime);
                $(".end-time").html(endTime);
          
            for(var i=0;i<data.items.length;i++){
                var limitPrice=data.items[i].limitPrice;
                if(discountPrice >= limitPrice){ //50 0 10 10
                    //复选框能点
                    $('#coupon-list').find('input[type="checkbox"]').eq(i).attr('disabled', false);
                    $('#coupon-list').find('tr').eq(i).find('*').css('color','#666').find('span').addClass('red');
                }else{
                    //不能点
                   $('#coupon-list').find('input[type="checkbox"]').eq(i).attr('disabled', true);
                   $('#coupon-list').find('tr').eq(i).find('*').css('color','#999').find('.red').removeClass('red');
                }
                /*if(discountPrice <= limitPrice){
                    //console.log(discountPrice <= limitPrice);
                    $('#coupon-list').find('input[type="checkbox"]').eq(i).attr('disabled', true);
                    $('#coupon-list').find('tr').eq(i).find('*').css("color","#999").find('.red').removeClass('red');

                }*/
            }

            var discPrice = $('#original-disc').find("span").text();
           
            $('#finalPrice').text(discPrice);
            $('#coupon-list').find('input[type="checkbox"]').not(this).prop('checked', false);

        })
        $('#long-term-month>li:last').click();//模拟点击

        //下单
        $('#btnCouponPay').click(function (e) {
            e.preventDefault();
            
            if (!$('#chkAgreement').is(':checked')) {
                JRJ.MiniAlerts.prompt({ message: '<p>请勾选并同意服务协议</p>' });
                return;
            }

            if ($('#chkAgreement2').length>0 && !$('#chkAgreement2').is(':checked')) {
                JRJ.MiniAlerts.prompt({ message: '<p>请勾选并同意服务协议</p>' });
                return;
            }

            if (___lock) {
                return;
            }
            ___lock = true;

            var cid = $('#coupon-list').find('input[type="checkbox"]:checked').attr('data-id');
            var month=$('.month-border').attr('data-month');
            
            switch (couponConfig.type) {
                case enum_CouponType.PORTFOLIO:
                case enum_CouponType.REFERENCE:
                   
                     window.open(api_place.replace(/({pid}|{cid}|{type}|{month})/gi,
                        function ($1) {
                            switch ($1.toLowerCase()) {
                                case '{pid}': return couponConfig.productId;
                                case '{cid}': return cid || '';
                                case '{type}': return couponConfig.type;
                                case '{month}': return month || '';
                            }
                        }));
                    break;


                case enum_CouponType.GLANCE:
                    window.open(api_place.replace(/({pid}|{cid}|{type}|{month})/gi,
                        function ($1) {
                            switch ($1.toLowerCase()) {
                                case '{pid}': return couponConfig.productId;
                                case '{cid}': return cid || '';
                                case '{type}': return couponConfig.type;
                                case '{month}': return month || '';
                            }
                        }));
                    break;
                case enum_CouponType.GIFT:
                case enum_CouponType.REWARD:
                case enum_CouponType.VIEWPOINT:
                    window.open(api_place_4_gift.replace(/({pid}|{cid}|{type}|{tgid}|{num}|{rmb}|{uniqueid})/gi,
                        function ($1) {
                            switch ($1.toLowerCase()) {
                                case '{pid}': return couponConfig.productId;
                                case '{cid}': return cid || '';
                                case '{type}': return couponConfig.type;
                                case '{tgid}': return couponConfig.tgid;
                                case '{num}': return couponConfig.num;
                                case '{rmb}': return couponConfig.rmb;
                                case '{uniqueid}': return couponConfig.uniqueid;
                            }
                        }));
                    break;
                case enum_CouponType.VOTE:
                    window.open(api_place_4_vote.replace(/({pid}|{cid}|{type}|{tgid}|{num}|{rmb}|{uniqueid}|{content})/gi,
                        function ($1) {
                            switch ($1.toLowerCase()) {
                                case '{pid}': return couponConfig.productId;
                                case '{cid}': return cid || '';
                                case '{type}': return couponConfig.type;
                                case '{tgid}': return couponConfig.tgid;
                                case '{num}': return couponConfig.num;
                                case '{rmb}': return couponConfig.rmb;
                                case '{uniqueid}': return couponConfig.uniqueid;
                                case '{content}': return couponConfig.content;
                            }
                        }));
                    break;
                default:
                    break;
            };

            //弹出支付完成弹窗
            showWaitingPaymentDlg();

            //$.ajax({
            //    url: api_place.replace('{pid}', couponConfig.productId).replace('{cid}', cid || '').replace('{type}', couponConfig.type),
            //    dataType: 'jsonp',
            //    type: 'get',
            //    cache: false,
            //    timeout: 5000,
            //    success: function (d) {
            //        switch (d.retCode) {
            //            case enum_ReturnCode_Place.Free, enum_ReturnCode_Place.CouponFree:
            //                JRJ.MiniAlerts.prompt({ message: '<p>订阅成功！</p>' });
            //                break;
            //            case enum_ReturnCode_Place.Existed:
            //                JRJ.Alerts.alert({
            //                    message: d.msg, autoClose: false, okCallback: function () {
            //                        window.location.href = d.redirectUrl;
            //                    }
            //                });
            //                break;
            //            case enum_ReturnCode_Place.GoPay:
            //                JRJ.Alerts.alert({
            //                    message: d.msg, autoClose: false, okCallback: function () {
            //                        window.open(d.redirectUrl);
            //                    }
            //                });
            //                break;
            //            case enum_ReturnCode_Place.Failed:
            //                JRJ.Alerts.alert({ message: d.msg, autoClose: false });
            //                break;
            //            default:
            //                break;
            //        }
            //    },
            //    complete: function () {
            //        ___lock = false;
            //    }
            //});
        });
    };


    var checkLogin = function () {
        if (typeof basicUserInfo == 'undefined' || basicUserInfo == null || basicUserInfo.userId == null) {
            return false;
        }
        return true;
    };

    var getApi = function (couponConfig) {
        switch (couponConfig.type) {
            case enum_CouponType.PORTFOLIO:
                return api_buy.replace('{pid}', couponConfig.productId).replace('{type}', enum_CouponType.PORTFOLIO);
                break;
            case enum_CouponType.REFERENCE:
                return api_buy.replace('{pid}', couponConfig.productId).replace('{type}', enum_CouponType.REFERENCE);
                break;
            case enum_CouponType.GLANCE:
                return api_buy.replace('{pid}', couponConfig.productId).replace('{type}', enum_CouponType.GLANCE);
                break;
            case enum_CouponType.GIFT:
            case enum_CouponType.REWARD:
            case enum_CouponType.VIEWPOINT:
                return api_buy_4_gift.replace(/({pid}|{type}|{tgid}|{num}|{rmb}|{content})/gi,
                function ($1) {
                    switch ($1.toLowerCase()) {
                        case '{pid}': return couponConfig.productId;
                        case '{type}': return couponConfig.type;
                        case '{tgid}': return couponConfig.tgid;
                        case '{num}': return couponConfig.num;
                        case '{rmb}': return couponConfig.rmb;
                        case '{content}': return couponConfig.content || '';
                    }
                });
                break;
            case enum_CouponType.VOTE:
                return api_buy_4_gift.replace(/({pid}|{type}|{tgid}|{num}|{rmb}|{content})/gi,
                function ($1) {
                    switch ($1.toLowerCase()) {
                        case '{pid}': return couponConfig.productId;
                        case '{type}': return couponConfig.type;
                        case '{tgid}': return couponConfig.tgid;
                        case '{num}': return couponConfig.num;
                        case '{rmb}': return couponConfig.rmb;
                        case '{content}': return couponConfig.content || '';
                    }
                });
                break;
            default:
                break;
        }
    };

    var adjustData = function (data) {
        data.amount = data.amount / 100;
        data.startTime = Util.dateFormat(new Date(parseInt(data.startTime, 10)), 'yyyy-mm-dd');
        data.endTime = Util.dateFormat(new Date(parseInt(data.endTime, 10)), 'yyyy-mm-dd');      

        //if (data.items != null && data.items.length > 0) {
        //    for (var i = 0; i < data.items.length; i++) {
        //        data.items[i].endTime = Util.dateFormat(new Date(parseInt(data.items[i].endTime, 10)), 'yyyy-mm-dd');
        //        data.items[i].price = data.items[i].price / 100;
        //    }
        //}

        switch (couponConfig.type) {
            case enum_CouponType.PORTFOLIO:
                if ((data.matchid || 0) > 0) {
                    data.note = '注意事项：付款后即可接收该组合的调仓信息，跟单更快速。大师赛组合没有目标收益和退款机制，请确认后购买。';
                } else {
                    data.note = '订阅须知：运行过程中，组合清仓后达到目标收益时可提前结束运行。若组合触及止损或到期未达到目标收益，视为失败，将于组合完成后的7~15个工作日内全额退款。';
                }
                break;
            case enum_CouponType.GLANCE:
                data.note = '支付须知：支付无悔，概不退款，支付成功后30分钟内可以随时查看组合持仓、调仓记录和互动等内容。';
                break;
            case enum_CouponType.REFERENCE:
                data.note = '订阅须知：此内容仅代表个人研究成果，供学习参考，不是投资依据，据此操作风险自担。';
                break;
            case enum_CouponType.VIEWPOINT:
                data.pname = Util.cutoff(couponConfig.productName, 30);
                break;
            default:
                break;

        }

        return data;

    };


    //弹窗
    var showDlg = function (config) {
        if (___lock) {
            return;
        }

        ___lock = true;

        //if (!checkLogin()) {
        //    JRJ.ui.isLogin();
        //    return;
        //}


        couponConfig = $.extend(couponConfig, config);

        //请求购买接口 并获取优惠券
        $.ajax({
            url: getApi(couponConfig),
            dataType: 'jsonp',
            type: 'get',
            cache: false,
            timeout: 5000,
            success: function (d) {
                if (typeof d != 'undefined' && d != null) {

                    switch (d.retCode) {
                        case enum_ReturnCode_Buy.Free:
                            JRJ.MiniAlerts.prompt({ message: '<p>订阅成功！</p>' });
                            break;
                        case enum_ReturnCode_Buy.GoPay:

                            d = adjustData(d);

                            productPrice = d.amount;

                            var _cnt = '';
                            if (couponConfig.type == 6) {
                                
                                _cnt = Mustache.render(dlgTmp6, d);                             

                            } else if (couponConfig.type == 1) {

                                d.ismaster = (d.matchid || 0) > 0;
                                _cnt = Mustache.render(dlgTmpl, d);

                            } else if (couponConfig.type == enum_CouponType.GLANCE) {
                                d.isGlance = true;
                                _cnt = Mustache.render(dlgTmpl, d);

                            } else {
                                _cnt = Mustache.render(dlgTmplGift, d);
                            }


                            dlgClone.standardDialog({
                                title: "确认购买",
                                customClass: 'dialog-coupon-buy',
                                width: 520,
                                content: _cnt,
                                okBtnText: "确定",
                                cancelBtnText: "取消",
                                hasBtn: false,
                                hasCloseBtn: true,
                                hasOkBtn: true,
                                hasCancelBtn: false,
                                okCallback: function () { },
                                cancelCallback: function () { },
                                isFixed: true
                            });

                            if(d.pdType == 2){
                                var str='';
                                var monthList=d.tipsDisCountVos;
                                $.each(monthList,function(i,val){
                                    if(monthList[i].discount < 1 && monthList[i].discount > 0){
                                        //var discount=(monthList[i].discount*10).toFixed(1);
                                        var discount=Math.round(monthList[i].discount*10 * 10) / 10
                                        //console.log(discount);
                                         str+='<li class="month-heightauto" data-month='+monthList[i].month+'><em>'+monthList[i].month+'个月</em><i>('+discount+'折)</i><span></span></li>';
                                                                                                     
                                    }else{
                                       str+='<li class="month-height45" data-month='+monthList[i].month+'><em>'+monthList[i].month+'个月</em><i></i><span></span></li>'; 
                                        
                                    }
                                                                   
                                })
                                $("#long-term-month").html(str);
                                $("#long-term-month").find('li:last').addClass("month-red");                              
                                 
                            }else{
                                $("#long-term-month").hide();
                            }
                            //绑定优惠券
                            if (d.items.length > 0) {
                                var couponList = $(Mustache.render(couponTmpl, { count: d.items.length }));
                                for (var i = 0; i < d.items.length; i++) {
                                    var _couponItem = $(Mustache.render(couponItemTmpl, d.items[i]));
                                    couponList.find('table').append(_couponItem);
                                    if(d.items[i].limitPrice==0){
                                        couponList.find('table').find(".col-5").eq(i).html("无金额门槛");
                                    }
                                    
                                }
                                $('#coupon-list').html(couponList);
                            }
                            
                            if (d.items.length > 4) {
                                $('.dialog-coupon-buy .coupon-list .table-wrap').css({ 'height': '176px' });
                            } else {
                                $('.dialog-coupon-buy .coupon-list .table-wrap').css({ 'height': 'auto' });
                            }

                            bindEvent(d);

                            break;
                        case enum_ReturnCode_Buy.Existed:
                            JRJ.Alerts.alert({
                                message: d.msg || '订单已存在， 请前往订单列表支付。', autoClose: false, okCallback: function () {
                                    window.location.href = d.redirectUrl;
                                }
                            });
                            break;
                        case enum_ReturnCode_Buy.Failed:
                            JRJ.Alerts.alert({ message: d.msg || '订阅失败，请重试。', autoClose: false });
                            break;
                        default:
                            break;
                    }


                    //是否需要可用性评测
                    if ((couponConfig.type == enum_CouponType.GLANCE || couponConfig.type == enum_CouponType.PORTFOLIO || couponConfig.type == enum_CouponType.REFERENCE) && d.evaluated == 1) {
                        JRJ.usability.show();
                    }
                   
                }
            },
            complete: function (xhr, text) {
                ___lock = false;

                window.console && console.log(text + '<<<<<<<<<<<<<<<<<<<<<');
            }
        });
    };

    var guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    };

    return {
        show: showDlg,
        guid: guid
    };

})();

