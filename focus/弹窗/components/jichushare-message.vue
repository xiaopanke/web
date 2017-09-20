<style scoped>
.msg {
  height: 1rem;
}

.msg i {
  float: left;
  line-height: 1rem;
  color: #fff4c8;
  font-size: .3rem;
  margin-right: .12rem;
  font-style: normal;
}

.msg em {
  float: left;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left: 6px solid #fff4c8;
  margin-top: .36rem;
}



/*弹层*/

.mask {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .6;
  filter: alpha(opacity=60);
  top: 0;
  left: 0;
  z-index: 20;
}

.layer {
  display: none;
  width: 6.6rem;
  height: 7.68rem;
  position: fixed;
  top: .8rem;
  left: 50%;
  margin-left: -3.38rem;
  z-index: 21;
  color: #000;
  animation: haha .6s cubic-bezier(1, -0.49, 0, 1.5);
  color: #2f0c0a;
  background: #fff4c8;
  border: 4px solid #fdcc0f;
  border-radius: .32rem;
}

.layer p {
  font-size: .28rem;
  line-height: .44rem;
  margin: 0 .24rem;
}

.layer .tit {
  text-align: center;
  font-size: .3rem;
  line-height: .6rem;
  margin-top: 5px;
}

@keyframes haha {
  from {
    transform: scale(6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.closebtn {
  position: absolute;
  cursor: pointer;
  left: 50%;
  bottom: -1.2rem;
  margin-left: -.44rem;
  width: .88rem;
  height: .88rem;
  background: url(../assets/images/jichushare/close.png) no-repeat;
  background-size: 100% 100%;
}
</style>
<template>
<div class="jichushare-message">
  <div class="msg" @click="()=>{this.showMessage=true}"><i>活动说明</i><em></em></div>
  <div class="mask" :style="{display:showMessage ? 'block' : 'none'}"></div>
  <!--抽中-->
  <div class="layer" :style="{display:showMessage ? 'block' : 'none'}">
    <i class="closebtn" @click="()=>{this.showMessage=false}"></i>
    <p class="tit">活动说明</p>
    <p>1、您需要连续三日截图分享到朋友圈、微信好友、QQ、微博后，即可参与成功<br /> 2、该活动只限于没有体验过Z点操盘的用户，如果您已经体验过z点操盘，则我们将送你8折购买优惠券
      <br /> 3、你在分享时一定处在登录状态，分享后我们才能发金豆和Z点操盘7天免费体验。非登录情况下，参加活动无效。
      <br /> 4、同一个账号（包括同一个设备、同一个账号、同一个身份证）只能参加一次分享活动。
      <br /> 5、Z点操盘免费活动激活后，我们会发放短信给您，请您及时使用。从激活开始算起7天后免费体验结束。
      <br /> 6、您在参加活动成功后，我们将在3个工作日内发放金豆（积分），到您的积分商场。
    </p>
  </div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
      showMessage: false
    }
  },
  computed: mapState({
  }),
  mounted () {
  }
}
</script>
