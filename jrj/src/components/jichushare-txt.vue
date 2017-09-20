<style scoped>
.txt_up{
  width:6.86rem;
  margin-left:.6rem;
  margin-top:.6rem;
}
.txt {
  width: 5.78rem;
  margin:.5rem auto .4rem;
  background: #fff4c8;
  border: 4px solid #fdcc0f;
  border-radius: .32rem;
  line-height: .45rem;
  font-size: .3rem;
  color: #721e22;
  position: relative;
  padding: 10px .24rem;
}

.txt i {
  border: 10px solid transparent;
  border-bottom: 10px solid #fdcc0f;
  position: absolute;
  left: .72rem;
  top: -.48rem;
}

.txt em {
  color: #eb3e32;
}
</style>
<template>
<div class="jichushare-txt">
  <img src="../assets/images/jichushare/txt_up.png" class="txt_up" alt="">
  <div class="txt"><i></i>连续三日截图分享任意页面，我们豪气的送您价值<em>598元的Z点操盘</em>的7日免费体验及<em>50个“金豆”</em>。</div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: mapState({}),
  mounted () {}
}
</script>
