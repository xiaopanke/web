<style lang="scss" scoped>
    @import '../assets/css/base.css';
    *{
      text-align: justify;
    }
    body{
        font-size: 12px;
        background: #f2f2f2;
    }
    h3{
      font-weight: 400;
    }
    em,i{
      font-style: normal;
    }
    .fr{
      float: right;
    }
    .fl{
      float: left;
    }
    .blue{
      color: #2388da;
    }
    .red{
      color:#e6363a ;
    }
    .green {
      color:#48a854 ;
    }
    /*  */
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
    .box-flex-2 {
      -webkit-box-flex: 2;
      -moz-box-flex: 2;
      -ms-flex: 2;
      -o-box-flex: 2;
      box-flex: 2;
    }
    .box-flex-3 {
      -webkit-box-flex: 3;
      -moz-box-flex: 3;
      -ms-flex: 3;
      -o-box-flex: 3;
      box-flex: 3;
    }
    .box-flex-4 {
      -webkit-box-flex: 4;
      -moz-box-flex: 4;
      -ms-flex: 4;
      -o-box-flex: 4;
      box-flex: 4;
    }
    .describe-wrap{
      width: 100%;
      font-size: 12px;
      color: #696969;
    }
    .describe-box{
      font-size: 12px;
    }
    .bfilter-header{
      padding: 11px 0 9px 6px;
    }
    .header-title{
      font-size: 12px;
    }
    .describe-left{
       width: 52%;
       background: #fff;
       padding: 14px 50px 0 11px;
    }
    .desc-title{
      padding-bottom: 13px;
    }
    .desc-con{
      line-height: 18px;
      /* margin-top: 12px; */
      padding-bottom: 30px;
    }
    /* .desc-ul{
        padding: 0 0 26px 0;
    } */
    .desc-txt{
      position:relative;
      width: 16%;
      color: #a5a5a5;
      text-align: center;
    }
    .desc-num{
     /*  position: absolute;
      top: 20px;
      left: 0; */
      color: #696969;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 60px;
      text-align: center;
      width: 100%;
    }
    .describe-right{
      /* margin-left: 8px; */
      width: 48%;
      background: #fff;
      padding: 14px 10px 0 11px;
    }
    .evaluat-box{
      /* padding-top: 5px; */
      padding-top: 12px;
    }
    .income_list span{
      display: inline-block;
      width: 16%;
    }
    .li_two{
      margin-top: 100px;
    }
    .desc-txt2{
      width: 14%;
      /* padding-bottom: 48px; */
      height: 53px;
    }
    .desc-txt3{
      width: 28%;
    }
    .desc-txt4{
      width: 12%;
    }
    .time-bottom{
      background: #fff;
      margin-top: 10px;
      padding: 14px 10px 0 11px;
    }
    .express-buy{
      padding-bottom: 24px;
    }
</style>
<template>
    <div class="describe-box">
         <div class="bfilter-header clearfix">
              <div class="blue header-title fl"><span>{{timeStrategy.strategyName}}</span><i></i></div> 
              
         </div>
         <div class="describe-wrap clearfix display-box">
        
             <div class="describe-left box-flex-2">
                  <div class="desc-title">策略描述：</div>
                  <div class="desc-con">
                      {{timeStrategy.strategyDesc}}
                  </div>
             </div>
             <div class="describe-right box-flex-2">
                 <div class="desc-title"></div>
                 <div class="clearfix evaluat-box">
                     <div class="desc-txt desc-txt2 desc-txt4 fl">
                         <span>胜率
                         </span><span class="desc-num" v-z3-updowncolor="timeEval.winRatio">{{timeEval.winRatio==null?'--':changePer(timeEval.winRatio)}}</span>
                     </div>  
                     <div class="desc-txt desc-txt2 fl">
                         <span>最大盈利
                         </span><span class="desc-num" v-z3-updowncolor="timeEval.maxWin">{{timeEval.maxWin==null?'--':changePer(timeEval.maxWin)}}</span>
                     </div>   
                     <div class="desc-txt desc-txt2 fl">
                         <span>最大亏损
                         </span><span class="desc-num" v-z3-updowncolor="timeEval.maxLoss">{{timeEval.maxLoss==null?'--':changePer(timeEval.maxLoss)}}</span>
                     </div>     
                     <div class="desc-txt desc-txt2 desc-txt6 fl">
                         <span>盈亏比
                         </span><span class="desc-num" >{{timeEval.winLossRatio==null?'--':Number(timeEval.winLossRatio).toFixed(2)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 desc-txt3 fl">
                         <span>回测区间
                         </span><span class="desc-num">{{timeStrategy.backtestStartDate==null?'--':changeDate(timeStrategy.backtestStartDate)}}-{{timeStrategy.backtestEndDate==null?'--':changeDate(timeStrategy.backtestEndDate)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 fl">
                         <span>股票范围
                         </span><span class="desc-num">{{timeStrategy.stockScope}}</span>
                     </div>

                 </div>
                
             </div>
         
         </div>
         <div class="time-bottom clearfix">
              <div class="desc-title">策略条件：</div>
              <div class="express-buy">买入条件：
                  <span v-for="buyList of timeStrategy.buyStrategyIndexList">{{buyList.pageOrder}}（{{buyList.indexName}}{{buyList.operator}}{{buyList.comparisonValue}}）；
                  </span><span>条件表达式：
                  </span><span>{{timeStrategy.buyConExp}}
                  </span>
              </div> 
              <div class="express-buy">买出条件：
                   <span v-for="sellList of timeStrategy.sellStrategyIndexList">{{sellList.pageOrder}}（{{sellList.indexName}}{{sellList.operator}}{{sellList.comparisonValue}}）；
                    </span><span>条件表达式：
                    </span><span>{{timeStrategy.sellConExp}}
                    </span>
              </div>
         </div>
     </div>
  
</template>

<script>
 import { mapState } from 'vuex'
 
 export default {
   data () {
     return {
       strategyId: this.$route.params.strategyId
     }
   },
 
   computed: mapState({
     timeStrategy: state => state.backtestDetail.timeStrategy,
     timeEval: state => state.backtestDetail.timeStrategy.evaluationIndexs
   }),
   components: {},
   methods: {
     changePer (num) {
       return (Number(num) * 100).toFixed(2) + '%'
     },
     changeDate (time) {
       return (time + '').substring(0, 4) + '.' + (time + '').substring(4, 6) + '.' + (time + '').substring(6, (time + '').length)
     }

   },
   mounted () {
     this.$store.dispatch('backtestDetail/queryTimeStrategy', { strategyId: this.strategyId })
   }
 
 }
</script>
