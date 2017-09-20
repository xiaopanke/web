<style lang="scss" scoped="">
   .fund-zf{width: 67%;border:1px solid #ddd;}
    .fund-zf-top{position: relative;}
    .endtime{position: absolute;top: 3px;right:10px;}
    .fund-zf-con>li{float: left;}
    .zf-labels{width: 12%;}
    .zf-column-list{width: 11%;}
   .zf-column>li{height:30px;line-height: 30px;}
    .zf-column>li:nth-child(1){border-bottom: 1px solid #ddd;height:42px;line-height: 42px;}
    .zf-labels li{padding-left: 10px;}
</style>
<template>
    <div class="fund-zf">
        <div class="fund-zf-top">
            <NavBar :data="navText" :type="type" v-on:changeType="changeNavType"></NavBar>
            <span class="endtime">截止至 {{endTime}}</span>
        </div>
        <ul class="fund-zf-con clearfix">
            <li class="zf-labels">
                <ul class="zf-column">
                    <li style="color: #fff;">0</li>
                    <li>阶段涨幅：</li>
                    <li>同类平均：</li>
                    <li>比较基准：</li>
                    <li>沪深300：</li>
                    <li>同类收益排名：</li>
                    <li>四分位排名：</li>
                </ul>
            </li>
            <li v-for="item of zfTitle.jdzf1" class="zf-column-list">
                <ul class="zf-column">
                    <li>{{item}}</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import NavBar from 'components/nav-bar'
    export default{
      props: ['innerCode'],
      data () {
        return {
          navText: [['阶段涨幅', 'jdzf1'], ['季度涨幅', 'jdzf2'], ['年度涨幅', 'ndzf']],
                // type: this.showType === undefined ? 'syqxt' : this.showType
          type: 'jdzf1',
          endTime: '',
          statPeriod: '',
          zfTitle: {
            'jdzf1': ['近1周', '近1月', '近3月', '近6月', '今年来', '近1年', '近2年', '近3年']
           // 'jdzf2': ['近1周', '近1月', '近3月', '近6月', '今年来', '近1年', '近2年', '近3年']
          }
        }
      },
      components: {
        NavBar
      },
      methods: {
        changeNavType (data) {
          this.type = data
        },
        getQuarterTitle (date) {
    
        }
      }
    }
</script>
