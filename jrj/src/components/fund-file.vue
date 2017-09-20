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
        padding:0 15px;
        background: #EFEFEF;
        margin:0;
        font-weight:bold;
    }
    .fundFeature .main ul{
        padding:20px;
    }
    .fundFeature .main ul li{
        line-height: 24px;
    }
    .fundFeature .main ul li span,.exchrHld .main ul li span{
        display: inline-block;
        width:50%;
        text-align: center;
    }
    .exchrHld .main ul{
        padding:0 20px;
    }
    .exchrHld .main ul li{
        line-height: 30px;
    }
    .fundChart{
        width:804px;
        height:421px;
        border:1px solid #DEDEDE;
    }
    .investStyle .time{
        height:24px;
        line-height:24px;
    }
    .investStyle .time span{
        display: inline-block;
    }
    .investRect{
        width:150px;
        height:149px;
        border:1px solid #CECECE;
    }
    .investRect span{
        display: inline-block;
        height:49px;
        width:49px;
        float: left;
    }
    .firstLine span{
        border-right:1px solid #CECECE;
        border-bottom:1px solid #CECECE;
    }
    .secondLine span{
        border-right:1px solid #CECECE;
    }
    .thirdLine span{
        border-right:1px solid #CECECE;
        border-top:1px solid #CECECE;
    }
    .firstLine span:last-child,.secondLine span:last-child,.thirdLine span:last-child{
        border-right:none;
        width:50px;
    }
    .rectY span{
        display: block;
        height:49px;
        width:49px;
        line-height: 49px;
        text-align: center;
    }
    .rectX{
        position: absolute;
        bottom:0;
        left:0;
    }
    .rectX span{
        display: inline-block;
        height:26px;
        width:49px;
        line-height: 26px;
        text-align: center;
    }
    .rectLegend ul li:first-child{
        color:#606060;
        font-weight: bold;
    }
    .rectLegend ul li{
        margin-bottom: 10px;
    }
    .rectLegend ul li span{
        display: inline-block;
        width:13px;
        height:14px;
        margin-right: 15px;
    }
    .rectStability{
        width:315px;
        margin:10px auto;
        margin-bottom: 0;
    }
    .stability{
        display: inline-block;
    }
    .stability span{
        display: inline-block;
        width:85px;
        height:20px;
        line-height: 20px;
        text-align: center;
        color:#fff;
    }
    .rectTime{
        width:300px;
        margin:12px auto;
    }
    .rectTime span{
        display: inline-block;
        height:22px;
        line-height: 22px;
        text-align: center;
        float: left;
    }
    .rectTime span:first-child,.rectTime span:last-child{
        width:37px;
        height:24px;
        color:#fff;
        background: #CCCCCC;
    }
    .rectTime span.active,.rectTime span.active{
        width:37px;
        height:24px;
        color:#fff;
        background: #3C92DF;
        cursor: pointer;
    }
    .rectTime .date{
        width:224px;
        border:1px solid #C1C1C1;
    }
    .rect{
        width:295px;
        margin: 0 auto;
        position: relative;
        padding-bottom: 26px;
    }
    .triangle{
       width:315px;
       margin:0 auto;
    }
    .triangle span{
        width:0;
        height:0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 8px solid #679FF9;
        margin: 0 auto;
        display: block;
    }
    .triangle>div{
        display: inline-block;
        width:86px;
        height:15px;
        float: right;
    }
</style>
<template>
    <div>
        <div class="clearfix">
            <div class="fl">
            <Fundbuyinfo></Fundbuyinfo>
        </div>
            <div class="fl buyInfo">
            <p class="title">散点图<span class="fr">近一年</span></p>
            <div>
                <Fundbubble></Fundbubble>
            </div>
        </div>
            <div class="fl buyInfo fundFeature">
            <p class="title">基金特色<span class="fr">{{date}}</span></p>
            <div class="main">
            <ul>
                <li v-for="(item,index) in fundFeatureData.reList">{{index+1}}、{{item}}</li>
            </ul>
            </div>
        </div> <!--基金特色-->
            <div class="fl buyInfo exchrHld">
            <p class="title">换手率</p>
            <div class="main">
                <ul>
                    <li style="border-bottom:1px solid #F0F0F0"><span>报告期</span><span>基金换手率</span></li>
                    <li v-for="item in exchrHldData"><span>{{item.endDate}}</span><span>{{item.exchr === null ? '--' : item.exchr}}</span></li>
                </ul>
            </div>
        </div> <!--换手率-->
            <div class="fl buyInfo investStyle">
                <p class="title">投资风格</p>
                <div class="main">
                    <div class="rectTime clearfix">
                        <span :class="" @click="leftTime"><</span>
                        <span class="date" ref="investTime">{{date}}</span>
                        <span :class="" @click="rightTime">></span>
                    </div>
                    <div class="clearfix rect">
                        <div class="investRect fl">
                            <div class="firstLine clearfix">
                                <span :style="{background:investColor(investStyleData.Beta0)}"></span>
                                <span :style="{background:investColor(investStyleData.Beta3)}"></span>
                                <span :style="{background:investColor(investStyleData.Beta6)}"></span>
                            </div>
                            <div class="secondLine clearfix">
                                <span :style="{background:investColor(investStyleData.Beta1)}"></span>
                                <span :style="{background:investColor(investStyleData.Beta4)}"></span>
                                <span :style="{background:investColor(investStyleData.Beta7)}"></span>
                            </div>
                            <div class="thirdLine clearfix">
                                <span :style="{background:investColor(investStyleData.Beta2)}"></span>
                                <span :style="{background:investColor(investStyleData.Beta5)}"></span>
                                <span :style="{background:investColor(investStyleData.Beta8)}"></span>
                            </div>
                        </div>
                        <div class="rectY fl">
                            <span>大盘</span>
                            <span>中盘</span>
                            <span>小盘</span>
                        </div>
                        <div class="fr rectLegend">
                            <ul>
                                <li>投资比例</li>
                                <li><span style="background:#F2953D"></span>≥50%</li>
                                <li><span style="background:#F8C390"></span>25-50%</li>
                                <li><span style="background:#FEE0C4"></span>10-25%</li>
                                <li><span style="background:#FFF7EB"></span>0-10%</li>
                            </ul>
                        </div>
                        <div class="rectX">
                            <span>价值</span>
                            <span>平衡</span>
                            <span>成长</span>
                        </div>
                    </div>
                    <div class="rectStability">
                        <span style="position: relative; top: -5px;">稳定度</span>
                        <img src="../assets/images/help.png" style="margin-top: 2px;">
                        <div class="stability clearfix">
                            <span class="fl" style="background: #4481E5">高</span>
                            <span class="fl" style="background: #64A0F9">中</span>
                            <span class="fl" style="background: #9CC2FF">低</span>
                        </div>
                    </div>
                    <div class="triangle clearfix">
                        <div v-show="investStreng('low')"><span></span></div>
                        <div v-show="investStreng('middle')"><span></span></div>
                        <div v-show="investStreng('high')"><span></span></div>
                    </div>
                </div>
            </div> <!--投资风格-->
        </div>
        <div class="fundChart">
            <ul>
                <li>累计净值</li>
                <li>单位净值</li>
                <li>收益率</li>
            </ul>
            <Fundchart></Fundchart>
        </div>
    </div>
</template>
<script>
    import Fundbuyinfo from 'components/fund-buy-info'
    import Fundbubble from 'components/fund-bubble'
    import Fundchart from 'components/fund-chart'

    export default{
      data () {
        return {
          color: '#fff'
        }
      },
      components: {
        Fundbuyinfo,
        Fundbubble,
        Fundchart
      },
      computed: {
        fundFeatureData: function () {
          return this.$store.state.fundRecord.fundFeatureData
        },
        exchrHldData: function () {
          return this.$store.state.fundRecord.exchrHldData
        },
        date: function () {
          const time = new Date()
          const year = time.getFullYear()
          const month = (time.getMonth() + 1).length > 1 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
          return year + '-' + month
        },
        investStyleData: function () {
          return this.$store.state.fundRecord.investStyleData
        }
      },
      methods: {
        investColor (v) {
          const colorVal = v * 100
          if (colorVal >= 50) {
            return '#F2953D'
          } else if (colorVal >= 25 && colorVal < 50) {
            return '#F8C390'
          } else if (colorVal >= 10 && colorVal < 25) {
            return '#FEE0C4'
          } else if (colorVal >= 0 && colorVal < 10) {
            return '#FFF7EB'
          }
        },
        investStreng (type) {
          const data = this.investStyleData
          if (type === 'high') {
            if (data.sds_high <= data.sds < data.sds_hm) {
              return true
            }
          } else if (type === 'middle') {
            if (data.sds_hm <= data.sds < data.sds_ml) {
              return true
            }
          } else if (type === 'low') {
            if (data.sds_low <= data.sds < data.ml) {
              return true
            }
          }
        },
        leftTime () {
          const time = this.$refs.investTime.innerHTML.split('-')
          const val = Number(time[1]) - 1
          if (val === 0) {
            this.$refs.investTime.innerHTML = Number(time[0]) - 1 + '-' + ((12 + val).length > 1 ? '0' + (12 + val) : (12 + val))
          } else {
            this.$refs.investTime.innerHTML = time[0] + '-' + (String(val).length > 1 ? val : '0' + val)
          }
//          const val = Number(time[1]) - 3
//          if (val > 0) {
//            this.$refs.investTime.innerHTML = time[0] + '-' + (String(val).length > 1 ? val : '0' + val)
//          } else {
//            this.$refs.investTime.innerHTML = Number(time[0]) - 1 + '-' + ((12 + val).length > 1 ? '0' + (12 + val) : (12 + val))
//          }
        },
        rightTime () {
          const time = this.$refs.investTime.innerHTML.split('-')
          const val = Number(time[1]) + 1
          if (val > 12) {
            this.$refs.investTime.innerHTML = Number(time[0]) + 1 + '-' + ((val - 12).length > 1 ? (val - 12) : '0' + (val - 12))
          } else {
            this.$refs.investTime.innerHTML = Number(time[0]) + '-' + (String(val).length > 1 ? val : '0' + val)
          }
//          const val = Number(time[1]) + 3
//          if (val > 12) {
//            this.$refs.investTime.innerHTML = Number(time[0]) + 1 + '-' + ((val - 12).length > 1 ? (val - 12) : '0' + (val - 12))
//          } else {
//            this.$refs.investTime.innerHTML = Number(time[0]) + '-' + (String(val).length > 1 ? val : '0' + val)
//          }
        },
        isActive (type) {
        }

      },
      mounted () {
        this.$store.dispatch('fundRecord/getFeatureData', { innerCode: '000001.CW' }).then(() => {

        })
        this.$store.dispatch('fundRecord/getExchrHldData', { innerCode: '000001.CW' }).then(() => {

        })
        this.$store.dispatch('fundRecord/getInvestStyleData', { }).then(() => {

        })
      }
    }
</script>
