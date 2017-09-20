<template>
  <div class="group-wrap" :class="{'invisible': +msg.evaluated}">
	<div id="group-content">
		<div>
      <!--偷看-->
		  <!--<section class="group-info" v-if="+msg.orderType == 9">
		    <p>
          <div class="fr">
            {{orderTypeText + ':'}}
            <span v-text="msg.name"></span>
          </div>
          商品信息
        </p>
		    <p>
          <div class="fr">
            <span style="color: #ffa832;">30</span>分钟
          </div>
          偷看时长
        </p>
		  </section>-->

      <!--组合-->
      <!--<section class="group-info" v-if="+msg.orderType == 1">
		    <p>
          <div class="fr">
            {{orderTypeText + ':'}}
            <span v-text="msg.name"></span>
          </div>
          商品信息
        </p>
		    <p v-if="+msg.matchId==0">
          <div class="fr">
            <span v-text="msg.interest+'%'"></span>
          </div>
          目标收益
        </p>
		    <p>
          <div class="fr">
            <span v-text="msg.startTime+' - '+msg.endTime"></span>
          </div>
          {{+msg.matchId==0 ? '运行时间' : '比赛时间'}}
        </p>
		  </section>-->
      
		  <section class="group-info">
		    <p>
          <div class="fr middle">
            <span>{{orderTypeText + ':'}}</span>
            <span v-text="msg.name" style="display: inline-block;max-width: 115px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"></span>
          </div>
          商品信息
        </p>
        <div v-show="(msg.pdType == 2) && msg.startTime && msg.endTime">
          <div class="fr middle" style="color: #999;">
            {{msg.startTime +' 至 '+msg.endTime}}
          </div>
          服务有效期
        </div>
		    <p>
          <div class="fr">
            <span v-text="(msg.total/100).toFixed(2) + '元'" style="color: #f24439;"></span>
          </div>
          价格
        </p>
		  </section>


		  <!-- <section class="group-service" v-if="+msg.matchId==0">
		    <p>订阅后可享受以下服务</p>
		    <ul>
		      <li><i></i>通过APP实时接收组合交易动态</li>
		      <li><i></i>查看交易记录和持仓股票</li>
		      <li><i></i>与老师交流投资经验</li>
		    </ul>
		  </section> -->

      <section class="group-match" v-if="+msg.matchId">
        <p>注意事项：</p>
        <p>付款后即可接收该组合的调仓信息，跟单更快速。大师赛组合没有目标收益和退款机制，请确认后购买。</p>
      </section>

      <section class="group-match" v-if="+msg.orderType == 9">
        <p>支付须知：</p>
        <p>30分钟内可以随时查看组合持仓、调仓记录。</p>
        <p style="color: #ffa832;">支付无悔，概不退款。</p>
      </section>


<!-- 		  <section class="group-refund clearfix">
		    <h4>退款保障</h4>
		    <p><b class="r-arr"></b></p>
        <a href="../order/portfolioRefund.jspa"> </a>
		  </section> -->

      <section v-if="msg.coupon.length" class="coupon-comp clearfix" @click="showCoupon">
        <h4>优惠券</h4>
        <p v-if="coupons.couponId"><span v-text="coupons.discount+'元'"></span><b class="r-arr"></b></p>
        <p v-else><span v-text="msg.coupon.length"></span>张可用<b class="r-arr"></b></p>
      </section>

		  <payment :payment.sync="payment" :pay-type-list="msg.payTypeList"></payment>

		  <section class="group-price">
		    <dl class="clearfix"><dt>总额</dt><dd><span v-text="(msg.total/100).toFixed(2)+'元'"></span></dd></dl>
		    <dl class="clearfix"><dt>优惠</dt><dd><span v-if="+coupons.couponId">-</span><span v-text="coupons.discount.toFixed(2)+'元'"></span></dd></dl>
		  </section>

      <agreement :msg="msg" :is-agreed.sync="isAgreed" :is-agreed-new.sync="isAgreedNew" :show-agree.sync="showAgree" :agree-type.sync="agreeType"></agreement>
      
	 	</div>

	</div>

  <div class="group-order">
    <p>实付款：<span v-text="(msg.total/100).toFixed(2)-coupons.discount<0?0:((msg.total/100).toFixed(2)-coupons.discount).toFixed(2)"></span>元</p>

    <a v-if="isAgreed && isAgreedNew" @click="payEvent">立即支付</a>
    <b v-else>立即支付</b>
  </div>
  </div>

  <coupon :coupon-list="msg.coupon" :coupons.sync="coupons"></coupon>
  <agreement-detail :agree-type.sync="agreeType" :show-agree.sync="showAgree"></agreement-detail>
  <qrcode :show-qrcode.sync="showQRCode" :qrcode-data.sync="qrcodeData" :order-id.sync="orderId"></qrcode>
  
</template>


<script>
  import coupon from './components/Coupon.vue'
  import payment from './components/Payment.vue' 
  import agreement from './components/Agreement.vue'
  import agreementDetail from './components/AgreementDetail.vue'
  import qrcode from './components/QRCode.vue'
  import misc from './misc/misc.js'

  var timer = null;

  export default {
    components: { payment, coupon, agreement, agreementDetail, qrcode },
    methods: {
      showCoupon() {
        var _this = this
        ghostClick( function(){ _this.$set('coupons.showCoupon', true) } )
      },
      payEvent:function(){
        var vm = this;

        if(this.$data.mBuyUserId){
          //msite
          if(misc.isWechat()){
            vm.$set('showQRCode', true);

            $.ajax({
                url: 'payWapWechat.jspa?pid='+this.$data.msg.pid+'&orderId='+this.$data.msg.orderId+'&orderType='+this.$data.msg.orderType+'&payType='+ this.$data.payment+'&cid='+this.$data.coupons.couponId+'&buyUserId='+this.$data.mBuyUserId+'&accessPlat=' + (this.$data.mBuyUserId?4:''),
                dataType: 'jsonp',
                type: 'get',
                cache: false,
                timeout: 5000,
                success: function (data) {
                    if(data.status == 1){

                      if(data.payType && data.payType == 3){
                          window.location.href = data.url;
                          return;
                      }

                      vm.$set('qrcodeData', data.weixinUrl);
                      vm.$nextTick(function(){
                          this.$broadcast('qrcodeReady', data.weixinUrl);
                      });
                      vm.$set('orderId', data.orderId);


                      //查看支付完成
                      var checkOrder = function(){
                          if (timer) {
                              window.clearTimeout(timer);
                          }

                          timer = setTimeout(function () {
                              $.ajax({
                                  url: '//itougu.jrj.com.cn/order/checkWapWechat.jspa',
                                  data:{orderId:vm.$data.orderId},
                                  dataType: 'jsonp',
                                  type: 'get',
                                  cache: false,
                                  timeout: 5000,
                                  success: function (data) {
                                      if(data.status == 1){
                                          window.clearTimeout(timer);

                                          if(vm.$data.msg.orderType == 11){
                                            window.location.href='http://itougu.jrj.com.cn/marketing/zhuanti/common/finalsapp.jspa';
                                          }else{
                                            window.location.href='//i0.jrjimg.cn/itougu-msite/?tgid='+data.tgId+'#!/me';
                                          }

                                      }else{
                                          checkOrder();
                                      }
                                  },
                                  complete: function () {
                                  }
                              });
                          }, 1000);
                      }
                      checkOrder();
                      
                    }else{

                        //提示支付失败

                    }
                },
                complete: function () {
                }
            });

          }else{
            window.location.href= 'payWapAlipay.jspa?pid='+this.$data.msg.pid+'&orderId='+this.$data.msg.orderId+'&orderType='+this.$data.msg.orderType+'&payType='+ this.$data.payment+'&cid='+this.$data.coupons.couponId+'&buyUserId='+this.$data.mBuyUserId+'&accessPlat=' + (this.$data.mBuyUserId?4:'')
          }

        } else {
          //app
          window.location.href= 'pay.jspa?pid='+this.$data.msg.pid+'&orderId='+this.$data.msg.orderId+'&orderType='+this.$data.msg.orderType+'&payType='+ ((this.$data.msg.total/100)-(this.$data.coupons.discount)>0?this.$data.payment:3)+'&cid='+this.$data.coupons.couponId+'&buyUserId='+this.$data.mBuyUserId+'&accessPlat=' + (this.$data.mBuyUserId?4:'') + '&month=' + this.$data.msg.month

        }

      }
    },

    data () {
      return { 
        msg: resData, 
        isAgreed: true,
        isAgreedNew: true,
        agreeType: 0,
        showAgree: false,
        payment: resData.payTypeList[0],
        coupons: {
          discount: 0, showCoupon: 0, couponId: ''
        },
        mBuyUserId:misc.getQueryString('buyUserId'),
        showQRCode:false,
        qrcodeData:'',
        orderId:''
      }
    },
    ready(){
    },
    computed: {
      orderTypeText: function () {
        switch (parseInt(this.msg.orderType,10)){
          case misc.enum_CouponType.PORTFOLIO:
            return '组合'
            break;
          case misc.enum_CouponType.GIFT:
            return '礼物'
            break;
          case misc.enum_CouponType.VIEWPOINT:
            return '观点'
            break;
          case misc.enum_CouponType.REWARD:
            return '打赏'
            break;
          case misc.enum_CouponType.REFERENCE:
            return '内参'
            break;
          case misc.enum_CouponType.VOTE:
            return '投票'
            break;
          case misc.enum_CouponType.GLANCE:
            return '偷看'
            break;
          case misc.enum_CouponType.MATCH:
            return '实盘赛'
            break;
          case misc.enum_CouponType.MNZH:
            return '模拟组合'
            break;
        }
      }
    }
  }
</script>
 

<style>
  body {
    background-color: #f0f0f0;
    font-size: 14px;
    color: #333;
  }

  .tl { text-align:left;}
  .tc { text-align:center;}
  .tr { text-align:right;}
  .fl { float:left;}
  .fr { float:right;}
  .middle *{ display:inline-block;vertical-align:middle;}
  .middle option{ display:block;}

  .invisible {
    visibility: hidden;
  }

  #group-content {
  	position: absolute;
  	left: 0;
  	top: 0; bottom: 60px;
  	width: 100%;
    transition: left .5s;
    overflow: hidden;
    background-color: #efeff4;
  }

  #group-content>div {
  	position: absolute;
  	left: 0; top: 0;
  	width: 100%;
  	z-index: 1
  }

  #group-content.cmove {
    left: -100%;
  }

  .coupon-comp {
    position: relative;
  }
  .coupon-comp>h4 {
    font-size: 16px;
    float: left;
  }
  .coupon-comp>p {
    float: right;
    padding-right: 20px;
    line-height: 22px;
  }
  .coupon-comp>p>span {
    color: #f24439;
    margin-right: 4px;
  }

  section {
    background-color: #fff;
    margin: 10px 0;
    padding: 14px 12px;
    
  }

  .group-info{ background-image: url(../img/postcard.png); background-position: 0 100%; background-repeat: repeat-x;background-size:30px 5px;   }

  .group-info>p {
    margin-top: 12px;
  }
  .group-info>p:first-child {
    margin-top: 0;
  }
  .group-info>p>span {
    font-size: 16px;
    color: #333;
  }

  .group-service>p {
    font-size: 15px;
  }
  .group-service li {
    margin-top: 10px;
  }

  .group-service li>i {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../img/check.png) center bottom no-repeat;
    background-size: contain;
    margin-right: 8px;
  }

  .group-match {
    font-size: 12px;
    color: #333;
  }

  .group-refund {
    position: relative;
  }
  .group-refund>h4 {
    font-size: 16px;
    float: left;
  }
  .group-refund>p {
    float: right;
    padding-right: 16px;
    line-height: 22px;
  }

  .group-refund>a{
    position: absolute;
    top: 0;left: 0;
    width: 100%; 
    height: 100%;
  }
  .r-arr {
    position: absolute;
    top: 0; bottom: 0;
    right: 12px;
    margin: auto;
    width: 12px;height: 12px;
    transform: rotate(135deg);
    border-style: solid;
    border-color: #999;
    border-width: 2px 0 0 2px
  }

  .group-price {
  	font-size: 15px;
  	color: #999;
  }
  .group-price>dl:first-child {
  	margin-bottom: 6px;
  }
  .group-price>dl>dd {
	font-size: 16px;
	color: #f24439;
	float: right;
  }
  .group-price>dl>dt {
  	float: left;
  }

  .group-order {
  	position: fixed;
  	left: 0; bottom: 0;
  	width: 100%;
  	z-index: 20;
    transition: bottom .5s;
  }

  .group-order>p {
  	height: 60px;
  	line-height: 60px;
  	color: #fff;
  	font-size: 15px;
  	background-color: #4d4d4d;
  	padding-left: 12px
  }
  .group-order>p>span {
  	font-size: 20px
  }
  .group-order>a, .group-order>b {
  	position: absolute;
  	right: 0; top: 0;
    line-height: 60px;
    text-align: center;
  	background-color: #f24439;
  	font-size: 18px;
  	padding: 0 40px;
  	color: #fff;
  }

  .group-order>b {
    background-color: #999;
  }

</style>
