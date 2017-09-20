<style scoped>
.jindu {
  padding-bottom: .32rem;
}

.jindu .up {
  height: 1.4rem;
  background: url(../assets/images/jichushare/jindu.png) no-repeat;
  background-size: 100% auto;
  width: 6rem;
  margin: 0 auto .08rem;
  position: relative;
}

.jindu i {
  background: url(../assets/images/jichushare/jindu.png) no-repeat;
  background-size: 6rem auto;
  background-position: 0 -1.5rem;
  position: absolute;
  height: 1.4rem;
  transition: all 1s;
  width: 0;
  /*width:30%;width:70%*/
}

.jindu .time {
  width: 5.88rem;
  margin: 0 auto;
}

.jindu .time span {
  width: 1.058rem;
  line-height: .36rem;
  text-align: center;
  color: #fff;
  background: #87312a;
  border-radius: .18rem;
  font-size: .28rem;
}

.jindu .time span:nth-child(2) {
  margin-left: 1.3rem;
}
</style>
<template>
<div class="jichushare-jindu">
  <div class="jindu">
        <div class="up"><i :style="{width:shareTimes===0?'0':shareTimes===1?'30%':shareTimes===2?'70%':'100%'}"></i></div>
        <div class="clearfix time">
            <span class="fl">第1天</span>
            <span class="fl">第2天</span>
            <span class="fr">第3天</span>
        </div>
    </div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {}
  },
  computed: mapState({
    shareTimes: state => state.jichushare.shareTimes,
    ssoid: state => state.user.ssoId
  }),
  mounted () {
    if (this.ssoid) {
      this.$store.dispatch('jichushare/fetch')
    } else {
      const unwatch = this.$watch('ssoid', (ssoid) => {
        if (ssoid) {
          this.$store.dispatch('jichushare/fetch')
        }
      })
      setTimeout(() => {
        unwatch()
      }, 5000)
    }
  }
}
</script>
