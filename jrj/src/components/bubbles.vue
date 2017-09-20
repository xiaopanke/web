<style lang="scss" scoped>
.bubblesChart {
    width: 100%;
}
.siweiDialog {
    width: 450px;
    height: 247px;
    position: absolute;
}
</style>
<template>
<div class="bubbles">
  <div class="siweiDialog" :style="{left:offsetX+'px',top:offsetY+'px',zIndex:zIndex}">
    <Siweidialog :dialogOptions="dialogOptions" v-show="isShowDialog"></Siweidialog>
  </div>
  <div class="bubblesChart" ref="bubbles" v-bind:style="{height:height+'px'}"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import * as Data from '../z3tougu/constant/siwei.js'
import {
  mapState
} from 'vuex'
import Siweidialog from 'components/siwei-dialog'

export default {
  props: ['options'],
  data () {
    return {
      colorUnit: 10000,
      defaultColor: '#2F323D',
      industryArr: Data.industryArr,
      rgColor: Data.chgColor,
      quoteChange: Data.quoteChange,
      groupArr: Data.groupArr,
      xSelectData: Data.xSelectData,
      bubbleSizeSelect: Data.bubbleSizeSelect,
      bubbleColorSelect: Data.bubbleColorSelect,
      /* height: (window.innerHeight - 85) / (window.devicePixelRatio || 1),*/
      height: window.innerHeight - 85 < 710 ? 710 - 85 : window.innerHeight - 82,
      isShowDialog: false,
      dialogOptions: {
        stockName: '',
        stockCode: '',
        leftList: {
          xData: {
            value: ''
          },
          yData: {
            value: ''
          },
          bubbleSize: {
            value: ''
          },
          bubbleColor: {
            value: ''
          }
        }
      },
      offsetX: '',
      offsetY: '',
      zIndex: ''
    }
  },
  components: {
    Siweidialog
  },
  watch: {
    'options': {
      deep: true,
      handler: function () {
        this.updateBubbles()
      }
    }
  },
  computed: mapState({
    bubblesData: state => state.bubbles.bubblesData,
    parameterData: state => state.bubbles.parameterData,
    xAxis: function (state) {
      const that = this
      let x
      if (state.bubbles.parameterData.xData === 'sw_indu_name') {
        x = that.industryArr
      } else if (state.bubbles.parameterData.xData === 'chi_spel') {
        x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      } else {
        x = state.bubbles.bubblesData.xData
      }
      const type = !!(state.bubbles.parameterData.xData === 'sw_indu_name' || state.bubbles.parameterData.xData === 'chi_spel')
      return {
        type: type ? 'category' : 'value',
        axisLabel: {
          formatter: function (v) {
            return that.convertNumBySelect('xData', v)
          },
          textStyle: {
            color: '#fff'
          },
          interval: 0,
          rotate: (type ? 'category' : 'value') === 'category' ? 40 : 0
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            color: '#32343D'
          }
        },
        data: x
      }
    },
    yAxis: function (state) {
      const that = this
      let y
      if (state.bubbles.parameterData.yData === 'sw_indu_name') {
        y = this.industryArr
      } else if (state.bubbles.parameterData.yData === 'chi_spel') {
        y = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      } else {
        y = state.bubbles.bubblesData.yData
      }
      const type = !!(state.bubbles.parameterData.yData === 'sw_indu_name' || state.bubbles.parameterData.yData === 'chi_spel')
      return {
        type: type ? 'category' : 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          },
          formatter: function (v) {
            return that.convertNumBySelect('yData', v)
          }
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            color: '#32343D'
          }
        },
        data: y
      }
    },
    dataZoom: function () {
      return [{
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        top: '5%',
        right: 20,
        bottom: 0,
        start: 0,
        end: 100,
        textStyle: {
          color: '#aed2ff'
        },
        borderColor: '#3c4868',
        width: '6',
        height: '90%',
        handleIcon: 'M0,0 v9.7h5 v-9.7h-5 Z',
        handleSize: '300%',
        dataBackground: {
          areaStyle: {
            color: '#222445'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#222445'
          }
        },
        handleStyle: {
          color: '#aed2ff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        showDetail: false,
        realtime: false
      },
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        top: 10,
          // right:80,
        left: '5%',
        start: 0,
        end: 100,
        textStyle: {
          color: '#aed2ff'
        },
        borderColor: '#3c4868',
        width: '90%',
        height: '6',
        handleIcon: 'M0,0 v9.7h5 v-9.7h-5 Z',
        handleSize: '300%',
        dataBackground: {
          areaStyle: {
            color: '#222445'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#222445'
          }
        },
        handleStyle: {
          color: '#aed2ff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        showDetail: false,
        realtime: false
      }
      ]
    }
  }),
  methods: {
    convertUnit (selectName) {
      if (selectName === 'mkt_idx.volume' || selectName === 'perf_idx.avg_vol_3month' || selectName === 'fin_idx.tot_revenue' || selectName === 'fin_idx.sale') {
        return 10000
      } else if (selectName === 'mkt_idx.tcap' || selectName === 'mkt_idx.mktcap') {
        return 10000 * 10000
      } else {
        return 1
      }
    },
    convertNumBySelect (select, showData) {
      if (isNaN(Number(showData))) {
        return showData
      } else {
        var tmpSelect = ''
        if (select === 'bubblesSize') {
          tmpSelect = this.bubbleSizeSelect[this.parameterData[select]]
        } else if (select === 'bubbleColor') {
          tmpSelect = this.bubbleColorSelect[this.parameterData[select]]
        } else {
          tmpSelect = this.xSelectData[this.parameterData[select]]
        }
        if ((tmpSelect.indexOf('率') >= 0 && tmpSelect.indexOf('市盈率') < 0) || tmpSelect.indexOf('幅') >= 0 || tmpSelect.indexOf('最') >= 0 || tmpSelect.indexOf('目标价格') >= 0 || tmpSelect.indexOf('持股') >= 0) {
          return showData === null ? '--' : Number(showData).toFixed(2) + '%'
        } else {
          var selectVal = this.parameterData[select]
          if (selectVal === 'fcst_idx.rating_syn') {
            if (Number(showData) === 5) {
              return '卖出'
            } else if (Number(showData) === 4) {
              return '减持'
            } else if (Number(showData) === 3) {
              return '中性'
            } else if (Number(showData) === 2) {
              return '增持'
            } else if (Number(showData) === 1) {
              return '买入'
            } else {
              return ''
            }
          } else if (selectVal === 'fin_idx.tot_revenue' || selectVal === 'fin_idx.sale' || selectVal === 'mkt_idx.tcap' || selectVal === 'mkt_idx.mktcap') {
            return (Number(showData) / 100000000).toFixed(2) + '亿'
          } else if (selectVal === 'mkt_idx.volume' || selectVal === 'perf_idx.avg_vol_3month') {
            return (Number(showData) / 10000).toFixed(0) + '万'
          } else if (selectVal === 'order' || selectVal === 'staff_num') {
            return Number(showData).toFixed(0)
          } else {
            return Number(showData).toFixed(2)
          }
        }
      }
    },
    initBubbles () {
      this.chart = echarts.init(this.$refs.bubbles)
      this.chart.showLoading()
      this.$store.dispatch('bubbles/getBubblesData', {
        options: this.options
      }).then(() => {
        const that = this
        const xData = this.$store.state.bubbles.parameterData.xData
        const yData = this.$store.state.bubbles.parameterData.yData
        const xType = !!(xData === 'sw_indu_name' || xData === 'chi_spel')
        const yType = !!(yData === 'sw_indu_name' || yData === 'chi_spel' || yData === 'fcst_idx.rating_syn')
        let x
        if (that.parameterData.xData === 'sw_indu_name') {
          x = that.industryArr
        } else if (that.parameterData.xData === 'chi_spel') {
          x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        } else {
          x = that.bubblesData.xData
        }
        let y
        if (that.parameterData.yData === 'sw_indu_name') {
          y = that.industryArr
        } else if (that.parameterData.yData === 'chi_spel') {
          y = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        } else {
          y = that.bubblesData.yData
        }
        this.chart.setOption({
          backgroundColor: '#23252D',
          animation: false,
          grid: {
            top: 40,
            left: 90,
            right: 50,
            bottom: 50
          },
          tooltip: {
            triggerOn: 'none',
            formatter: function (params) {
              return '<p style="background: red; width:200px; height:200px">hello</p>'
            }
          },
          xAxis: {
            type: xType ? 'category' : 'value',
            // name: '日期',
            nameGap: 16,
            nameTextStyle: {
              color: '#fff',
              fontSize: 14
            },
            // max: 31,
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#32343D'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#32343D'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: function (v) {
                return that.convertNumBySelect('xData', v)
              },
              textStyle: {
                color: '#fff'
              },

              interval: 0,
              rotate: (xType ? 'category' : 'value') === 'category' ? 40 : 0
            },
            data: x

          },
          yAxis: {
            type: yType ? 'category' : 'value',
            // name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              color: '#fff',
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                color: '#32343D'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#32343D'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              formatter: function (v) {
                return that.convertNumBySelect('yData', v)
              }

            },
            data: y

          },
          dataZoom: [{
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            top: '5%',
            right: 20,
            bottom: 0,
            start: 0,
            end: 100,
            textStyle: {
              color: '#aed2ff'
            },
            borderColor: '#3c4868',
            width: '6',
            height: '90%',
            handleIcon: 'M0,0 v9.7h5 v-9.7h-5 Z',
            handleSize: '300%',
            dataBackground: {
              areaStyle: {
                color: '#222445'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#222445'
              }
            },
            handleStyle: {
              color: '#aed2ff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            showDetail: false,
            realtime: false
          },
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            top: 10,
              // right:80,
            left: '5%',
            start: 0,
            end: 100,
            textStyle: {
              color: '#aed2ff'
            },
            borderColor: '#3c4868',
            width: '90%',
            height: '6',
            handleIcon: 'M0,0 v9.7h5 v-9.7h-5 Z',
            handleSize: '300%',
            dataBackground: {
              areaStyle: {
                color: '#222445'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#222445'
              }
            },
            handleStyle: {
              color: '#aed2ff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            showDetail: false,
            realtime: false
          }
          ],
          series: [{
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.7,
                // shadowBlur: 5,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                // shadowColor: 'rgba(255,255,255,0.5)',
                borderColor: 'rgba(153,153,153,0.5)',
                borderWidth: 1,
                borderType: 'solid',
                color: function (params) {
                  const colorType = that.$store.state.bubbles.parameterData.bubbleColor
                  const bubbleColorData = that.$store.state.bubbles.bubblesData.bubbleColor[(params.dataIndex)]
                  if (colorType === '' || bubbleColorData === null) {
                    return that.defaultColor
                  }
                  let tmpValue = 0
                  const colorArr = that.groupArr[colorType].color
                  const conditionArr = that.groupArr[colorType].condition

                  if (colorType === 'sw_indu_name') { // 行业
                    var len = (that.industryArr.indexOf(bubbleColorData)) % 7
                    return colorArr[len]
                  } else if (colorType === 'fcst_idx.rating_syn') { // 1=买入，2=增持，3=中性，4=减持，5=卖出
                    if (Number(bubbleColorData) === 5) {
                      return colorArr[0]
                    } else if (Number(bubbleColorData) === 4) {
                      return colorArr[1]
                    } else if (Number(bubbleColorData) === 3) {
                      return colorArr[2]
                    } else if (Number(bubbleColorData) === 2) {
                      return colorArr[3]
                    } else if (Number(bubbleColorData) === 1) {
                      return colorArr[4]
                    } else {
                      return '#2F323D'
                    }
                  } else if (colorType === 'mkt_idx.tcap' || colorType === 'mkt_idx.mktcap' || colorType === 'mkt_idx.volume' || colorType === 'perf_idx.avg_vol_3month' || colorType === 'mkt_idx.relaVolume' || colorType === 'mkt_idx.rela_volume') {
                    that.colorUnit = that.convertUnit(colorType)
                    tmpValue = bubbleColorData / that.colorUnit
                  } else {
                    var ratioArr = that.groupArr[colorType].ratio
                    tmpValue = bubbleColorData / ratioArr
                  }
                  if (colorType !== 'sw_indu_name' && colorType !== 'fcst_idx.rating_syn') {
                    let num
                    if (colorType === 'mkt_idx.rela_volume') {
                      num = Number(Math.abs((conditionArr[1] - conditionArr[2]) / 2).toFixed(1))
                    } else {
                      num = Math.abs((conditionArr[1] - conditionArr[2]) / 2)
                    }
                    if (tmpValue < (conditionArr[1] - num)) {
                      return colorArr[0]
                    } else if ((conditionArr[1] + num) > tmpValue && tmpValue >= (conditionArr[1] - num)) {
                      return colorArr[1]
                    } else if ((conditionArr[2] + num) > tmpValue && tmpValue >= (conditionArr[2] - num)) {
                      return colorArr[2]
                    } else if ((conditionArr[3] + num) > tmpValue && tmpValue >= (conditionArr[3] - num)) {
                      return colorArr[3]
                    } else if ((conditionArr[4] + num) > tmpValue && tmpValue >= (conditionArr[4] - num)) {
                      return colorArr[4]
                    } else if ((conditionArr[5] + num) > tmpValue && tmpValue >= (conditionArr[5] - num)) {
                      return colorArr[5]
                    } else if ((conditionArr[6] + num) > tmpValue && tmpValue >= (conditionArr[6] - num)) {
                      return colorArr[6]
                    } else if ((conditionArr[7] + num) > tmpValue && tmpValue >= (conditionArr[7] - num)) {
                      return colorArr[7]
                    } else if ((conditionArr[7] + num) < tmpValue) {
                      return colorArr[8]
                    }
                  }
                }
              }
            },
            data: this.$store.state.bubbles.bubblesData.seriesData,
            symbolSize: function (params, value) {
              const tmpSize = that.$store.state.bubbles.parameterData.bubblesSize
              if (tmpSize === '') {
                return 32
              }
              var num = Number(that.$store.state.bubbles.bubblesData.bubbleSize[(value.dataIndex)])
              if (tmpSize.indexOf('tcap') >= 0) {
                return (Math.sqrt(num / 1e11) * 40).toFixed(2)
              } else if (tmpSize === 'mkt_idx.volume') {
                return (Math.sqrt(num / 1e7) * 20).toFixed(2)
              } else if (tmpSize === 'perf_idx.avg_vol_3month') {
                return (Math.sqrt(num / 1e7) * 20).toFixed(2)
              } else {
                num = num > 40 ? 40 : num
                return (num * 4).toFixed(2)
              }
            },
            hoverAnimation: true,
            legendHoverLink: true

          }]
        })
        that.chart.on('dblclick', function (params) {
          window.open('/stock/' + that.bubblesData.innerCode[params.dataIndex] + '.shtml')
        })
        that.chart.on('mouseover', function (params) {
          if ((params.event.offsetX + 460) > that.$refs.bubbles.clientWidth) {
            that.offsetX = params.event.offsetX - 480
          } else {
            that.offsetX = params.event.offsetX + 20
          }

          if ((params.event.offsetY + 247) > that.$refs.bubbles.clientHeight) {
            that.offsetY = that.$refs.bubbles.clientHeight - 247
          } else {
            that.offsetY = params.event.offsetY
          }
          that.zIndex = 999999
          that.dialogOptions.stockCode = that.$store.state.bubbles.bubblesData.innerCode[params.dataIndex]
          that.$store.dispatch('stock/queryKline', {
            stockCode: that.dialogOptions.stockCode
          })
          that.dialogOptions.stockName = that.$store.state.bubbles.bubblesData.name[params.dataIndex]
          that.dialogOptions.leftList.xData.value = that.convertNumBySelect('xData', that.$store.state.bubbles.bubblesData.xData[params.dataIndex])
          that.dialogOptions.leftList.yData.value = that.convertNumBySelect('yData', that.$store.state.bubbles.bubblesData.yData[params.dataIndex])
          that.dialogOptions.leftList.bubbleSize.value = that.convertNumBySelect('bubblesSize', that.$store.state.bubbles.bubblesData.bubbleSize[params.dataIndex])
          that.dialogOptions.leftList.bubbleColor.value = that.convertNumBySelect('bubbleColor', that.$store.state.bubbles.bubblesData.bubbleColor[params.dataIndex])
          that.isShowDialog = true
        })
        that.chart.on('mouseout', function (params) {
          that.zIndex = ''
          that.isShowDialog = false
        })
        window.onresize = function () {
          that.chart.resize({
            height: window.innerHeight - 85
          })
          that.height = window.innerHeight - 85
        }
        this.chart.hideLoading()
      })
    },
    updateBubbles () {
      this.$store.dispatch('bubbles/getBubblesData', {
        options: this.options
      }).then(() => {
        this.chart && this.chart.setOption({
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: [{
            data: this.bubblesData.seriesData
          }],
          dataZoom: this.dataZoom
        })
        this.chart.hideLoading()
      })
      this.chart.showLoading()
      setTimeout(() => {
        this.$emit('toHideDialog', false)
      }, 0) /* 弹窗消失，loading加载期间会选中气泡，显示弹窗，所以让出线程*/
    }

  },
  mounted () {
    const that = this
    const p = new Promise((resolve, reject) => {
      if (window.Z3) {
        window.Z3.SndStockPoolInfo((data) => {
          that.options.innerCode = data
          resolve()
        })
      }
      resolve()
    })
    p.then(this.initBubbles)
  }
}
</script>
