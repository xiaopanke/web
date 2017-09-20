<style scoped>
@import '../assets/css/reset.css';
input {
  outline: none;
}

body {
  background: #fff;
}
.clearfix:after{ display: block;content: ''; clear: both;}
a,
.blue {
  color: #2a8ae1;
}

.runstatestrategy{font-size: 12px;}
.con_l{width:70%;float: left;padding: 10px;box-sizing: border-box;}
.con_r{width:30%;float: left;}
.conlitem01 table{width:100%;text-align: center; }
.conlitem01 table *{padding: 0;}
.conlitem01 table th{color: #666;font-weight: normal;}
.conlitem01 table td{height:30px;}

.conlitem02{width:700px;}
.conlitem02 li{float: left;width:25%; line-height: 30px; color: #666;}
.conlitem02 li span{color: #191919}
</style>
<template>
<div class="runstatestrategy">
  <div class="hd">
    <a href="#">测试组合1号</a>
    <span>创建时间：<i>2017.03.02</i></span>
    <span>修改时间：<i>2017.03.02</i></span>
    <span>复制</span>
    <span>删除</span>
  </div>
  <div class="con clearfix">
      <div class="con_l">
        <div class="conlitem01">
          <table class="clearfix">
            <tr>
              <th>净值(2017-08001)</th>
              <th>日涨跌</th>
              <th>累计收益</th>
              <th>年化收益</th>
              <th>最大回撤</th>
              <th>波动率</th>
              <th>夏普比</th>
              <th>超额收益</th>
              <th>持仓基金</th>
              <th>调仓次数</th>
            </tr>
            <tr>
              <td>1.0123</td>
              <td>-2.23%</td>
              <td>32.4%</td>
              <td>12.1%</td>
              <td>1.0123</td>
              <td>-2.23%</td>
              <td>32.4%</td>
              <td>12.1%</td>
              <td>1.0123</td>
              <td>-2.23%</td>
            </tr>
          </table>
        </div>
        <div class="conlitem02">
          <ul class="clearfix">
            <li>组合起购金额：<span>10000.00元</span></li>
            <li>投资方式：<span>一次性投资</span></li>
            <li>建仓预估手续费：<span>0.5%</span></li>
            <li>调仓预估平均手续费：<span>0.5%</span></li>
            <li>配置方案：<span>智能-均衡配置方案</span></li>
            <li>预期收益估算期：<span>4月</span></li>
            <li>预期风险估算期：<span>4月</span></li>
          </ul>
        </div>
      </div>
      <div class="con_r">
        <strategytab></strategytab>
      </div>
  </div>

</div>
</template>
<script>

import strategytab from 'components/strategytab'
import {
  mapState
} from 'vuex'
// import { domain } from '../z3tougu/config'

export default {
  data () {
    return {
      h4show: true // 控制调仓参数里面的h4是否显示
    }
  },
  components: {
    strategytab
  },
  computed: mapState({}),
  mounted () {

  },
  methods: {
  }
}
</script>
