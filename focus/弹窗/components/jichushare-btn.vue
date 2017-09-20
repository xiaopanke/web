<style scoped>
.btn1 {
  width: 4.35rem;
  margin: .24rem auto 0;
  text-align: center;
  font-size: .32rem;
  color: #3e0f11;
  display: block;
  background: #ffc90e;
  line-height: .76rem;
  border-radius: .4rem;
  box-shadow: 0 5px 0 0 #87312a;
}

.btn2 {
  width: 4.35rem;
  margin: .24rem auto 0;
  text-align: center;
  font-size: .32rem;
  color: #fff;
  display: block;
  background: #738dff;
  line-height: .76rem;
  border-radius: .4rem;
  box-shadow: 0 5px 0 0 #445cc6;
}
</style>
<template>
<div class="jichushare-btn">
  <a class="btn1" href="javascript:;" @click="loginfn" v-if="((ssoId+'').length < 18) || (shareTimes < 3)">立即去截图分享</a>
  <a v-if="ssoId && shareTimes === 3 && zuse === false" @click="zdcp" class="btn2" href="javascript:;">立即去体验Z点操盘</a>
  <a v-if="ssoId && shareTimes === 3 && zuse === true" class="btn2" @click="bdcp" href="javascript:;">八折体验Z点操盘</a>
  <a v-if="ssoId && shareTimes === 3" class="btn1" href="javascript:;" @click="jindou">{{btnJindouText}}</a>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'

import blueimpMd5 from 'blueimp-md5'

export default {
  data () {
    return {
      btnJindouText: '马上领取金豆',
      myInit: {
        headers: {
          passportId: '',
          accessToken: ''
        }
      }
    }
  },
  computed: mapState({
    ssoId: state => state.user.ssoId,
    shareTimes: state => state.jichushare.shareTimes,
    zuse: state => state.jichushare.zuse
  }),
  mounted () {
    this.$store.dispatch('user/fetch')
    this.myInit = {
      headers: {
        passportId: this.$store.state.user.ssoId,
        accessToken: this.$store.state.user.spToken
      }
    }
    this.jindoustutas()
  },
  methods: {
    loginfn () {
      if ((this.$store.state.user.ssoId + '').length < 18) {
        window.jrj.jsCallNative('108', JSON.stringify({
          returnUrl: encodeURI(window.location.href)
        }))
      } else {
        window.jrj.jsCallNative('888', JSON.stringify({}))
      }
    },
    pad2 (n) { return n < 10 ? '0' + n : n },
    generateTimeReqestNumber () {
      var date = new Date()
      return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds())
    },
    jindou () {
      if (this.btnJindouText === '马上领取金豆') {
        var times = this.generateTimeReqestNumber()
        var hashvalue = 'taskId=100000001&timeStamp=' + times
        var hashstr = blueimpMd5(hashvalue)
        fetch('http://i.jrj.com.cn/jifen/doTask?sign=' + hashstr + '&taskId=100000001&timeStamp=' + times, this.myInit).then((res) => {
          return res.json()
        }).then(body => {
          if (body.retCode === 0) {
            this.$store.commit('error/push', {
              code: 1,
              message: '恭喜你，领取成功'
            })
            this.btnJindouText = '立即金豆兑换礼品'
          } else {
            this.$store.commit('error/push', {
              code: 1,
              message: body.errorMessage
            })
          }
        }).catch(body2 => {
          this.$store.commit('error/push', {
            code: 1,
            message: body2.errorMessage
          })
        })
      } else {
        window.jrj.jsCallNative('151', JSON.stringify({})) // 去积分
      }
    },
    zdcp () {
      window.jrj.jsCallNative('143', JSON.stringify({})) // Z点操盘免费体验
    },
    bdcp () {
      window.location.href = 'http://itougu.jrj.com.cn/activity/app/zdcpDyzx.jspa' // 八折体验Z点操盘
    },
    jindoustutas () {
      if ((this.$store.state.user.ssoId + '').length >= 18) {
        fetch('http://i.jrj.com.cn/jifen/myTaskStatus?taskId=100000001', this.myInit).then((res) => {
          return res.json()
        }).then(body => {
          if (body.retCode === 0 && body.data.status === 1) {
            this.btnJindouText = '立即金豆兑换礼品'
          }
        }).catch(body2 => {
          this.$store.commit('error/push', {
            code: 1,
            message: body2.errorMessage
          })
        })
      }
    }
  }
}
</script>
