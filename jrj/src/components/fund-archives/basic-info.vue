<style lang="scss" scoped="">
    .c_up{color:#ff0000;}
    .c_down{color:#48a854;}
    .c_txt{color:#666;}
    .basic-info{}
    .basic-info-top{height:42px;border-bottom: 1px solid #ddd;padding-top: 15px;}
    .basic-info-top>div{display: inline-block;width: 50%;}
    .basic-info-top img{vertical-align: middle;margin-left: 15px;}
    .basic-info-bottom{padding-top: 10px;height:104px;padding-bottom: 30px;position: relative;}
    .basic-info-bottom>div{display: inline-block;height:100%;}
    .basic-info-bottom>div>div{height:100%;display: inline-block;}
    .unit-jingzhi{width: 154px;border-right:1px solid #ddd;}
    .sum-jingzhi{width: 107px;padding-left: 23px;}
    .bt-left>div{vertical-align: middle;}
    .bt-left>div span:nth-child(1){display:inline-block;padding-bottom: 10px;padding-top: 5px;}
    .bt-left{width: 33%;}
    .bt-right{display: inline-block;width: 67%;position: absolute;top: 10px;right:0;}
    .bt-right>li{display: inline-block;float: left;margin-right:2%}
    .bt-right>li:nth-child(5){margin-right: 0;}
    .bt-right>li:nth-child(1){width: 17%}
    .bt-right>li:nth-child(2){width: 17%}
    .bt-right>li:nth-child(3){width: 21%}
    .bt-right>li:nth-child(4){width: 20%}
    .bt-right>li:nth-child(5){width: 17%}
    .bt-right-item{display: inline-block;width: 100%;}
    .bt-right-item>li{padding-bottom: 10px;display: inline-block;width: 100%;}
    .bt-right-item>li:after{ content: ""; display: block; clear: both;}
    .bt-right-item>li>span{display: inline-block;}
    .bt-right-item1>li>span:nth-child(1),.bt-right-item2>li>span:nth-child(1),.bt-right-item5>li>span:nth-child(1){width: 60px;}
    .bt-right-item3>li>span:nth-child(1){width: 96px;}
    .bt-right-item4>li>span:nth-child(1){width: 78px;}
    .bt-right-item>li>span:nth-child(2){width: 70px;text-align: right;}
</style>
<template>
    <div class="basic-info">
        <div class="basic-info-top clearfix">
            <div class="fl">
                <span>{{fundName}}</span>
                <span>{{fundType}}</span>
                <span>{{riskLevel}}</span>
                <div class="lable-info">

                </div>
            </div>
            <div class="fr tr">
                <img src="../../assets/images/fund/weChat.png">
                <img src="../../assets/images/fund/shortmessage.png">
            </div>
        </div>
        <div class="basic-info-bottom clearfix">
            <div class="bt-left fl">
                <div class="unit-jingzhi">
                    <span>单位净值({{this.getTime().substring(0,11)}})</span>
                    <span v-z3-updowncolor="unitNet">{{unitNet}}</span>
                    <span v-z3-updowncolor="chgPct">{{chgPct>0?'+':''}}{{chgPct}}%</span>
                </div>
                <div class="sum-jingzhi">
                    <span>累计净值</span>
                    <span class="c_up">{{accumNet}}</span>
                </div>
            </div>
            <ul class="bt-right clearfix">
                <li>
                    <ul class="bt-right-item bt-right-item1">
                        <li><span>成立日期：</span><span>{{estabDate}}</span></li>
                        <li><span>最新规模：</span><span>{{fundScale}}</span></li>
                        <li><span>基金经理：</span><span>{{fundManager}}</span></li>
                    </ul>
                </li>
                <li>
                    <ul class="bt-right-item bt-right-item2">
                        <li><span>管理人：</span><span>{{fundOrgManage}}</span></li>
                        <li><span>夏普比率：</span><span>{{sharpeRatioEstab}}</span></li>
                        <li><span>波动率：</span><span>{{volatEstab}}</span></li>
                    </ul>
                </li>
                <li>
                    <ul class="bt-right-item bt-right-item3">
                        <li><span>最大回撤：</span><span v-z3-updowncolor="maxDrawdownEstab">{{maxDrawdownEstab}}%</span></li>
                        <li><span>年化收益：</span><span v-z3-updowncolor="yearYieldEstab">{{yearYieldEstab}}%</span></li>
                        <li><span>近一年同类排名：</span><span><span class="c_up">{{fundYieldYearRank}}</span>/<span>{{fundKindNum}}</span></span></li>
                    </ul>
                </li>
                <li>
                    <ul class="bt-right-item bt-right-item4">
                        <li><span>JRJ基金评价：</span><span>{{jrjFundRank}}</span></li>
                        <li><span>申购状态：</span><span>{{purchStatus}}</span></li>
                        <li><span>赎回状态：</span><span>{{redemStatus}}</span></li>
                    </ul>
                </li>
                <li>
                    <ul class="bt-right-item5">
                        <li><span>起投金额：</span><span>{{startAmount}}</span></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
      data () {
        return {
          innerCode: '000001.CW',
          fundName: '',
          fundType: '',
          riskLevelArr: ['低风险', '中低风险', '中风险', '中高风险', '高风险'],
          unitNet: 0, // 单位净值
          chgPct: 0, // 单位净值涨跌幅
          accumNet: 0, // 累计净值，
          estabDate: '', // 成立日期
          fundScale: '', // 基金规模
          fundManager: '', // 基金经理
          fundOrgManage: '', // 管理人
          sharpeRatioEstab: '', // 夏普比率
          volatEstab: '', // 波动率
          maxDrawdownEstab: '', // 最大回撤
          yearYieldEstab: '', // 年化收益
          fundYieldYearRank: 0, // 近一年同类排名
          jrjFundRank: '', // JRJ基金评价
          purchStatus: '', // 申购状态
          redemStatus: '', // 赎回状态
          startAmount: '', // 起投金额
          fundKindNum: 0// 同类基金总数
        }
      },
      computed: {
        basicInfoData: function () {
          const basicInfoData = this.$store.state.funcArchives.basicInfo
          return basicInfoData
        }
      },
      methods: {
        initBasic: function () {
          this.$store.dispatch('funcArchives/getBasicInfo', { innerCode: this.innerCode })
                .then(() => {
                  this.fundName = this.basicInfoData.name + '(' + this.basicInfoData.symbol + ')'
                  this.fundType = this.basicInfoData.fundTypeName
                  this.riskLevel = this.riskLevelArr[this.basicInfoData.riskLevel - 1]
                  this.unitNet = this.basicInfoData.unitNet.toFixed(4)
                  this.chgPct = this.basicInfoData.chgPct.toFixed(2)
                  this.accumNet = this.basicInfoData.accumNet.toFixed(4)
                  this.estabDate = this.getTime(this.basicInfoData.estabDate).substring(0, 11)
                  const fundScaleYi = this.basicInfoData.fundScale / 100000000
                  this.fundScale = fundScaleYi.toFixed(4) + '亿元'
                  this.fundManager = this.basicInfoData.fundManager
                  this.fundOrgManage = this.basicInfoData.fundOrgManage
                  this.sharpeRatioEstab = this.basicInfoData.sharpeRatioEstab.toFixed(2)
                  this.volatEstab = this.basicInfoData.volatEstab.toFixed(2)
                  this.maxDrawdownEstab = this.basicInfoData.maxDrawdownEstab.toFixed(2)
                  this.yearYieldEstab = this.basicInfoData.yearYieldEstab.toFixed(2)
                  this.fundYieldYearRank = this.basicInfoData.fundYieldYearRank
                  this.jrjFundRank = this.basicInfoData.jrjFundRank
                  this.fundKindNum = this.basicInfoData.fundKindNum
                  this.purchStatus = this.basicInfoData.purchStatus
                  this.redemStatus = this.basicInfoData.redemStatus
                  this.startAmount = parseFloat(this.basicInfoData.startAmount).toFixed(2) + '元'
                })
        },
        getTime: function () {
          const date = new Date()
          const seperator2 = ':'
          let month = date.getMonth() + 1
          let strDate = date.getDate()
          let strHour = date.getHours()
          let strMin = date.getMinutes()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          if (strHour >= 0 && strHour <= 9) {
            strHour = '0' + strHour
          }
          if (strMin >= 0 && strMin <= 9) {
            strMin = '0' + strMin
          }
          const currentDate = date.getFullYear() + '-' + month + '-' + strDate + ' ' +
                  strHour + seperator2 + strMin
          return currentDate
        }
      },
      mounted () {
        this.initBasic()
      }
    }
</script>
