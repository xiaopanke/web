<style lang="scss" scoped="">
    .strategypie>div{width: 100%;height: 240px;}
    .stratelist{margin-left: 50px;}
    .stratelist li{float:left;width:130px; line-height: 24px;}
    .stratelist li span{float: left;width:14px;height: 14px;background: #99dae1; margin-top:4px;margin-right: 8px;}
    .stratelist li i{float: left;}
</style>
<template>
  <div class="strategypie">
    <div class="" ref="strategypie"></div>
    <ul class="stratelist clearfix">
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>
      <li>
          <span class="xianjin"></span>
          <i>现金：5%</i>
      </li>

    </ul>
  </div>

</template>
<script>
    import echarts from 'echarts'
    export default{
      props: ['data'],
      data () {
        return {
          endDate: '20170630',
          option: {
            tooltip: {
              trigger: 'item',
              formatter: '{b}: {c} ({d}%)'
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '90%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '20',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                ]
              }
            ]
          }
        }
      },
      computed: {

      },
      methods: {
        initPie: function () {
          this.chart = echarts.init(this.$refs.strategypie)
          this.chart.setOption(this.option)
        }
      },
      mounted () {
        this.initPie()
      }
    }
</script>
