<style lang="scss" scoped="">
    .locationparam{}
    .locationparam .up p{color: #666;padding:0 20px;}
    .locationparam .up h3{ margin-top:20px;margin-bottom: 8px;font-size: 12px;margin-left: 20px;}
    .locationparam .up h4{color:#666;padding:0 20px 5px;font-weight: normal;}
    .locationparam .up h4 a{float: right;}
    .footer div {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    .footer div a {
      line-height: 35px;
      background: #2388da;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      margin: 0 20px;
      padding:0 10px;
    }
    .content {
      width: 340px;
      margin: 20px auto 0px;
    }
    .content  li{color: #666;line-height: 28px;}
    .content  li input{ margin-right:5px;}
</style>
<template>
  <div class="locationparam">
    <div class="up">
      <h3>调仓参数</h3>
      <h4 v-if='h4show'>修改组合调仓参数，组合将执行新的调仓方案，已有走势并不影响。<a href="javascript:;"  @click="showdialogfn">修改参数</a></h4>
      <p>1.定期调仓：180个交易日后，进行调仓<br />2.止盈调仓：5%后，止盈，收组合继续运转<br />3.止损调仓：无</p>
    </div>

    <founddialog :title="popTitle" v-if="dialogShow" @toHideDialog="dialogclosefn">
      <div slot="content">
        <ul class="content">
          <li>定期调仓：<input type="text" v-model="regular" />个交易日后，进行调仓  </li>
          <li>止盈调仓：<input type="text" v-model="stopProfit" />%后，满仓现金 </li>
          <li>止损调仓：<input type="text" v-model="stopLoss" />%后，满仓现金 </li>
        </ul>
      </div>
      <div slot="footer">
        <a href="javascript:;" @click="dialogokfn" v-if="okbtnshow">{{okbtntxt ? okbtntxt : '确认'}}</a>
        <a href="javascript:;" @click="dialogclosefn" v-if="closebtnshow">{{closebtntxt ? closebtntxt : '取消'}}</a>
      </div>
    </founddialog>
    <toast :msg="msgtxt"  v-if="msgshow"></toast>
  </div>

</template>
<script>
import founddialog from 'components/founddialog'
import toast from 'components/toast'
import 'whatwg-fetch'
import { domain } from '../z3tougu/config'
export default{
  props: ['h4show'],
  data () {
    return {
      dialogShow: false,
      okbtnshow: true,
      closebtnshow: true,
      popTitle: '提示',
      msgtxt: '',
      msgshow: false,
      strategyId: '',
      regular: '',
      stopProfit: '',
      stopLoss: ''
    }
  },
  computed: {

  },
  components: {
    founddialog,
    toast
  },
  methods: {
    showdialogfn () {
      this.dialogShow = true
    },
    dialogclosefn () {
      this.dialogShow = false
    },
    showmsg (m) {
      this.msgshow = true
      this.msgtxt = m
      var t = this
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        t.msgshow = false
      }, 3000)
    },
    dialogokfn () {
      if (!this.regular) {
        this.showmsg('请输入定期调仓交易日')
        return
      }
      if (!this.stopProfit) {
        this.showmsg('请输入止盈调仓')
        return
      }
      if (!this.stopLoss) {
        this.showmsg('请输入止损调仓')
        return
      }
      fetch(`${domain}/openapi/fund/adjustmentParam.shtml?strategyId=` + this.strategyId + '&regular=' + this.regular + '&stopProfit=' + this.stopProfit + '&stopLoss=' + this.stopLoss, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          console.log(v)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    }
  },
  mounted () {

  }
}
</script>
