<style>
@import '../assets/css/reset.css';
html {
  height: 100%;
}
body {
  background: #f8384f url(../assets/images/allpeoplelv/bg.png) no-repeat;
  background-size: 100% 100%;
}

.jichushare-message {
  position: fixed;
  top: 0;
  right: .5rem;
  z-index: 1
}
.up{width:6.93rem; display: block;margin:.2rem auto 0;}
.center { margin-top: .4rem;}
.center img{width:9.19rem;}
.btn a{ display: block;width:6.14rem;height: 1.4rem;margin-top:.5rem;margin-left: auto;margin-right:auto;background: url(../assets/images/allpeoplelv/btntwo.png);background-size: 100% auto;font-size: .38rem;color: #330601;text-align: center;line-height: 1.4rem;}
.btn .gray{color:#fff;background-position: 0 -1.4rem;}
.center{margin-left: .3rem;}
.center .img{overflow-x: auto;}
</style>

<template>
<div class="jichushare">
  <img src="../assets/images/allpeoplelv/up.png" alt="" class="up">
  <div class="center">
      <div class="img">
        <img src="../assets/images/allpeoplelv/center.png" alt="">
      </div>
  </div>
  <div class="btn">
    <a href="javascript:;" :class="lingqudone ? 'gray' :''" @click="lingqu">免费领取15天Lv2极速行情</a>
  </div>

  <JichushareMessage v-bind:message="message" />
  <JichushareToast />
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import 'whatwg-fetch'
import blueimpMd5 from 'blueimp-md5'

import JichushareMessage from 'components/jichushare-message'
import JichushareToast from 'components/jichushare-toast'

export default {
  data () {
    return {
      message: `1.活动期间，每位用户可领取一次“15天Lv2极速行情”（Lv2为Level-2简称），领取即视为报名参加本活动；<br />
2.自报名之日起，每位用户在金豆中心签到，除领取金豆外，可额外再获赠一天Lv2极速行情使用天数；<br />
3.对每自然周（周一00:00至周日23:59）累计签到3天以上的用户，将额外奖励7天Lv2极速行情使用天数；<br />
4.赠送的Lv2极速行情使用天数为自然日天数（即可能包含非交易日天数）；<br />
5.最终解释权归金融界所有。`,
      lingqudone: false,
      myInit: {
        headers: {
          passportId: '',
          accessToken: ''
        }
      }
    }
  },
  components: {
    JichushareMessage,
    JichushareToast
  },
  computed: mapState({
    ssoId: state => state.user.ssoId,
    shareTimes: state => state.jichushare.shareTimes
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
    document.title = '全民体验Lv2行情'
  },
  methods: {
    pad2 (n) { return n < 10 ? '0' + n : n },
    generateTimeReqestNumber () {
      var date = new Date()
      return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes()) + this.pad2(date.getSeconds())
    },
    lingqu () {
      if ((this.$store.state.user.ssoId + '').length >= 18) {
        if (!this.lingqudone) {
          var times = this.generateTimeReqestNumber()
          var hashvalue = 'taskId=100000002&timeStamp=' + times
          var hashstr = blueimpMd5(hashvalue)
          fetch('http://i.jrj.com.cn/jifen/doTask?sign=' + hashstr + '&taskId=100000002&timeStamp=' + times, this.myInit).then((res) => {
            return res.json()
          }).then(body => {
            console.log(body)
            if (body.retCode === 0 || body.retCode === 2) {
              this.lingqudone = true
              this.$store.commit('error/push', {
                code: 1,
                message: '恭喜您领取成功！'
              })
            } else {
              this.$store.commit('error/push', {
                code: 1,
                message: body.errorMessage
              })
            }
          }).catch(body2 => {
            console.log(body2)
            this.$store.commit('error/push', {
              code: 1,
              message: body2.errorMessage
            })
          })
        }
      } else {
        window.jrj.jsCallNative('108', JSON.stringify({
          returnUrl: encodeURI(window.location.href)
        }))
      }
    },
    jindoustutas () {
      if ((this.$store.state.user.ssoId + '').length >= 18) {
        fetch('http://i.jrj.com.cn/jifen/myTaskStatus?taskId=100000002', this.myInit).then((res) => {
          return res.json()
        }).then(body => {
          console.log(body)
          if (body.retCode === 0 && body.data.status === 1) {
            this.lingqudone = true
          }
        }).catch(body2 => {
          console.log(body2)
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
