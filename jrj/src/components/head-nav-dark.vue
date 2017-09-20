<style lang="scss" scoped>
.head-nav-dark {
    height: 45px;
    background: #4c4c4c;
    color: #ddd;
    font-size: 12px;
    position: relative;
    z-index: 101;
}
.wrapper {
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.site-top-v2-inner {
    padding: 6px 0 0;
    display: inline;
    float: right;
}
.site-logo-compact {
    display: inline-block;
    float: left;
    height: 45px;
    width: 130px;
    background-image: url("http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png");
    background-image: image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);
    background-image: -webkit-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);
    background-image: -moz-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);
    background-image: -o-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);
    background-image: -ms-image-set(url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact.png) 1x,url(http://js.jrjimg.cn/zqt-red-1000/images/v2/site-logo-compact@2x.png) 2x);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 100% auto;
}
.site-nav-compact {
    float: left;
    margin-left: 10px;
    li {
        float: left;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        a {
            color: #fff;
            height: 45px;
            line-height: 45px;
            padding: 0 10px;
            display: inline-block;
            -moz-transition: all 0.2s;
            -o-transition: all 0.2s;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            &:hover {
                background: #393939;
                text-decoration: none;
                color: #f6554a;
            }
        }
    }
}
</style>

<template>
<div class="head-nav-dark clearfix">
  <div class="wrapper">
    <a href="/" class="site-logo-compact" :style="{backgroundImage:logoUrl ? `url(${logoUrl})` : ''}"></a>
    <ul class="site-nav-compact">
      <li><a href="/live/index.html" target="_self" data-type="live">直播</a></li>
      <li><a href="/match/" target="_self" data-type="match">炒股大赛</a></li>
      <li><a href="/ques/" target="_self" data-type="ques">问股</a></li>
      <li><a href="/portfolio/" target="_self" data-type="portfolio">组合</a></li>
      <li><a href="/view/" target="_self" data-type="viewpoint">观点</a></li>
      <li><a href="/account/" target="_self" data-type="account">找投顾</a></li>
      <li class="last"><a href="javascript:void(0);" onclick="javascript:JRJ.ui.isLogin(function(){window.location='/account/dynamic.jspa'});" target="_self" data-type="itougu">我的</a></li>
    </ul>
    <div class="site-search">
      <slot name="search"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    logoUrl: String
  },
  data () {
    return {}
  },
  components: {

  },
  methods: {

  },
  mounted () {
    document.title = 'vue-demo'
  }
}
</script>
