<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .buyInfo{
        border:1px solid #DBDBDB;
        width:376px;
        font-size: 12px;
        color:#616161;
    }
    .buyInfo .title{
        line-height: 30px;
        color:#626262;
        padding-left: 15px;
        background: #EFEFEF;
        margin:0;
        font-weight:bold;
    }
    .buyInfo .main{
        padding:0 13px;
    }
    .buyInfo .main>div{
        margin-bottom: 30px;
    }
    .buyInfo .main .title{
        padding-left: 5px;
        background:#fff;
        border-bottom: 1px solid #DBDBDB;
    }
    .buyInfo .main .sub_title{
        border-bottom: 1px solid #DBDBDB;
    }
    .buyInfo .main .sub_title span{
        display: inline-block;
        width:50%;
        line-height: 30px;
        text-indent: 5px;
    }
    .buyInfo .main ul{
        padding-left: 5px;
        padding-top: 12px;
    }
    .buyInfo .main ul li{
        line-height: 24px;
    }
    .buyInfo .main ul li:hover{
        background:#F2F2F2;
    }
    .buyInfo .main ul li span{
        display: inline-block;
        width:50%;
    }
</style>
<template>
    <div>
        <div class="buyInfo">
            <p class="title">购买信息</p>
            <div class="main">
                <div>
                    <p class="title">购买与赎回金额限制</p>
                    <ul>
                        <li><span>首次购买</span><span>{{fundBuyData.fundOrganization.firstBuyMin === null ? '--' : Number(fundBuyData.fundOrganization.firstBuyMin).toFixed(2)+'元'}}</span></li>
                        <li><span>追加购买</span><span>{{fundBuyData.fundOrganization.buyMin === null ? '--':Number(fundBuyData.fundOrganization.buyMin).toFixed(2)+'元'}}</span></li>
                        <li><span>日累计申购限额</span><span>{{fundBuyData.fundOrganization.dayBuyMax === null ? '--':Number(fundBuyData.fundOrganization.dayBuyMax).toFixed(2)+'元'}}</span></li>
                        <li><span>定投起点</span><span>{{fundBuyData.fundOrganization.planMin === null ?'--':Number(fundBuyData.fundOrganization.planMin).toFixed(2)+'元'}}</span></li>
                        <li><span>最小赎回份额</span><span>{{fundBuyData.fundOrganization.sellMin === null ? '--':Number(fundBuyData.fundOrganization.sellMin).toFixed(2)+'份'}}</span></li>
                        <li><span>部分赎回最低保留份额</span><span>{{fundBuyData.fundOrganization.holdMin === null ? '--':Number(fundBuyData.fundOrganization.holdMin).toFixed(2)+'份'}}</span></li>
                    </ul>
                </div>  <!--购买与赎回金额限制-->
                <div>
                    <p class="title">交易日确认</p>
                    <ul>
                        <li><span>申购确认日</span><span>{{fundBuyData.fundOrganization.buyDay}}</span></li>
                        <li><span>赎回确认日</span><span>{{fundBuyData.fundOrganization.sellDay}}</span></li>
                    </ul>
                </div>  <!--交易日确认-->
                <div>
                    <p class="title">申购费</p>
                    <p class="sub_title"><span>前端收费</span><span>费率</span></p>
                    <ul v-for="item in fundBuyData.fundBuyInfo.frontEndPurchFee">
                        <li><span>{{item.range}}</span><span>{{item.feeRate}}</span></li>
                    </ul>
                    <p class="sub_title" style="margin-top: 40px"><span>后端收费</span><span>费率</span></p>
                    <ul v-for="item in fundBuyData.fundBuyInfo.backEndPurchFee">
                        <li><span>{{item.range}}</span><span>{{item.feeRate}}</span></li>
                    </ul>
                </div>  <!--申购费-->
                <div>
                    <p class="title">赎回费</p>
                    <p class="sub_title"><span>分层标准</span><span>费率</span></p>
                    <ul v-for="item in fundBuyData.fundBuyInfo.redeemFee">
                        <li><span>{{item.range === null ? '--':item.range}}</span><span>{{item.feeRate}}</span></li>
                    </ul>
                </div>  <!--赎回费-->
                <div>
                    <p class="title">认购费率</p>
                    <ul v-for="item in fundBuyData.fundBuyInfo.subscripFee">
                        <li><span>{{item.range}}</span><span>{{item.feeRate}}</span></li>
                    </ul>
                </div>  <!--认购费率-->
                <div>
                    <p class="title">运营费用</p>
                    <ul>
                        <li><span>管理费</span><span>{{fundBuyData.fundBuyInfo.manageFee === null ? '--':Number(fundBuyData.fundBuyInfo.manageFee).toFixed(2)+'%'}}</span></li>
                        <li><span>托管费</span><span>{{fundBuyData.fundBuyInfo.trusteeFee === null ? '--':Number(fundBuyData.fundBuyInfo.trusteeFee).toFixed(2)+'%'}}</span></li>
                        <li><span>销售服务费 </span><span>{{fundBuyData.fundBuyInfo.salesServiceCharge === null ? '--':Number(fundBuyData.fundBuyInfo.salesServiceCharge).toFixed(2)+'%'}}</span></li>
                    </ul>
                </div>  <!--运营费用-->
            </div>
        </div>
    </div>
</template>
<script>
    export default{
      data () {
        return {

        }
      },
      components: {

      },
      computed: {
        fundBuyData: function () {
          return this.$store.state.fundRecord.fundBuyData
        }
      },
      methods: {

      },
      mounted () {
        this.$store.dispatch('fundRecord/getFundBuyData', { innerCode: '000001.CW' }).then(() => {
    
        })
      }
    }
</script>
