var Misc = {
    enum_CouponType: {
        PORTFOLIO: 1,   //组合
        GIFT: 2,        //礼物
        VIEWPOINT: 3,   //观点
        REWARD: 4,      //打赏
        REFERENCE: 6,    //内参
        VOTE: 8,        //投票
        GLANCE: 9,       //偷看
        MATCH: 11,       //实盘赛
        MNZH:12          //模拟组合
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    isWechat:function(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

};

module.exports = Misc;