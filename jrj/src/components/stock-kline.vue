<template>
    <div class="stock-kline">
        <div class="ma"><span class="ma20">MA20：{{lastKData.ma20}}</span><span class="ma60">MA60：{{lastKData.ma60}}</span><span class="ma120">MA120：{{lastKData.ma120}}</span><div></div></div>
        <div class="chart" ref="chart" :style="{width:chartWidth+'px', height:chartHeight+'px'}"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { mapState } from 'vuex'
    import { formatDateStr } from 'utils/date'
    import config from '../z3tougu/config'
    export default({
      props: {
        stockCode: {
          type: String
        },
        chartWidth: {
          type: Number,
          default: 300
        },
        chartHeight: {
          type: Number,
          default: 200
        }
      },
      data () {
        return {
          klineType: 'day', // day||week...
          showX: true
        }
      },
      computed: {
        ...mapState({
          stock: state => state.stock.stock,
          lastKData: state => {
            const record = state.stock.stockKlineData[0]
            if (record) {
              return record
            } else {
              return {
                ma20: config.emptyValue,
                ma60: config.emptyValue,
                ma120: config.emptyValue
              }
            }
          },
          lineData (state) {
            var data = {
              times: [],
              tradeTimeArr: [],
              kdata: [],
              ma20: [],
              ma60: [],
              ma120: [],
              vols: []
            }
            let ma20Error = 0
            let ma60Error = 0
            let ma120Error = 0
            const klineData = [].concat(state.stock.stockKlineData).reverse()
            klineData.forEach((item) => {
              if (this.klineType === 'day') { // 日
                data.times.push(this.formatDate(item.endDate + ''))
                data.tradeTimeArr.push(this.formatDate(item.endDate + ''))
              } else if (this.klineType === 'week' || this.klineType === 'month') { // 周月
                data.times.push(this.formatDate(item.lastTradeDate + ''))
                data.tradeTimeArr.push(this.formatDate(item.lastTradeDate + ''))
              } else { // 5，15，30，60分钟
                data.times.push(item.tradeTime.substring(5, 10))
                data.tradeTimeArr.push(item.tradeTime)
              }
              let openPx = item.openPx
              let closePx = item.closePx
              const highPx = item.highPx
              const lowPx = item.lowPx
              const volume = item.volume
              const prevClosePx = item.prevClosePx
            //   const upColor = config.upColor
            //   const downColor = config.downColor
            //   let color = upColor// 红色
            //   let color0 = downColor// 绿色
            //   const volcolor = downColor
            //   if (closePx === openPx && closePx < prevClosePx) { // 开盘价和收盘价相等且收盘价小于昨收价，但是echarts相等的情况是反的所以要反过来设置颜色
            //     color = upColor
            //     volcolor = downColor
            //   } else if (closePx === openPx && closePx > prevClosePx) {
            //     color = upColor
            //     volcolor = downColor
            //   }
            //   if (closePx === openPx && closePx < prevClosePx) {
            //     color0 = downColor
            //     volcolor = downColor
            //   } else if (closePx === openPx && closePx > prevClosePx) {
            //     color0 = upColor
            //     volcolor = upColor
            //   }
            //   if (closePx < openPx) { // 柱形图颜色
            //     volcolor = downColor
            //   } else if (closePx > openPx) {
            //     volcolor = upColor
            //   }
            //   const newValue = {
            //     value: [openPx, closePx, highPx, lowPx],
            //     itemStyle: {
            //       normal: {
            //         color: color,
            //         color0: color0,
            //         borderColor: color,
            //         borderColor0: color0
            //       }
            //     }
            //   }
              // echarts只比较openPx和closePx;3.7.2会修改次BUG,如果相等会与上一条数据的closePx比较。目前先暂时微改 openPx和closePx的数值大小
              if (openPx === closePx) {
                if (prevClosePx < closePx) {
                  closePx += 0.0001
                } else {
                  openPx += 0.0001
                }
              }
              data.kdata.push([openPx, closePx, highPx, lowPx])

              if (item.ma20 !== 0) {
                ma20Error = item.ma20
              }
              if (item.ma60 !== 0) {
                ma60Error = item.ma60
              }
              if (item.ma120 !== 0) {
                ma120Error = item.ma120
              }

              // 页面异常数据处理，会导致测试同事不能及时发现问题
              data.ma20.push(item.ma20 === 0 ? ma20Error : item.ma20)
              data.ma60.push(item.ma60 === 0 ? ma60Error : item.ma60)
              data.ma120.push(item.ma120 === 0 ? ma120Error : item.ma120)

              var newVols = {
                value: volume, // 万手
                itemStyle: {
                  normal: {
                    color: closePx < prevClosePx ? config.downColor : config.upColor,
                    borderColor: closePx < prevClosePx ? config.downColor : config.upColor
                  }
                }
              }
              data.vols.push(newVols)
            })
            if (klineData.length < 60) {
              for (var i = 0; i < 60 - klineData.length; i++) {
                data.times.push('')
                data.tradeTimeArr.push('')
                const dt = []
                data.kdata.push(dt)
                data.ma20.push('')
                data.ma60.push('')
                data.ma120.push('')
                data.vols.push('')
              }
            }
            return data
          },
          xLabelInterval () {
            let interval = 17
            if (this.klineType === 'min5') {
              interval = 48
            } else if (this.klineType === 'min15') {
              interval = 15
            } else if (this.klineType === 'min30') {
              interval = 8
            } else if (this.klineType === 'min60') {
              interval = 4
            } else {
              interval = 17
            }
            return interval
          }
        })
      },
      methods: {
        initChart () {
          this.chart = echarts.getInstanceByDom(this.$refs.chart) || echarts.init(this.$refs.chart)
//          this.$store.dispatch('stock/queryKline', { stockCode: this.stockCode }).then(() => {
          const lineData = this.lineData
          const opt = {
            toolbox: { show: false },
            animation: false,
            axisPointer: {
              link: { xAxisIndex: 'all' },
              label: {
                backgroundColor: '#777'
              }
            },
            grid: [
              {
                left: 35,
                right: 10,
                top: 35,
                height: '60%',
                show: false
              },
              {
                left: 35,
                right: 10,
                bottom: 0,
                height: '15%',
                show: false
              }
            ],
            xAxis: [
              {
                show: this.showX,
                type: 'category',
                data: lineData.times,
                scale: true,
                axisTick: { show: false },
                boundaryGap: true, // 不从零刻度开始，不然会挤在y轴上
                axisLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#808080'
                  }
                },
                splitLine: {
                  show: false,
                  lineStyle: {
                    type: 'dashed',
                    color: '#e0e0e0'
                  }
                },
                min: 'dataMin',
                max: 'dataMax',
                axisLabel: {
                  interval: this.xLabelInterval,
                  showMinLabel: true
                }
              },
              {
                type: 'category',
                gridIndex: 1,
                data: lineData.times,
                scale: true,
                boundaryGap: true, // 不从零刻度开始，不然会挤在y轴上
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                  label: {
                    formatter: function (params) {
                      var seriesValue = (params.seriesData[0] || {}).value
                      return (seriesValue != null ? echarts.format.addCommas(seriesValue) : '')
                    }
                  }
                }
              }
            ],
            yAxis: [
              {
                scale: true,
                axisTick: { show: false },
                splitArea: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#808080'
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#e0e0e0'
                  }
                }
              },
              {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {
                  show: false
                },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
              }
            ],
            brush: {
              xAxisIndex: 'all',
              brushLink: 'all',
              outOfBrush: {
                colorAlpha: 0.1
              }
            },
            series: [{
              name: 'K线',
              type: 'candlestick',
              data: lineData.kdata,
                // barCategoryGap: '3',
                    // barWidth : data.length<30?8:3.5,//柱图宽度
              itemStyle: {
                normal: {
                  color: config.upColor,
                  color0: config.downColor,
                  borderColor: config.upColor,
                  borderColor0: config.downColor
                }
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: lineData.ma20,
              showSymbol: false,
              lineStyle: {
                normal: {
                  color: '#e75443',
                  opacity: 0.5
                }
              }
            },
            {
              name: 'MA60',
              type: 'line',
              data: lineData.ma60,
              showSymbol: false,
              lineStyle: {
                normal: {
                  color: '#6999d1',
                  opacity: 0.5
                }
              }
            },
            {
              name: 'MA120',
              type: 'line',
              data: lineData.ma120,
              showSymbol: false,
              lineStyle: {
                normal: {
                  color: '#f6bc4d',
                  opacity: 0.5
                }
              }
            },
            {
              name: '成交量',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: lineData.vols,
              barCategoryGap: '3', // 需要根据宽度定
              itemStyle: {
                normal: {
                  color: function (params) {
                    return lineData.kdata[params.dataIndex][1] > lineData.kdata[params.dataIndex][0] ? config.upColor : config.downColor
                  }
                }
              }
            }
    
            ]
          }
          this.chart.setOption(opt)
//          })
        },
        formatDate (datestr) {
          return formatDateStr(datestr, 'yyyyMMdd', 'yyyy-MM-dd')
        }
      },
      watch: {
        stockCode () {
          if (!this.stockCode) {
            console.info('[component:stock-kline]:stockCode is necessary!')
            return
          }
          this.$store.dispatch('stock/queryKline', { stockCode: this.stockCode })
          this.$store.dispatch('stock/queryMkt', { stockCode: this.stockCode })
        },
        lineData () {
          this.initChart()
        }
      },

  mounted () {
        if (!this.stockCode) {
          return
        }
        this.$store.dispatch('stock/queryKline', { stockCode: this.stockCode })
        this.$store.dispatch('stock/queryMkt', { stockCode: this.stockCode })
      }
    })
</script>

<style lang="scss" scoped>
    .stock-kline{
        width:100%;
        height:100%;
        background-color:#fff;
        position:relative;
    }
    .stock-kline .ma{
        position:absolute;
        top:4px;
        left:35px;
        font-size:12px;
    }
    .stock-kline .ma .ma20{
      padding-right:15px;
      color:#e75443
    }
    .stock-kline .ma .ma60{
      padding-right:15px;
      color:#6999d1
    }
    .stock-kline .ma .ma120{
      padding-right:15px;
      color:#f6bc4d
    }
</style>
