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

.editstrategy{font-size: 12px;}
.color66{color: #666;}
.color19{color: #191919}
.colorblue{color:#2388da}
.subhd li{float:left;}
.section01{width:25%;background: #f2f2f2;padding: 5px;box-sizing: border-box;}
.section01 h3{ line-height: 28px;font-size: 14px;}
.section01 h3 i{ float: right;width:16px;height: 16px;background:url('../assets/images/z3img/ques.png') no-repeat center center;cursor: pointer;}
.section01 select{width:300px;}
.section01 .txt{font-size: 12px;color: #191919; line-height: 20px;margin:20px 0;}
.section01 .gushi span{ color: #666;font-size: 12px;line-height: 22px;}
.section01 .gushi .month{color: #191919; margin-left: 10px;}
.section01 .gushi li{ margin-bottom: 10px;}
.section01 .gushi li *{float: left; }
.section01 .gushi input{padding: 0;width:120px;height: 20px; padding-left: 5px;line-height: 20px;}

.section02{width:35%}
.section03{width:40%}

.sec_03_bd ul{height: 270px;overflow-y: auto;}
.sec_03_bd li{ line-height: 30px;}
.sec_03_bd li *{ float: left;}
.sec_03_bd li i{ margin-right: 28px;}
.sec_03_bd li b{width:48px;height:18px;background:url(../assets/images/z3img/wdx.png);margin-top:5px; }
.sec_03_bd li input{width:200px;height: 30px;margin:0 5px;}
.sec_03_bd li i{}
.numbox { margin-top: 6px;}
.numbox li{float: left;width:31%;padding-left:20px; line-height: 40px;}
.numbox input{width:70px;height: 22px;line-height: 22px;text-align: center;}
.numbox li:last-child{width:60%}
.numbox li:last-child>select{float: left;margin-top: 10px;margin-right: 10px;}
.numbox li:last-child>span{float: left;}
.numbox .time{float: left;}
.btn{width:270px;margin:20px auto;}
.btn a{width:108px;line-height: 28px; text-align: center;border-radius: 2px; box-sizing:border-box;background: #2388da; color: #fff;}
.btn a:last-child{border:1px solid #2388da; background: none; color: #2388da;}
.con_l{width:70%;}
.con_r{width:30%;box-sizing: border-box;border: 1px solid #f2f2f2;border-bottom: none;padding-top: 10px;}
.con_r p{color: #191919;padding:0 20px;}
.con_r h3{ margin-top:20px;margin-bottom: 8px;font-size: 12px;margin-left: 20px;}
.listbox{border-top:1px solid #f2f2f2;}
.listbox .list>div{border-bottom: 1px solid #f2f2f2;line-height: 24px;padding-bottom: 7px;padding-top: 7px;}
.listbox .list>div ul{padding-left: 20px;}
.listbox .list .jilu1{ padding-left: 20px;padding-bottom: 0;padding-top: 0;line-height: 34px;}
.listbox span{ color: #666;float: left;}
.listbox  li span{ margin-right: 8px;}
.listbox i{ color: #191919;margin-right: 10px;float: left;}
.listbox p i{margin-right: 36px;}
.listbox .jilu3 p{ padding-top: 20px;}
.listbox .jilu3 p:first-child{padding-top:0;}
.jilu2 span{width:110px;}
.jilu1{cursor: pointer;}
.jilu1 i{float:right;width:10px;height: 7px;background: url(../assets/images/z3img/arrow.png);margin-top:13px;}
.jilu1 .close{background-position: 0 -9px;}
.con_lup li{width:88px;float: left;text-align: center; line-height: 28px;}
.con_lup li *{display: block;}
.con_lup li span:first-child{color: #666;}
input[type=range]::-webkit-slider-runnable-track {
  background: linear-gradient(to left, #059CFA, white 100%, white);
  height: 13px;
  border-radius: 10px;
}
</style>
<template>
<div class="editstrategy">
  <div class="hd">
    <a href="#">测试组合1号</a>
    <span>创建时间：<i>2017.03.02</i></span>
    <span>修改时间：<i>2017.03.02</i></span>
    <span>复制</span>
    <span>删除</span>
  </div>
  <ul class="subhd clearfix">
    <li>
      <span>基金池：</span>
      <i>测试基金池1号</i>
    </li>
    <li>
      <span>现金基金：</span>
      <i>482002 工银货币</i>
    </li>
    <li>
      <span>投资方式：</span>
      <i>一次性投资</i>
    </li>
    <li>
      <span>初始金额/定投金额：</span>
      <i>1,00,000元</i>
    </li>
  </ul>
  <div class="bd">
    <div class="up clearfix">
      <div class="section01 fl">
        <h3>智能配置方案：<i></i></h3>
        <select class="" name="">
          <option value="0">手动配置</option>
          <option value="1" selected>智能-均衡配置方案</option>
          <option value="2">智能-风险最优配置方案</option>
          <option value="3">智能-趋势轮动配置方案</option>
        </select>
        <p class="txt">均衡配置方案介绍<br />如预期收益/风险估算期超过最长回测周期，则直接使用最大值进行回测。</p>
        <ul class="gushi">
          <li class="clearfix">
            <span>预期收益估算期：</span><input type="text" name="" value="3" placeholder="3"><span class="month">月</span>
          </li>
          <li class="clearfix">
            <span>预期风险估算期：</span><input type="text" name="" value="3" placeholder="3"><span class="month">月</span>
          </li>
        </ul>
        <h3>组合风险：</h3>
        <progressbar></progressbar>
      </div>
      <div class="section02 fl">
          <strategypie :data="datapie"></strategypie>
      </div>
      <div class="section03 fl">
          <div class="sec_03">
            <b class="color19">现金：</b>
            <span class="color66">482002 工银货币</span>
          </div>
          <div class="sec_03_bd">
            <ul>
              <li class="clearfix">
                  <i class="colorblue">000021</i>
                  <span>华夏优势增长混合</span>
                  <b></b>
                  <input type="range" name=""  value="0" v-model="range1">
                  <span>{{range1}}%</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
    <div class="down clearfix numbox">
        <ul>
          <li>
            <span>定期调仓：</span>
            <input type="text" name="" value="0">
            <span>个交易日后，进行调仓</span>
          </li>
          <li>
            <span>止盈调仓：</span>
            <input type="text" name="" value="0">
            <span>%后，止盈，收益调至现金</span>
          </li>
          <li>
            <span>止损调仓：</span>
            <input type="text" name="" value="">
            <span>%后，止损，调至现金</span>
          </li>
          <li>
            <span>对比基准：</span>
            <select class="" name="">
              <option value="0">沪深300</option>
              <option value="1">标普500</option>
              <option value="2">上证指数</option>
              <option value="3">上证企债</option>
            </select>
          </li>
          <li>
            <span>回测时间：</span>
            <select class="" name="">
              <option value="0">成立以来</option>
              <option value="1">近1年</option>
              <option value="2">近2年</option>
              <option value="3">近3年</option>
              <option value="4">今年以来</option>
              <option value="5">自定义</option>
            </select>
            <div class="time">
              <dadianTime v-bind:starttime="beginTime" v-bind:endtime="endTime" v-on:starttimeChanged="startshowMsgFromChild" v-on:endtimeChanged="endshowMsgFromChild" />
            </div>

          </li>
        </ul>
    </div>
    <div class="btn clearfix">
      <a href="javascript:;" class="fl">开始回测</a>
      <a href="javascript:;" class="fr">保存组合</a>
    </div>
  </div>
  <div class="con cleafix">
    <div class="fl con_l">
      <ul class="clearfix con_lup">
        <li>
          <span>总收益</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>年化收益</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>超额收益</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>波动率</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>夏普比</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>最大回撤</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>Alpha</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>Beta</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>调仓次数</span>
          <span>43.56%</span>
        </li>
        <li>
          <span>建仓周期</span>
          <span>43.56%</span>
        </li>
      </ul>
    </div>
    <div class="fl con_r">
      <p>这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。<br /><br />这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。这里介绍组合的特色，以及推荐理由，需要自动生成。</p>
      <h3>基本信息</h3>
      <p>投资方式：一次性投资<br />组合最低起购金额：10000元<br />预计调仓周期：T+5天<br />组合风险：5(中风险)<br />建仓预估手续费：0.05%<br />单次调仓预估续费：0.1%</p>

      <locationparam v-bind:h4show="h4show"></locationparam>
      <locationrecord></locationrecord>
    </div>
  </div>
</div>
</template>
<script>
import 'whatwg-fetch'
import progressbar from 'components/progressbar'
import dadianTime from 'components/dadian-time'
import strategypie from 'components/strategypie'
import locationrecord from 'components/locationrecord'
import locationparam from 'components/locationparam'
import {
  mapState
} from 'vuex'
// import { domain } from '../z3tougu/config'

export default {
  data () {
    return {
      beginTime: this.getNowFormatDate(),
      endTime: this.getNowFormatDate(),
      datapie: 123,
      h4show: true, // 控制调仓参数里面的h4是否显示,
      range1: 0
    }
  },
  components: {
    progressbar,
    dadianTime,
    strategypie,
    locationrecord,
    locationparam
  },
  computed: mapState({}),
  mounted () {

  },
  methods: {
    pad2 (n) {
      return n < 10 ? '0' + n : n
    },
    getNowFormatDate () {
      var date = new Date()
      return date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) + '-' + this.pad2(date.getDate()) + ' ' + this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes()) + ':' + this.pad2(date.getSeconds())
    },
    startshowMsgFromChild (data) {
      this.beginTime = data
    },
    endshowMsgFromChild (data) {
      this.endTime = data
    }
  }
}
</script>
