<style lang="scss" scoped>
    .radarChart{
        width:100%;
        height:100%;
    }
</style>
<template>
    <div class="radarChart"></div>
</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['strategyId'],
      computed: {
        radarData: function () {
          return this.$store.state.goldStrategy.radarData
        }
      },
      methods: {
        initradarChart () {
          this.$store.dispatch('goldStrategy/getRadarData', { strategyId: this.strategyId }).then(() => {
            // const barData = this.$store.state.goldStrategy.drykData
            this.chart = echarts.init(document.getElementsByClassName('radarChart')[0])
            if (this.radarData !== null) {
              this.chart.setOption({
                backgroundColor: '#fff',
                legend: {
                  bottom: '6px',
                  data: [{
                    name: this.radarData.legend[0],
                    icon: 'circle'
                  },
                  {
                    name: this.radarData.legend[1],
                    icon: 'circle'
                  },
                  {
                    name: this.radarData.legend[2],
                    icon: 'circle'
                  }
                  ],
                  itemWidth: 10,
                  itemHeight: 10

                },
                grid: {
                  left: 0,
                  right: 10,
                  bottom: '5%',
                  height: '80%',
                  width: '50%'
                },
                radar: {
                  indicator: [
                              { name: '成长性因子', max: 5, min: -5 }, // 10 ~ -10
                              { name: '杠杆因子', max: 5, min: -5 },
                              { name: '流动性因子', max: 5, min: -5 },
                              { name: '动量因子', max: 5, min: -5 },
                              { name: '规模因子', max: 5, min: -5 },
                              { name: '估值因子', max: 5, min: -5 },
                              { name: '波动因子', max: 5, min: -5 },
                              { name: '质量因子', max: 5, min: -5 },
                              { name: '分析师预期因子', max: 5, min: -5 },
                              { name: '股东因子', max: 5, min: -5 }
                  ],
                  radius: '60%',
                  nameGap: 10,
                  center: ['50%', '45%']
                },
                series: [{
                  type: 'radar',
                          // areaStyle: {normal: {}},
                  data: this.radarData.data
                }]
              })
            }
          })
        }
      },
      mounted () {
        this.initradarChart()
      }
    }
</script>
