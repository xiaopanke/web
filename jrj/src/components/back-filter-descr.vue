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
      color:#e6363a;
    }
    .green {
      color:#48a854;
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
    .bfilter-header{
      padding: 11px 0 9px 6px;
    }
    .header-title{
      font-size: 12px;
    }
    .describe-left{
       width: 55%;
       background: #fff;
       padding: 14px 10px 0 10px;
    }
    .desc-title{
      padding-bottom: 13px;
    }
    .desc-con{
      line-height: 18px;
      /* margin-top: 12px; */
      padding-bottom: 30px;
    }
    .desc-ul{
        padding: 0 0 26px 0;
        width: 100%;
    }
    
    .desc-ul tr:nth-child(2) td{
      padding-top: 12px;
      color: #696969;
    }
    .desc-ul td{
      /* width: 20%; */
      color: #a5a5a5;
      text-align: center;

    }
  
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
      margin-left: 8px;
      width: 42%;
      background: #fff;
      padding: 14px 10px 0 10px;
    }
    .evaluat-box{
      padding-top: 5px;
    }
    .income_list span{
      display: inline-block;
      width: 16%;
    }
    .li_two{
      margin-top: 100px;
    }
    .desc-txt2{
      width: 16%;
      /* padding-bottom: 48px; */
      height: 53px;
    }
    .desc-txt3{
      width: 28%;
    }

</style>
<template>
    <div class="describe-box">
         <div class="bfilter-header clearfix">
              <div class="blue header-title fl"><span>{{ basicFilter.strategyName}}</span><i></i></div>  
         </div>
         <div class="describe-wrap clearfix display-box">
        
             <div class="describe-left box-flex-2">
                  <div class="desc-title">策略描述：</div>
                  <div class="desc-con">
                      {{ basicFilter.strategyDesc}}
                  </div>
                  <div class="desc-title">选股条件：</div>
                    
                 <!--  <ul class="clearfix desc-ul">
                        <li class="fl desc-txt"><span>失灵率</span><span class="desc-num">10%</span></li>
                        <li class="fl desc-txt"><span>失灵率2</span><span class="desc-num">11%</span></li>
                        <li class="fl desc-txt"><span>失灵率3</span><span class="desc-num">11%</span></li>
                        <li class="fl desc-txt"><span>失灵率4</span><span class="desc-num">11%</span></li>
                        <li class="fl desc-txt"><span>失灵率5</span><span class="desc-num">11%</span></li>
                        <li class="fl desc-txt"><span>失灵率6</span><span class="desc-num">11%</span></li>
                  </ul> -->
                  <table class="desc-ul">
                      <tr v-for="trItem in filterSummary" class="trtxt">
                          <td v-for="tdItem in trItem" class="tdtxt">{{tdItem}}</td>
                      </tr>
                  </table>
                  
             </div>
             <div class="describe-right box-flex-2">
                 <div class="desc-title">策略表现：</div>
                 <div class="clearfix evaluat-box">
                     <div class="desc-txt desc-txt2 desc-txt4 fl">
                         <span>胜率</span>
                         <span class="desc-num" v-z3-updowncolor="eval.winRatio">{{eval.winRatio==null?'--':changePer(eval.winRatio)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 desc-txt5 fl">
                         <span>平均超额收益</span>
                         <span class="desc-num" v-z3-updowncolor="eval.avgReturnExcess">{{eval.avgReturnExcess==null?'--':changePer(eval.avgReturnExcess)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 fl">
                         <span>平均收益</span>
                         <span class="desc-num" v-z3-updowncolor="eval.avgReturn">{{eval.avgReturn==null?'--':changePer(eval.avgReturn)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 desc-txt6 fl">
                         <span>盈亏比</span>
                         <span class="desc-num" >{{eval.winLossRatio==null?'--':Number(eval.winLossRatio).toFixed(2)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 fl">
                         <span>持有天数</span>
                         <span class="desc-num">{{basicFilter.holdDay==null?'--':basicFilter.holdDay}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 fl">
                         <span>最大盈利</span>
                         <span class="desc-num" v-z3-updowncolor="eval.maxWin">{{eval.maxWin==null?'--':changePer(eval.maxWin)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 fl">
                         <span>最大亏损</span>
                         <span class="desc-num" v-z3-updowncolor="eval.maxLoss">{{eval.maxLoss==null?'--':changePer(eval.maxLoss)}}</span>
                     </div>
                     <div class="desc-txt desc-txt2 desc-txt3 fl">
                         <span>回测区间</span>
                         <span class="desc-num">{{basicFilter.backtestStartDate==null?'--':changeDate(basicFilter.backtestStartDate)}}-{{basicFilter.backtestEndDate==null?'--':changeDate(basicFilter.backtestEndDate)}}</span>
                     </div>
                 </div>
                
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
 
   computed: {
     ...mapState({
       basicFilter: state => state.backtestDetail.basicFilter,
       eval: state => state.backtestDetail.basicFilter.evaluationIndexs,
       filterSummary: state => {
         const choseStockTable = state.backtestDetail.basicFilter.filterSummary
         const arr1 = []
         const arr2 = []
         if (choseStockTable.jszbList != null || choseStockTable.gkzbList != null || choseStockTable.jbmzbList != null || choseStockTable.xgfwList != null) {
           if (choseStockTable.jszbList.length > 0) {
             for (let i = 0; i < choseStockTable.jszbList.length; i++) {
               arr1.push(choseStockTable.jszbList[i].indexName)
               arr2.push(choseStockTable.jszbList[i].indexValue)
             }
           }
           if (choseStockTable.gkzbList.length > 0) {
             for (let i = 0; i < choseStockTable.gkzbList.length; i++) {
               arr1.push(choseStockTable.gkzbList[i].indexName)
               arr2.push(choseStockTable.gkzbList[i].indexValue)
             }
           }
           if (choseStockTable.jbmzbList.length > 0) {
             for (let i = 0; i < choseStockTable.jbmzbList.length; i++) {
               arr1.push(choseStockTable.jbmzbList[i].indexName)
               arr2.push(choseStockTable.jbmzbList[i].indexValue)
             }
           }
           if (choseStockTable.xgfwList.length > 0) {
             for (let i = 0; i < choseStockTable.xgfwList.length; i++) {
               arr1.push(choseStockTable.xgfwList[i].indexName)
               arr2.push(choseStockTable.xgfwList[i].indexValue)
             }
           }
         }
         return [arr1, arr2]
       }
     })
   },
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
     this.$store.dispatch('backtestDetail/queryBasicFilter', { strategyId: this.strategyId })
     // console.log(state.backtestDetail.basicFilter.filterSummary)
   }
 
 }
</script>
