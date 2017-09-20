<style lang="scss">
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
      color:#e6363a;
    }
    .green {
      color:#48a854;
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
    }
   
    .backtest-time2 .describe-wrap.display-box{
      display: initial;
    }
    .backtest-time2 .describe-wrap .describe-left{
      /* width: 100%;
      padding: 14px 0px 0 10px; */
      width: 100%;
      box-sizing: border-box;
      padding: 14px 10px 0 11px;
    }
    .backtest-time2 .describe-wrap .describe-right{
     /*  width: 100%; */
      width: 100%;
      margin-top: 10px;
      margin-left: 0;
      padding: 14px 0px 0 10px;
    }
    .backtest-time2 .describe-wrap .box-flex-2 {
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
    }
    .backtest-time2 .describe-wrap .desc-txt{
      text-align: left;
      color: #a5a5a5;
      width: 16%;
    }
    .describe-wrap .desc-txt .desc-num{
      position: absolute;
      top: 20px;
      left: 0;
      color: #696969;
      line-height: 15px;
      text-align: left;
      width: 100%;
    }
    .backtest-filter2 .describe-wrap .desc-txt2{
      width: 20%;
      height: 4rem;
      padding-bottom:0;
    }
    .backtest-time2 .describe-wrap .desc-txt3{
      /* width: 32%; */
      width: 23%;
    }
    .backtest-time2 .describe-wrap .desc-txt6{
      width: 12%;
    }
    .backtest-time2 .describe-wrap .desc-txt4{
      width: 14%;
    }
    .backtest-filter2 .describe-wrap .desc-txt5{
      width: 22%;
    }
    .bfilter-main .describe-box{
      width: 97.5%;
    }
    .backtest-time2 .time-bottom .express-buy{
      color: #696969;
    }
</style>
<template> 
   <div class="backtest-time backtest-time2">
      <div class="btime-main">
           <BackTimeStra/> 
      </div>
   </div>
       
</template>
<script>
 import { mapState } from 'vuex'
 import BackTimeStra from './back-time-stra'
 export default {
   data () {
     return {
 
     }
   },
   computed: mapState({
 
   }),
   components: {
     BackTimeStra
   },
   methods: {
     changePer (num) {
       return (Number(num) * 100).toFixed(2) + '%'
     },
     changeDate (time) {
       return (time + '').substring(0, 4) + '.' + (time + '').substring(4, 6) + '.' + (time + '').substring(6, (time + '').length)
     }

   },
   mounted () {
 
   }
 
 }
</script>
