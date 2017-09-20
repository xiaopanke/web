<style>
body {
    background-color: #000 !important;
    font-family: '微软雅黑';
}

input {
    outline: none;
}

.bg6 .box-con .swiper-pagination {
    position: absolute;
    top: 6.2rem;
    left: 0.42rem;
    width: 6.95rem;
}

.bg6 .swiper-pagination span.swiper-pagination-bullet {
    display: block;
    cursor: pointer;
    margin-right: 0.2rem;
    margin-bottom: 0.23rem;
    height: 0.7rem;
    width: 2rem;
    float: left;
    z-index: 5;
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
    background: url("../assets/images/nineteen-activity/nineteen-app-b1.jpg") no-repeat;
    background-size: 100% 100%;
    height: 10rem;
}
.bg2 {
    background: url("../assets/images/nineteen-activity/nineteen-app-b2.jpg") no-repeat;
    background-size: 100% 100%;
    height: 12.86rem;
}
.bg3 {
    background: url("../assets/images/nineteen-activity/nineteen-app-b3.jpg") no-repeat;
    background-size: 100% 100%;
    height: 12.12rem;
    position: relative;
}
.bg4 {
    background: url("../assets/images/nineteen-activity/nineteen-app-b4.jpg") no-repeat;
    background-size: 100% 100%;
    height: 9.79rem;
}
.bg5 {
    background: url("../assets/images/nineteen-activity/nineteen-app-b5.jpg") no-repeat;
    background-size: 100% 100%;
    height: 12.78rem;
}
.bg6 {
    background: url("../assets/images/nineteen-activity/nineteen-app-b6.jpg") no-repeat;
    background-size: 100% 100%;
    height: 12.48rem;
}
.bg7 {
    background: url("../assets/images/nineteen-activity/nineteen-app-b7.jpg") no-repeat;
    background-size: 100% 100%;
    height: 13.88rem;
    margin-bottom: 1.48rem;
}
.box-con {
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: 100%;
}
.bg2 video {
    width: 6.70rem;
    height: 4.1rem;
    float: left;
    margin: 8.2rem 0 0 0.4rem;
}
.bg3 a {
    width: 1.4rem;
    height: 0.3rem;
    float: left;
}
.bg3 a.link1 {
    position: absolute;
    top: 4.75rem;
    left: 2.28rem;
}
.bg3 a.link2 {
    position: absolute;
    top: 8rem;
    left: 2.28rem;
}
.bg3 a.link3 {
    position: absolute;
    bottom: 0.5rem;
    left: 2.28rem;
}
.footer {
    width: 100%;
    background: url("../assets/images/nineteen-activity/nineteen-app-b8.jpg") no-repeat;
    background-size: 100% 100%;
    height: 1.48rem;
    position: fixed;
    bottom: 0;
    z-index: 10;
}
.bg4 a {
    width: 1.78rem;
    height: 0.68rem;
    float: right;
    margin: 0.34rem 0.28rem 0 0;
}
.bg6 .link {
    width: 1.78rem;
    height: 0.68rem;
    float: right;
    margin: 0.34rem 0.28rem 0 0;
}
.swiper-container {
    width: 6.58rem;
    height: 3.50rem;
    z-index: 3;
    margin-left: 0.46rem;
    margin-top: 7.15rem;
    position: static;
    float: left;
}
.layer,
.mask {}
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
    bottom: 40%;
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
    width: 360px;
    height: 124px;
    background: url("http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170814zlhweb/h5/popup-success.png") no-repeat center bottom;
    background-size: auto 100%;
}

.layer.popup-join {}
.layer.popup-join .box {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 7rem;
    height: 2.78rem;
    background: url("http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170814zlhweb/h5/popup-join.png") no-repeat center bottom;
    background-size: auto 100%;
}
.layer.popup-join .box .btn-join,
.layer.popup-join .box span {
    position: absolute;
    top: 1.29rem;
    height: 0.4rem;
}
.layer.popup-join .box span input {
    width: 2.2rem;
    height: 0.4rem;
    line-height: 0.4rem;
    background: none;
    border: none;
    font-size: 0.14rem;
    color: #452609;
    float: left;
}
.layer.popup-join .box span input::-webkit-input-placeholder {
    color: #A78B67;
}
.layer.popup-join .box .userNamebox {
    left: 1.15rem;
}
.layer.popup-join .box .phonebox {
    right: 0.3rem;
}
.layer.popup-join .box .phonebox input {
    width: 2.6rem;
}
.layer.popup-join .box .btn-join {
    top: 1.85rem;
    left: 2.6rem;
    margin: 0;
    padding: 0;
    border-radius: 0.04rem;
    width: 2.14rem;
    height: 0.62rem;
    line-height: 0.62rem;
    opacity: 0;
}
.layer .box .close {
    position: absolute;
    right: 0;
    top: -30px;
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url("http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170814zlhweb/h5/icon-close.png") no-repeat center center;
    background-size: contain;
    cursor: pointer;
    z-index: 1;
    opacity: inherit;
}

.join em {
    position: absolute;
    top: -0.5rem;
    left: 0;
    background: #fff;
    border: 0.01rem red solid;
    border-radius: 0.1rem;
    padding: 0.05rem;
    font-size: 0.12rem;
}
.footer a { width: 2.16rem; height: 0.68rem; float: left; margin: 0.32rem 0 0 4.83rem; }
</style>

<template>
<div class="box">
    <div class="bg1">
    </div>
    <div class="bg2">
        <div class="box-con">
            <video src="http://flvdata.jrj.com.cn/2012/2017/qita/20170911mls.mp4" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
    <div class="bg3">
        <div class="box-con">
            <a href="http://itougu.jrj.com.cn/activity/app/zlhapp7.jspa" class="link1"></a>
            <a href="http://itougu.jrj.com.cn/activity/app/vipapp.jspa" class="link2"></a>
            <a href="http://itougu.jrj.com.cn/activity/app/zlhapp7.jspa" class="link3"></a>
        </div>
    </div>
    <div class="bg4">
        <div class="box-con">
            <a href="javascript:;" @click="popShow">&nbsp;</a>
        </div>
    </div>
    <div class="bg5">
    </div>
    <div class="bg6">
        <div class="box-con">
            <a href="javascript:;" class="link" @click="popShow"></a>
            <activity-slider :listData="listData" />
        </div>
    </div>
    <div class="bg7">
    </div>
    <div class="footer">
        <div class="box-con">
            <!-- <a href="http://itougu.jrj.com.cn/tips/10716.jspa" class="pulse animated infinite"></a> -->
            <a href="javascript:;" @click="popShow"></a>
        </div>
    </div>

    <div class="mask" v-if="maskShow"></div>
    <div class="layer popup-join" v-if="joinShow">
        <div class="box">
            <i class="close" @click="close"></i>
            <div class="join">
                <span class="userNamebox">
                    <input type="text" class="userName" placeholder="请输入您的中文名" v-model="userName">
                    <em v-html="txtUHtml" v-if="txtUShow"></em>
                </span>
                <span class="phonebox">
                    <input type="text" class="phone" placeholder="请输入您的11位手机号码" v-model="phone">
                    <em v-html="txtPHtml" v-if="txtPShow"></em>
                </span>
                <a href="javascript:;" class="btn btn-large btn-join" @click="joinSubmit">立即预约</a>
            </div>
        </div>
    </div>
    <div class="layer success" v-if="successShow">
        <div class="box">
            <i class="close" @click="close"></i>
        </div>
    </div>
</div>
</template>
<script>
import activitySlider from 'components/activity-slider'
import {
    mapState
} from 'vuex'
export default {
  data () {
    return {
      listData: {
        conWidth: '6.58rem',
        conHeight: '3.5rem',
        conPadding: '0',
        pagShow: true,
        arrowShow: false,
        paginationClickable: true,
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        prev: {
          imgUrl: require('assets/images/pay-video-activity/prev.png'),
          width: '64px',
          height: '64px',
          marginTop: '-32px'
        },
        next: {
          imgUrl: require('assets/images/pay-video-activity/next.png'),
          width: '64px',
          height: '64px',
          marginTop: '-32px'
        },
        list: [{
          imgUrl: 'http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go0.jpg',
          link: ''
        },
        {
          imgUrl: 'http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go1.jpg',
          link: ''
        },
        {
          imgUrl: 'http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go2.jpg',
          link: ''
        },
        {
          imgUrl: 'http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go3.jpg',
          link: ''
        },
        {
          imgUrl: 'http://i0.jrjimg.cn/zqt-red-1000/focus/focus20170711vip/go4.jpg',
          link: ''
        }
        ]
      },
      joinShow: false,
      successShow: false,
      maskShow: false,
      txtUShow: false,
      txtPShow: false,
      txtUHtml: '',
      txtPHtml: ''
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
  components: {
    activitySlider
  },
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
        bizsource: 'HD_ZNTF_H5',
        source: '4',
        tgqdcode: 'L54MST72'
      })
    }
  },
  mounted () {
    document.title = '擒龙十九大'
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
    this.$watch('type', type => {
      if (type) {
        this.maskShow = true
        this.successShow = true
        this.joinShow = false
      }
    })
    this.$watch('err', err => {
      alert(err.msg)
    })
  }
}
</script>
