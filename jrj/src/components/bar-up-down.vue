<style lang="scss" scoped>
    .barChart{
        height:420px;
        width:100%;
        padding-top:20px;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .barChart{
            width:100%;
            height:4.2rem;
            padding-top:0;
            padding-bottom: 0.1rem;
        }
    }

</style>
<template>
    <div class="barChart">

    </div>
</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['strategyId'],
      methods: {
        initdrykChart () {
          this.$store.dispatch('goldStrategy/getDrykData', { strategyId: this.strategyId }).then(() => {
            const barData = this.$store.state.goldStrategy.drykData
            this.chart = echarts.init(document.getElementsByClassName('barChart')[0])
            this.chart.setOption({
              backgroundColor: '#fff',
              legend: {
                left: '1%',
                top: 0,
                itemWidth: 8,
                data: [
                  {
                    name: '当日盈利',
                    icon: 'circle'
                  },
                  {
                    name: '当日亏损',
                    icon: 'circle'
                  }
                ]
              },
              xAxis: {
                type: 'category',
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: 'solid'
                  }
                },
                axisTick: {
                  alignWithLabel: true
                },
                data: barData.xData
              },
              yAxis: {
                axisLabel: {
                  formatter: function (val) {
                    var result = ''
                    if (val >= 100000000 || val <= -100000000) {
                      result = val / 100000000
                      return result + '亿元'
                    } else if (val >= 10000 || val <= -10000) {
                      result = val / 10000
                      return result + '万元'
                    } else {
                      return val + '元'
                    }
                  }
                }
              },
              series: [
                {
                  data: barData.data1,
                  name: '当日盈利',
                  type: 'bar'
                },
                {
                  data: barData.data2,
                  name: '当日亏损',
                  type: 'bar'
                }
              ],
              color: ['#fd6d6b', '#41bd6a'],
              grid: {
                width: '97%',
                height: '75%',
                left: 0,
                top: '15%',
                containLabel: true
              },
              dataZoom: [
                {
                  type: 'slider',
                  show: true,
                  showDetail: false,
                  xAxisIndex: [0],
                  bottom: 0,
                  left: '1.5%',
                  start: 0,
                  end: 100,
                  textStyle: {
                                    // color: '#aed2ff'
                  },
                                // borderColor: '#d5dbe4',
                  width: '94%',
                  height: '8%',
                  handleSize: '100%',
                  dataBackground: {
                    areaStyle: {
                                        // color: '#cad2db'
                    },
                    lineStyle: {
                                        /* opacity: 0.9,
                                         color: '#a7b7cc'*/
                    }
                  },
                  handleStyle: {
                                    // color: '#a7b7cc'
                  }
                }
              ]
            })
          })
        }
      },
      mounted () {
        this.initdrykChart()
      }
    }
</script>
