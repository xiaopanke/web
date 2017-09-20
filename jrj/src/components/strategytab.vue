<style lang="scss" scoped="">
    .strategytab{}
    .tabbd {color: #666;border:1px solid #ccc;}
    .tabbd2 {border:1px solid #ccc;}
    .tabbd .dec{ margin: 10px;}
    .tabbd ul{color: #191919;margin:0 10px;}
    .tabbd ul li{margin-bottom:5px;}
    .tabbd ul span{color: #666;}
    h3{color: #191919;font-weight: normal;font-size: 12px;line-height: 30px;margin-left:10px;}
    .btnbox{border: 1px solid #2388da; margin-bottom: 10px;border-radius: 2px;overflow: hidden; cursor: pointer;}
    .btnbox span{float: left;width:50%;box-sizing: border-box;text-align: center;line-height: 26px;color: #2388da;}
    .btnbox .cur{background: #2388da;color: #fff;}
</style>
<template>
  <div class="strategytab">
    <div class="btnbox clearfix">
      <span :class="tabcur1 ? 'cur' :''" @click="tabfn($event)">{{spantxt1 ? spantxt1 : '基础配置'}}</span>
      <span :class="tabcur1 ? '' :'cur'" @click="tabfn($event)">{{spantxt2 ? spantxt2 : '调仓方案/调仓记录'}}</span>
    </div>
    <div class="tabbd" v-if="tabcur1">
      <div>
        <p class="dec">这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。</p>
        <p class="dec">这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。</p>
        <h3>组合事件：</h3>
        <ul>
          <li>
            <p>【分红】<span>2017-08-13</span></p>
            <p>基金[040046 华安纳斯达克100]分红</p>
          </li>
          <li>
            <p>【调仓】<span>2017-08-12</span></p>
            <p>收益率达到10%，进行[止盈调仓]</p>
          </li>
          <li>
            <p>【基金经理变更】<span>2017-08-12</span></p>
            <p>基金[040046 华安纳斯达克100]更新基金经理</p>
          </li>
          <li>
            <p>【基金经理变更】<span>2017-08-11</span></p>
            <p>基金[040046 华安纳斯达克100]更新基金经理</p>
          </li>
          <li>
            <p>【调仓】<span>2017-08-10</span></p>
            <p>模型发出信号，进行[阈值调仓]</p>
          </li>
          <li>
            <p>【调仓】<span>2017-08-10</span></p>
            <p>运行达到100天，进行[定期调仓]</p>
          </li>
          <li>
            <p>【调仓】<span>2017-08-10</span></p>
            <p>收益率达到-5%，进行[止损调仓]</p>
          </li>
        </ul>

      </div>
    </div>
    <div class="tabbd2" v-if="!tabcur1">
      <locationparam v-bind:h4show="h4show"></locationparam>
      <locationrecord></locationrecord>
    </div>
  </div>

</template>
<script>
import locationrecord from 'components/locationrecord'
import locationparam from 'components/locationparam'
export default{
  props: ['spantxt1', 'spantxt2'],
  data () {
    return {
      h4show: true,
      tabcur1: true
    }
  },
  computed: {

  },
  components: {
    locationrecord,
    locationparam
  },
  methods: {
    tabfn (v) {
      console.log(v.currentTarget.getAttribute('class'))
      if (v.currentTarget.getAttribute('class') !== 'cur') {
        this.tabcur1 = !this.tabcur1
      }
    }
  },
  mounted () {

  }
}
</script>
