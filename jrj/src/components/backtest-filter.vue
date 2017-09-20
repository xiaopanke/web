<style lang="scss" scoped>
    @import '../assets/css/base.css';
    *{
      text-align: justify;
    }
    body{
      font-size: 12px;
      background: #f2f2f2;
    }
    .blue{
      color: #2388da;
      font-size: 12px;
    }
    .red{
      color:#e6363a ;
    }
    .green {
      color:#48a854 ;
    }
    .fr{
      float: right;
    }
    .fl{
      float: left;
    }
    .backtest-filter{
        background: #f2f2f2;
        color: #696969;
        width: 100%;
    }
    .bfilter-main{
       padding: 0 10px 0;
       position: relative;
    }
    
    .bfilter-bottom{
      margin-top: 14px;
      background: #fff;
      font-size: 12px;
      color: #696969;
    }
    .bfilter-ul{
      border-bottom: 1px solid #DFE2E5;
      position: relative;
      background: #EEF3F7;
    }
    .bfilter-ul li{
      padding: 7px 15px 5px 14px;
      cursor: pointer;
    }
    .bfilter-ul li.active{
      background: #2388da;
      color: #fff;
    }

    .bfilter-table{
      padding: 15px 10px 0 7px;
    }
    .bfilter-today{
      
    }
    .table-head{
       background: #f2f2f2;
       padding: 9px 0;
       width: 100%;
    }
    .table-head span{
      width: 9%;
      display: inline-block;
      text-align: center;
    }
    .table-body{
      padding: 12px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .table-body span{
      width: 9%;
      display: inline-block;
      text-align: center;
    }
    .table-head2 span{
      width: 12%;
    }
    .table-body2{
      /* padding: 12px 0; */
      padding: 13px 0 11px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .table-body2 span{
      width: 12%;
    }
    span.order-num{
      /* width: 6%; */
    }
    .bfilter-table .export{
       width: 4%;
       
    }
    /* .table-head{
      position: relative;
    } */
    .export{
      position: absolute;
      right: 1%;
      top: 0;
    }
    .export i{
      background: url(../assets/images/z3img/export-icon.png) no-repeat;
      width: 18px;
      height: 18px;
      display: inline-block;
      position: relative;
      top: 3px;
      left: -2%;
    }
    .backtest-filter .page{
      text-align: center;
    }
    .icon{
      position: absolute;
      right: 15px;
      top: 8px;
    }
    .weixin{
      height: 22px;
      width: 24px;
      display: inline-block;
      background: url(../assets/images/z3img/back-weixin.png) no-repeat;
      margin-right: 12px;
      cursor:pointer;
    }
    .copy{
      height: 22px;
      width: 22px;
      display: inline-block;
      background: url(../assets/images/z3img/back-copy.png) no-repeat;
      cursor:pointer;
    }
    .qrcode{
      position:absolute;
      top:40px;
      right:10px;
      box-shadow:4px 4px 4px 2px #eee;
      border:1px solid #eee;
    }
    .bfilter-table{
      position: relative;
    }
    .bfilter-table .page{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: none;
    }
    .bfilter-today{
      position: relative;
    }
    .bfilter-today .page{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: none;
    }
</style>
<template> 
   <div class="backtest-filter">
      <div class="bfilter-main">
        <div class="fr icon"><span class="weixin"  @click="showQrcode"></span><span class="copy"></span></div>
        <BackFilterDescr/> 
        <div class="bfilter-bottom">
          <ul class="bfilter-ul clearfix">
              <li class="fl blue" @click="nowStock" :class="showNowStock===true?'active':''">当前选股</li>
              <li class="fl blue" @click="tradeDay" :class="showTradeDay===true?'active':''">每日交易</li>
              <li><span class="export blue" @click="showNowStock===true?excelExport('filterStock'):showTradeDay===true?excelExport('filterDaily'):''"><i></i>导出</span></li>
          </ul>
          <div class="bfilter-table" v-show="showNowStock" :style="{  minHeight: fullHeight + 'px' }">
              <div>
                  
              </div>
              <div class="table-head">
                   <span class="order-num">序号
                   </span><span>股票代码
                   </span><span>股票简称
                   </span><span>价格(元)
                   </span><span>涨跌
                   </span><span>涨跌幅
                   </span><span>市盈率
                   </span><span>市净率
                   </span><span>市销率
                   </span><span>总市值
                   </span><span>流通市值
                   </span>
              </div>
              <div class="clearfix table-body" v-for="(stock,index) of nowChooseStock">
                   <span class="order-num">{{index+1}}
                   </span><span>{{stock.innerCode}}
                   </span><span><a :href="'/stock/'+ stock.innerCode" target="_blank">{{stock.name}}</a>
                   </span><span v-z3-updowncolor="stock.curChngPct">{{stock.price==null?'--':stock.price}}
                   </span><span v-z3-updowncolor="stock.curChngPct">{{stock.chg==null?'--':stock.chg}}
                   </span><span v-z3-updowncolor="stock.curChngPct">{{stock.curChngPct==null?'--':changeTofixed(stock.curChngPct)}}
                   </span><span>{{stock.peTtm==null?'--':stock.peTtm.toFixed(2)}}
                   </span><span>{{stock.pb==null?'--':stock.pb.toFixed(2)}}
                   </span><span>{{stock.ps==null?'--':stock.ps.toFixed(2)}}
                   </span><span>{{stock.tcap==null?'--':changeYi(stock.tcap)}}
                   </span><span>{{stock.mktcap==null?'--':changeYi(stock.mktcap)}}
                   </span>
              </div>
              <Pagination  @getPageFromChild="goToStockPage" :totalPage="totalPage"/>
          </div>
          <div class="bfilter-today" v-show="showTradeDay" :style="{  minHeight: fullHeight + 'px' }">
                 <div class="table-head table-head2">
                     <span>序号
                     </span><span>日期
                     </span><span>卖出股票(只)
                     </span><span>买入日期
                     </span><span>盈亏比
                     </span><span>胜率
                     </span><span>平均收益率
                     </span><span>平均超额收益率
                     </span>
                 </div>
                 <div class="clearfix table-body table-body2" v-for="(tradeDay,index) of tradeDetail">
                     <span>{{index+1}}
                     </span><span>{{tradeDay.backtestDate==null?'--':changeDate(tradeDay.backtestDate)}}
                     </span><span>{{tradeDay.sellStockNums==null?'--':tradeDay.sellStockNums}}
                     </span><span>{{tradeDay.buyDate==null?'--':changeDate(tradeDay.buyDate)}}
                     </span><span>{{tradeDay.winLossRatio==null?'--':tradeDay.winLossRatio.toFixed(2)}}
                     </span><span>{{tradeDay.winRatio==null?'--':changePer(tradeDay.winRatio)}}
                     </span><span v-z3-updowncolor="tradeDay.avgReturn">{{tradeDay.avgReturn==null?'--':changePer(tradeDay.avgReturn)}}
                     </span><span v-z3-updowncolor="tradeDay.avgReturnExcess">{{tradeDay.avgReturnExcess==null?'--':changePer(tradeDay.avgReturnExcess)}}
                     </span>
                 </div>
                 <Pagination  @getPageFromChild="goTotradePage" :totalPage="tradeTotalPage"/>
          </div>
        </div> 
      </div>
      <div v-show="showQrcodeBox" class="qrcode" >
          <div><canvas ref="qrcode"></canvas></div>
      </div>
      <toast :msg="toastmsg"  v-if="showToast"></toast>
   </div>
       
</template>

<script>
 import { mapState } from 'vuex'
 import BackFilterDescr from './back-filter-descr'
 import Pagination from './pagination'
 import qrcode from 'qrcode'
 import Clipboard from 'clipboard'
 import toast from 'components/toast'
 import { ctx } from '../z3tougu/config'
 export default {
   data () {
     return {
       stockPage: 0,
       stockPagesize: '',
       tradePage: 0,
       tradePagesize: '',
       showNowStock: true,
       showTradeDay: false,
       strategyId: this.$route.params.strategyId,
       showQrcodeBox: false,
       toastmsg: '',
       showToast: false,
       fullHeight: document.documentElement.clientHeight - 240
     }
   },
   computed: mapState({
     tradeDetail: state => state.backtestDetail.tradeDetail,
     nowChooseStock: state => state.backtestDetail.nowStock,
     totalPage: state => state.backtestDetail.stockTotal,
     tradeTotalPage: state => state.backtestDetail.tradeTotalPage
   }),
   components: {
     BackFilterDescr,
     Pagination,
     toast
   },
   methods: {
     initData (stockPage, tradePage) {
       this.$store.dispatch('backtestDetail/queryNowStock', { strategyId: this.strategyId, stockPage: this.stockPage, stockPagesize: this.stockPagesize })
       this.$store.dispatch('backtestDetail/queryTradeDetail', { strategyId: this.strategyId, tradePage: this.tradePage, tradePagesize: this.tradePagesize })
     },
     nowStock () {
       this.showNowStock = true
       this.showTradeDay = false
     },
     tradeDay () {
       this.showTradeDay = true
       this.showNowStock = false
     },
     excelExport (type) {
       const id = this.strategyId
       const url = 'http://test.z3quant.com/openapi/excels/excelByType.shtml?id=' + id + '&type=' + type
       window.location.href = url
     },
     goToStockPage (page) {
       this.stockPage = Number(page) - 1
     },
     goTotradePage (page) {
       this.tradePage = Number(page) - 1
     },
     /* goToPage (page) {
       this.page = Number(page) - 1
     },*/
     changeYi (num) {
       return (Number(num) / 100000000).toFixed(2) + '亿'
     },
     changeFix (num) {
       return Number(num).toFixed(2) + '%'
     },
     changePer (num) {
       return (Number(num) * 100).toFixed(2) + '%'
     },
     changeTofixed (num) {
       return num > 0 ? '+' + parseFloat(num).toFixed(2) + '%' : parseFloat(num).toFixed(2) + '%'
     },
     changeDate (time) {
       return (time + '').substring(0, 4) + '.' + (time + '').substring(4, 6) + '.' + (time + '').substring(6, (time + '').length)
     },
     showQrcode () {
       this.showQrcodeBox = !this.showQrcodeBox
     }

   },
   watch: {
     stockPage () {
       this.initData(this.stockPage)
     },
     tradePage () {
       this.initData(this.tradePage)
     }
 
   },
   mounted () {
     this.initData()
     const url = window.location.protocol + '//' + window.location.host + ctx + '/backtestFilterH5/' + this.strategyId
     qrcode.toDataURL(this.$refs.qrcode, url, function () {})
     const clipboard = new Clipboard('.copy', {
       text: function () {
         return url
       }
     })
     clipboard.on('success', (e) => {
       this.toastmsg = '分享地址已拷贝!'
       this.showToast = true
       setTimeout(() => {
         this.showToast = false
       }, 2500)
     })
     clipboard.on('error', (e) => {
       this.toastmsg = '分享地址拷贝失败!'
       this.showToast = true
       setTimeout(() => {
         this.showToast = false
       }, 2500)
     })
   }
 
 }
</script>
