<style lang="scss" scoped>
@import '../assets/css/reset.css';
@import '../assets/css/animate.min.css';
.box {
    width: 100%;
}
.bg1 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg1.jpg") no-repeat;
    background-size: 100% 100%;
    height: 6.95rem;
}
.bg2 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg2.jpg") no-repeat;
    background-size: 100% 100%;
    height: 4.74rem;
}
.bg3 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg3.jpg") no-repeat;
    background-size: 100% 100%;
    height: 7.06rem;
}
.bg4 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg4.jpg") no-repeat;
    background-size: 100% 100%;
    height: 5.5rem;
}
.bg5 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg5.jpg") no-repeat;
    background-size: 100% 100%;
    height: 8.28rem;
}
.bg5 .box-con video {
    width: 6.9rem;
    height: 3.79rem;
    float: left;
    margin: 4.14rem 0 0 0.3rem;
    background-color: #000;
}
.bg6 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg6.jpg") no-repeat;
    background-size: 100% 100%;
    height: 9.78rem;
}
.bg6 .box-con video {
    width: 6.89rem;
    height: 3.85rem;
    float: left;
    margin: 5.75rem 0 0 0.31rem;
    background-color: #000;
}
.bg7 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg7.jpg") no-repeat;
    background-size: 100% 100%;
    height: 15.33rem;
}
.bg8 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg8.jpg") no-repeat;
    background-size: 100% 100%;
    height: 11.70rem;
}
.bg9 {
    background: url("../assets/images/pay-video-activity/payVideoAppBg9.jpg") no-repeat;
    background-size: 100% 100%;
    height: 13.46rem;
}
.box-con {
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: 100%;
}
.bg2 .box-con a {
    width: 2.44rem;
    height: 0.88rem;
    background: url("../assets/images/pay-video-activity/btn-h1.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    border: none;
    cursor: pointer;
    bottom: 0.4rem;
    right: 0.2rem;
    outline: none;
    font-size: 0.22rem;
    color: #fff;
    text-align: center;
    line-height: 0.78rem;
}
.slider {
    margin-top: 11.5rem;
    float: left;
    width: 100%;
}
.di {
    width: 100%;
    height: 1.56rem;
    background: url("../assets/images/pay-video-activity/payVideoAppDi.jpg") no-repeat;
    background-size: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
}
.di .box-con a {
    width: 2.44rem;
    height: 0.88rem;
    background: url("../assets/images/pay-video-activity/btn-h1.png") no-repeat;
    background-size: 100% 100%;
    float: left;
    margin: 0.3rem 0 0 4.3rem;
    font-size: 0.22rem;
    color: #fff;
    text-align: center;
    line-height: 0.78rem;
}
</style>

<template>
<div class="box">
    <div class="bg1">
    </div>
    <div class="bg2" id="d1">
        <div class="box-con">
            <a href="http://itougu.jrj.com.cn/tips/10716.jspa" class="pulse animated infinite">立即查看</a>
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
        <div class="box-con">
            <div class="slider">
                <activity-slider :listData="listData" />
            </div>
        </div>
    </div>
    <div class="bg8">

    </div>
    <div class="bg9" id="d4">

    </div>
    <div class="bg10">

    </div>
    <div class="di">
        <div class="box-con">
            <a href="http://itougu.jrj.com.cn/tips/10716.jspa" class="pulse animated infinite">立即查看</a>
        </div>
    </div>
</div>
</template>
<script>
import activitySlider from 'components/activity-slider'
import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

export default {
  data () {
    $(function () {
      setTimeout(function () {
        var pos = $('#d2').offset().top
        $('html,body').stop().animate({
          scrollTop: pos
        }, 500)
      }, 3000)
    })
    return {
      listData: {
        conWidth: '7rem',
        conHeight: '3.78rem',
        conPadding: '0',
        pagShow: true,
        arrowShow: false,
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
  methods: {},
  mounted () {
    document.title = '付费视频专题'
  }
}
</script>
