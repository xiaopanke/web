<template>
  <div class="smartPoolListDetails">
    <div class="top pr">
        <span class="name">[{{fundPoolHeadData.poolName}}]</span>
        <span>创建时间 {{fundPoolHeadData.createTime}}</span>
        <span>修改时间 {{fundPoolHeadData.updateTime}}</span>
        <span>基金税 {{fundPoolHeadData.fundNum}}只</span>
        <div class="copy"><a :poolid="fundPoolHeadData.poolId" :poolname='fundPoolHeadData.poolName' href="javascript:;" class="button copy_button" @click='showDialog($event)'>复制</a> <span v-if="show" class="msg cRed">含未代销基金，基金池已失效，可删除基金池及关联策略。</span></div>
        <div class="group mt-10">关联组合：<span class="name" v-for="item in fundPoolHeadData.fundStrategyInfoList">[{{item.name}}]</span></div>
    </div>
    <table class="table tc">
      <tr>
        <th v-for="(item,index) in th">
          <div class="seletetime" v-if="index===4">
            <div @click="seletetimeshow=!seletetimeshow">
              {{seletetimearr[seletetimenum]}}<i :class="seletetimeshow ? 'downicon' : '' "></i>
            </div>
            <ul v-if="seletetimeshow">
              <li :seletetimenum="index2" @click="seletenumfn($event)" v-for="(item2,index2) in seletetimearr">{{item2}}</li>
            </ul>
          </div>
          <div class="" v-else>
              {{item}}
          </div>
        </th>
      </tr>
        <tr v-for="(item,index) in smartPoolListDetails">
          <td class="codeNameBox">
            <span class="code">{{item.innerCode}}</span>
            <span class="blue name" >{{item.name}}</span>
            <span class="">{{item.tradeStatusName}}</span>
          </td>
          <td><div >{{item.fundTypeName}}</div></td>
          <td><div >{{item.fundScale}}</div></td>
          <td><div v-z3-updowncolor="item.chgPct">{{item.chgPct  | filterNum('%')}}</div></td>
          <td>
            <div v-if="seletetimenum==='0'" v-z3-updowncolor="item.fundYieldMonth">{{item.fundYieldMonth  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='1'" v-z3-updowncolor="item.fundYield3Month">{{item.fundYield3Month  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='2'" v-z3-updowncolor="item.fundYield6Month">{{item.fundYield6Month  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='3'" v-z3-updowncolor="item.fundYieldYearSofar">{{item.fundYieldYearSofar  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='4'" v-z3-updowncolor="item.fundYieldYear">{{item.fundYieldYear  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='5'" v-z3-updowncolor="item.fundYield2Year">{{item.fundYield2Year  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='6'" v-z3-updowncolor="item.fundYield3Year">{{item.fundYield3Year  | filterNum("%")}}</div>
            <div v-if="seletetimenum==='7'" v-z3-updowncolor="item.fundYield5Year">{{item.fundYield5Year  | filterNum("%")}}</div>
          </td>
          <td><div >{{item.startAmount}}</div></td>
          <td><div >{{item.discount}}</div></td>
          <td><div >{{item.sgflRate}}</div></td>
          <td><div >{{item.shflRate}}</div></td>
          <td><div >{{item.sellDay}}</div></td>
          <td><div >{{item.fundYieldYearRank}}</div></td>
        </tr>
    </table>
    <fundPoolRelevance :relevancedata="relevancedata"></fundPoolRelevance>
    <founddialog :title="popTitle" v-if="show" @toHideDialog="dialogclosefn">
      <div slot='content'>
        <div class="up" v-if="content == 1">
          <span>复制当前基金池</span><input v-model='inputPoolName' type="text" name="" placeholder="请输入基金池名称">
          <p class="msg">{{msg}}</p>
        </div>
        <div class="up" v-if="content == 2">
          <p class="msg2 tc">{{msg}}</p>
        </div>
        <div class="down">
          <button v-if="content == 1" @click='save'>保存</button>
          <button v-if="content == 2" @click='dialogclosefn'>确认</button>
        </div>
      </div>
    </founddialog>
  </div>
</template>
<script>
import 'whatwg-fetch'
import founddialog from 'components/founddialog'
import fundPoolRelevance from 'components/fundPoolRelevance'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { domain } from '../../z3tougu/config'
import { ctx } from '../../z3tougu/config'
export default {
  data () {
    return {
      th: ['基金名称', '类型', '规模', '涨跌幅', '近6个月收益', '起购金额', '申购费折扣', '申购费率', '赎回费率', '购回确认周期', '同类排名'],
      seletetimeshow: false,
      show: false,
      seletetimenum: '2',
      orgCode: '200180365',
      seletetimearr: ['近1个月收益', '近3个月收益', '近6个月收益', '今年以来收益', '近1年收益', '近2年收益', '近3年收益', '近5年收益'],
      userId: '3dce11a5-7db5-42a8-b2d0-81cb70dc10dd',
      poolId: '',
      poolName: '',
      inputPoolName: '',
      msg: '',
      errCode: '',
      isInvalid: '',
      content: 1
    }
  },
  filters: {
    filterNum: function (value, type) {
      return value.toFixed(2) + type
    }
  },
  components: {
    founddialog,
    fundPoolRelevance
  },
  computed: {
    ...mapState([
      'smartPoolListDetails',
      'relevancedata',
      'fundPoolHeadData'
    ]),
    ...mapGetters({
      smartPoolListDetails: 'smartPoolListDetails',
      relevancedata: 'relevancedata',
      fundPoolHeadData: 'fundPoolHeadData'
    })
  },
  mounted () {
    this.getdate()
    this.relevancedatafn()
  },
  methods: {
    getdate () {
      this.$store.dispatch('getSmartPoolListDetails', { id: this.$route.params.id, orgCode: this.orgCode })
      this.$store.dispatch('getSmartPoolListDetailsTop', { fundPoolId: this.$route.params.id })
    },
    seletenumfn (v) {
      this.seletetimenum = v.currentTarget.getAttribute('seletetimenum')
      this.seletetimeshow = false
    },
    relevancedatafn () {
      this.$store.dispatch('relevancedatafn', { id: this.$route.params.id })
    },
    // 复制基金池
    copySmartPool () {
      const url = `${domain}/openapi/fund/copyFundPool.shtml?poolName=${this.inputPoolName}&copyPoolId=${this.poolId}&userId=${this.userId}&orgCode=${this.orgCode}`
      return fetch(url, { method: 'POST', mode: 'cors' }).then((res) => {
        return res.json()
      }).then(result => {
        if (result.errCode === 0) {
          this.show = false
          this.$router.push({ path: ctx + '/foundpooldetail/' + result.data })
        } else if (result.errCode === 1505 || result.errCode === 1501 || result.errCode === -1) {
          this.msg = result.msg
          this.errCode = result.errCode
          if (result.errCode === -1) {
            this.content = 2
          }
        }
      })
    },
    showDialog (e) {
      this.poolName = e.target.attributes.poolname.value
      this.poolId = e.target.attributes.poolid.value
      this.show = true
      this.popTitle = '复制当前基金池'
    },
    dialogclosefn () {
      this.show = false
      this.content = 1
      this.msg = ''
    },
    save () {
      this.copySmartPool()
    }
  }
}
</script>
<style scoped lang='scss'>
  @import '../../assets/common/variable.scss';
  @import '../../assets/css/reset.css';
  @import '../../assets/css/base.css';
  @mixin border_radius($num){-webkit-border-radius: $num;-moz-border-radius: $num;border-radius: $num;}
  .top{
    font-size: $fontSize12;
    color: $colorFontTheme;
    height: 46px;
    .name{
      color: #2388da;
    }
    span{
      margin-right: 10px
    }
    .copy{
      position: absolute;
      right: 15px;
      top: 0;
    }
  }
  .codeNameBox{
    span{display: inline-block;text-align: left;}
    .code{width: 30%;text-align: right;padding-right: 10px}
    .name{width:60%;}
  }
  .smartPoolListDetails{
    background-color: #fff;
    font-size: 12px;
    font-family: '宋体';
    color: #191919;
    padding: 10px;
  }
  .table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    th{
      font-weight: normal;
      color: #666;
      height: 30px;
      line-height: 30px;
      background-color: #f2f2f2;
    }
    td{
      color: $colorFontTheme;
      height: 40px;
      border-bottom: 1px solid $colorBorder;
      a{
        color: #666;
      }
      &.blue{
        color: #2388da;
      }
    }
    .blue{
      color: #2388da;
    }
  }
  .button{
    display: inline-block;
    width:72px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border: 1px solid #ccc;
    @include border_radius(3px);
  }
  .copy_button{
    border-color: #2388da;
    color: #2388da;
  }
  .seletetime{
    position: relative;
    cursor: pointer;
    i{ border:6px solid transparent;border-top:6px solid #2f94ee;display: inline-block; vertical-align: -4px; margin-left: 5px;}
    .downicon{border-top:6px solid transparent;border-bottom: 6px solid #2f94ee; vertical-align: 2px;}
    ul{ width: 100%;position: absolute; background: #fff;top:30px; left:0;z-index: 999;border: 1px solid #ddd;border-top:0;li{ line-height: 30px; &::hover{ background: #ccc;}}}
  }
  .up{margin: 0 auto;width:380px;}
  .up{margin: 30px auto;width:380px;}
  .up span{font-size: 14px;color: #191919;}
  .up input{width:230px;height:34px; line-height: 34px; font-size: 12px; padding-left: 10px;margin-left: 10px;}
  .down{ display: flex;justify-content: center; margin-top:30px; }
  .down button{width:100px;line-height: 32px;background: #39c;color: #fff; text-align: center;}
  .msg{color: red;left: 169px;position: absolute;top: 106px;}
  .msg2{font-size: 14px;}
</style>
