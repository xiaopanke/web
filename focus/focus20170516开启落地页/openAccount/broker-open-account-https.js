(function() {

    var createScript = function(url, callback) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        head.appendChild(script);
        script.onload = function() {
            if (callback) {
                callback();
            }
        };
    };

    var createStyle = function() {
        var css = ['html { font-size:100%; }.layout-box { display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex;display: flexbox;display: box; }',
                '.trading-open-account { background:rgba(0,0,0,0.8);width:100%;padding:0.65625rem 0.9375rem; box-sizing:border-box; position:fixed;left:0;bottom:0; }',
                '.trading-open-account > div { height:2.4375rem; }',
                '.trading-open-account > div:first-child { -webkit-box-flex: 1; -webkit-flex: 1; -moz-flex: 1; -ms-flex: 1; flex: 1; }',
                '.trading-open-account > div:last-child { width:7.5rem; }',
                '.trading-open-account > div:last-child .btn { display:inline-block;width:7.5rem;text-align:center;height:2.4375rem;line-height:2.4375rem; background:#F24439;border-radius:4px;color:#fff;font-size:1.0625rem; }',
                '.trading-open-account input[type="text"]{height:2.125rem;outline:none;width:10rem;text-align:center;font-size:0.75rem;background:rgba(255,255,255,.2);border:0;margin-top:0.15625rem;border-radius:0;color:#fff;}'
            ].join(''),
            body = document.getElementsByTagName('body')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        body.appendChild(style);
    };

    createStyle();


    createScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
        createScript('https://i0.jrjimg.cn/zqt-red-1000/focus/common/js/require.js', function() {


            var Is_ITOUGU_APP = function() {

                if (typeof AppName != 'undefined' && AppName != null && AppName != '') {
                    return AppName.toUpperCase() == 'ITOUGU';
                }
                return false;
            };

            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }

            var goDownload = function() {
                var IS_IPAD = navigator.userAgent.match(/iPad/i) != null,
                    IS_IPHONE = !IS_IPAD && ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)),
                    IS_IOS = IS_IPAD || IS_IPHONE,
                    IS_ANDROID = !IS_IOS && navigator.userAgent.match(/android/i) != null,
                    IS_MOBILE = IS_IOS || IS_ANDROID;


                function is_weixin() {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        return true;
                    } else {
                        return false;
                    }
                }

                function is_weixin_ios() {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger" && browser.versions.ios == true) {
                        return true; } else {
                        return false; }
                };

                $(".bgbig").unbind().click(function() {
                    $(".tsbox,.bgbig").hide();
                });

                if (is_weixin() == true) {
                    $(".tsbox,.bgbig").show();
                } else if (is_weixin_ios() == true) {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jrj.tougu";
                } else if (IS_IOS) {

                    var iFrame = document.createElement('iframe');
                    iFrame.style.display = "none";
                    iFrame.src = 'aitougu://';

                    document.body.appendChild(iFrame);

                    setTimeout(function() {

                        if (!document.webkitHidden) {
                            window.location.href = 'https://itunes.apple.com/cn/app/ai-tou-gu/id935173185?mt=8';
                        }

                    }, 25);

                } else if (IS_ANDROID) {

                    window.location.href = 'aitougu://tougu';
                    setTimeout(function() {

                        if (!document.webkitHidden) {
                            window.location.href = 'http://sjcms.jrj.com.cn/app_tg.php';
                        }

                    }, 25);
                }

            };


            require.config({
                baseUrl: 'https://i0.jrjimg.cn/zqt-red-1000/focus/common/js/',
                paths: {
                    'jquery': 'jquery-1.7.2.min-amd',
                    'WeChatShare': 'wechat-sharehttps',
                    'sizeInit': 'sizeInit'
                },
                urlArgs: 'v=20160816'
            });

            require(['jquery', 'WeChatShare'], function($, WeChatShare) {

                (function() {
                    var elements = ['<section class="trading-open-account layout-box">',
                        '<div><input id="inviteCode" type="text" placeholder="请输入您的邀请码(选填)" maxlength="6" /></div>',
                        '<div><a class="btn btn-open-account" href="javascript:;">马上开户</a></div>',
                        '</section>',
                        '<div class="tsbox" style="display:none;"><img src="http://i0.jrjimg.cn/wap2014/wxbug/newtcphone.png" /></div>',
                        '<div class="bgbig" style="display:none;"></div>'
                    ].join('');

                    $('body').append($(elements));
                })();

                WeChatShare({
                    shareTitle: document.title,
                    shareLink: window.location.href,
                    shareDesc: '',
                    shareImg: '',
                    callback: function(wx) {
                        wx.hideMenuItems({
                            menuList: [
                                'menuItem:share:appMessage',
                                'menuItem:share:timeline',
                                "menuItem:share:qq",
                                "menuItem:share:weiboApp",
                                "menuItem:share:facebook",
                                'menuItem:share:QZone',
                                "menuItem:openWithQQBrowser",
                                'menuItem:openWithSafari'
                            ]
                        });
                    }
                });

                setTimeout(function() { 
                    $('.btn-open-account').click(function(e) {
                        if (!Is_ITOUGU_APP()) {
                            goDownload();
                            return;
                        }
                        jrj.jsCallNative('107', JSON.stringify({ inviteCode: $('#inviteCode').val() || '', brokerId: brokerId }));

                    });
                }, 60);


            });

        });
    });


})();