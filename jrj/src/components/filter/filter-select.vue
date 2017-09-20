<template>
  <!-- 筛选条件 -->
  <div class="filterCondition clearfix">
    <div class="filter-item clearfix">
      <span class="label">分类筛选：</span>
      <ul class="classify">
        <li v-for="(type,index) in filterType" :class='{"active": index==typeIndex}' v-on:click="change1"  @click='selectType($event,index)' :value="type.value">{{type.name}}</li>
      </ul>
    </div>
    <!-- 全部 -->
    <div>
      <div class="filter-item clearfix">
        <span class="label">通用条件：</span>
        <ul class="selectBox">
          <li>
            <label><div class="pr tsk">交易状态：<div class="text">交易日15点前显示当天基金交易状态，15点后显示下个交易日基金交易状态</div></div></label>
            <select v-model='filterParams.jyzt' :disabled='isDisabled' :class='{"yellow": filterParams.jyzt.indexOf("all")<0}' ><option v-for="(val,key) in descRips" :value="key">{{val}}</option></select>
          </li>
          <li>
            <label class="pr tsk">基金规模：<div class="text">根据最近一次基金季报/年报获得</div></label>
            <select v-model='filterParams.jjgm' :disabled='isDisabled' :class='{"yellow": filterParams.jjgm.indexOf("all")<0}'><option v-for="(val,key) in jjgm" :value="key">{{val}}</option></select>
          </li>
          <li>
            <label class="pr tsk">成立时间：<div class="text">基金公布的成立时间</div></label>
            <select v-model='filterParams.clsj'  :disabled='isDisabled' :class='{"yellow": filterParams.clsj.indexOf("all")<0}'><option v-for="(val,key) in foundedTime" :value="key">{{val}}</option></select>
          </li>
          <li>
            <label class="pr tsk">大额限制：<div class="text">基金大额申购限制</div></label>
            <select v-model='filterParams.dexz'  :disabled='isDisabled' :class='{"yellow": filterParams.dexz.indexOf("all")<0}'><option v-for="(val,key) in bigLimit" :value="key">{{val}}</option></select>
          </li>
        </ul>
      </div>
      <div class="filter-item clearfix">
        <span class="label">业绩表现：</span>
        <ul class="selectBox">
          <li>
            <label class="pr tsk">收益率表现1：<div class="text">一段自然日内基金的涨跌幅</div></label>
            <select  v-model='filterParams.sylbx1' :disabled='isDisabled' :class='{"yellow": filterParams.sylbx1.indexOf("all")<0}'><option v-for="item in sylbx" :value="item.itemId">{{item.itemName}}</option></select>
          </li>
          <li>
            <label class="pr tsk">收益率表现2：<div class="text">一段自然日内基金的涨跌幅</div></label>
            <select v-model='filterParams.sylbx2' :disabled='isDisabled' :class='{"yellow": filterParams.sylbx2.indexOf("all")<0}'><option v-for="item in sylbx" :value="item.itemId">{{item.itemName}}</option></select>
          </li>
          <li>
            <label class="pr tsk">年化收益率：<div class="text">根据基金历史年化收益计算，基金成立不足1年此数据仅供参考</div></label>
            <select v-model='filterParams.nhsyl':disabled='isDisabled' :class='{"yellow": filterParams.nhsyl.indexOf("all")<0}'><option v-for="item in nhsyl" :value="item.itemId">{{item.itemName}}</option></select>
          </li>
        </ul>
      </div>
      <div class="filter-item clearfix">
        <span class="label" v-if='typeIndex !=6'>分类条件：</span>
        <!-- 全部 -->
        <ul class="fltj selectBox">
          <li v-if='typeIndex ==0 || typeIndex ==1 || typeIndex ==2' class="pr">
            <label class="pr tsk">行业：<div class="text">依据基金重仓股及申万一级行业划分</div></label>
            <div @click='toggleShow' class="select"  :class="{'yellow': !yellow,'disabled':checkDisabled}">{{checkName}}</div>
            <transition name="fade2">
              <div v-if="seleteCheckboxShow" class='checkedBox'>
                <ul>
                  <li v-for="item in trades"><label><input v-model='checkedVal' type="checkbox" :name="item.name" :value='item.value' @click="checkBox($event,item)" :disabled='checkDisabled'/>{{item.name}}</label></li>
                </ul>
              </div>
            </transition>
          </li>
          <li v-if='typeIndex ==0 || typeIndex ==1 || typeIndex ==2'>
            <label class="pr tsk">投资风格：<div class="text">本月基金市值大小，价格/成长属性</div></label>
            <select v-model='filterParams.tzfg' :disabled='isDisabled' :class='{"yellow": filterParams.tzfg.indexOf("all")<0}'>
              <option v-for='(val,key) in investmentStyle' :value='key'>{{val}}</option>
            </select>
          </li>
          <li v-if='typeIndex ==0 || typeIndex ==1 || typeIndex ==2'>
            <label class="pr tsk">机会/风险期：<div class="text">从基金行业、投资风格等多维度，通过智能算法模型，提供基金建仓或增仓时机</div></label>
            <select v-model='filterParams.jhfxq' :disabled='isDisabled' :class='{"yellow": filterParams.jhfxq.indexOf("all")<0}'>
              <option v-for='(val,key) in opportunity' :value='key'>{{val}}</option>
            </select>
          </li>
          <li v-if='typeIndex ==0 || typeIndex ==1 || typeIndex ==2'>
            <label class="pr tsk">最大回撤：<div class="text">指定自然日内，基金最大回撤</div></label>
            <select v-model='filterParams.zdhc' :disabled='isDisabled' :class='{"yellow": filterParams.zdhc.indexOf("all")<0}'>
              <option v-for="item in zdhc"  :value="item.itemId">{{item.itemName}}</option>
            </select>
          </li>
          <li v-if='typeIndex ==0 || typeIndex ==1 || typeIndex ==2'>
            <label class="pr tsk">夏普比：<div class="text">指定自然日内，基金夏普比</div></label>
            <select v-model='filterParams.xpb' :disabled='isDisabled' :class='{"yellow": filterParams.xpb.indexOf("all")<0}'>
              <option v-for="item in xpb"  :value="item.itemId">{{item.itemName}}</option>
            </select>
          </li>
          <li v-if='typeIndex ==0 || typeIndex ==1 || typeIndex ==2'>
            <label class="pr tsk">超额收益：<div class="text">指定自然日内，基金超额收益率</div></label>
            <select v-model='filterParams.cesyl' :disabled='isDisabled' :class='{"yellow": filterParams.cesyl.indexOf("all")<0}'>
              <option v-for="item in cesyl" :value="item.itemId">{{item.itemName}}</option>
            </select>
          </li>
          <li v-if=" typeIndex ==3 || typeIndex ==4 || typeIndex ==5">
            <label class="pr tsk">最大回撤：<div class="text">指定自然日内，基金最大回撤</div></label>
            <select v-model='filterParams.zdhc' :disabled='isDisabled' :class='{"yellow": filterParams.zdhc.indexOf("all")<0}'>
              <option v-for="item in zdhc"  :value="item.itemId">{{item.itemName}}</option>
            </select>
          </li>
          <li v-if=" typeIndex ==3 || typeIndex ==4 || typeIndex ==5">
            <label class="pr tsk">夏普比：<div class="text">指定自然日内，基金夏普比</div></label>
            <select v-model='filterParams.xpb' :disabled='isDisabled' :class='{"yellow": filterParams.xpb.indexOf("all")<0}'>
              <option v-for="item in xpb"  :value="item.itemId">{{item.itemName}}</option>
            </select>
          </li>
          <li v-if="typeIndex ==7">
            <label class="pr tsk">封闭期：<div class="text">理财型基金封闭周期</div></label>
            <select v-model='filterParams.fbq' :disabled='isDisabled' :class='{"yellow": filterParams.fbq.indexOf("all")<0}'>
              <option v-for="(val,key) in fbq" :value="key">{{val}}</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 股票范围——指数下拉框数据
import * as Data from '../../z3tougu/constant/filter.js'
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      filterType: [{ name: '全部', value: 'jjlx_all' }, { name: '股票型', value: 'jjlx_gpx' }, { name: '混合型', value: 'jjlx_hhx' }, { name: '债券型', value: 'jjlx_zqx' }, { name: '指数型', value: 'jjlx_zsx' }, { name: 'QDII型', value: 'jjlx_qdiix' }, { name: '货币型', value: 'jjlx_hbx' }, { name: '理财型', value: 'jjlx_lcx' }],
      typeIndex: 0,
      descRips: Data.descrips,
      jjgm: Data.jjgm,
      foundedTime: Data.foundedTime,
      bigLimit: Data.bigLimit,
      trades: Data.trades,
      investmentStyle: Data.investmentStyle,
      opportunity: Data.opportunity,
      fbq: Data.fbq,
      isDisabled: true,
      checkedVal: [],
      checkDisabled: true,
      checkedNameVal: [],
      checkName: '全部',
      type: 'jjlx_all',
      hyStr: 'all',
      yellow: 'false',
      seleteCheckboxShow: false,
      filterParams: {
        jjlx: 'jylx_all',
        jyzt: 'jyzt_all',
        jjgm: 'jjgm_all',
        clsj: 'clsj_all',
        dexz: 'dexz_all',
        sylbx1: 'sylbx_all',
        sylbx2: 'sylbx_all',
        nhsyl: 'nhsyl_all',
        hy: 'all',
        tzfg: 'tzfg_all',
        jhfxq: 'jhfxq_all',
        zdhc: 'zdhc_all',
        xpb: 'xpb_all',
        cesyl: 'cesy_all',
        fbq: 'fbq_all'
      }
    }
  },
  methods: {
    selectType (e, index) {
      this.type = e.target.attributes.value.value
      this.typeIndex = index
      this.$emit('selectType', index, this.type)
      if (this.typeIndex !== 0) {
        this.isDisabled = false
        this.checkDisabled = false
        this.seleteCheckboxShow = false
      } else {
        this.isDisabled = true
        this.checkDisabled = true
      }

      if (this.typeIndex === 0) {
        this.seleteCheckboxShow = false
        this.initCheckedVal()
        this.yellow = true
      }
      this.getOptionData()
    },
    getOptionData () { // 获取下拉数据
      this.$store.dispatch('getSylbx', { idxId: 'sylbx', jjlx: this.type })
      this.$store.dispatch('getNhsyl', { idxId: 'nhsyl', jjlx: this.type })
      this.$store.dispatch('getZdhc', { idxId: 'zdhc', jjlx: this.type })
      this.$store.dispatch('getXpb', { idxId: 'xpb', jjlx: this.type })
      this.$store.dispatch('getCesyl', { idxId: 'cesyl', jjlx: this.type })
    },
    change1 (e) {
      this.type = e.target.attributes.value.value
    },
    checkBox (e, item) {
      var value = e.target.value
      var checked = e.target.checked
      if (value === 'all' && checked === true) {
        this.initCheckedVal()
      }
      if (value === 'all' && checked === false) {
        this.checkedVal = []
        this.filterParams.hy = 'all'
      }
      var vLength = this.checkedVal.length
      var isHyAll = this.checkedVal.indexOf('all')
      if (isHyAll > -1) {
        if (vLength === 28) {
          var index = this.checkedVal.indexOf('all')
          this.checkedVal.splice(index, 1)
        }
      }
      if (isHyAll < 0) {
        if (vLength === 28) {
          this.initCheckedVal()
        }
      }
      this.hyStrPj()
      this.checkBoxName(e, item)
    },
    hyStrPj () { // 下拉复选框拼接
      var vLength = this.checkedVal.length
      this.filterParams.hy = ''
      for (let i = 0; i < vLength; i++) {
        this.filterParams.hy += this.checkedVal[i].replace('hy_', '') + ','
      }
      this.filterParams.hy = this.filterParams.hy.substring(0, this.filterParams.hy.length - 1)
      this.yellow = false
      if (vLength > 28) {
        this.filterParams.hy = 'all'
        if (this.filterParams.hy === 'all') {
          this.yellow = true
        }
      }
      if (vLength <= 0) {
        this.filterParams.hy = 'all'
      }
    },
    toggleShow () {
      this.seleteCheckboxShow = !this.seleteCheckboxShow
    },
    initCheckedVal () { // 初始化下拉复选框
      this.checkedVal = ['all', 'hy_210000', 'hy_720000', 'hy_630000', 'hy_270000', 'hy_430000', 'hy_350000', 'hy_490000', 'hy_230000', 'hy_410000', 'hy_650000', 'hy_220000', 'hy_640000', 'hy_710000', 'hy_330000', 'hy_610000', 'hy_620000', 'hy_420000', 'hy_110000', 'hy_280000', 'hy_360000', 'hy_450000', 'hy_340000', 'hy_730000', 'hy_460000', 'hy_370000', 'hy_480000', 'hy_240000', 'hy_510000']
      this.filterParams.hy = 'all'
      this.checkName = '全部'
    },
    tradesVal () { // 初始化下拉复选框value值
      for (let i = 0; i < this.trades.length; i++) {
        this.checkedVal.push(this.trades[i].value)
        this.checkedNameVal.push(this.trades[i].name)
      }
    },
    checkBoxName (e, item) {
      var checked = e.target.checked
      this.trades.some((fund, index) => {
        var _this = this
        if (fund.value === item.value) {
          if (checked === false) {
            const _name = this.trades[index].name
            this.checkedNameVal.some((checkedName, index) => {
              if (checkedName === _name) {
                this.checkedNameVal.splice(index, 1)
                _this.checkName = ''
                this.checkedNameVal.forEach(function (item, index) {
                  _this.checkName += item + ','
                  if (item === '全部') {
                    _this.checkName = ''
                  }
                })
              }
            })
          } else {
            this.checkedNameVal.push(this.trades[index].name)
          }
        }
      })
    }
  },
  mounted () {
    this.getOptionData()
    this.tradesVal()
    this.hyStrPj()
  },
  computed: {
    ...mapState([
      'sylbx',
      'nhsyl',
      'zdhc',
      'xpb',
      'cesyl'
    ]),
    ...mapGetters({
      sylbx: 'sylbx',
      nhsyl: 'nhsyl',
      zdhc: 'zdhc',
      xpb: 'xpb',
      cesyl: 'cesyl'
    })
  },
  watch: {
    'filterParams': {
      deep: true,
      handler: function (oldVal, newVal) {
        this.$emit('query', newVal)
        this.$emit('exportFoundPool', newVal)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/common/variable.scss';
  @import '../../assets/css/reset.css';
  @import '../../assets/css/base.css';

  @mixin border_radius($num){-webkit-border-radius: $num;-moz-border-radius: $num;border-radius: $num;}
  select{
    -webkit-appearance: none;
    -moz-appearance:none;
    appearance: none;
    outline: 0;
    border: 0;
    background: 0;
    text-indent:4px;
  }
  .filter {
    background-color: #fff;
    font-size: $fontSize12;
    color: $colorFontTheme;
    padding: 10px;
  }
  .btn {
    display: inline-block;
    font-size: $fontSize12;
    color: $colorFontBlue;
    padding: 0 10px;
    height: 22px;
    line-height: 22px;
    background-color: $colorBackground;
    text-align: center;
    @include border_radius(3px);
  }
  .tabList {
    font-size: 0;
    height: 24px;
    li {
      display: inline-block;
      font-size: $fontSize12;
      color: $colorFontBlue;
      height: 24px;
      line-height: 24px;
      padding: 0 15px;
      cursor: pointer;
      &.active {
        color: #fff;
        background-color: #2388da;
      }
    }
  }
  .filterCondition {
    width: 100%;
    .filter-item{
      width: 108%;
      margin-top: 14px;
      .label{
        display:block;
        width:8%;
        height: 24px;
        line-height: 24px;
        float: left;
        color: $colorFontTheme;
      }
      >ul{
        display:block;
        width: 92%;
        float: left;
        font-size: 0;
        >li{
          display: inline-block;
          height: 24px;
          line-height: 24px;
          select,.select{
            font-family: '宋体';
            width: 72px;
            height: 24px;
            border:1px solid #ccc;
            background: url('../../assets/images/selectArrow.png') no-repeat 55px 9px;
            @include border_radius(3px);
            padding-right: 15px;
            text-indent: 4px;
            color:$colorFontTheme;
            padding-left: 4px
          }
          .select{
            display: inline-block;
            width: 50px;
            font-size: $fontSize12;
            color: $colorFontTheme;
            padding-left: 5px;
            cursor: pointer;
            overflow: hidden;
          }
          select:disabled,.select.disabled{
            color:$colorFontH
          }
          .yellow{
            background-color: #fff466;
          }
          label{
            .text{
              left: 31%;
              top:50%;
              transform: translate(-50%,-134%);
            }
          }
        }
      }
      .classify{
        li{
          cursor: pointer;
          color: $colorFontTheme;
          font-size: $fontSize12;
          padding: 0 14px;
          &.active{
            padding: 0 14px;
            background-color: #2388da;
            color: #fff;
          }
          @include border_radius(3px);
        }
      }
      .fltj{
        >li{
          margin-bottom: 14px;
        }
      }
    }
    .selectBox{
      li{
        width: 25%;
        font-size: 0;
        label{
          display: inline-block;
          font-size: $fontSize12;
          width:40%;
          color: #666;
        }
      }
    }
    .checkedBox{
      position: absolute;
      top: 25px;
      left:40%;
      background-color: #fff;
      border: 1px solid #ddd;
      padding-left: 10px;
      z-index: 999;
      height: 200px;
      overflow: hidden;
      overflow-y: auto;
      border-radius:4px;
      li{
        width: 100px;
        margin-bottom: 0;
        label{
          width: 100%;
        }
        input{
          margin-right: 4px;
          vertical-align: -3px;
        }
      }
    }
  }
  .text{
    display:none;
    width: 181px;
    position: absolute;
    top: -55px;
    left:25%;
    line-height: 1.4;
    border: 1px solid #ccc;
    padding: 10px;
    @include border_radius(3px);
    background-color: #fff;
    color:$colorFontTheme;
    text-align: left;
    &:after{
      content: '';
      position: absolute;
      bottom: -16px;
      left: 85px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #fff;
    }
    &:before{
      content: '';
      position: absolute;
      bottom: -17px;
      left: 85px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #ccc;
    }
  }
  .tsk{
    &:hover{
      + div,>div{
        display: block;
      }
    }
  }
  @media screen and (max-width: 1220px) {
    .filterCondition {
      .filter-item{
        width: 106%;
      }
    }
  }
  .fade2-enter-active, .fade2-leave-active {
    transition: opacity .5s
  }
  .fade2-enter, .fade2-leave-active {
    opacity: 0
  }
</style>
