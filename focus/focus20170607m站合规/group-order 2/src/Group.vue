<template>
	<div class="group-title">
	  <b></b>
	  <h3>订阅组合</h3>
	</div>

	<div id="group-content">
		<div>
		  <section class="group-info">
		    <p>组合名称：<span>熊市逆袭组合</span></p>
		    <p>目标收益：<span>20%</span></p>
		    <p>运行时间：<span>2015.08.09 - 2015.09.09</span></p>
		  </section>

		  <section class="group-service">
		    <p>订阅后可享受以下服务</p>
		    <ul>
		      <li>通过APP、网站消息实时接收组合交易动态</li>
		      <li>查看交易记录和持仓股票</li>
		      <li>与老师交流投资经验</li>
		    </ul>
		  </section>

		  <section class="group-refund clearfix">
		    <h4>退款保障</h4>
		    <p><b class="r-arr"></b></p>
		  </section>

		  <coupon :discount.sync="discount"></coupon>

		  <payment :payment.sync="payment"></payment>

		  <section class="group-price">
		    <dl class="clearfix"><dt>组合总额</dt><dd>¥<span v-text="msg.total"></span></dd></dl>
		    <dl class="clearfix"><dt>组合优惠</dt><dd><span v-if="discount">－</span> ¥<span v-text="discount"></span></dd></dl>
		  </section>
	 	</div>
	</div>

  <div class="group-order">
    <p>实付款：¥<span v-text="msg.total-discount<0?0:msg.total-discount"></span></p>
    <button>提交订单</button>
  </div>
</template>


<script>
  import coupon from './components/Coupon.vue'
  import payment from './components/Payment.vue'

  export default {
    components: { payment, coupon },

    data () {
      return { msg: resData, payment: 'wechat', discount: 1 }
    }
  }
</script>
 

<style>
  body {
    background-color: #f0f0f0;
    font-size: 14px;
    color: #666;
  }

  #group-content {
  	position: absolute;
  	left: 0;
  	top: 54px; bottom: 60px;
  	width: 100%;
  	z-index: 1;
  	overflow: hidden;
  }

  #group-content>div {
  	position: absolute;
  	left: 0; top: 0;
  	width: 100%;
  	z-index: 1
  }

  .group-title {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #dbdbdb;
    background-color: #fff;
    z-index: 2;
  }

  .group-title>h3 {
    font-size: 20px;
    text-align: center;
    color: #333;
  }

  .group-title>b {
    position: absolute;
    top: 0; bottom: 0;
    left: 18px;
    margin: auto;
    width: 15px;height: 15px;
    transform: rotate(-45deg);
    border-style: solid;
    border-color: #4e5257;
    border-width: 2px 0 0 2px
  }

  section {
    background-color: #fff;
    margin: 10px 0;
    padding: 14px 12px;
    border-bottom: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
  }

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
    list-style-image: url(../img/check.png);
    list-style-position: inside;
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
  	position: absolute;
  	left: 0; bottom: 0;
  	width: 100%;
  	z-index: 2;
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
  .group-order>button {
	position: absolute;
	right: 0; top: 0;
	outline: 0; border: 0;
	height: 100%;
	background-color: #f24439;
	font-size: 18px;
	padding: 0 40px;
	color: #fff;
  }
</style>
