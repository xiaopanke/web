<style lang="scss" scoped="">
    .recommend-strategy{margin-right:0.3%;padding: 10px 10px 10px 10px;background: #fff;height:100%;display: inline-block;float: left;}
    .recommend-strategy-title{height:9.5%;}
    .recommend-strategy-title p{color:#4c8cca;height:100%;}
    .more-strategy{float: right;text-align: right;cursor: pointer;padding-right:20px;}
    .more-strategy a{color:#4c8cca;}
    .recommend-strategy-chart-link{display:inline-block;width: 100%;height:79.5%;}
    .recommend-strategy-chart{height: 100%;}
    .strategy-description{color:#666;height:11%;padding-top: 8px;}
    .strategy-description p{ overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
    .strategy-name{color:#4c8cca;float: left;text-align: left;font-weight: bold;}
</style>
<template>
    <div class="recommend-strategy" :style="{width:RecommendStrategyWidth}">
        <div class="recommend-strategy-title clearfix">
            <p class="strategy-name"><router-link :to="{name:'goldStrategy',params:{strategyId:strategyId}}">{{recommendStrategyName}}</router-link></p>
            <p class="more-strategy"><a v-on:click="moreGoldList">更多推荐策略</a></p>
        </div>
        <router-link :to="{name:'goldStrategy',params:{strategyId:strategyId}}" class="recommend-strategy-chart-link"><div class="recommend-strategy-chart" ref="recChart"></div></router-link>
        <div class="strategy-description"><p>{{strategyDesc}}</p></div>
    </div>
</template>
<script type="text/javascript">
    import echarts from 'echarts'
    export default {
      props: ['RecommendStrategyWidth', 'benchmarkObj'],
      data () {
        return {
          sort: 'totalReturn',
          direction: 'desc',
          size: 1,
          recommendStrategyName: '',
          strategyId: '',
          strategyDesc: ''
        }
      },
      watch: {

      },
      computed: {
        recommendStrategyDetail: function () {
          if (this.$store.state.z3touguIndex.strategyList.length > 0) {
            const recommendStrategy = this.$store.state.z3touguIndex.strategyList[0]
            recommendStrategy.backtestDate = []
            recommendStrategy.totalReturn = []
            recommendStrategy.benchmarkPeriodReturn = []
            for (let i = 0; i < recommendStrategy.strategy.returns.length; i++) {
              recommendStrategy.backtestDate.push(recommendStrategy.strategy.returns[i].backtestDate)// 时间
              recommendStrategy.totalReturn.push(recommendStrategy.strategy.returns[i].totalReturn)// 总收益率
              recommendStrategy.benchmarkPeriodReturn.push(recommendStrategy.strategy.returns[i].benchmarkPeriodReturn)// 基准收益率
            }
            return recommendStrategy
          }
        }
      },
      methods: {
        initRecommendStrategy: function () {
          this.recommendChart = echarts.init(this.$refs.recChart)
          this.$store.dispatch('z3touguIndex/getStrategyList', { sort: this.sort, direction: this.direction, size: this.size })
                    .then(() => {
                      const _this = this
                      if (this.recommendStrategyDetail) {
                        this.recommendStrategyName = this.recommendStrategyDetail.strategy.strategyName
                        this.strategyId = this.recommendStrategyDetail.strategy.strategyId
                        this.strategyDesc = this.recommendStrategyDetail.strategy.strategyDesc
                        this.recommendChart.setOption({
                          legend: {
                           // left: 'center',
                            left: 0,
                            itemWidth: 8,
                            data: [
                              {
                                name: '策略累计收益率',
                                icon: 'circle'
                              },
                              {
                                name: this.benchmarkObj[this.recommendStrategyDetail.strategy.benchmark],
                                icon: 'circle'
                              }
                            ]
                          },
                          grid: {
                            show: true,
                            left: 0,
                            top: 35,
                            bottom: 100,
                            right: 0,
                            width: '98%',
                            height: '82%',
                            containLabel: true
                          },
                          xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            splitLine: {
                              show: true,
                              lineStyle: {
                                type: 'solid'
                              }
                            },
                            axisLabel: {
                              formatter: function (value, index) {
                                return _this.timeFormat(value)
                              }
                            },
                            data: this.recommendStrategyDetail.backtestDate
                          },
                          yAxis: {
                            type: 'value',
                            boundaryGap: false,
                            axisLabel: {
                              formatter: function (val) {
                                return 100 * val + '%'
                              }
                            }
                          },
                          color: ['#4076b4', '#f1975d'],
                          tooltip: {
                            trigger: 'axis',
                            padding: [10, 55, 10, 20],
                            textStyle: { align: 'left' },
                            showContent: true,
                            formatter: function (params) {
                              var s = params[0].name
                              for (var i = 0; i < params.length; i++) {
                                s = s + '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span> ' + params[i].seriesName + ' : ' + (100 * params[i].value).toFixed(2) + '%'
                              }
                              return s
                            }
                          },
                          series: [
                            {
                              name: '策略累计收益率',
                              type: 'line',
                              showSymbol: false,
                              hoverAnimation: false,
                              data: this.recommendStrategyDetail.totalReturn,
                              lineStyle: {
                                normal: {
                                  width: 1
                                }
                              }
                            },
                            {
                              name: this.benchmarkObj[this.recommendStrategyDetail.strategy.benchmark],
                              type: 'line',
                              showSymbol: false,
                              hoverAnimation: false,
                              data: this.recommendStrategyDetail.benchmarkPeriodReturn,
                              lineStyle: {
                                normal: {
                                  width: 1
                                }
                              }
                            }
                          ]
                        })
                      }
                    })
        },
        timeFormat: function (date) {
          const toTime = date.toString()
          let m
          if (toTime.substring(4, 5) === '0') {
            m = toTime.substring(5, 6)
          } else {
            m = toTime.substring(4, 6)
          }
          return m + '.' + toTime.substring(6)
        },
        moreGoldList: function () {
          window.open('goldList')
        }
      },
      mounted () {
        this.initRecommendStrategy()
      }
    }
</script>
