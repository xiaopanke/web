<style lang="scss" scoped="">
    .scale{width: 100%;height: 276px;}
</style>
<template>
    <div class="scale" ref="scaleBar"></div>
</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['type', 'innerCode'],
      data () {
        return {

        }
      },
      computed: {
        scaleAlterationData: function () {
          const scaleAlterationData = this.$store.state.funcArchives.scaleAlterationInfo
          const xAxisData = []
          const yAxisData = []
          scaleAlterationData.forEach((item) => {
            xAxisData.push(item.endDate)
            yAxisData.push((item.netValue / 100000000).toFixed(2))
          })
          return {
            xAxisData: xAxisData,
            yAxisData: yAxisData
          }
        },
        holderStructureData: function () {
          const scaleAlterationData = this.$store.state.funcArchives.scaleAlterationInfo
          const xAxisData = []
          const jgcyblData = []
          const grcyblData = []
          const nbcyblData = []
          scaleAlterationData.forEach((item) => {
            xAxisData.push(item.endDate)
            if (item.orgHldPct) {
              jgcyblData.push(item.orgHldPct)
            } else {
              jgcyblData.push(0)
            }
            if (item.indiHldPct) {
              grcyblData.push(item.indiHldPct)
            } else {
              grcyblData.push(0)
            }
            if (item.innerHldPct) {
              nbcyblData.push(item.innerHldPct)
            } else {
              nbcyblData.push(0)
            }
          })
          return {
            xAxisData: xAxisData,
            jgcyblData: jgcyblData,
            grcyblData: grcyblData,
            nbcyblData: nbcyblData
          }
        }
      },
      methods: {
        initPie: function () {
          this.chart = echarts.init(this.$refs.scaleBar)
          const _this = this
          this.$store.dispatch('funcArchives/getScaleAlterationInfo', { innerCode: this.innerCode })
                    .then(() => {
                      if (this.type === 'gmbd') {
                        this.chart.setOption({
                          title: {
                            text: '净资产（亿元）',
                            textStyle: {
                              fontSize: 12
    
                            },
                            left: 0,
                            top: 10
                          },
                          tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                              return _this.formatDateYear(params[0].name) + '</br>净资产规模：' + params[0].value + '亿元'
                            }
                          },
                          color: ['#5197d5'],
                          grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                          },
                          xAxis: [
                            {
                              type: 'category',
                              axisLabel: {
                                formatter: function (value) {
                                  return _this.formatDate(value)
                                }
                              },
                              data: this.scaleAlterationData.xAxisData
                            }
                          ],
                          yAxis: [
                            {
                              type: 'value'
                            }
                          ],
                          series: [
                            {
                              name: '直接访问',
                              type: 'bar',
                              barWidth: '60%',
                              data: this.scaleAlterationData.yAxisData
                            }
                          ]
                        })
                        this.$emit('updateTime', this.formatDateYear(this.scaleAlterationData.xAxisData[0]))
                      } else if (this.type === 'cyrjg') {
                        this.chart.setOption({
                          tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                              let s = _this.formatDateYear(params[0].name)
                              for (let i = 0; i < params.length; i++) {
                                s = s + '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span> ' + params[i].seriesName + ' : ' + params[i].value.toFixed(2) + '%'
                              }
                              return s
                            }
                          },
                          color: ['#84b2e6', '#444d78', '#80c5a8'],
                          grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                          },
                          xAxis: [
                            {
                              type: 'category',
                              axisLabel: {
                                formatter: function (value) {
                                  return _this.formatDate(value)
                                }
                              },
                              data: this.holderStructureData.xAxisData
                            }
                          ],
                          yAxis: [
                            {
                              type: 'value'
                            }
                          ],
                          series: [
                            {
                              name: '机构持有比例',
                              type: 'bar',
                              // barWidth: '60%',
                              data: this.holderStructureData.jgcyblData
                            },
                            {
                              name: '个人持有比例',
                              type: 'bar',
                             // barWidth: '60%',
                              data: this.holderStructureData.grcyblData
                            },
                            {
                              name: '内部持有比例',
                              type: 'bar',
                              // barWidth: '60%',
                              data: this.holderStructureData.nbcyblData
                            }
                          ]
                        })
                      }
                    })
        },
        formatDate: function (date) {
          date = date.toString()
          const m = date.substring(4, 6)
          const d = date.substring(6)
          return m + '-' + d
        },
        formatDateYear: function (date) {
          date = date.toString()
          const y = date.substring(0, 4)
          const m = date.substring(4, 6)
          const d = date.substring(6)
          return y + '-' + m + '-' + d
        }
      },
      mounted () {
        this.innerCode = '050003.CW'
        this.initPie()
      }
    }
</script>
