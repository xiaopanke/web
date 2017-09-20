<style lang="scss" scoped>
.web-install-dialog {
    -webkit-font-smoothing: antialiased;
    z-index: 1000;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    position: fixed;
}
.content {
    border-radius: 7px;
    width: 591px;
    height: 467px;
    position: absolute;
    top: 50%;
    margin-top: -233.5px;
    left: 50%;
    margin-left: -295.5px;
    background: white;
}
h2 {
    font-size: 20px;
    text-align: center;
    color: #333;
    width: 100%;
    font-weight: normal;
    padding-top: 60px;
    margin: 0;
}
.title-line-left {
    width: 104px;
    height: 7px;
    background: white url("../assets/images/web-install-dialog/title-line-left.png") no-repeat;
    background-size: 100%;
    position: absolute;
    left: 112px;
    top: 72px;
}
.title-line-right {
    width: 104px;
    height: 7px;
    background: white url("../assets/images/web-install-dialog/title-line-right.png") no-repeat;
    background-size: 100%;
    position: absolute;
    right: 112px;
    top: 72px;
}
.btn-close {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 27px;
    height: 27px;
    background: white url("../assets/images/icons/icon-close.png") no-repeat;
    background-size: 100%;
    cursor: pointer;
}
.qrcode-logo {
    width: 144px;
    height: 144px;
    position: absolute;
    top: 143px;
    left: 117px;
    background: white url("../assets/images/qrcode-logo.png") no-repeat;
    background-size: 140px 140px;
    background-position: center center;
    border: 1px solid #e60012;
    border-radius: 2px;
    box-sizing: border-box;
}
.intro {
    position: absolute;
    height: 144px;
    left: 305px;
    top: 157px;
    li {
        padding-bottom: 20px;
        font-size: 18px;
        padding-left: 40px;
        color: #555;
    }
}
ul {
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
    padding: 0;
    margin: 0;
}
.wechat {
    background: white url("../assets/images/icons/icon-wechat-red.png") no-repeat;
}
.video {
    background: white url("../assets/images/icons/icon-video.png") no-repeat;
}
.gift {
    background: white url("../assets/images/icons/icon-gift.png") no-repeat;
}
.btns {
    position: absolute;
    bottom: 70px;
    left: 110px;
    li {
        display: inline-block;
        box-sizing: border-box;
        width: 174px;
        height: 49px;
        border-radius: 4px;
        line-height: 49px;
        cursor: pointer;
        a {
            padding-left: 70px;
            display: block;
            text-decoration: none;
        }
    }
}
.apple {
    color: white;
    background: #ff4040 url("../assets/images/icons/icon-apple.png") no-repeat;
    background-position: 34px 8px;
    a {
        color: white;
    }
}
.android {
    color: #ff4040;
    border: 1px solid #ff4040;
    margin-left: 38px;
    background: white url("../assets/images/icons/icon-android-red.png") no-repeat;
    background-position: 34px 8px;
    a {
        color: #ff4040;
    }
}
</style>

<template>
<div v-if="show" class="web-install-dialog" :style="{width:winWidth+'px',height:winHeight+'px'}">
  <div class="content">
    <h2>下载金融界App</h2>
    <div class="title-line-left"></div>
    <div class="title-line-right"></div>
    <a class="btn-close" @click="close"></a>
    <div class="qrcode-logo"></div>
    <ul class="intro">
      <li class="wechat">与投顾实时互动</li>
      <li class="gift">享有免费送礼特权</li>
      <li class="video">随时观看直播回放</li>
    </ul>
    <ul class="btns">
      <li class="apple"><a href="https://itunes.apple.com/cn/app/apple-store/id420570910?pt=118122749&ct=7XFFWXNBJ&mt=8&channel=7XFFWXNBJ&tgqdcode=YJ2DKQM8">iOS版下载</a></li>
      <li class="android"><a href="http://appcms.jrj.com.cn/packages/android/20170713184538jrj_android_6.6.0_2017-07-13-7XFFWXNBJ_7XFFWXNBJ.apk?channel=7XFFWXNBJ&tgqdcode=YJ2DKQM8">安卓版下载</a></li>
    </ul>
  </div>
</div>
</template>

<script>
import cookie from 'component-cookie'
export default {
  data () {
    return {
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
      show: false
    }
  },
  components: {},
  methods: {
    close () {
      this.show = false
    }
  },
  mounted () {
    const isShow = cookie('web-install-dialog') !== '1'
    if (isShow) {
      this.show = true
      cookie('web-install-dialog', '1', {
        maxage: 1000 * 3600 * 24
      })
    }
    window.addEventListener('resize', () => {
      this.winWidth = window.innerWidth
      this.winHeight = window.innerHeight
    })
  }
}
</script>
