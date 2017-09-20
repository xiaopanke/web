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

    .bfilter-ul{
      border-bottom: 1px solid #2388da;
      background: #f2f2f2;
    }
    .bfilter-ul li{
      /* padding: 7px 15px 5px 14px; */

      padding:7px 10px 8px 9px;
      cursor: pointer;
    }
    .bfilter-ul2 li{
      padding:8px 15px 9px 13px;
    }
    .bfilter-ul li.active{
      background: #2388da;
      color: #fff;
    }
     .recom-fund-table{
      /* margin-top: 14px; */
      background: #fff;
      font-size: 12px;
      color: #191919;
      background: #fff;
      padding: 0 10px;
      /* width: 50%; */
    }
    .bfilter-table{
      /* padding: 15px 10px 0 7px; */
      
    }
    
    .table-head{
      /*  background: #f2f2f2; */
       padding: 10px 0 7px 0;
       border-bottom: 1px solid #e5e5e5;
       margin-bottom: 6px;
    }
    .table-head{
      width: 100%;
    }
    .table-head span{
      width: 16%;
      display: inline-block;
      text-align: center;
    }
    .table-body{
      padding: 10px 0 9px 0;

     /*  border-bottom: 1px solid #e5e5e5; */
    }
    .table-body span{
      width: 16%;
      display: inline-block;
      text-align: center;
    }
    .table-head2 span{
      width: 12%;
    }
    .table-body2{
      /* padding: 12px 0; */
      padding: 13px 0 11px 0;
      border: none;
    }
    .table-body2 span{
      width: 12%;
    }
    span.order-num{
      /* width: 6%; */
    }
    .recom-fund-right{
      margin-left: 8px;
    }
</style>
<template> 
    
      <div class="recom-fund-table">
         <ul class="bfilter-ul clearfix">
            <li class="fl blue" @click="hotRecommend" :class="showHotRecommend===true?'active':''">热门主题基金</li>
            <li class="fl blue" @click="excellentPlan" :class="showPlan===true?'active':''">优选定投</li>
            <li class="fl blue" @click="moneyFund" :class="showMoneyFund===true?'active':''">优选货基</li>
            <li class="fl blue" @click="revenueChampion" :class="showChampion===true?'active':''">收益冠军</li>
         </ul>
         <div class="bfilter-table clearfix" v-show="showHotRecommend">
            <div class="table-head">
                 <span class="order-num">基金代码
                 </span><span>基金简称
                 </span><span>单位净值
                 </span><span>年化收益
                 </span><span>夏普比率
                 </span><span>所属主题
                 </span>
            </div>
            <div class="clearfix table-body" v-for="hot of hotRecomm">
                 <span class="order-num blue">{{hot.symbol}}
                 </span><span>{{hot.name}}
                 </span><span>{{hot.unitNet==null?'--':hot.unitNet}}
                 </span><span>{{hot.yearYieldEstab==null?'--':hot.yearYieldEstab}}
                 </span><span>{{hot.statSharpeRatio==null?'--':hot.statSharpeRatio}}
                 </span><span>{{hot.topicName==null?'--':hot.topicName}}
                 </span>
            </div>
           
         </div>
         <div class="bfilter-table clearfix" v-show="showPlan">
            <div class="table-head">
                 <span class="order-num">基金代码
                 </span><span>基金简称
                 </span><span>单位净值
                 </span><span>年化收益
                 </span><span>夏普比率
                 </span><span>波动率
                 </span>
            </div>
            <div class="clearfix table-body" v-for="excell of excellPlan">

                 <span class="order-num  blue">{{excell.symbol}}
                 </span><span>{{excell.name}}
                 </span><span>{{excell.unitNet==null?'--':excell.unitNet}}
                 </span><span>{{excell.yearYieldEstab==null?'--':excell.yearYieldEstab}}
                 </span><span>{{excell.sharpeRatioEstab==null?'--':excell.sharpeRatioEstab}}
                 </span><span>{{excell.estab==null?'--':excell.estab}}
                 </span>
            </div>
           
         </div>
         <div class="bfilter-table clearfix" v-show="showMoneyFund">
            <div class="table-head">
                 <span class="order-num">基金代码
                 </span><span>基金简称
                 </span><span>万份收益
                 </span><span>7日年化
                 </span><span>年化收益
                 </span><span>静态收益
                 </span>
            </div>
            <div class="clearfix table-body" v-for="moneyFund of selectMoneyFund">

                 <span class="order-num blue">{{moneyFund.symbol}}
                 </span><span>{{moneyFund.name}}
                 </span><span>{{moneyFund.tenthouUnitIncm==null?'--':moneyFund.tenthouUnitIncm}}
                 </span><span>{{moneyFund.yearYld==null?'--':moneyFund.yearYld}}
                 </span><span>{{moneyFund.yearYieldEstab==null?'--':moneyFund.yearYieldEstab}}
                 </span><span>{{moneyFund.staticYield==null?'--':moneyFund.staticYield}}
                 </span>
            </div>
           
         </div>
         <div class="bfilter-table clearfix" v-show="showChampion">
            <div class="table-head">
                 <span class="order-num">基金代码
                 </span><span>基金简称
                 </span><span>单位净值
                 </span><span>年化收益
                 </span><span>基金类型
                 </span><span>同类收益表现
                 </span>
            </div>
            <div class="clearfix table-body" v-for="champion of revChampion">

                 <span class="order-num blue">{{champion.symbol}}
                 </span><span>{{champion.name}}
                 </span><span>{{champion.unitNet==null?'--':champion.unitNet}}
                 </span><span>{{champion.yearYieldEstab==null?'--':champion.yearYieldEstab}}
                 </span><span>{{champion.fundTypeName==null?'--':champion.fundTypeName}}
                 </span><span>{{champion.sameTypeMark==null?'--':champion.champion.sameTypeMark}}
                 </span>
            </div>
           
         </div>
      </div>

</template>

<script>
 import { mapState } from 'vuex'
/* import echarts from 'echarts'*/
 export default {
   data () {
     return {
       showPlan: false,
       showMoneyFund: false,
       showChampion: false,
       showHotRecommend: false
     }
   },
   computed: mapState({
     excellPlan: state => state.fundIntell.excellentSelectPlan,
     selectMoneyFund: state => state.fundIntell.excellentSelectMoneyFund,
     revChampion: state => state.fundIntell.revenueChampion,
     hotRecomm: state => state.fundIntell.hotTopicRecommend
   }),
   components: {
 
   },
   methods: {
     init () {
       // this.$store.dispatch('fundIntell/queryExcellentSelectPlan')
     },
     hotRecommend () {
       this.showHotRecommend = true
       this.showPlan = false
       this.showMoneyFund = false
       this.showChampion = false
       this.$store.dispatch('fundIntell/queryhotTopicRecommend')
     },
     excellentPlan () {
       this.showPlan = true
       this.showMoneyFund = false
       this.showChampion = false
       this.showHotRecommend = false
       this.$store.dispatch('fundIntell/queryExcellentSelectPlan')
     }, /**/
     moneyFund () {
       this.showMoneyFund = true
       this.showHotRecommend = false
       this.showPlan = false
       this.showChampion = false
       this.$store.dispatch('fundIntell/querySelectMoneyFund')
     },
     revenueChampion () {
       this.showHotRecommend = false
       this.showPlan = false
       this.showMoneyFund = false
       this.showChampion = true
       this.$store.dispatch('fundIntell/queryRevenueChampion')
     },
     changePer (num) {
       return (Number(num) * 100).toFixed(2) + '%'
     },
     changeDate (time) {
       return (time + '').substring(0, 4) + '.' + (time + '').substring(4, 6) + '.' + (time + '').substring(6, (time + '').length)
     }

   },
   mounted () {
     this.hotRecommend()
   }
 
 }
</script>
