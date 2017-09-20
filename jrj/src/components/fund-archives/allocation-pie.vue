<style lang="scss" scoped="">
    .allocation{width: 100%;height: 276px;}
</style>
<template>
    <div class="allocation" ref="allocationPie"></div>
</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['type', 'innerCode'],
      data () {
        return {
          endDate: '20170630'
        }
      },
      computed: {
        allocationData: function () {
          const allocationInfo = this.$store.state.funcArchives.allocationInfo
          return allocationInfo
        }
      },
      methods: {
        initPie: function () {
          this.chart = echarts.init(this.$refs.allocationPie)
          this.$store.dispatch('funcArchives/getAllocationInfo', { innerCode: this.innerCode, endDate: this.endDate, type: this.type })
              .then(() => {
                if (this.type === 'zcpz') {
                  const allocationData = this.allocationData.notMonetaryFund[0]
                  this.chart.setOption({
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        return params.seriesName + '</br>' + params.name + ': ' + params.value.toFixed(2) + '(' + params.percent.toFixed(1) + '%)'
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'left',
                      top: 20,
                      right: 20,
                      data: ['股票', '债券', '基金', '银行存款', '其他']
                    },
                    color: ['#54a2e4', '#dddee0', '#ebebed', '#f6f6f6', '#f6f6f6'],
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%'
                    },
                    series: [
                      {
                        name: '资产配置',
                        type: 'pie',
                        radius: ['20%', '80%'],
                        label: {
                          normal: {
                            show: false
                          }
                        },
                        data: [
                                      { value: allocationData.stkValNaPct, name: '股票' },
                                      { value: allocationData.bndValNaPct, name: '债券' },
                                      { value: allocationData.fndValNaPct, name: '基金' },
                                      { value: allocationData.bndValNaPct, name: '银行存款' },
                                      { value: allocationData.othValNaPct, name: '其他' }
                        ]
                      }

                    ]
                  })
                } else if (this.type === 'hypz') {
                  const allocationData = this.allocationData.hypz[0]
                  const induConcRatio = allocationData.induConcRatio
                  const data = []
                  const legendData = []
                  for (const key in allocationData) {
                    data.push({
                      value: allocationData[key],
                      name: key
                    })
                    legendData.push(key)
                  }
                  this.chart.setOption({
                    title: {
                      text: '行业集中度：' + (100 * induConcRatio).toFixed(2) + '%',
                      textStyle: {
                        fontSize: 12
                      },
                      right: 20,
                      top: 10
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        return params.seriesName + '</br>' + params.name + ': ' + params.value.toFixed(2) + '(' + params.percent.toFixed(1) + '%)'
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'left',
                      top: 20,
                      right: 20,
                      data: legendData
                    },
                    color: ['#54a2e4', '#dddee0', '#ebebed', '#f6f6f6', '#f6f6f6'],
                    series: [
                      {
                        name: '行业配置',
                        type: 'pie',
                        radius: ['20%', '80%'],
                        label: {
                          normal: {
                            show: false
                          }
                        },
                        data: data
                      }

                    ]
                  })
                }
              })
        }
      },
      mounted () {
        this.initPie()
      }
    }
</script>
