<style scoped>
  @import '../assets/css/base.css';
  input {
    outline: none;
  }
  *{
    font-size: 12px;
    color: #191919;
  }
  body {
    background: #fff;
  }
  .clearfix:after{ 
    display: block;
    content: ''; 
    clear: both;
  }
  a,
  .blue {
    color: #2388da;
  }
  .blue{
      color: #2388da;
      font-size: 12px;
    }
  .itell-list-wrap {
    padding: 11px 3px 8px 8px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
  }

  table tr:nth-child(1) {
    background: #f2f2f2;
    color: #666;
    font-size: 12px;
  }

  table tr:nth-child(1) td {
    height: 30px;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }
  .t-head{
    border-bottom: none;
  }
  td,
  th {
    word-break: break-all;
    height: 38px;
  }

  td div {
    padding: 5px;
  }

  .editbox a {
    padding: 0 20px;
    line-height: 20px;
    border: 1px solid #2a8ae1;
    margin: 0 10px;
    border-radius: 2px;
    font-size: 12px;
    float: left;
  }

  .editbox .delete {
    width: 20px;
    height: 20px;
    background: url('../assets/images/z3img/delete.png') no-repeat center center;
    padding: 0
  }

  .editbox .nodelete {
    width: 20px;
    height: 20px;
    background: url('../assets/images/z3img/nodelete.png') no-repeat center center;
    padding: 0;
    border-color: #ccc;
  }

  .footer div {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .footer div a {
    line-height: 35px;
    background: blue;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    margin: 0 20px;
    padding:0 10px;
  }

  .up {
    margin: 0 auto;
    font-size: 16px;
    width: 340px;
    padding-top: 20px;
  }

  .up2 {
    width: 380px;
  }

  .up a {
    color: #2a8ae1;
    font-size: 16px;
  }

  .up input {
    width: 230px;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    padding-left: 10px;
    margin-left: 10px;
  }
  .up .check input{
    width:auto;
    float: left;
    margin-left: 100px;
   }
  .up .check i{
      float: left;
      font-size: 14px;
      line-height: 33px;
      margin-left: 10px;
    }
  .up2 input{
    float: left;
   }
  .up2 span{
    float: left; 
    width:100px;
    line-height: 34px;
  }
  h3{ 
   /*  margin-top: 20px; */
    padding:0 0 14px 3px;
    font-size: 12px;
    font-weight: normal;
    color: #191919;
  }
 .tit{
    text-align: center;
    line-height: 50px;
    font-size: 12px;
  }
  .one-td{
     /* width: 18%; */
  }
</style>
<template>
<div class="itell-list-wrap">
  <h3>智能组合</h3>
  <div class="backtestInfoList">
    <div class="tit" v-if="tabledata.td.length==0">
      暂无智能组合
    </div>
    <table v-else>
      <tr>
        <td v-for="(item,index) in tabledata2.th" class="t-head">
          {{item}}
        </td>
      </tr>
      <tr v-for="(item,index) in tabledataTd">
        <td class="one-td">
          <div class="blue">{{item.portfolio_name}}</div>
        </td>
        <td>
          <div>{{item.netvalue==null?'--':item.netvalue}}</div>
        </td>
        <td>
          <div v-z3-updowncolor="item.day_high_low">{{item.day_high_low==null?'--':item.day_high_low}}%</div>
        </td>
        <td>
          <div>{{item.year_income_rate==null?'--':item.year_income_rate}}</div>
        </td>
        <td>
          <div v-z3-updowncolor="item.total_income_rate">{{item.total_income_rate==null?'--':item.total_income_rate}}%</div>
        </td>
        <td>
          <div>{{item.volatility==null?'--':item.volatility}}</div>
        </td>
        <td>
          <div>{{item.max_drawdown==null?'--':item.max_drawdown}}</div>
        </td>
        <td>
          <div>{{item.sharp_rate==null?'--':item.sharp_rate}}</div>
        </td>
        <td>
          <div>{{item.min_purchase_amount==null?'--':item.min_purchase_amount}}</div>
        </td>
        <td>
          <div>{{item.running_days==null?'--':item.running_days}}</div>
        </td>
        <td>
          <div>{{item.position_times==null?'--':item.position_times}}次</div>
        </td>
        <td>
          <div class="editbox clearfix"  :zuhename="item.name" :zuheId="item.strategyId">
            <a href="#" class="copy" @click="showdialogfn($event,2)">复制</a>
            <a href="#" class="nodelete" @click="showdialogfn($event,4)" ></a>
          </div>
        </td>
      </tr>
    </table>
  </div>

  <founddialog :title="popTitle" v-if="dialogShow" @toHideDialog="dialogclosefn" >
    <div class=""  slot="content">
      <div class="up up1" v-if="content===1">
        <ul class="newzuhe">

        </ul>

      </div>
      <div class="up up2" v-if="content===2">
        <ul>
          <li>
            <span>新组合名称</span><input type="text" name="" v-model="copyzuheName" placeholder="请输入组合名称">
          </li>
          <li  class="clearfix check">
            <label for="newname" class="clearfix">
              <input type="checkbox" class="" id="newname" name=""  v-model="isCreatePool" >
              <i>同时创建新基金池</i>
            </label>
          </li>
          <li class="clearfix" v-if="isCreatePool">
            <span>新基金池名称</span><input type="text" name="" v-model="newpoolName" placeholder="请输入基金池名称">
          </li>
        </ul>

      </div>
      <div class="up up3" v-if="content===3">
        您确认删除回测【<a href="#">{{poolname}}</a>】吗？
      </div>
    </div>
    <div slot="footer">
      <a href="javascript:;" @click="dialogokfn" v-if="okbtnshow">{{okbtntxt ? okbtntxt : '确定'}}</a>
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
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
      tabledata: {
        th: ['名称', '总收益率', '年化收益率', '最大回撤', '波动率', '夏普比', '超额收益', '调仓次数', '回测周期', '编辑'],
        td: {}
      },
      tabledata2: {
        th: ['名称', '净值', '日涨跌', '年化收益', '累计收益', '波动率', '最大回撤', '夏普比', '起投金额', '运行天数', '调仓次数', '编辑'],
        td: {}
      },
      dialogShow: false,
      okbtnshow: true,
      closebtnshow: true,
      copyzuheName: '',
      newpoolName: '',
      zuhename: '',
      msgtxt: '',
      msgshow: false,
      orgCode: '200180365',
      isCreatePool: false,
      // 基金池列表
      pools: [
        {
          poolName: '',
          poolId: ''
        }
      ]

    }
  },
  components: {
    founddialog,
    toast
  },
  computed: mapState({
    tabledataTd: state => state.fundIntell.portfolioList
  }),
  mounted () {
    this.getdate()
  },
  methods: {
    showmsg (m) {
      this.msgshow = true
      this.msgtxt = m
      var t = this
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        t.msgshow = false
      }, 3000)
    },
    showdialogfn (v, content) {
      this.zuhename = v.toElement.parentNode.getAttribute('zuhename')
      this.zuheId = v.toElement.parentNode.getAttribute('zuheId')
      this.dialogShow = true
      this.content = content
      if (content === 1) {
        this.popTitle = '创建组合'
        this.closebtnshow = false
        this.okbtntxt = '保存，并创建组合'
      } else if (content === 2) {
        this.popTitle = '复制组合'
        this.closebtnshow = false
        this.okbtntxt = '保存'
      } else if (content === 3) {
        this.popTitle = '删除组合'
        this.closebtnshow = true
        this.okbtntxt = '确定'
      }
    },
    dialogclosefn () {
      this.dialogShow = false
    },
    dialogokfn () {
      if (this.content === 1) {
        alert('我要新建')
      } else if (this.content === 2) {
        this.copyFundPool()
      } else if (this.content === 3) {
        this.deleteFundPool()
      }
      // this.dialogShow = false
    },
    getdate () {
      this.$store.dispatch('fundIntell/queryPortfolioList')
      /* fetch('http://test.z3quant.com/openapi/fund/getStrategyInfoList.shtml?userId=20170901-170354', {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          console.log(v)
          this.tabledata.td = v.data.backtestInfoList
          this.tabledata2.td = v.data.runInfoList
        }
      }).catch(v2 => {
        console.log(v2)
      })*/
    },
    copyFundPool () {
      if (!this.copyzuheName) {
        this.showmsg('请输入组合名称')
        return
      }
      if (!this.newpoolName) {
        this.showmsg('请输入基金池名称')
        return
      }
      var str = 'strategyId=' + this.zuheId + '&strategyName=' + this.zuhename + '&brokerId=' + this.orgCode
      if (this.isCreatePool) {
        str += '&isCreatePool=true&fundPoolName=' + this.copypoolName
      }

      fetch('http://test.z3quant.com/openapi/fund/copyStrategy.shtml?' + str, {
        method: 'POST',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          this.showmsg('成功')
          // this.getdate()
        } else {
          this.showmsg(v.msg)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    deleteFundPool () {
      fetch('http://test.z3quant.com/openapi/fund/' + this.poolId + '.shtml?userId=3dce11a5-7db5-42a8-b2d0-81cb70dc10dd&orgCode' + this.orgCode, {
        method: 'POST',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          this.showmsg(v.msg)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    }
  }
}
</script>
