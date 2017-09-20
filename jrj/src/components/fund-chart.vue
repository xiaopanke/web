<style>
    .fundChart{
        height:200px;
        width:100%;
    }

</style>
<template>
    <div class="fundChart"></div>

</template>
<script>
    import echarts from 'echarts'
    export default{
      data () {
        return {

        }
      },
      components: {

      },
      computed: {

      },
      methods: {
        initfundbChart () {
          this.$store.dispatch('fundRecord/getFundLjjzData', {}).then(() => {
            const fundbData = this.$store.state.fundRecord.ljjzData
            this.chart = echarts.init(document.getElementsByClassName('fundChart')[0])
            this.chart.setOption({
              title: {
                text: '一天用电量分布',
                subtext: '纯属虚构'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross'
                }
              },
              toolbox: {
                show: true,
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: fundbData.dateList
              },
              yAxis: {
                type: 'value',
                /* axisLabel: {
                  formatter: '{value} W'
                },*/
                axisPointer: {
                  snap: true
                },
                min: 'dataMin',
                max: 'dataMax'
              },
                // visualMap: {
                //     show: false,
                //     dimension: 0,
                //     pieces: [{
                //         lte: 6,
                //         color: 'green'
                //     }, {
                //         gt: 6,
                //         lte: 8,
                //         color: 'red'
                //     }, {
                //         gt: 8,
                //         lte: 14,
                //         color: 'green'
                //     }, {
                //         gt: 14,
                //         lte: 17,
                //         color: 'red'
                //     }, {
                //         gt: 17,
                //         color: 'green'
                //     }]
                // },
              series: [
                {
                  name: '用电量',
                  type: 'line',
                  smooth: true,
                  itemStyle: {
                    normal: {
                      color: '#999'
                    }
                  },
                  data: fundbData.accumNetList,
                  markArea: {
                    data: [[{
                      name: '熊市',
                      xAxis: '20170116',
                      itemStyle: {
                        normal: {
                          color: 'green'
                        }
                      }
                    }, {
                      xAxis: '20170216'
                    }], [{
                      name: '震荡市',
                      xAxis: '20170314',
                      itemStyle: {
                        normal: {
                          color: '#ddd'
                        }
                      }
                    }, {
                      xAxis: '20170411'
                    }], [{
                      name: '牛市',
                      xAxis: '20170616',
                      itemStyle: {
                        normal: {
                          color: 'red'
                        }
                      }
                    }, {
                      xAxis: '20170725'

                    }]]
                  },
                  markPoint: {
                    symbolSize: 20,
                    data: [
                      {
                        coord: ['20170424', 3.4250],
                        symbol: 'rect',
                        label: {
                          normal: {
                            show: false
                          }
                        }
                      },
                      {
                        coord: ['20170424', 3.4250],
                        symbol: 'circle',
                        symbolOffset: [0, '120%'],
                        label: {
                          normal: {
                            show: false
                          }
                        }
                      },
                      {
                        coord: ['20170424', 3.4250],
                        symbol: 'triangle',
                        symbolOffset: [0, '240%'],
                        label: {
                          normal: {
                            show: false
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            })
          })
        }
      },
      mounted () {
        this.initfundbChart()
      }
    }
</script>
