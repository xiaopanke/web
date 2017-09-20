<style lang="scss">
    @import '../../assets/css/base.css';
    *{box-sizing: border-box;font-family: '微软雅黑';font-size:12px;}
    p{margin: 0px;}
    .wrapper{padding: 0 10px;background-color: #fff;min-width: 1217px;}
    .allocation-wrap,.scale-wrap{width: 67%;margin-top: 10px;}
    .allocation-list,.scale-list{width: 49%;border: 1px solid #ddd;float: left;}
    .allocation-list:nth-child(1),.scale-list:nth-child(1){margin-right:2%;}
    .allocation-title,.scale-title{height:32px;border-bottom: 1px solid #ddd;padding-left: 10px;}
    .allocation-title>span,.scale-title>span{height:32px;line-height: 32px;}
</style>
<template>
    <div class="wrapper">
        <BasicInfo :innerCode="innerCode"></BasicInfo>
        <FundBuyInfo :innerCode="innerCode"></FundBuyInfo>
        <div class="allocation-wrap clearfix">
            <div class="allocation-list">
                <div class="allocation-title clearfix">
                    <span class="fl">资产配置</span>
                    <span class="fr">截止日期
                        <select>
                           <option v-for=""></option>
                        </select>
                    </span>
                </div>
                <AllocationPie :type="zcpzType" :innerCode="innerCode"></AllocationPie>
            </div>
            <div class="allocation-list">
                <div class="allocation-title clearfix">
                    <span class="fl">行业配置</span>
                    <span class="fr">截止日期
                        <select>
                           <option v-for=""></option>
                        </select>
                    </span>
                </div>
                <AllocationPie :type="hypzType" :innerCode="innerCode"></AllocationPie>
            </div>
        </div>
        <div class="scale-wrap">
            <div class="scale-list">
                <div class="scale-title clearfix">
                    <span class="fl">规模变动</span>
                    <span class="fr" style="padding-right:10px;">更新日期 {{updateTime}}</span>
                </div>
                <ScaleBar :type="gmbdType" :innerCode="innerCode" @updateTime="getUpdateTime"></ScaleBar>
            </div>
            <div class="scale-list">
                <div class="scale-title clearfix">
                    <span class="fl">持有人结构</span>
                    <span class="fr" style="padding-right:10px;">更新日期 {{updateTime}}</span>
                </div>
                <ScaleBar :type="cyrjgType" :innerCode="innerCode" @updateTime="getUpdateTime"></ScaleBar>
            </div>
        </div>
    </div>
</template>
<script>
    import FundBuyInfo from 'components/fund-archives/fund-periodrise'
    import BasicInfo from 'components/fund-archives/basic-info'
    import AllocationPie from 'components/fund-archives/allocation-pie'
    import ScaleBar from 'components/fund-archives/scale-bar'
    export default{
      data () {
        return {
          innerCode: '000001.CW',
          zcpzType: 'zcpz',
          hypzType: 'hypz',
          gmbdType: 'gmbd',
          cyrjgType: 'cyrjg',
          updateTime: ''
        }
      },
      components: {
        FundBuyInfo,
        BasicInfo,
        AllocationPie,
        ScaleBar
      },
      methods: {
        getUpdateTime: function (date) {
          this.updateTime = date
        }
      }
    }
</script>
