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
    .fund-recom-wrap{
        background: #f2f2f2;
        color: #191919;
       
        font-size: 12px;
        /* margin: 12px 7px; */
        width: 100%;

    }
    .fund-recom-main{
      /*  padding: 0 10px 0; */
       /* width: 100%; */
       padding: 12px 7px;
    }
   
   .recom-fund-left{
      width: 50%;
      border: 1px solid #e5e5e5;
    }
    .recom-fund-right{
      margin-left: 8px;
      background: #fff;
    }
    .recom-fund-head{
      /* width: 50%; */
      background: #2388da;
      padding: 10px 0;
      color: #fff;
      border-radius:3px 3px 0 0;
      text-align: center;
    }
</style>
<template> 
   <div class="fund-recom-wrap">
      <div class="fund-recom-main  display-box">
          <div class="recom-fund-left box-flex-1">
              <div class="recom-fund-head">基金推荐</div>
              <FundRecomLine/>
              <FundRecomTable/>
          </div>
           <div class="recom-fund-left recom-fund-right box-flex-1">
                  <div class="recom-fund-head">组合推荐</div>
                  <IntellRecomLine/>
                  <intellRecomTable/>
           </div> 
           
      </div>
   </div>
       
</template>

<script>
 import { mapState } from 'vuex'
 import FundRecomLine from './fund-recom-line'
 import FundRecomTable from './fund-recom-table'
 import IntellRecomLine from './intell-recom-line'
 import intellRecomTable from './intell-recom-table'
 export default {
   data () {
     return {
 
     }
   },
   computed: mapState({
 
   }),
   components: {
     FundRecomLine,
     FundRecomTable,
     IntellRecomLine,
     intellRecomTable
   },
   methods: {
 
   },
   mounted () {
 
   }
 
 }
</script>
