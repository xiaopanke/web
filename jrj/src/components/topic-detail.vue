<style lang="scss" scoped>
    @import '../assets/css/base.css';
    *{
      text-align: justify;
      box-sizing: border-box;
    }
    em,i{
      font-style: normal;
    }
    a{
      color: #696969;
    }
    .blue{
      color: #2388da;
      font-size: 12px;
    }
    .red{
      color:#e6363a !important;
    }
    .green {
      color:#48a854 !important;
    }
    .fr{
      float: right;
    }
    .fl{
      float: left;
    }
    .mb-8{
      margin-bottom: 8px;
    }
    .mr-8{
      margin-right: 8px;
    }
    .display-box {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -o-box;
      display: box;
    }
    .box-flex-1 {
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
    }
    body,html{
      /* height: 100%; */
    }
    .topic-detail{
        width: 100%;
        background: #f2f2f2;
        font-size: 12px;
        color: #696969;
        height: 100%;
    }
    .header{
      padding: 19px 0 6px 18px;
      font-size: 12px;
    }
    .topic-time{
       margin-right: 14px;

    }
    .topic-time span{
      display: inline-block;
    }
    .time-num{
      width: 90px;
      text-align: center;
    }
    .time-num2{
      width: 49px;
      text-align: center;
    }
    .time-num3{
      width: 61px;
      text-align: center;
    }
    .time-num4{
      width: 37px;
      text-align: center;
    }

    .detail-content{
      margin: 9px;
    }
    .detail-main{

    }
    .main-left{
      width: 60%;
    }
    .left-con1{
      background: #fff;
      border-radius: 3px;
      padding: 20px 25px 20px 18px;
      /* height: 82px; */
      height: auto;
      line-height: 18px;
      box-sizing: border-box;
    }
    .left-con1 strong{
      padding-bottom: 3px;
      display: inline-block;
    }
    .left-con1 a:hover{
      color:#2388da;
    }
    .left-con2{
      background: #fff;
      border-radius: 3px;
      height: 317px;
      padding: 11px 19px 12px 0;
      position:relative;
    }
    .left-con3{
      background: #fff;
      border-radius: 3px;
      padding: 13px 25px 10px 13px;
    }
    .left-con3-1{
      height: 421px;
    }
    .in-content{
      line-height: 18px;
    }
    .in-title{
      line-height: 62px;
    }
    .new-link span{
      line-height: 18px;
    }
    .new-tit{
      width: 70%;
      text-align: left;
      float: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 25px;

    }
    .new-date{
      color: #7e7e7e;
      line-height: 25px;
      float: left;
      width: 12%;
      text-align: right;
    }
    .new-srcname{
      line-height: 25px;
      float: left;
      width: 14%;
      text-align: right;
      color: #7e7e7e;
    }
    .in-content a:hover{
      color: #2388da;
    }
    .left-con3 strong{
      display: inline-block;
    }
    .view-all{
      position:relative;
      margin-top: 10px;
      /* margin-right: 7%; */
      margin-right: 5%;
      cursor: pointer;
      background: #fff;
    }
    .view-all2{
      /* margin-right:9%; */
      margin-right: 6%;
    }
    .view-all i{
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-left-color: #8eb6dd;
      display: inline-block;
      position: absolute;
      top: 1px;
      left: 51px;
    }
    .main-right{
      width: 39%;
      /* max-height: 898px; */
      background: #fff;
      /* max-height: 74.7em;
      height: 55.7rem;*/
    }
    .main-right2{
      height:896px;
    }
    .right-con{
       background: #fff;
       border-radius: 3px;
    }
    table{
      border-spacing: 1px;
      width: 100%;
      /* border-collapse:collapse;
      border-spacing:0;  */
      padding-bottom: 10px;
    }
    .right-con th{
      background: #eff3f8;
      /* padding: 11px 0 8px 0; */
      padding: 13px 0 12px 0;
      text-align: center;
      width: 100%;
    }
    .right-con td{
      text-align: center;
      /* width: 18%; */
      width: 19%;
      float: left;
      font-weight: 400;
    }
   .right-con tbody tr{
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
    }
   .right-con tbody tr td{
     /* line-height: 42px; */
     line-height: 42px;
    }
    .td-tit1{
      position: relative;
    }
    .txt-td{
     /*  position: absolute;
      top: -5px;
      left: 31%; */
      position: relative;
      top: -5px;
      left: 5px;
    }
    .num-td{
      position: absolute;
      top: 10px;
      /* left: 34%; */
      left: 39%;
      font-size: 12px;
    }
    .right-con .td1{
      /* width: 22%; */
      width: 24%;
    }
    .chart{
       height: 100%;
       width: 100%;
    }
    .time-ul{
     position: absolute;
     right: 2%;
     top: 3%;
     z-index: 9999;
    }
    .time-ul li{
      float: left;
      color: #2388da;
      border: 1px solid #ddd;
      padding: 5px 10px;
      margin-right: -1px;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      cursor: pointer;
    }
    .chart-title{
      position: absolute;
      left: 2%;
      top: 3%;
    }
    .time-ul .active{
      color: #fff;
      background-color: #2388da;
      border-color: #2388da;
    }
</style>
<template>
    <div class="topic-detail">
        <div class="header clearfix">
            <strong>{{detail.topicName}}</strong>
            <div class="topic-time fr">
                 <span class="">发布时间</span><span class="blue time-num">{{detail.declareDate==null?'--':format(detail.declareDate)}}</span><span>成分股数</span><span class="blue time-num2">{{detail.equityNum}}只</span><span>相关新闻</span><span class="blue time-num2">{{detail.eventNum}}条</span>
                 <span>今日涨跌</span>
                 <span class="time-num3" :class="detail.topicMarket.chngPct>0 ? 'red':'green'">{{detail.topicMarket.chngPct==null?'--':changeTofixed(detail.topicMarket.chngPct)}}</span><span>上涨股票</span><span class="red time-num4">{{checkNull(detail.topicMarket.stkUpNum)}}</span><span>下跌股票</span><span class="green time-num4">{{checkNull(detail.topicMarket.stkDownNum)}}</span>
            </div>
        </div>
        <div class="detail-content clearfix">
              <div class="detail-main clearfix">
                  <div class="main-left fl mr-8">
                      <div class="left-con1 mb-8">
                          <strong>最新事件:</strong>
                          <!-- <div> -->
                            <router-link :to="{name:'detailPages',params:{id : detail.newsId, detailType:'news'}}">
                              <span>{{checkNull(detail.title)}}</span>  <span>{{detail.newsDeclareDate==null?'--':format(detail.newsDeclareDate)}}</span>
                              </router-link>
                          <!-- </div> -->
                          <div>
                             <router-link :to="{name:'detailPages',params:{id : detail.newsId, detailType:'news'}}"> <span>{{checkNull(detail.summary)}}</span></router-link>
                            （<span>{{checkNull(detail.srcName)}}</span>）
                          </div>
                      </div>
                      <div class="left-con2 mb-8">
                        <div class="chart-title">主题<span class="blue">[{{detail.topicName}}]</span>累计收益率</div>
                        <ul class="time-ul">
                            <li @click="renderCharts('day')" :class="this.period==='day'?'active':''">日内</li>
                            <li @click="renderCharts('M01')" :class="this.period==='M01'?'active':''">近1月</li>
                            <li @click="renderCharts('M03')" :class="this.period==='M03'?'active':''">近3月</li>
                            <li @click="renderCharts('M06')" :class="this.period==='M06'?'active':''">近6月</li>
                            <li @click="renderCharts('M12')" :class="this.period==='M12'?'active':''">近1年</li>
                            <li @click="renderCharts('M36')" :class="this.period==='M36'?'active':''">近3年</li>
                            <li @click="renderCharts('ALL')" :class="this.period==='ALL'?'active':''">全部</li>
                        </ul>
                          <div class="chart" ref="chart"></div>
                      </div>
                      <div class="left-con3 clearfix" :class="informatList.length<15 && inforPageSize>9?'left-con3-1':''">
                          <strong class="mb-8" v-if="index==0" v-for="(infor,index) of informatList">{{infor.topicName}}</strong><strong>相关资讯</strong>
                          <div class="in-content">
                              <router-link :to="{name:'detailPages',params:{id : detail.newsId, detailType:'news'}}">
                               <a class="clearfix" :class="inforPageSize===5?'new-link':''" v-for="(infor,index) of informatList">
                                 <span class="new-tit">{{checkNull(infor.title)}}</span>
                                 <span class="new-date">{{infor.declareDate==null?'--':format(infor.declareDate)}}</span>
                                 <span class="new-srcname">{{checkNull(infor.srcName)}}</span>
                                </a>
                               </router-link>
                          </div>
                          <div class="view-all blue fr" v-if="index==0" v-for="(item,index) of informatList"><router-link :to="{name:'themeInformat',params:{inforId:item.topicCode}}" class="blue"><span>查看全部</span><i></i></router-link></div>
                      </div>
                  </div>
                  <div class="main-right fl" :class="stockList.length<15&&size>13?'main-right2':''">
                        <table class="right-con clearfix">
                          <thead>
                             <th class="fl mb-8">
                               <td class="td1">{{detail.topicName}}相关股票</td>
                               <td>最新价</td>
                               <td>涨跌幅</td>
                               <td>所属申万行业</td>
                               <td>关联说明</td>
                             </th>
                          </thead>
                          <tbody>
                              <tr class="fl" v-for="stock of stockList">
                                 <td class="td1 td-tit1" v-z3-stock="{ref:'stockbox',code:stock.innerCode}"><a :href="'/stock/'+stock.innerCode" target="_blank"><span class="blue txt-td">{{stock.name}}</span><small class="num-td">{{stock.symbol}}</small></a></td>
                                 <td :class="stock.curChngPct>0 ? 'red':'green'">{{stock.price==null?'--':parseFloat(stock.price).toFixed(2)}}</td>
                                 <td :class="stock.curChngPct>0 ? 'red':'green'">{{stock.curChngPct==null?'--':changeTofixed(stock.curChngPct)}}</td>
                                 <td>{{checkNull(stock.industryName)}}</td>
                                 <td class="blue" :title="stock.topicMark">关联原因</td>
                              </tr>

                          </tbody>
                          <tfoot>
                                <a :href="'/filter.shtml?from=topic&topicCode='+detail.topicCode" target="_blank"><div class="view-all blue fr view-all2"><span>查看全部</span><i></i></div></a>
                          </tfoot>
                        </table>

                  </div>
              </div>
        </div>

        <StockBox ref="stockbox"></StockBox>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import echarts from 'echarts'
    import { formatDate } from 'utils/date'
    // import { mutationTypes } from 'stores/z3tougu-theme'
    import z3websocket from '../z3tougu/z3socket'
    import StockBox from 'components/stock-box'
    export default{
      data () {
        return {
          period: { all: 'ALL', M01: 'M01', M03: 'M03', M06: 'M06', M12: 'M12', M36: 'M36', day: 'day' },
          topicCode: this.$route.params.topicId,
          fullHeight: document.documentElement.clientHeight,
          size: 12,
          inforPageSize: 5,
          endAll: '',
          alltimers: ''
        }
      },
      components: {
        StockBox
      },
      computed: {
        ...mapState({
          relatedStocks: state => state.topic.relatedStocks,
          allLimit: state => state.topic.allLimit,
          realtimeLimit: state => state.topic.realtimeLimit,
          stockMessage: state => {
            const msg = state.z3sockjs.message
            if (msg && msg.data && msg.data.subject === 'snapshot') {
              const record = msg.data
              return {
                innerCode: record.stockCode,
                name: record.stockName,
                price: record.lastPx,
                chg: record.pxchg,
                curChngPct: record.pxchgratio
              }
            } else {
              return null
            }
          },
          lineData: state => state.topic.lineData,
          news: state => state.topic.news,
          informatList: state => state.topic.informatList,
          stockList: state => state.topic.stockList,
          detail: state => state.topic.detail,
          chartData: state => {
            const chartData = state.topic.allCharts
            const topicReturnRate = []
            const hs300ReturnRate = []
            const tradeDate = []
            let topicName = ''
            let time = ''
            let chartDataEnd = ''
            chartData && chartData.forEach(item => {
              time = (item.tradeDate + '').substring(0, 4) + '-' + (item.tradeDate + '').substring(4, 6) + '-' + (item.tradeDate + '').substring(6, (item.tradeDate + '').length)
              topicReturnRate.push(Number(item.topicReturnRate).toFixed(2))
              hs300ReturnRate.push(Number(item.hs300ReturnRate).toFixed(2))
              tradeDate.push(time)
              topicName = item.topicName
              // console.log(chartData.length)
              chartDataEnd = chartData[chartData.length - 1].tradeDate
              // console.log(chartDataEnd)
            })
            return {
              topicReturnRate: topicReturnRate,
              hs300ReturnRate: hs300ReturnRate,
              tradeDate: tradeDate,
              topicName: topicName,
              chartDataEnd: chartDataEnd
            }
          },
          realTimeData: state => {
            const realtimeCharts = state.topic.realtimeCharts
            const topicChgPct = []
            const hs300ChgPct = []
            const tradeMin = []
            const arr = [9, 10, 11, 13, 14, 15]
            let start = null
            let end = null
            let realTime = null
            let topicTimeName = ''
            let realTimeEnd = ''
            for (var i = 0; i < arr.length; i++) {
              if (arr[i] === 9) {
                start = 30
                end = 60
              } else if (arr[i] === 11) {
                start = 0
                end = 31
              } else if (arr[i] === 15) {
                start = 0
                end = 1
              } else {
                start = 0
                end = 60
              }
              for (var j = start; j < end; j++) {
                j = j < 10 ? '0' + j : j
                if (arr[i] === 11 && j === 30) {
                  break
                } else if (arr[i] === 13 && j === '00') {
                  // realTime = '11:30' + '/' + arr[i] + ':' + j
                  realTime = arr[i] + ':' + j
                } else {
                  realTime = arr[i] + ':' + j
                }
                tradeMin.push(realTime)
              }
            }
            console.log(tradeMin)
            realtimeCharts && realtimeCharts.forEach((item, index) => {
          // console.log(index === 0)
              topicTimeName = item.topicName
              realTimeEnd = realtimeCharts[realtimeCharts.length - 1].tradeMin
              console.log(realTimeEnd)
              if (index === 0) {
                topicChgPct.push(0)
                hs300ChgPct.push(0)
              } else {
                topicChgPct.push(Number(item.topicChgPct).toFixed(2))
                hs300ChgPct.push(Number(item.hs300ChgPct).toFixed(2))
              }
              /* tradeMin.push(tradeMinDate)*/
            })
            return {
              topicChgPct: topicChgPct,
              hs300ChgPct: hs300ChgPct,
              tradeMin: tradeMin,
              topicTimeName: topicTimeName,
              realTimeEnd: realTimeEnd
            }
          },
          xLabelInterval () {
            let interval = 'auto'
            if (this.period === 'day') {
              interval = 14
            } else {
              interval = 'auto'
            }
            return interval
          }
        //   stockNum: state => state.topic.stockList.length,
        //   newsNum: state => state.topic.news.length

        })
      },
      watch: {
        relatedStocks () {
          if (z3websocket.ws) {
            z3websocket.ws && z3websocket.ws.close()
          } else {
            this.$store.dispatch('z3sockjs/init')
          }
        },
        stockMessage () {
          if (this.stockMessage) {
            this.updateStock()
          }
        },
        socketState () {
          if (this.socketState === 1) {
            // 建立连接
            this.subscribeStock()
          } else if (this.socketState === 3) {
            // 断开连接，重新建立连接
            this.$store.dispatch('z3sockjs/init')
          }
        }
      },
      methods: {
        initChart () {
          this.chart = echarts.init(this.$refs.chart)
          // var _this = this
          this.period = 'ALL'
          /* this.$store.dispatch('topic/queryAllCharts', { period: this.period, topicCode: this.topicCode })
                      .then(() => {
                        this.drawCharts(this.chartData.topicName, this.chartData.tradeDate, this.chartData.topicReturnRate, this.chartData.hs300ReturnRate)
                        // console.log(this.chartData.tradeDate.length)
                        // console.log(this.chartData.tradeDate[this.chartData.tradeDate.length - 1])
                        setInterval(function () {
                          _this.updateChartAll()
                        }, 3000)
                      })*/
          this.renderCharts(this.period)
          // console.log(this.handleResize)
        },
        renderCharts (type) {
          this.period = type
          console.log(type)
          var _this = this
          if (type === 'day') {
            this.$store.dispatch('topic/queryRealtimeCharts', { period: this.period, topicCode: this.topicCode }).then(() => {
              this.drawCharts(this.realTimeData.topicTimeName, this.realTimeData.tradeMin, this.realTimeData.topicChgPct, this.realTimeData.hs300ChgPct)
              clearInterval(this.alltimers)
              this.alltimers = setInterval(function () {
                _this.updateChartRealTime()
              }, 3000)
            })
          } else {
            this.$store.dispatch('topic/queryAllCharts', { period: this.period, topicCode: this.topicCode })
                     .then(() => {
                       this.drawCharts(this.chartData.topicName, this.chartData.tradeDate, this.chartData.topicReturnRate, this.chartData.hs300ReturnRate)
                       clearInterval(this.alltimers)
                       this.alltimers = setInterval(function () {
                         _this.updateChartAll()
                       }, 3000)
                     })
               // this.$store.dispatch('topic/queryAllTopic', { sortField: this.FIELDS[this.sortField] })
          }
        },
        updateChartAll () {
          this.$store.dispatch('topic/queryAllChartsLimit', { period: this.period, topicCode: this.topicCode }).then(() => {
            console.log(this)
            // this.endAll = this.allLimit.limitAllX
            console.log(this.chartData.chartDataEnd)  // chartHs
            if (this.allLimit[0].tradeDate === this.chartData.chartDataEnd) {
              const allLimitHs = Number(this.allLimit[0].hs300ReturnRate).toFixed(2)// 新
              const allLimitReturn = Number(this.allLimit[0].topicReturnRate).toFixed(2)
              this.chartData.hs300ReturnRate[this.chartData.hs300ReturnRate.length - 1] = allLimitHs
              this.chartData.topicReturnRate[this.chartData.topicReturnRate.length - 1] = allLimitReturn
              console.log(Number(this.allLimit[0].hs300ReturnRate).toFixed(2))
              // console.log(chartReturn)
              // console.log(allLimitReturn)
            }
          })
        },
        updateChartRealTime () {
          console.log(this)
          this.$store.dispatch('topic/queryRealtimeChartsLimit', { period: this.period, topicCode: this.topicCode }).then(() => {
            console.log(this.realtimeLimit[0].tradeMin)
            console.log(this.realTimeData.realTimeEnd)
            // this.endAll = this.allLimit.limitAllX
            // console.log(this.chartData.chartDataEnd)
            if (this.realtimeLimit[0].tradeMin === this.realTimeData.realTimeEnd) {
              const realTimeLimitHs = Number(this.realtimeLimit[0].hs300ChgPct).toFixed(2)// xin
              const realTimeLimitReturn = Number(this.realtimeLimit[0].topicChgPct).toFixed(2)
              this.realTimeData.hs300ChgPct[this.realTimeData.hs300ChgPct.length - 1] = realTimeLimitHs
              this.realTimeData.topicChgPct[this.realTimeData.topicChgPct.length - 1] = realTimeLimitReturn
              /* console.log(realTimeReturn)
              console.log(realTimeLimitReturn)*/
            }
          })
        },
        handleResize (event) {
          this.fullHeight = document.documentElement.clientHeight
          // console.log(this.fullHeight > 710 ? this.size = 20 : this.size = 12)
          // console.log(this.fullHeight)
      /* this.fullHeight > 710 ? this.size = 20 : this.size = 12*/
        },

        initStockList (size) {
        //   this.$store.dispatch('z3tougu-theme/queryTopicStocks')
          // console.log(this.fullHeight)
          this.fullHeight > 710 ? (this.fullHeight > 876 ? this.size = 18 : this.size = 15) : this.size = 12
          // console.log(this.size)
          this.$store.dispatch('topic/queryStockList', { topicCode: this.topicCode, size: this.size })
        },
        initInformatList (inforPageSize) {
          this.fullHeight > 710 ? (this.fullHeight > 876 ? this.inforPageSize = 15 : this.inforPageSize = 9) : this.inforPageSize = 5

          this.$store.dispatch('topic/queryInformatList', { topicCode: this.topicCode, inforPageSize: this.inforPageSize })
        },
        drawCharts (topicName, tradeDate, topicReturnRate, hs300ReturnRate) {
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                if (params.length) {
                  if (params[0].value !== '') {
                    var boxHtml = '<div>' + params[0].name + '<br/>'
                  }
                  for (var i = 0; i < params.length; i++) {
                    var param = params[i]
                    if (param.value !== '') {
                      boxHtml += '<span style=\'display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + param.color + '\'></span>' + ' ' + param.seriesName + ': ' + param.value + '%<br/></div>'
                    }
                  }
                  return boxHtml
                }
              }
            },
            legend: {
              left: '3%',
              top: 30,
              itemWidth: 15,
              itemHeight: 8,
              data: [{
                name: topicName,
                icon: 'pin'
              },
              {
                name: '沪深300',
                icon: 'pin'
              }]

            },
            toolbox: {
              show: false
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: tradeDate,
                axisLabel: {
                                                    // X轴刻度配置
                  interval: this.xLabelInterval // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  formatter: '{value}%'
                }
              }
            ],
            grid: {
                              /* width: '97%',*/
              left: '2%',
              /* right: '3%',*/
              /* right: '4%',*/
              right: '4.3%',
                             /* bottom: '50',*/
              containLabel: true
            },
            dataZoom: [
              {
                show: true,
                showDetail: false,
                type: 'slider',
                y: '88%',
                start: 0,
                end: 100
              }
            ],
            series: [{
              name: topicName,
              type: 'line',
              smooth: true,
              data: topicReturnRate,
              lineStyle: {// 网格线
                normal: {
                  color: '#5597d3'
                }
              },
              itemStyle: {// 折线拐点标志的样式
                normal: {
                  opacity: 0,
                  color: '#5597d3'
                }
              },
              markPoint: {// 图标标注
                data: [
                          { type: 'max', name: '最大值' },
                          { type: 'min', name: '最小值' }
                ],
                label: {
                  normal: {
                    show: false
                  }
                },
                symbolSize: 10, // 标记大小
                symbol: ''// 标记的图形
              }
            },
            {
              name: '沪深300',
              type: 'line',
              smooth: true,
              data: hs300ReturnRate,
              lineStyle: {
                normal: {
                  color: '#f1975d'
                }
              },
              itemStyle: {
                normal: {
                  opacity: 0,
                  color: '#f1975d'
                }
              },
              markPoint: {// 图标标注
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ],
                label: {
                  normal: {
                    show: false
                  }
                },
                symbolSize: 10, // 标记大小
                symbol: ''// 标记的图形
              }
            }]

          })
        },
        format (date) {
          return formatDate(date)
        },
        checkNull (str) {
          if (str === null) {
            return '--'
          } else {
            return str
          }
        },
        updateStock (stock) {
          this.$store.commit('topic/UPDATE_TOPIC_RELSTOCK', stock)
        },
        subscribeStock () {
          const msg = {
            subject: 'snapshot',
            type: '1',
            actionType: '1',
            stockCodeList: Object.keys(this.relatedStocks),
            token: ''
          }
          this.$store.dispatch('z3sockjs/send', msg)
        },
        changeTofixed (num) {
          return num > 0 ? '+' + parseFloat(num).toFixed(2) + '%' : parseFloat(num).toFixed(2) + '%'
        }/* this.$store.dispatch('stockMap/queryRangeByCode', { code: this.rangeCode })
                    .then(() => {
                      this.chart.setOption({*/
        /* drawCharts () {
          const myChart = echarts.init(document.getElementById('chart'))*/

      },
      created () {
        window.addEventListener('resize', this.handleResize)
      },
      mounted () {
        this.initChart()
        this.initStockList()
        this.initInformatList()
        // console.log(this.inforPageSize)
        this.$store.dispatch('topic/queryDetailHead', { topicCode: this.topicCode })
        // this.drawCharts()
      },
      beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
      }
    }
</script>
