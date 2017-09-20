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
                     <ul class="bfilter-ul bfilter-ul2 clearfix">
                        <li class="fl blue" :class="risksType==='high'?'active':''" @click="riskTab('high')">高风险组合</li>
                        <li class="fl blue" :class="risksType==='middle'?'active':''" @click="riskTab('middle')">中风险组合</li>
                        <li class="fl blue" :class="risksType==='low'?'active':''" @click="riskTab('low')">低风险组合</li>
                     </ul>
                     <div class="bfilter-table clearfix">
                        <div class="table-head">
                             <span class="order-num">组合名称
                             </span><span>最大回撤
                             </span><span>波动率
                             </span><span>夏普比率
                             </span><span>年化收益
                             </span><span>累计收益
                             </span>
                        </div>
                        <div class="clearfix table-body" v-for="risk of byRisk">
                             <span class="order-num">{{risk.portfolio_name}}
                             </span><span>{{risk.max_drawdown==null?'--':risk.max_drawdown}}
                             </span><span>{{risk.volatility==null?'--':risk.volatility}}
                             </span><span>{{risk.sharp_rate==null?'--':risk.sharp_rate}}
                             </span><span>{{risk.year_income_rate==null?'--':risk.year_income_rate}}
                             </span><span>{{risk.total_income_rate==null?'--':risk.total_income_rate}}
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
       risks: { high: 1, middle: 2, low: 3 },
       risksType: ''
     }
   },
   computed: mapState({
     byRisk: state => state.fundIntell.byRisk
   }),
   components: {
 
   },
   methods: {
     init () {
 
     },
     riskTab (type) {
       this.risksType = type
       this.$store.dispatch('fundIntell/queryRecommendByRisk', { risk: this.risks[this.risksType] })
     },
     changePer (num) {
       return (Number(num) * 100).toFixed(2) + '%'
     },
     changeDate (time) {
       return (time + '').substring(0, 4) + '.' + (time + '').substring(4, 6) + '.' + (time + '').substring(6, (time + '').length)
     }

   },
   mounted () {
     this.riskTab('high')
   }
 
 }
</script>
