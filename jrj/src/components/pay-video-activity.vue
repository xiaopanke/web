<style lang="scss" scoped>
@import '../assets/css/reset.css';
@import '../assets/css/animate.min.css';
.box {
    width: 100%;
}
.bg1 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg1.jpg") center 0 no-repeat;
    height: 795px;
}
.bg2 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg2.jpg") center 0 no-repeat;
    height: 541px;
}
.bg3 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg3.jpg") center 0 no-repeat;
    height: 554px;
}
.bg4 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg4.jpg") center 0 no-repeat;
    height: 451px;
}
.bg5 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg5.jpg") center 0 no-repeat;
    height: 889px;
}
.bg5 .box-con video {
    width: 811px;
    height: 422px;
    float: left;
    margin: 451px 0 0 93px;
    display: inline;
    background-color: #000;
}
.bg6 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg6.jpg") center 0 no-repeat;
    height: 967px;
}
.bg6 .box-con video {
    width: 811px;
    height: 422px;
    float: left;
    margin: 524px 0 0 93px;
    display: inline;
    background-color: #000;
}
.bg7 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg7.jpg") center 0 no-repeat;
    height: 803px;
}
.bg8 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg8.jpg") center 0 no-repeat;
    height: 544px;
}
.bg9 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg9.jpg") center 0 no-repeat;
    height: 765px;
}
.bg10 {
    background: url("../assets/images/pay-video-activity/payVideoWebBg10.jpg") center 0 no-repeat;
    height: 1091px;
}
.box-con {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    height: 100%;
}
.bg2 .box-con a {
    width: 244px;
    height: 88px;
    background: url("../assets/images/pay-video-activity/btn.png") no-repeat;
    position: absolute;
    border: none;
    cursor: pointer;
    bottom: 50px;
    right: 36px;
    outline: none;
}
.bg2 .box-con a:hover {
    background: url("../assets/images/pay-video-activity/btn-h.png") no-repeat;
}
.slider {
    margin-top: 30px;
    float: left;
    width: 100%;
}
.di {
    width: 100%;
    height: 142px;
    background: url("../assets/images/pay-video-activity/payVideoWebDi.jpg") center 0 no-repeat;
    position: fixed;
    bottom: 0;
    z-index: 1;
}
.di .box-con a {
    width: 244px;
    height: 88px;
    background: url("../assets/images/pay-video-activity/btn.png") no-repeat;
    position: absolute;
    border: none;
    cursor: pointer;
    bottom: 30px;
    right: 0;
    outline: none;
}
.di .box-con a:hover {
    background: url("../assets/images/pay-video-activity/btn-h.png") no-repeat;
}
.pay-nav {
    width: 216px;
    height: 323px;
    position: fixed;
    top: 50%;
    right: 50px;
    margin-top: -161px;
    background: url("../assets/images/pay-video-activity/web-nav-bg.png") no-repeat;
    z-index: 5;
}
.pay-nav a {
    width: 216px;
    height: 80px;
    float: left;
}
</style>

<template>
<div class="box">
    <div class="bg1">

    </div>
    <div class="bg2" id="d1">
        <div class="box-con">
            <!-- <button type="button" name="button"></button> -->
            <a href="http://itougu.jrj.com.cn/tips/10716.jspa" class="pulse animated infinite"></a>
        </div>
    </div>
    <div class="bg3">

    </div>
    <div class="bg4">

    </div>
    <div class="bg5" id="d2">
        <div class="box-con">
            <video src="http://flvdata.jrj.com.cn/2012/2017/hezuo/20170822sdsqpt-1.mp4" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
    <div class="bg6" id="d3">
        <div class="box-con">
            <video src="http://flvdata.jrj.com.cn/2012/2017/qita/20170824sxs.mp4" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
    <div class="bg7">

    </div>
    <div class="bg8">
        <div class="box-con">
            <div class="slider">
                <activity-slider :listData="listData" />
            </div>
        </div>
    </div>
    <div class="bg9" id="d4">

    </div>
    <div class="bg10">

    </div>
    <div class="di">
        <div class="box-con">
            <a href="http://itougu.jrj.com.cn/tips/10716.jspa" class="pulse animated infinite"></a>
        </div>
    </div>
    <div class="pay-nav">
        <a href="javascript:;" @click="navClick('d1')"></a>
        <a href="javascript:;" @click="navClick('d2')"></a>
        <a href="javascript:;" @click="navClick('d3')"></a>
        <a href="javascript:;" @click="navClick('d4')"></a>
    </div>
</div>
</template>
<script>
import activitySlider from 'components/activity-slider'
import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

export default {
  data () {
    return {
      listData: {
        conWidth: '825px',
        conHeight: '450px',
        conPadding: '90px',
        pagShow: false,
        arrowShow: true,
        loop: true,
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
          imgUrl: require('assets/images/pay-video-activity/slider-img1.jpg'),
          link: ''
        },
        {
          imgUrl: require('assets/images/pay-video-activity/slider-img2.jpg'),
          link: ''
        },
        {
          imgUrl: require('assets/images/pay-video-activity/slider-img3.jpg'),
          link: ''
        },
        {
          imgUrl: require('assets/images/pay-video-activity/slider-img4.jpg'),
          link: ''
        }
        ]
      }
    }
  },
  components: {
    activitySlider
  },
  methods: {
    navClick (num) {
      var pos = $('#' + num).offset().top
      if (num === 'd3') {
        $('html,body').stop().animate({
          scrollTop: pos + 250
        }, 500)
      } else {
        $('html,body').stop().animate({
          scrollTop: pos
        }, 500)
      }
    }
  },
  mounted () {
    document.title = '付费视频专题'
    setTimeout(function () {
      var pos = $('#d2').offset().top
      $('html,body').stop().animate({
        scrollTop: pos
      }, 500)
    }, 3000)
  }
}
</script>
