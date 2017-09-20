<style>
body {
    background-color: #000 !important;
    font-family: '微软雅黑';
}

input {
    outline: none;
}

#pagination span {
    background: red;
    display: block;
    cursor: pointer;
    margin-bottom: 17px;
    height: 70px;
    background: none;
    width: 100%;
    background: none;
}
</style>
<style lang="scss" scoped>
@import '../assets/css/reset.css';
@import '../assets/css/swiper.min.css';
.box {
    width: 100%;
}
.bg1 {
    background: url("../assets/images/nineteen-activity/nineteen-web-b1.jpg") center 0 no-repeat;
    height: 455px;
}
.bg2 {
    background: url("../assets/images/nineteen-activity/nineteen-web-b2.jpg") center 0 no-repeat;
    height: 683px;
}
.bg3 {
    background: url("../assets/images/nineteen-activity/nineteen-web-b3.jpg") center 0 no-repeat;
    height: 536px;
}
.bg4 {
    background: url("../assets/images/nineteen-activity/nineteen-web-b4.jpg") center 0 no-repeat;
    height: 657px;
}
.bg5 {
    background: url("../assets/images/nineteen-activity/nineteen-web-b5.jpg") center 0 no-repeat;
    height: 841px;
}
.bg6 {
    background: url("../assets/images/nineteen-activity/nineteen-web-b6.jpg") center 0 no-repeat;
    height: 1056px;
    margin-bottom: 147px;
}
.box-con {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    height: 100%;
}
.bg2 video {
    width: 586px;
    height: 350px;
    float: right;
    margin: 250px 1px 0 0;
}
.bg3 a {
    width: 80px;
    height: 20px;
    float: left;
}
.bg3 a.link1 {
    margin: 428px 0 0 81px;
}
.bg3 a.link2 {
    margin: 428px 0 0 285px;
}
.bg3 a.link3 {
    margin: 428px 0 0 290px;
}
.bg4 a {
    width: 142px;
    height: 48px;
    float: right;
    margin: 26px 48px 0 0;
}
.bg5 .btn {
    width: 142px;
    height: 48px;
    float: right;
    margin: 21px 107px 0 0;
}

.swiper-container {
    width: 750px;
    height: 400px;
    z-index: 3;
    margin-left: 241px;
    margin-top: 306px;
    position: static;
    float: left;
}
#pagination {
    position: absolute;
    top: 369px;
    left: 0;
    width: 200px;
}
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    filter: alpha(opacity=60);
    top: 0;
    left: 0;
    z-index: 2;
}
.layer {
    position: fixed;
    left: 0;
    right: 0;
    top: 15%;
    bottom: 15%;
    text-align: center;
    opacity: 0.9;
    z-index: 3;
    animation: pop 0.6s cubic-bezier(1,-0.49, 0, 1.5);
}

.layer.success {}
.layer.success .box {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 704px;
    height: 307px;
    background: url("http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170814zlhweb/popup-success.png") no-repeat center bottom;
}

.layer.popup-join {}
.layer.popup-join .box {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 704px;
    height: 355px;
    background: url("http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170814zlhweb/popup-join.png") no-repeat center bottom;
}
.layer.popup-join .box .btn-join,
.layer.popup-join .box span {
    position: absolute;
    top: 196px;
}
.layer.popup-join .box span input {
    width: 211px;
    height: 40px;
    line-height: 40px;
    background: none;
    border: none;
    font-size: 20px;
    color: #452609;
}
.layer.popup-join .box span input::-webkit-input-placeholder {
    color: #A78B67;
}
.layer.popup-join .box .userNamebox {
    left: 101px;
}
.layer.popup-join .box .phonebox {
    right: 32px;
}
.layer.popup-join .box .phonebox input {
    width: 248px;
}
.layer.popup-join .box .btn-join {
    top: 260px;
    right: 227px;
    opacity: 0;
    width: 214px;
    height: 62px;
}
.layer.popup-join .box .tooltip {
    top: -32px;
    right: 0;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    opacity: 0.8;
}

.layer .box .close {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url("http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170814zlhweb/icon-close.png") no-repeat center center;
    cursor: pointer;
    z-index: 1;
}
.player img {
    display: none;
}
.join em {
    position: absolute;
    top: -36px;
    left: 0;
    background: #fff;
    border: 1px red solid;
    border-radius: 5px;
    padding: 5px;
}
.footer {
    width: 100%;
    height: 147px;
    background: url("../assets/images/nineteen-activity/nineteen-web-b7.jpg") center 0 no-repeat;
    position: fixed;
    bottom: 0;
    z-index: 10;
}
.footer .box-con div {
    width: 600px;
    height: 147px;
    float: left;
}
.footer div p:first-child {
    margin-left: 60px;
}
.footer div p {
    width: 251px;
    height: 34px;
    line-height: 34px;
    float: left;
    margin: 84px 0 0 38px;
    position: relative;
}
.footer div p span {
    font-size: 16px;
    color: #fff;
    float: left;
    width: 40px;
    text-align: left;
}
.footer div p input {
    width: 191px;
    height: 24px;
    padding: 5px 10px;
    float: left;
    background-color: #4d4b4a;
    border: none;
    color: #fff;
}
.footer a {
    width: 161px;
    height: 50px;
    float: right;
    margin: 47px 55px 0 0;
}
.footer em {
    margin-left: 40px;
    float: left;
    font-size: 12px;
    background: #fff;
    border: 1px red solid;
    border-radius: 3px;
    padding: 0 5px;
    position: absolute;
    right: 0;
    top: -1px;
}
</style>

<template>
<div class="box">
    <div class="bg1">
    </div>
    <div class="bg2">
        <div class="box-con">
            <video src="http://flvdata.jrj.com.cn/2012/2017/qita/20170911mls.mp4" controls="controls" id="myvideo" autoplay="autoplay">
            您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
    <div class="bg3">
        <div class="box-con">
            <a href="http://itougu.jrj.com.cn/activity/web/zlhweb7.jspa#section1" class="link1">&nbsp;</a>
            <a href="http://itougu.jrj.com.cn/activity/web/vipweb.jspa" class="link2">&nbsp;</a>
            <a href="http://itougu.jrj.com.cn/activity/web/zlhweb7.jspa#section3" class="link3">&nbsp;</a>
        </div>
    </div>
    <div class="bg4">
        <div class="box-con">
            <a href="javascript:;" @click="popShow">&nbsp;</a>
        </div>
    </div>
    <div class="bg5">
        <div class="box-con">
            <a href="javascript:;" class="btn" @click="popShow">&nbsp;</a>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go0.jpg" class="main-img"></div>
                    <div class="swiper-slide"><img src="http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go1.jpg" class="main-img"></div>
                    <div class="swiper-slide"><img src="http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go2.jpg" class="main-img"></div>
                    <div class="swiper-slide"><img src="http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go3.jpg" class="main-img"></div>
                    <div class="swiper-slide"><img src="http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go4.jpg" class="main-img"></div>
                </div>
                <div class="swiper-pagination" id="pagination"></div>
            </div>
        </div>
    </div>
    <div class="bg6">
    </div>
    <div class="footer">
        <div class="box-con">
            <div>
                <p>
                    <span>姓名</span>
                    <input type="text" value="" placeholder="请输入您的中文姓名" v-model="fUserName" />
                    <em v-html="fTxtUHtml" v-if="fTxtUShow"></em>
                </p>
                <p>
                    <span>手机</span>
                    <input type="text" value="" placeholder="请输入您的11位手机号码" v-model="fPhone" />
                    <em v-html="fTxtPHtml" v-if="fTxtPShow"></em>
                </p>
            </div>
            <a href="javascript:;" @click="fJoinSubmit">&nbsp;</a>
        </div>
    </div>
    <div class="mask" v-if="maskShow"></div>
    <div class="layer success" v-if="successShow">
        <div class="box">
            <i class="close" @click="close"></i>
        </div>
    </div>
    <div class="layer popup-join" v-if="joinShow">
        <div class="box">
            <i class="close" @click="close"></i>
            <div class="join">
                <span class="userNamebox">
                  <input type="text" class="userName" placeholder="请输入您的中文名" v-model="userName" />
                  <em v-html="txtUHtml" v-if="txtUShow"></em>
              </span>
                <span class="phonebox">
                  <input type="text" class="phone" placeholder="请输入您的11位手机号码" v-model="phone" />
                  <em v-html="txtPHtml" v-if="txtPShow"></em>
              </span>
                <a href="javascript:;" class="btn btn-large btn-join" @click="joinSubmit">立即预约</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import Swiper from '../assets/plugins/activity-slider/swiper.min.js'
window.Swiper = Swiper

export default {
  data () {
    return {
      show: false,
      maskShow: false,
      successShow: false,
      joinShow: false,
      txtUHtml: '',
      txtUShow: false,
      txtPHtml: '',
      txtPShow: false,
      fTxtUHtml: '',
      fTxtUShow: false,
      fTxtPHtml: '',
      fTxtPShow: false

    }
  },
  computed: mapState({
    type: state => {
      return state.reservation.type
    },
    err: state => {
      return state.reservation.err
    }
  }),
  components: {},
  methods: {
    popShow () {
      this.maskShow = true
      this.joinShow = true
    },
    close () {
      this.maskShow = false
      this.successShow = false
      this.joinShow = false
      this.userName = ''
      this.phone = ''
    },
    joinSubmit () {
      if (!this.type) {
        alert('提交中')
        return
      }
      var regname = /^[\u4e00-\u9fa5]+$/gi
      var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
      if (!this.userName || this.userName.length === 0) {
        this.txtUShow = true
        this.txtUHtml = '姓名不能为空！'
        return
      } else if (!regname.test(this.userName)) {
        this.txtUShow = true
        this.txtUHtml = '请输入中文名'
        return
      } else if (!this.phone || this.phone.length === 0) {
        this.txtPShow = true
        this.txtPHtml = '手机号不能为空！'
        return
      } else if (!reg.test(this.phone)) {
        this.txtPShow = true
        this.txtPHtml = '手机号输入不正确！'
        return
      }
      this.$store.dispatch('reservation/fetch', {
        aid: '774663343076651008',
        userName: this.userName,
        phone: this.phone,
        bizsource: 'HD_ZNTF_PC',
        source: '1',
        tgqdcode: 'L54MST72'
      })
    },
    fJoinSubmit () {
      if (!this.type) {
        alert('提交中')
        return
      }
      var regname = /^[\u4e00-\u9fa5]+$/gi
      var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
      if (!this.fUserName || this.fUserName.length === 0) {
        this.fTxtUShow = true
        this.fTxtUHtml = '姓名不能为空！'
        return
      } else if (!regname.test(this.fUserName)) {
        this.fTxtUShow = true
        this.fTxtUHtml = '请输入中文名'
        return
      } else if (!this.fPhone || this.fPhone.length === 0) {
        this.fTxtPShow = true
        this.fTxtPHtml = '手机号不能为空！'
        return
      } else if (!reg.test(this.fPhone)) {
        this.fTxtPShow = true
        this.fTxtPHtml = '手机号输入不正确！'
        return
      }
      this.$store.dispatch('reservation/fetch', {
        aid: '774663343076651008',
        userName: this.fUserName,
        phone: this.fPhone,
        bizsource: 'HD_ZNTF_PC',
        source: '1',
        tgqdcode: 'L54MST72'
      })
    }
  },
  mounted () {
    document.title = '擒龙十九大'
    window.Swiper('.swiper-container', {
      slidesPerView: 1,
      paginationClickable: true,
      autoplay: 2000,
      loop: true,
      grabCursor: true,
      spaceBetween: 0,
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction: false
    })
    var _this = this
    this.$watch('txtUShow', txtUShow => {
      setTimeout(function () {
        _this.txtUShow = false
        _this.txtUHtml = ''
      }, 1000)
    })
    this.$watch('txtPShow', txtPShow => {
      setTimeout(function () {
        _this.txtPShow = false
        _this.txtPHtml = ''
      }, 1000)
    })
    this.$watch('fTxtUShow', fTxtUShow => {
      setTimeout(function () {
        _this.fTxtUShow = false
        _this.fTxtUHtml = ''
      }, 1000)
    })
    this.$watch('fTxtPShow', fTxtPShow => {
      setTimeout(function () {
        _this.fTxtPShow = false
        _this.fTxtPHtml = ''
      }, 1000)
    })
    this.$watch('type', type => {
      if (type) {
        this.maskShow = true
        this.successShow = true
        this.joinShow = false
      }
    }, { deep: true })
    this.$watch('err', err => {
      alert(err.msg)
    })
  }
}
</script>
