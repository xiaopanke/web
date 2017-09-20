<style lang="scss" scoped="">
    .locationrecord{}
    .locationrecord p{color: #191919;padding:0 20px;}
    .locationrecord h3{ margin-top:20px;margin-bottom: 8px;font-size: 12px;margin-left: 20px;}
    .locationrecord .list>div{border-bottom: 1px solid #f2f2f2;line-height: 24px;padding-bottom: 7px;padding-top: 7px;}
    .locationrecord .list>div ul{padding-left: 20px;}
    .locationrecord .list .jilu1{ padding-left: 20px;padding-bottom: 0;padding-top: 0;line-height: 34px;}
    .locationrecord span{ color: #666;float: left;}
    .locationrecord  li span{ margin-right: 8px;}
    .locationrecord i{ color: #191919;margin-right: 10px;float: left;}
    .locationrecord p i{margin-right: 36px;}
    .locationrecord .jilu3 p{ padding-top: 20px;}
    .locationrecord .jilu3 p:first-child{padding-top:0;}
    .jilu2 span{width:110px;}
    .jilu1{cursor: pointer;}
    .jilu1 i{float:right;width:10px;height: 7px;background: url(../assets/images/z3img/arrow.png);margin-top:13px;}
    .jilu1 .close{background-position: 0 -9px;}
    .locationrecord li *{display: block;}
    .locationrecord li span:first-child{color: #666;}
</style>
<template>
  <div class="locationrecord">
    <h3>调仓记录</h3>
    <div class="listbox">
      <div class="list">
        <div class="jilu1 clearfix">
            <span>2017-02-01</span>
            <i class="close"></i>
        </div>
        <div class="jilu2">
          <p class="clearfix"><span>调仓原因</span><i>定期调仓</i></p>
          <p class="clearfix"><span>建仓/调仓间隔</span><i>200天</i></p>
        </div>
        <div class="jilu3">
          <p class="clearfix"><i>债券型</i><i>0.00%-20.00%</i></p>
          <ul>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
          </ul>
          <p class="clearfix"><i>债券型</i><i>0.00%-20.00%</i></p>
          <ul>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
          </ul>
        </div>
      </div>
      <div class="list">
        <div class="jilu1 clearfix">
            <span>2017-02-01</span>
            <i class="close"></i>
        </div>
        <div class="jilu2">
          <p class="clearfix"><span>调仓原因</span><i>定期调仓</i></p>
          <p class="clearfix"><span>建仓/调仓间隔</span><i>200天</i></p>
        </div>
        <div class="jilu3">
          <p class="clearfix"><i>债券型</i><i>0.00%-20.00%</i></p>
          <ul>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
          </ul>
          <p class="clearfix"><i>债券型</i><i>0.00%-20.00%</i></p>
          <ul>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
            <li class="clearfix"><span>519078</span><i>汇添富增强收益债券A</i><i>0.00%-20.00%</i></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
    export default{
      props: [],
      data () {
        return {

        }
      },
      computed: {

      },
      methods: {

      },
      mounted () {

      }
    }
</script>
