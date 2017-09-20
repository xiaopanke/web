<style>
    .bubbleChart{
        height:255px;
        width:100%;
    }
</style>
<template>
    <div class="bubbleChart"></div>
</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['innerCode'],
      methods: {
        initBubbleChart () {
          this.$store.dispatch('fundRecord/getBubbleData', { }).then(() => {
            const bubbleData = this.$store.state.fundRecord.fundBubbleData
            this.chart = echarts.init(document.getElementsByClassName('bubbleChart')[0])
            this.chart.setOption({
              grid: {
                top: 40,
                left: 50,
                right: 50,
                bottom: 30
              },
              tooltip: {
                formatter: function (params) {
                  let s = ''
                  s = '<span style="display: block">基金名称：' + bubbleData.name[params.dataIndex] + '</span><span style="display: block">夏普比率：' + bubbleData.sharpeRatio[params.dataIndex] + '</span>'
                  return s
                }
              },
              xAxis: {
                type: 'category',
                name: '风险',
                nameGap: 10,
                nameTextStyle: {
                  color: '#FB1000',
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
                    color: '#B4B4B4'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  /* formatter: function (v) {
                    return v + '%'
                  },*/
                  textStyle: {
                    color: '#616161'
                  },

                  interval: 0
                },
                data: bubbleData.xData

              },
              yAxis: {
                type: 'value',
                name: '收益',
                nameLocation: 'end',
                nameGap: 15,
                nameTextStyle: {
                  color: '#000',
                  fontSize: 14
                },
                axisLine: {
                  lineStyle: {
                    color: '#B4B4B4'
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#EAEAEA'
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#A1A1A1'
                  }
                  /* formatter: function (v) {
                    return v + '%'
                  }*/

                },
                data: bubbleData.data

              },
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
                    color: '#28BAF9'
                  }
                },
                data: bubbleData.data,
                symbolSize: 20,
                hoverAnimation: true,
                legendHoverLink: true

              }]
            })
          })
        }
      },
      mounted () {
        this.initBubbleChart()
      }
    }
</script>
