<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .app{
        width:100%;
    }
    .goldRecommend{
        font-size: 0.12rem;
        background:#F2F2F2;
    }
    .strategyHeader{
        height:0.32rem;
        text-align: left;
    }
    .strategyDesc{
        text-align: left;
        padding: 0.15rem 0.05rem;
        background: #fff;
        margin-bottom: 0.05rem;
    }
    .strategyHeader span{
        display: inline-block;
        height:0.32rem;
        line-height: 0.32rem;
        color:#2388da;
    }
    .radarChart{
        width:100%;
        height:5rem;
        margin-bottom: 0.05rem;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .choseStock{
            background:#fff;
        }
        .sellCondition{
            background:#fff;
            text-align: left;
            font-size:0.18rem;
        }
        .tableList{
            padding-top:0.2rem;
            padding-bottom:0.2rem;
        }
        .controlStrategy{
            background:#fff;
            font-size:0.18rem;
            text-align: left;
        }
        .recommendTitle{
            text-align: left;
            font-size:0.2rem;
            background:#fff;
            line-height: 0.4rem;
            padding-left:0.2rem;
            background:#F2F2F2;
        }
        .syqxt,.dryk,.mrcc,.syytj,.sylfb{
            min-height:4.2rem;
            width:100%;
        }
        .mrjy,.dqxg{  padding:0.1rem 0;  background: #fff; width:100%;}
        .mrjy table,.dqxg table{ width:100%; font-size:0.16rem; }
        .mrjy table thead tr th,.dqxg table thead tr th{ height:0.6rem; line-height: 0.6rem; }
        .mrjy table  tr td,.dqxg table  tr td{ text-align: center; height:0.35rem; line-height:0.35rem;}
        .strategyDescTable,.tradeParams table{
            width:100%;
            background: #fff;
            font-size:0.18rem;
        }
        .strategyDescTable tr:first-child td,.tradeParams table tr:first-child th{
            color:#a5a5a5;
        }
        .strategyDescTable tr:last-child td{
            font-weight: bold;
        }
        .strategyDescTable td,.tradeParams table tr td{
            color:#696969;
            text-align: center;
            height:0.4rem;
            line-height: 0.4rem;
        }
        .tradeParams table{
            margin-top:0.2rem;
        }
        .tradeParams table tr td{
            width:25%;
            text-align: left;
            padding-left:0.2rem;
        }
        .tradeParams table tr:first-child th{
            text-align: left;
            font-weight: normal;
            padding-left:0.2rem;
        }
        .tradeParams{
            background: #fff;
        }
    }
</style>
<template>
    <div class="goldRecommend">

        <div v-show="false" class="strategyHeader">
           <span>{{goldResult.strategyName}}</span>
        </div>
        <div class="strategyDesc">
        <Titlecontent :data="articleData"></Titlecontent>
        </div>
        <div class="radarChart">
            <Radarchart :strategyId="strategyId"></Radarchart>
        </div>
        <div style="background:#fff;">
        <table class="strategyDescTable">
            <tr>
                <td v-for="item in trData">{{item}}</td>
            </tr>
            <tr>
                <td v-z3-updowncolor="this.goldResult === null?'':this.goldResult.evaluationIndexs.annualReturn">{{this.goldResult === null?'':(Number(this.goldResult.evaluationIndexs.annualReturn) * 100).toFixed(2) + '%'}}</td>
                <td v-z3-updowncolor="this.goldResult === null?'':this.goldResult.evaluationIndexs.excessReturn">{{this.goldResult === null?'':(Number(this.goldResult.evaluationIndexs.excessReturn) * 100).toFixed(2) + '%'}}</td>
                <td>{{this.goldResult === null?'':(Number(this.goldResult.evaluationIndexs.algoVolatility) * 100).toFixed(2) + '%'}}</td>
                <td>{{this.goldResult === null?'':Number(this.goldResult.evaluationIndexs.sharpe).toFixed(2)}}</td>
                <td>{{this.goldResult === null?'':(Number(this.goldResult.evaluationIndexs.maxDrawdown) * 100).toFixed(2) + '%'}}</td>
                <td>{{this.goldResult === null?'':Number(this.goldResult.evaluationIndexs.alpha).toFixed(2)}}</td>
                <td>{{this.goldResult === null?'':Number(this.goldResult.evaluationIndexs.beta).toFixed(2)}}</td>
            </tr>
        </table>
        <table class="strategyDescTable" style="width:33%;">
            <tr>
                <td>胜率</td>
                <td>换手率</td>
            </tr>
            <tr>
                <td>{{this.goldResult === null?'':(Number(this.goldResult.evaluationIndexs.winRatio) * 100).toFixed(2) + '%'}}</td>
                <td>{{this.goldResult === null?'':(Number(this.goldResult.evaluationIndexs.turnover) * 100).toFixed(2) + '%'}}</td>
            </tr>
        </table>
        </div>
        <!--<Tablelist :data="tableData"></Tablelist>-->
        <div style="width:100%; margin-top:0.1rem;">
            <div style="width:100%" class="goldH5">
                <Navbar :data="navText1" :type="type" v-on:changeType="changeNavType"></Navbar>
                <div style="margin-bottom: 0.05rem;">
                    <div v-if="type === 'syqxt'" class="syqxt">
                        <Linechart :strategyId="strategyId"></Linechart>
                    </div>
                    <div v-if="type === 'dryk'" class="dryk">
                        <Barupdown :strategyId="strategyId"></Barupdown>
                    </div>
                    <div v-if="type === 'mrcc'" class="mrcc">
                        <Onelinechart :strategyId="strategyId"></Onelinechart>
                    </div>
                    <div v-if="type === 'syytj'" class="syytj">
                        <Twobarchart :strategyId="strategyId"></Twobarchart>
                    </div>
                    <div v-if="type === 'sylfb'" class="sylfb">
                        <Onebarchart :strategyId="strategyId"></Onebarchart>
                    </div>
                </div>
                <div class="dqxg">
                    <div class="recommendTitle">当前选股</div>
                    <table cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th>股票简称</th>
                            <th>价格<span style="font-size:0.14rem">(元)</span></th>
                            <th>涨跌</th>
                            <th>涨跌幅</th>
                            <th>市盈率</th>
                            <th>流通市值</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item of dqxgData.content">
                            <td>{{item.name}}</td>
                            <td :class="item.price >= 0 ? item.price === 0 ?'':'red':'green'">{{item.price === null ? '--':Number(item.price).toFixed(2)}}</td>
                            <td :class="item.chg >= 0 ? item.chg === 0 ?'':'red':'green'">{{item.chg === null ? '--':Number(item.chg).toFixed(2)}}</td>
                            <td :class="item.curChngPct >= 0 ? item.curChngPct === 0 ?'':'red':'green'">{{item.curChngPct === null ? '--':Number(item.curChngPct).toFixed(2)+'%'}}</td>
                            <td>{{Number(item.peTtm).toFixed(2)}}</td>
                            <td>{{item.mktcap === null ? '--':Number(item.mktcap/100000000).toFixed(0)+' 亿'}}</td>
                        </tr>
                        </tbody>

                    </table>
                    <Pagination v-if="dqxgData.totalPages > 1" :totalPage="dqxgData.totalPages" v-on:getPageFromChild="goDqxgPage"></Pagination>
                </div>
                <div class="mrjy">
                    <div class="recommendTitle">交易详情</div>
                    <table cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th>日期</th>
                            <th>股票简称</th>
                            <th>买/卖</th>
                            <th>成交价格(元)</th>
                            <th>成交股数</th>
                            <th>佣金(元)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item of mrjyData.content">
                            <td>{{String(item.backtestDate).substring(0, 4) + '-' + String(item.backtestDate).substring(4, 6) + '-' + String(item.backtestDate).substring(6)}}</td>
                            <td>{{item.name}}</td>
                            <td :class="item.buySellType === '买入'? 'red' : 'green'">{{item.buySellType}}</td>
                            <td>{{Number(item.price).toFixed(2)}}</td>
                            <td>{{item.amount}}</td>
                            <td>{{Number(item.commission).toFixed(2)}}</td>
                        </tr>
                        </tbody>

                    </table>
                    <Pagination v-if="mrjyData.totalPages > 1" :totalPage="mrjyData.totalPages" v-on:getPageFromChild="goMrjyPage"></Pagination>
                </div>

            </div>
            <!--<Goldchart :strategyId="strategyId"></Goldchart>-->
        </div>
        <div>
            <div class="choseStock">
                <div class="recommendTitle">选股条件</div>
                <Tablelist :data="choseStockData"></Tablelist>
            </div>
            <div class="sellCondition">
                <div>
                    <div class="recommendTitle">买入条件</div>
                    <Tablelist :data="sellConditionData.buyData"></Tablelist>
                    <div style="padding: 0.1rem 0.2rem;">买入表达式：{{recommendData.sellConditiondata.buy.buyConExp}}</div>
                </div>
                <div>
                    <div class="recommendTitle">卖出条件</div>
                    <Tablelist :data="sellConditionData.sellData"></Tablelist>
                    <div style="padding: 0.1rem 0.2rem;">卖出表达式：{{recommendData.sellConditiondata.sell.sellConExp}}</div>
                </div>
            </div>
            <div class="controlStrategy">
                <div class="recommendTitle" >仓控策略</div>
                <div style="padding: 0.3rem 0.2rem;">{{recommendData.positionModel.modelName}}：<span style="color:#666;">{{recommendData.positionModel.modelValue}}</span></div>
            </div>
            <div class="tradeParams">
                <div class="recommendTitle">交易参数</div>
                <table cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th>初始金额</th>
                        <th>资金分配</th>
                        <th>买入价格</th>
                        <th>卖出价格</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{tableData.initFund}}</td>
                        <td>{{tableData.fundAllocate}}</td>
                        <td>{{tableData.buyPriceType}}</td>
                        <td>{{tableData.sellPriceType}}</td>

                    </tr>
                    </tbody>

                </table>
                <table cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th>最大持仓</th>
                        <th>个股最大仓位</th>
                        <th>条件优先序</th>
                        <th>交易费用</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{tableData.maxHolding}}</td>
                        <td>{{tableData.stockMaxHolding}}</td>
                        <td>{{tableData.conPriority}}</td>
                        <td>{{tableData.commission}}</td>

                    </tr>
                    </tbody>

                </table>
                <table cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th>调仓周期</th>
                        <th>买卖滑点</th>
                        <th>收益基准</th>
                        <th>无风险利率</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{tableData.tradeCycle}}</td>
                        <td>{{tableData.slippage}}</td>
                        <td>{{tableData.benchmark}}</td>
                        <td>{{tableData.riskFreeRatio}}</td>
                    </tr>
                    </tbody>

                </table>
                <table cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th>回测时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{tableData.backtestDate}}</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Titlecontent from 'components/title-content'
    import Tablelist from 'components/table-list'
    import Goldrecommends from 'components/gold-recommends'
    import Navbar from 'components/nav-bar'
    import Goldchart from 'components/gold-chart'
    import Radarchart from 'components/radar-chart'
    import Linechart from 'components/line-chart'
    import Barupdown from 'components/bar-up-down'
    import Onelinechart from 'components/one-line-chart'
    import Onebarchart from 'components/one-bar-chart'
    import Twobarchart from 'components/two-bar-chart'
    import Pagination from 'components/pagination'

    export default{
      data () {
        return {
          navText: [['选股条件', 'choseStock'], ['买卖条件', 'sellCondition'], ['仓控策略', 'controlStrategy'], ['交易参数', 'tradeParams']],
          navText1: [['收益曲线图', 'syqxt'], ['当日盈亏', 'dryk'], ['每日持仓', 'mrcc'], ['收益月统计', 'syytj'], ['收益率分布', 'sylfb']],
          type: 'syqxt',
          trData: ['年化收益', '超额收益', '波动率', '夏普比率', '最大回撤', 'Alpha', 'Beta'] }
      },
      components: {
        Titlecontent,
        Tablelist,
        Goldrecommends,
        Navbar,
        Goldchart,
        Radarchart,
        Linechart,
        Barupdown,
        Onelinechart,
        Onebarchart,
        Twobarchart,
        Pagination
      },
      computed: mapState({
        goldResult: state => state.goldStrategy.goldResult,
        articleData: function () {
          return {
            title: '策略描述:',
            content: this.goldResult.strategyDesc
          }
        },
        recommendData: function () {
          const startDate = String(this.goldResult.backtestStartDate)
          const endDate = String(this.goldResult.backtestEndDate)
          const buyPriceType = this.goldResult.buyPriceType
          const tradeCycleType = this.goldResult.tradeCycleType
          const tradeCycleValue = this.goldResult.tradeCycleValue
          const slippage = this.goldResult.slippage
          const benchmark = this.goldResult.benchmark
          let buyType = ''
          let tradeCycle = ''
          let slipData = ''
          let markData = ''
          if (buyPriceType === 'open') {
            buyType = '开盘价'
          } else if (buyPriceType === 'close') {
            buyType = '收盘价'
          } else if (buyPriceType === 'high') {
            buyType = '最高价'
          } else if (buyPriceType === 'low') {
            buyType = '最低价'
          } else if (buyPriceType === 'avg') {
            buyType = '平均价'
          }
          if (tradeCycleType === 'day') {
            if (tradeCycleValue === '1') {
              tradeCycle = '每个交易日'
            } else if (tradeCycleValue === '2') {
              tradeCycle = '每2个交易日'
            } else if (tradeCycleValue === '3') {
              tradeCycle = '每3个交易日'
            } else if (tradeCycleValue === '4') {
              tradeCycle = '每4个交易日'
            } else if (tradeCycleValue === '5') {
              tradeCycle = '每5个交易日'
            } else if (tradeCycleValue === '10') {
              tradeCycle = '每10个交易日'
            } else if (tradeCycleValue === '15') {
              tradeCycle = '每15个交易日'
            } else if (tradeCycleValue === 'N') {
              tradeCycle = '每N个交易日'
            }
          } else if (tradeCycleType === 'week') {
            if (tradeCycleValue === '1') {
              tradeCycle = '每周一'
            } else if (tradeCycleValue === '2') {
              tradeCycle = '每周二'
            } else if (tradeCycleValue === '3') {
              tradeCycle = '每周三'
            } else if (tradeCycleValue === '4') {
              tradeCycle = '每周四'
            } else if (tradeCycleValue === '5') {
              tradeCycle = '每周五'
            }
          } else if (tradeCycleType === 'month') {
            if (tradeCycleValue === '1') {
              tradeCycle = '每月初'
            } else if (tradeCycleValue === '-1') {
              tradeCycle = '每月底'
            }
          }
          if (slippage === 0.001) {
            slipData = '千分之一'
          } else if (slippage === 0.002) {
            slipData = '千分之二'
          } else if (slippage === 0.003) {
            slipData = '千分之三'
          } else if (slippage === 0.004) {
            slipData = '千分之四'
          } else if (slippage === 0.005) {
            slipData = '千分之五'
          }
          if (benchmark === '000300') {
            markData = '沪深300'
          } else if (benchmark === '000001') {
            markData = '上证指数'
          } else if (benchmark === '399001') {
            markData = '深证成指'
          } else if (benchmark === '399006') {
            markData = '创业板指'
          } else if (benchmark === '399005') {
            markData = '中小板指'
          } else if (benchmark === '000016') {
            markData = '上证50'
          } else if (benchmark === '399905') {
            markData = '中证500'
          } else if (benchmark === '399906') {
            markData = '中证800'
          } else if (benchmark === '000852') {
            markData = '中证1000'
          }

          const modelId = this.goldResult.positionModelId
          let mName = ''
          let MValue = ''
          if (modelId === '1001') {
            mName = '不控制'
            MValue = '量化策略不叠加仓位控制模型，每次调仓时可以将全部资金用于购买发出买入信号的股票。'
          } else if (modelId === '1005') {
            mName = '均线模型'
            MValue = '应用5日、10日、20日、60日、120日均线做大盘（上证指数）趋势判断，兼顾短中长期大盘走势，进行6档仓位控制。若5根均线均在指数上方，则空仓；4根在上方，20%仓；3根在上方，40%仓；2根在上方，60%仓；1根在上方，80%仓；均在指数下方，满仓。其优点在于：一是风险可控，二是不会错过牛市；其缺点为：一是不能吃到全波段牛市行情，二是对横盘震荡阶段不太适用。'
          } else if (modelId === '1003') {
            mName = '宏观指标模型'
            MValue = '本模型选取T-1期（周）外汇储备、美元汇率、MSCI新兴市场指数、COMEX金价等数据作为回归因子，T期大盘表现（沪深300指数）作为因变量进行线性回归，进而利用T期因子数据预测T+1期大盘走势，采用3档仓位控制。若T+1期预期大盘上涨，满仓；预期中性，50%仓；预期下跌，空仓。'
          } else if (modelId === '1004') {
            mName = '高低价模型'
            MValue = '依据江恩理论第九条，即：“当市价开创新高，表示市势向上，可以追市买入；当市价下破新底，表示市势向下，可以追沽”，进行2档仓位控制。T日大盘（上证指数）创近20日新高时，满仓；T日大盘创近10日新低时，空仓。'
          }
          const commission = this.goldResult.commission
          let commisVal = ''
          if (commission === 0.0002) {
            commisVal = '万二'
          } else if (commission === 0.00025) {
            commisVal = '万二点五'
          } else if (commission === 0.0003) {
            commisVal = '万三'
          } else if (commission === 0.0004) {
            commisVal = '万四'
          } else if (commission === 0.0005) {
            commisVal = '万五'
          } else if (commission === 0.0006) {
            commisVal = '万六 '
          } else if (commission === 0.0007) {
            commisVal = '万七'
          } else if (commission === 0.0008) {
            commisVal = '万八'
          } else if (commission === 0.001) {
            commisVal = '千一'
          } else if (commission === 0.002) {
            commisVal = '千二'
          } else if (commission === 0.003) {
            commisVal = '千三'
          } else if (commission === 0.004) {
            commisVal = '千四'
          } else if (commission === 0.005) {
            commisVal = '千五'
          }
          return {
            choseStockData: {
              filterSummary: JSON.parse(this.goldResult.filterSummary)
            },
            sellConditiondata: {
              buy: {
                buyStrategyIndexList: this.goldResult.buyStrategyIndexList,
                buyConExp: this.goldResult.buyConExp
              },
              sell: {
                sellStrategyIndexList: this.goldResult.sellStrategyIndexList,
                sellConExp: this.goldResult.sellConExp
              }
            },
            positionModel: {
              modelName: mName,
              modelValue: MValue
            },
            tradeParamsData: {
              initFund: this.goldResult.initFund / 10000 + '万',
              fundAllocate: this.goldResult.fundAllocate === 'fund_value' ? '资金等权' : '市值等权',
              buyPriceType: buyType,
              sellPriceType: this.goldResult.sellPriceType === 'open' ? '开盘价' : '收盘价',
              backtestDate: startDate.substring(0, 4) + '.' + startDate.substring(4, 6) + '.' + startDate.substring(6) + '-' + endDate.substring(0, 4) + '.' + endDate.substring(4, 6) + '.' + endDate.substring(6),
              maxHolding: this.goldResult.maxHolding,
              stockMaxHolding: this.goldResult.stockMaxHolding + '%',
              conPriority: this.goldResult.conPriority === 'time_first' ? '择时条件优先' : '仓位条件优先',
              commission: commisVal,
              tradeCycle: tradeCycle,
              slippage: slipData,
              benchmark: markData,
              riskFreeRatio: Number(this.goldResult.riskFreeRatio * 100).toFixed(2) + '%'
            }
          }
        },
        choseStockData: function () {
          const choseStockTable = this.recommendData.choseStockData.filterSummary
          const arr1 = []
          const arr2 = []
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
          if (choseStockTable.jszbList.length > 0) {
            for (let i = 0; i < choseStockTable.jszbList.length; i++) {
              arr1.push(choseStockTable.jszbList[i].indexName)
              arr2.push(choseStockTable.jszbList[i].indexValue)
            }
          }
          if (choseStockTable.xgfwList.length > 0) {
            for (let i = 0; i < choseStockTable.xgfwList.length; i++) {
              arr1.push(choseStockTable.xgfwList[i].indexName)
              arr2.push(choseStockTable.xgfwList[i].indexValue)
            }
          }

          return [arr1, arr2]
        },
        sellConditionData: function () {
          const buyData = [
                  ['序号', '指标', '参数', '运算符', '数值']
          ]
          const sellData = [
                  ['序号', '指标', '参数', '运算符', '数值']
          ]
          const buyConditionTable = this.recommendData.sellConditiondata.buy.buyStrategyIndexList
          const sellConditionTable = this.recommendData.sellConditiondata.sell.sellStrategyIndexList

          if (buyConditionTable.length > 0) {
            for (var i = 0; i < buyConditionTable.length; i++) {
              const parms = JSON.parse(buyConditionTable[i].indexParams.replace(/'/g, '"'))
              const parmsPeriod = []
              for (var key in parms) {
                if (parms[key] === 'day') {
                  parmsPeriod.push('日线')
                } else if (parms[key] === 'week') {
                  parmsPeriod.push('周线')
                } else if (parms[key] === 'month') {
                  parmsPeriod.push('月线')
                } else {
                  parmsPeriod.push(parms[key])
                }
              }

              buyData.push([buyConditionTable[i].pageOrder, buyConditionTable[i].indexName, '(' + parmsPeriod.join('，') + ')', buyConditionTable[i].operator, buyConditionTable[i].operator === null ? buyConditionTable[i].operator : buyConditionTable[i].comparisonValue])
            }
          }
          if (sellConditionTable.length > 0) {
            for (var j = 0; j < sellConditionTable.length; j++) {
              const parms = JSON.parse(sellConditionTable[j].indexParams.replace(/'/g, '"'))
              const parmsPeriod = []
              for (var item in parms) {
                if (parms[item] === 'day') {
                  parmsPeriod.push('日线')
                } else if (parms[item] === 'week') {
                  parmsPeriod.push('周线')
                } else if (parms[item] === 'month') {
                  parmsPeriod.push('月线')
                } else {
                  parmsPeriod.push(parms[item])
                }
              }
              sellData.push([sellConditionTable[j].pageOrder, sellConditionTable[j].indexName, '(' + parmsPeriod.join('，') + ')', sellConditionTable[j].operator, sellConditionTable[j].operator === null ? sellConditionTable[j].operator : sellConditionTable[j].comparisonValue])
            }
          }
          return {
            buyData: buyData,
            sellData: sellData
          }
        },
        tableData: function () {
          return this.recommendData.tradeParamsData
        },
        mrjyData: function () {
          return this.$store.state.goldStrategy.mrjyData
        },
        dqxgData: function () {
          return this.$store.state.goldStrategy.dqxgData
        }
      }),
      methods: {
        changeNavType (data) {
          this.type = data
        },
        goMrjyPage (data) {
          this.$store.dispatch('goldStrategy/getMrjyData', { strategyId: this.strategyId, page: data - 1 }).then(() => {})
        },
        goDqxgPage (data) {
          this.$store.dispatch('goldStrategy/getDqxgData', { strategyId: this.strategyId, pageNum: data - 1 }).then(() => {})
        }
      },
      mounted () {
        document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.getBoundingClientRect().width / 750 * 625 + '%'

        this.strategyId = this.$route.params.strategyId
        this.$store.dispatch('goldStrategy/getGoldStrategyData', { strategyId: this.strategyId }).then(() => {})
        this.$store.dispatch('goldStrategy/getMrjyData', { strategyId: this.strategyId }).then(() => {})
        this.$store.dispatch('goldStrategy/getDqxgData', { strategyId: this.strategyId }).then(() => {})
      }
    }
</script>
