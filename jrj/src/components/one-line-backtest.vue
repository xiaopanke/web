<style lang="scss" scoped>
    .lineChart{height:420px;}
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .lineChart{
            width:100%;
            height:4.2rem;
            padding-bottom: 0.1rem;
        }
    }
</style>
<template>
    <div class="lineChart">

    </div>
</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['backtestId'],
      methods: {
        initMrccChart () {
          this.$store.dispatch('backtestDetailH5/getMrccData', { backtestId: this.backtestId }).then(() => {
            const mrccData = this.$store.state.backtestDetailH5.mrccData
            this.chart = echarts.init(document.getElementsByClassName('lineChart')[0])
            this.chart.setOption({
              backgroundColor: '#fff',
              tooltip: {
                trigger: 'axis',
                textStyle: { align: 'left' },
                showContent: false
              },
              xAxis: {
                interval: 0,
                type: 'category',
                boundaryGap: false,
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: 'solid'
                  }
                },
                data: mrccData.xData
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: function (val) {
                    return val * 100 + '%'
                  }
                },
                position: 'left'
              },
              series: [
                {
                  data: mrccData.data1,
                  name: '近1月',
                  type: 'line',
                  symbol: 'circle',
                  symbolSize: 2,
                  showAllSymbol: true
                }
              ],
              color: ['#16be69'],
              grid: {
                width: '97%',
                height: '80%',
                left: 0,
                top: '10%',
                bottom: '8%',
                containLabel: true
              }
            })
          })
        }
      },
      mounted () {
        this.initMrccChart()
      }
    }
</script>
