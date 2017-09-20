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
    .hui{
       color: #7e7e7e;
    }
    .fr{
      float: right;
    }
    .fl{
      float: left;
    }
   
    /* .recom-fund-left{
      width: 50%;
      border: 1px solid #e5e5e5;
    }
    .recom-fund-right{
      margin-left: 8px;
    } */
    .recom-fund-head{
      /* width: 50%; */
      background: #2388da;
      padding: 10px 0;
      color: #fff;
      border-radius:3px 3px 0 0;
      text-align: center;
    }
    .recom-fund-body{
      padding: 11px 6px;
      background: #fff;
      color: #191919;
       
      font-size: 12px;
    }
    .recom-left{
        /* width: 50%; */
    }
    .fund-hot1{
        border-right: 1px solid #e5e5e5;
        width: 50%;
    }
    .fundchart2{
      width: 300px;
      height: 210px;
    }
    .recom-content{
      margin-top: 18px;
      line-height: 22px;
      width: 80%;
      text-align: center;
      margin: 0 auto;
    }
    .reson-title{
      margin-top: 12px;
      
    }
    .fund-hot2{
      border-right: none;
      padding-left: 6px;
    }
     
    .fund-hot1:nth-child(2){
       border-right: none;
      padding-left: 6px;
    }
    
</style>
<template> 
        <div class="recom-fund-body">
           
            <div class="recom-left display-box">
                <div class="fund-hot1 box-flex-1" v-if="index<=1" v-for="(recom,index) of recommendData">
                   <div class="fundchart2" ref="fundchart2"></div>
                   <div class="recom-content">
                       <div class="hui">今年以来:<span class="red">{{recom.since_this_year_income_rate}}%
                       </span></div>
                       <div>
                           <span class="blue">{{recom.fportfolio_name}}
                           </span>
                       </div>
                       <div>
                          <span class="hui">起投金额：</span><span>{{recom.min_purchase_amount}}元</span>
                          <span class="hui">风险：</span><span>{{recom.risk_level_name}}</span>
                       </div>
                       
                       <div class="reson-title hui">组合特色:</div>
                       <ul>
                           <li v-for="(info,index) of recom.recommend_info">{{index+1}}、{{info}}</li>
                          
                       </ul>
                   </div>
                </div>  
                    
            </div>
        </div>
</template>

<script>
 import { mapState } from 'vuex'
 import echarts from 'echarts'
 export default {
   data () {
     return {
 
     }
   },
   computed: mapState({
     recommendData: state => state.fundIntell.recommend,
     itellRecomLine: state => {
       const itellData = state.fundIntell.recommend
       // console.log(itellData.length)
       let xDate = null
       let portfolio = null
       let hs = null
       itellData && itellData.forEach((item, index) => {
         // if (index <= 1) {
         xDate = item.kline.date
         portfolio = item.kline.portfolio
         hs = item.kline.hs300
         // console.log(item.kline.hs300)
         // }
       })
       // console.log(xDate)
       return {
         xDate: xDate,
         portfolio: portfolio,
         hs: hs
       }
     }
 
   }),
   components: {
 
   },
   methods: {
     init () {
       this.chart = echarts.init(this.$refs.fundchart2[0])
       this.chart2 = echarts.init(this.$refs.fundchart2[1])
       this.$store.dispatch('fundIntell/queryRecommend')
                      .then(() => {
                        this.drawCharts(this.chart, this.itellRecomLine.xDate, this.itellRecomLine.portfolio, this.itellRecomLine.hs)
                        this.drawCharts(this.chart2, this.itellRecomLine.xDate, this.itellRecomLine.portfolio, this.itellRecomLine.hs)
                      })
     },
     drawCharts (chart, xDate, portfolio, hs) {
       chart.setOption({
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
             name: 'wewe',
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
             data: xDate,
             axisLabel: {
                                                    // X轴刻度配置
               interval: 'auto' // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
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
           left: '0',
           right: '0',
           bottom: 0,                  /* bottom: '50',*/
           containLabel: true
         },
         /* dataZoom: [
           {
             show: true,
             showDetail: false,
             type: 'slider',
             y: '88%',
             start: 0,
             end: 100
           }
         ],*/
         series: [{
           name: 'wewe',
           type: 'line',
           smooth: true,
           data: portfolio,
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
           data: hs,
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
     changePer (num) {
       return (Number(num) * 100).toFixed(2) + '%'
     },
     changeDate (time) {
       return (time + '').substring(0, 4) + '.' + (time + '').substring(4, 6) + '.' + (time + '').substring(6, (time + '').length)
     }

   },
   watch: {
 
   },
   mounted () {
     var self = this
     this.$store.dispatch('fundIntell/queryRecommend')
                      .then(() => {
                        self.init()
                      })
   }
 
 }
</script>
