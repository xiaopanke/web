<style>
@import '../assets/css/reset.css';
html {
  height: 100%;
}

body {
  background: #f04337 url(../assets/images/jichushare/bg.jpg) no-repeat;
  background-size: 100% 100%;
}

.jichushare {}

.jichushare-message {
  position: fixed;
  top: 0;
  right: .5rem;
  z-index: 1
}
</style>

<template>
<div class="jichushare">
  <JichushareMessage/>
  <JichushareTxt/>
  <JichushareJindu/>
  <JichushareBtn/>
  <JichushareToast/>
</div>
</template>

<script>
import JichushareMessage from 'components/jichushare-message'
import JichushareTxt from 'components/jichushare-txt'
import JichushareJindu from 'components/jichushare-jindu'
import JichushareBtn from 'components/jichushare-btn'
import JichushareToast from 'components/jichushare-toast'

export default {
  components: {
    JichushareMessage,
    JichushareTxt,
    JichushareJindu,
    JichushareBtn,
    JichushareToast
  },
  mounted () {
    document.title = '分享送豪礼'
  }
}
</script>
