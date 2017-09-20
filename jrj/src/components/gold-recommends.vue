<style>
    .choseStock{
        padding-top:20px;
    }
    .sellCondition{
        padding:15px 15px;
    }
    .controlStrategy{
        padding:20px 15px;
        font-size:14px;
}
    .sellCondition tr td{
        color:#696969 !important;
    }
    .sellCondition tr:first-child td{
        color:#a5a5a5 !important;
    }
    .tradeParams tr:nth-child(2n) td{
        font-weight: bold  !important;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .choseStock{
            padding-top:0.2rem;
            background:#fff;
        }
        .sellCondition{
            background:#fff;
            text-align: left;
            padding:0.3rem 0.15rem;
        }
        .controlStrategy{
            background:#fff;
            padding:0.2rem 0.15rem;
            font-size:0.18rem;
            text-align: left;
        }
        .sellCondition tr td{
            color:#696969 !important;
        }
        .sellCondition tr:first-child td{
            color:#a5a5a5 !important;
        }
    }
</style>
<template>
    <div>
        <Navbar :data="navText" :type="type" v-on:changeType="changeNavType"></Navbar>

        <div v-if="type === 'choseStock'" class="choseStock">
            <Tablelist :data="choseStockData"></Tablelist>
        </div>
        <div v-if="type === 'sellCondition'" class="sellCondition">
            <div style="margin-bottom: 20px;">
                <div>买入条件</div>
                <Tablelist :data="sellConditionData.buyData"></Tablelist>
                <div>买入表达式：{{data.sellConditiondata.buy.buyConExp}}</div>
            </div>
            <div>
                <div>卖出条件</div>
                <Tablelist :data="sellConditionData.sellData"></Tablelist>
                <div>卖出表达式：{{data.sellConditiondata.sell.sellConExp}}</div>
            </div>
        </div>
        <div v-if="type === 'controlStrategy'" class="controlStrategy">
            {{data.positionModel.modelName}}：<span style="color:#666;">{{data.positionModel.modelValue}}</span>
        </div>
        <div v-if="type === 'tradeParams'" class="tradeParams">
            <Tablelist :data="tradeParamData"></Tablelist>
        </div>
    </div>
</template>
<script>
    import Navbar from 'components/nav-bar'
    import Tablelist from 'components/table-list'

    export default{
      props: ['data'],
      data () {
        return {
          navText: [['选股条件', 'choseStock'], ['买卖条件', 'sellCondition'], ['仓控策略', 'controlStrategy'], ['交易参数', 'tradeParams']],
          type: 'choseStock'
        }
      },
      components: {
        Navbar,
        Tablelist
      },
      computed: {
        choseStockData: function () {
          if (this.data.choseStockData === null) {
            return []
          } else {
            const choseStockTable = this.data.choseStockData.filterSummary
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
          }
        },
        sellConditionData: function () {
          const buyData = [
                    ['序号', '指标', '参数', '运算符', '数值']
          ]
          const sellData = [
                    ['序号', '指标', '参数', '运算符', '数值']
          ]
          const buyConditionTable = this.data.sellConditiondata.buy.buyStrategyIndexList
          const sellConditionTable = this.data.sellConditiondata.sell.sellStrategyIndexList
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
        tradeParamData: function () {
          const tableData = this.data.tradeParamsData
          return [
                    ['初始金额', '资金分配', '买入价格', '卖出价格', '回测时间'],
                    [tableData.initFund, tableData.fundAllocate, tableData.buyPriceType, tableData.sellPriceType, tableData.backtestDate],
                    ['最大持仓', '个股最大仓位', '条件优先序', '交易费用', '调仓周期'],
                    [tableData.maxHolding, tableData.stockMaxHolding, tableData.conPriority, tableData.commission, tableData.tradeCycle],
                    ['买卖滑点', '收益基准', '无风险利率'],
                    [tableData.slippage, tableData.benchmark, tableData.riskFreeRatio]
          ]
        }

      },
      methods: {
        changeNavType (data) {
          this.type = data
        }
      },
      mounted () {

      }
    }
</script>
