<style lang="scss">
.image-uploader {
    text-align: left;
}

.preview {
    background: #f6f6f6 url("../assets/images/course-list/icon2.jpg") no-repeat center center;
    cursor: pointer;
}

.desc {
    background: rgba(0, 0, 0, .6);
    color: white;
    font-size: 14px;
    height: 26px;
    line-height: 26px;
    text-align: center;
}

.upload-dialog {
    position: fixed;
    margin: -249px 0 0 -415px;
    width: 830px;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    background: white;
    z-index: 11;
}

.md-close {
    position: absolute;
    right: 14px;
    top: 11px;
    width: 20px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
    z-index: 9998;
    background: url("http://js.jrjimg.cn/zqt-red-1000/images/dialog-close-new.png") 0 0 no-repeat;
    &:hover {
        background: url("http://js.jrjimg.cn/zqt-red-1000/images/dialog-close-new.png") 0 -20px no-repeat;
    }
}

.md-container {
    padding: 0 35px;
}

.md-titlebar {
    width: 740px;
    background: #fff;
    padding: 20px 10px 0;
    font-size: 18px;
    line-height: 41px;
    height: 41px;
    overflow: hidden;
    color: #333;
    border-bottom: 1px solid #ddd;
}
</style>
<template>
<div class="image-uploader" :style="{width:parseInt(width||186)+'px',height:parseInt(height||64)+26+'px'}">
  <div class="preview" @click="openDialog" :style="{width:parseInt(width||186)+'px',height:parseInt(height||64)+'px',backgroundImage:imgUrl ? `url(${imgUrl})` : null}"></div>
  <div ref="desc" class="desc">{{desc}}</div>
  <div class="upload-dialog" v-if="showDialog">
    <div class="md-container">
      <i class="md-close" title="关闭" @click="close">&nbsp;</i>
      <div class="md-titlebar jrj-clear" style="width:740px">
        <span class="jrj-fl middle">上传图片</span>
        <div class="md-titlebar-r jrj-fr"></div>
      </div>
      <div class="md-body" style="width:760px">
        <div class="md-content">
          <div class="md-content-inner">
            <iframe ref="iframe" frameborder="0" allowtransparency="true" :src="`http://itougu.jrj.com.cn/tips/upload.jspa?from=vue-component&width=${width||185}&height=${height||87}`" style="width: 760px; background-color: transparent; height: 431px;"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  <fix-bg v-if="fixBgShow" />
</div>
</template>

<script>
import FixBg from './fix-bg'

export default {
  data () {
    return {
      showDialog: false,
      fixBgShow: false,
      imgUrl: '',
      dlg: {
        resetPosition () {}
      }
    }
  },
  props: ['width', 'height', 'desc'],
  components: {
    FixBg
  },
  methods: {
    resizeIfrH () {},
    close () {
      this.showDialog = false
      this.fixBgShow = false
    },
    openDialog () {
      this.showDialog = true
      this.fixBgShow = true
      setTimeout(() => {
        this.$refs.iframe._thisDialog = this
      })
    }
  },
  mounted () {
    document.domain = 'jrj.com.cn'
    window.updateImgs = (imgUrl) => {
      this.imgUrl = imgUrl
    }
  }
}
</script>
