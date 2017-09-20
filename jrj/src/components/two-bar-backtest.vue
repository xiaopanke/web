<style lang="scss" scoped>
    .barChart{
        height:420px;
        padding-top: 20px;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .barChart{
            width:100%;
            height:4.2rem;
            padding-top: 0;
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
      props: ['backtestId'],
      methods: {
        initSyytjChart () {
          this.$store.dispatch('backtestDetailH5/getSyytjData', { backtestId: this.backtestId }).then(() => {
            const syytjData = this.$store.state.backtestDetailH5.syytjData
            this.chart = echarts.init(document.getElementsByClassName('barChart')[0])
            this.chart.setOption({
              backgroundColor: '#fff',
              legend: {
                left: '1%',
                top: 0,
                itemWidth: 8,
                data: [
                  {
                    name: '策略月收益率',
                    icon: 'circle'
                  },
                  {
                    name: '沪深300',
                    icon: 'circle'
                  }
                ]
              },
              tooltip: {
                trigger: 'axis',
                padding: [10, 55, 10, 20],
                textStyle: { align: 'left' },
                showContent: true,
                formatter: function (params) {
                  var s = params[0].name
                  for (var i = 0; i < params.length; i++) {
                    if (i === 0) {
                      s = s + '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span> ' + params[i].seriesName + ' : ' + Number(params[i].value).toFixed(2) + '%'
                    }
                    if (i === 1) {
                      s = s + '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span> ' + params[i].seriesName + ' : ' + Number(params[i].value).toFixed(2) + '%'
                    }
                  }
                  return s
                }
              },
              xAxis: {
                            // interval:0,
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
                data: syytjData.xData
              },
              yAxis: {
                            // type: 'value',
                axisLabel: {
                  formatter: function (val) {
                    return val + '%'
                  }
                }
              },
              series: [
                {
                  data: syytjData.data1,
                  name: '策略月收益率',
                  type: 'bar'
                },
                {
                  data: syytjData.data2,
                  name: '沪深300',
                  type: 'bar'
                }
              ],
              color: ['#f7bd42', '#5c99c9'],
              grid: {
                width: '97%',
                height: '80%',
                left: 0,
                top: '15%',
                containLabel: true
              }
            })
          })
        }
      },
      mounted () {
        this.initSyytjChart()
      }
    }
</script>
