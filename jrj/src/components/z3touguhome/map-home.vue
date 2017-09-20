<style lang="scss" scoped="">
.map-home {
    display: inline-block;
    float: right;
}
.map-home div {
    width: 100%;
    height: 100%;
}
</style>
<template>
<router-link class="map-home" :to="{name:'map'}" :style="{width:mapWidth,height:mapHeight}">
  <div class="" ref="mapChart"></div>
</router-link>
</template>
<script type="text/javascript">
import echarts from 'echarts'
export default {
  props: ['mapWidth', 'mapHeight'],
  data () {
    return {
      rangeCode: '000001.SH',
      colors: ['#f63538', '#ee373a', '#e6393b', '#df3a3d', '#d73c3f', '#ce3d41', '#c73e43', '#bf4045', '#b64146', '#ae4248', '#a5424a', '#9d434b', '#94444d', '#8b444e', '#824450', '#784551', '#6f4552', '#644553', '#5a4554', '#4f4554', '#414554', '#3f4c53', '#3d5451', '#3b5a50', '#3a614f', '#38694f', '#366f4e', '#35764e', '#347d4e', '#32844e', '#31894e', '#31904e', '#30974f', '#2f9e4f', '#2fa450', '#2faa51', '#2fb152', '#2fb854', '#30be56', '#30c558', '#30cc5a'],
      rangeValues: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
      isContinue: 1,
      condition: 'mkt_idx.cur_chng_pct'
    }
  },
  watch: {

  },
  computed: {
    homeMapData: function () {
      const map = [].concat(this.$store.state.z3touguIndex.homeMapData)
      map.forEach(function (industry) {
        industry.value = industry.scale
        industry.children = industry.voList
        industry.children && industry.children.forEach(function (lvl2) {
          lvl2.value = lvl2.scale
        })
      })
      return map
    },
    homeStockData: function () {
      const map = this.homeMapData
      const stockData = this.$store.state.z3touguIndex.homeRangeData
      const _this = this
      map.forEach(function (industry) {
        industry.children && industry.children.forEach(function (lvl2) {
          if (stockData) {
            lvl2.perf = stockData[lvl2.name]
            if (lvl2.perf !== null && typeof (lvl2.perf) !== 'undefined') {
              if (lvl2.perf >= 0) {
                lvl2.perfText = '+' + parseFloat(lvl2.perf).toFixed(2) + '%'
              } else {
                lvl2.perfText = parseFloat(lvl2.perf).toFixed(2) + '%'
              }
            } else {
              lvl2.perfText = '--'
            }
            lvl2.itemStyle = {
              normal: {
                color: _this.showColor(_this.colors.slice().reverse(), _this.rangeValues, lvl2.perf) || '#2f323d'
              }
            }
          } else {
            lvl2.itemStyle = {
              normal: {
                color: '#2f323d'
              }
            }
          }
        })
      })
      return map
    }
  },
  methods: {
    initMap: function () {
      const _this = this
      this.mapChart = echarts.init(this.$refs.mapChart)
      const date = this.getTime()
      this.$store.dispatch('z3touguIndex/getHomeMapData', {
        date: date
      })
        .then(() => {
          this.mapChart.setOption({
            tooltip: {
              padding: [8, 12, 8, 12],
              formatter: function (info) {
                const perfText = info.data.perfText
                const treePathInfo = info.treePathInfo
                const treePath = []
                for (let i = 1; i < treePathInfo.length; i++) {
                  treePath.push(treePathInfo[i].name)
                }
                return [
                  '<div class="tooltip-title">' + treePath.join('/') + '</div>', perfText
                ].join('')
              }
            },
            series: [{
              name: '',
              type: 'treemap',
              width: '100%',
              height: '100%',
              visibleMin: 50,
              childrenVisibleMin: 50,
              label: {
                normal: {
                  show: true,
                  ellipsis: false,
                  formatter: (params) => {
                    const node = this.getNode(params)
                    const nodeLayout = node.getLayout()
                    let formatterText = ''
                    if (nodeLayout.width > 52 && nodeLayout.height >= 18) {
                      formatterText += params.name
                    }
                    if (nodeLayout.width > 52 && nodeLayout.height > 36 && typeof (params.data.perf) !== 'undefined' && params.data.perf !== null) {
                      formatterText += '\n' + params.data.perfText
                    }
                    return formatterText
                    /* if (typeof (params.data.perf) !== 'undefined' && params.data.perf !== null) {
                      return params.name + '\n' + params.data.perfText
                    }*/
                  },
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              breadcrumb: {
                show: false
              },
              nodeClick: false,
              roam: false,
              levels: this.getLevelOption(),
              data: this.homeMapData
            }]
          })
          this.mapChart.hideLoading()
        }).then(() => {
          this.$store.dispatch('z3touguIndex/getHomeRangeData').then(() => {
            this.mapChart.setOption({
              series: [{
                data: this.homeStockData
              }]
            })
            this.mapChart.hideLoading()
          })
        })
      window.onresize = function () {
        _this.mapChart.resize({
          height: (window.innerHeight - 8) * 0.38,
          width: (window.innerWidth - 16) * 0.347
        })
      }
    },
    getLevelOption: function () {
      return [{ // 第一层外
        itemStyle: {
          normal: {
            borderColor: '#000',
            borderWidth: 0.5,
            gapWidth: 1
          }
        },
        upperLabel: {
          normal: {
            show: false
          }
        }
      },
      { // 第一层
        itemStyle: {
          normal: {
            borderColor: '#000',
            borderWidth: 0,
            gapWidth: 1,
            color: '#2f323d'
          }
        }
      },
      { // 第二层
        itemStyle: {
          normal: {
            borderColor: '#000',
            borderWidth: 0
          }
        }
      }
      ]
    },
    showColor: function (colorArr, valueArr, value) {
      if (value == null) {
        return colorArr.nullColor
      }
      if (value <= (valueArr[0] + valueArr[1]) / 2) {
        return colorArr[0]
      } else if (value > (valueArr[valueArr.length - 1] + valueArr[valueArr.length - 2]) / 2) {
        return colorArr[colorArr.length - 1]
      } else {
        var index = Math.round((value - valueArr[0]) / (valueArr[valueArr.length - 1] - valueArr[0]) * colorArr.length)
        return colorArr[index]
      }
    },
    getTime: function () {
      const date = new Date()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentDate = date.getFullYear() + month + strDate
      return currentDate
    },
    getNode: function (params) {
      const chartView = this.mapChart._chartsViews[0]
      const treeRoot = chartView.seriesModel._viewRoot
      return treeRoot.hostTree._nodes[params.dataIndex]
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>
