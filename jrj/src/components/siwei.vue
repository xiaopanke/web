<style lang="scss" scoped>
@import '../assets/css/base.css';
.app {
    width: 100%;
    height: 100%;
}
.siwei {
    background: #000;
    width: 100%;
    min-height: 710px;
    min-width: 1217px;
    padding: 0 8px;
    box-sizing: border-box;
}
.bubbles-bar {
    font-size: 12px;
    color: #fff;
    height: 32px;
    line-height: 32px;
}
.template select {
    color: #2388da;
    background: #000;
    border: 0;
}
.template select:focus {
    outline: none;
}
.legend {
    color: #fff;
    height: 50px;
}
.legend ul li {
    float: left;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
}
.masks {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
}
.themeList {
    width: 90%;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    -moz-transform: translate3d(-50%, -50%, 0);
    -ms-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    min-height: 500px;
    overflow: hidden;
    padding-bottom: 30px;
}
.closeTheme {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    font-size: 27px;
}
.themeTitle {
    height: 35px;
    line-height: 35px;
    color: #999;
    font-size: 18px;
    background: #F2F2F2;
    padding-left: 20px;
}
button {
    height: 20px;
    line-height: 20px;
    border: 1px solid #0088E1;
    color: #0088E1;
    padding: 0 15px;
    background: #000;
    border-radius: 3px;
    cursor: pointer;
}
.tempDesc {
    font-size: 12px;
    line-height: 24px;
}
</style>
<template>
<div class="siwei">
  <div class="bubbles-bar clearfix">
    <div class="template fl mr-20">
      推荐分析维度：
      <select @change="changeTmp($event)" v-model="tmpId">
                    <option v-for="(tmp,key) in templateList" :value="key">{{tmp.name}}</option>
                </select>
    </div>
    <div class="fl">
      <span class="mr-20">X轴：<span>{{xData}}</span></span>
      <span class="mr-20">Y轴：<span>{{yData}}</span></span>
      <span class="mr-20">气泡大小：<span>{{sizeData}}</span></span>
      <span class="mr-20">气泡颜色：<span>{{colorData}}</span></span>
    </div>
    <div class="fl">
      <button @click="showDialog">股票范围</button>
      <button @click="showSelfRange">自定义</button>
    </div>
    <div class="fr">
      <span class="times">{{currentTime}}</span>
    </div>
    <div>
      <Dialog v-on:toHideDialog="hideDialog" v-if="showStockRangeDialog" title="股票范围">
        <div slot="content" class="dialogMain clearfix">
          <div class="mt-20">
            <span class="mr-10">
                                指数
                                <select v-model="stockRangeOptions.indexRangeDefault">
                                    <option v-for="(val,key) in indexRangeList" :value="key">{{val}}</option>
                                </select>
                            </span>
            <span class="mr-10">
                                 行业
                                 <select v-model="stockRangeOptions.industryRangeDefault">
                                    <option v-for="item in industryRangeList" :value="item.code">{{item.name}}</option>
                                </select>
                            </span>
            <span class="mr-10">
                                主题
                                <input v-model="stockRangeOptions.topic" style="cursor: pointer" type="hidden" value="" readonly/>
                                <input ref="themeV" @click="showTheme()" style="cursor: pointer" type="text" :value="topicName" readonly/>
                            </span>
            <span>
                                流通市值
                                <select v-model="stockRangeOptions.marketValueDefault">
                                    <option v-for="(val,key) in marketValueList" :value="key">{{val}}</option>
                                </select>
                            </span>
          </div>
          <div class="mt-10">
            <span class="mr-15">
                                历史成交量
                                <select v-model="stockRangeOptions.historyValueRangeDefault">
                                    <option v-for="(val,key) in historyValueList" :value="key">{{val}}</option>
                                </select>
                            </span>
            <span class="mr-15">
                                筛股策略
                                <select v-model="stockRangeOptions.strategyDefault">
                                    <option v-for="item in userStrategy" :value="item.id">{{item.strategyName}}</option>
                                </select>
                            </span>
            <span>
                                股票池
                                <select v-model="stockRangeOptions.stockPoolDefault">
                                    <option v-for="item in stockPool" :value="item.poolId">{{item.poolName}}</option>
                                </select>
                            </span>
          </div>
        </div>
        <div slot="footer" class="mt-20">
          <button class="sureBtn mr-20" @click="showSelectData">确定</button>
          <button class="cancleBtn" @click="hideDialog">取消</button>
        </div>
      </Dialog>
      <Dialog v-on:toHideDialog="hideDialog" v-if="showSelfRangeDialog" title="自定义维度">
        <div slot="content" class="dialogMain clearfix mt-40">
          <div>
            <span class="mr-10">
                                X轴
                                <select ref="xData" v-model="dimensionOptions.xDefault">
                                    <option v-for="(val,key) in xDataList" :value="key" :style="{display:((dimensionOptions.yDefault==='order' || dimensionOptions.yDefault==='sw_indu_name' || dimensionOptions.yDefault==='chi_spel') && key==='order') === true ? 'none' : 'block'}">{{val}}</option>
                                </select>
                            </span>
            <span class="mr-10">
                                Y轴
                                <select ref="yData" v-model="dimensionOptions.yDefault">
                                    <option v-for="(val,key) in xDataList" :value="key" :style="{display:((dimensionOptions.xDefault==='order' || dimensionOptions.xDefault==='sw_indu_name' || dimensionOptions.xDefault==='chi_spel') && key==='order') === true ? 'none' : 'block'}">{{val}}</option>
                                </select>
                            </span>
            <span class="mr-10">
                                气泡大小
                                <select ref="bubbleSize" v-model="dimensionOptions.sizeDefault">
                                    <option v-for="(val,key) in bubbleSizeList" :value="key">{{val}}</option>
                                </select>
                            </span>
            <span>
                                气泡颜色
                                <select ref="bubbleColor" v-model="dimensionOptions.colorDefault">
                                    <option v-for="(val,key) in bubbleColorList" :value="key">{{val}}</option>
                                </select>
                            </span>
          </div>
        </div>
        <div slot="footer" class="mt-20">
          <button class="sureBtn mr-20" @click="showSelectData">确定</button>
          <button class="cancleBtn" @click="hideDialog">取消</button>
        </div>
      </Dialog>
    </div>
  </div>
  <bubbles :options="options" v-on:toHideDialog="hideAlert"></bubbles>
  <div class="legend clearfix">
    <p class="fl tempDesc" :style="{width: colorData==='行业'? '50%' :''}">模板说明：{{templateList[tmpId].explain}}</p>
    <div class="fr" style="margin-top: 5px;">
      <ul v-if="options.colorDefault==='sw_indu_name'" class="clearfix" style="width:840px;">
        <li v-for="(item,index) in industryArr" :style="{'background':industryColor[index % 7]}">{{item}}</li>
      </ul>
      <ul v-if="options.colorDefault==='mkt_idx.tcap' || options.colorDefault==='mkt_idx.mktcap'" class="clearfix">
        <li v-for="(item,index) in marketArr" :style="{'background':volumeColor[index]}">{{item}}亿</li>
      </ul>
      <ul v-if="options.colorDefault==='mkt_idx.volume' || options.colorDefault==='perf_idx.avg_vol_3month'" class="clearfix">
        <li v-for="(item,index) in volumeArr" :style="{'background':volumeColor[index]}">{{item}}万</li>
      </ul>
      <ul v-if="options.colorDefault==='mkt_idx.rela_volume'" class="clearfix">
        <li v-for="(item,index) in relaVolume" :style="{'background':volumeColor[index]}">{{item}}</li>
      </ul>
      <ul class="clearfix">
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='mkt_idx.cur_chng_pct'">{{item}}%</li>
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='mkt_idx.chng_pct_week'">{{item*2}}%</li>
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='perf_idx.chng_pct_month'">{{item*3}}%</li>
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='perf_idx.chng_pct_3month'">{{item*6}}%</li>
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='perf_idx.chng_pct_6month'">{{item*8}}%</li>
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='perf_idx.chng_pct_year'">{{item*9}}%</li>
        <li v-for="(item,index) in quoteChange" :style="{'background':chgColor[index]}" v-if="options.colorDefault==='perf_idx.chng_pct_year_sofar'">{{item*8}}%</li>
      </ul>
      <ul v-if="options.colorDefault==='fcst_idx.rating_syn'" class="clearfix">
        <li v-for="(item,index) in analystPoint" :style="{'background':analystColor[index]}">{{item}}</li>
      </ul>
    </div>
  </div>
  <div class="masks" v-show="isShowTheme">
    <div class="themeList">
      <div class="themeTitle clearfix">
        <span class="fl">主题列表</span>
        <span class="closeTheme" @click="closeTheme()">×</span>
      </div>
      <ThemeSortAz v-on:getThemeValue="getThemeVal" />
    </div>
  </div>
</div>
</template>
<script>
import Dialog from 'components/dialog'
import * as Data from '../z3tougu/constant/siwei.js'
import Bubbles from 'components/bubbles'
import ThemeSortAz from 'components/theme-sort-az'
export default {
  data () {
    return {
      showStockRangeDialog: false,
      showSelfRangeDialog: false,
      xDataList: Data.xSelectData,
      bubbleSizeList: Data.bubbleSizeSelect,
      bubbleColorList: Data.bubbleColorSelect,
      indexRangeList: Data.indexRange,
      industryRangeList: Data.industryRange,
      marketValueList: Data.marketValueRange,
      historyValueList: Data.historyValueRange,
      analystPoint: Data.pointArr,
      quoteChange: Data.quoteChange,
      marketArr: Data.marketArr,
      volumeArr: Data.volumeArr,
      industryArr: Data.industryArr,
      relaVolume: Data.relaVolume,
      industryColor: Data.industryColor,
      volumeColor: Data.volumeColor,
      chgColor: Data.chgColor,
      analystColor: Data.AnalystColor,
      tmpId: 'demoTmp1',
      options: {
        xDefault: 'perf_idx.chng_pct_month',
        yDefault: 'fcst_idx.fcst_eps_chng_next3',
        sizeDefault: 'mkt_idx.mktcap',
        colorDefault: 'perf_idx.chng_pct_month',
        indexRangeDefault: '',
        industryRangeDefault: '',
        marketValueDefault: 'gpltsz_all',
        historyValueRangeDefault: 'lscjl_all',
        strategyDefault: '',
        stockPoolDefault: '',
        innerCode: '',
        topic: ''
      },
      dimensionOptions: {
        xDefault: 'perf_idx.chng_pct_month',
        yDefault: 'fcst_idx.fcst_eps_chng_next3',
        sizeDefault: 'mkt_idx.mktcap',
        colorDefault: 'perf_idx.chng_pct_month'
      },
      stockRangeOptions: {
        indexRangeDefault: '',
        industryRangeDefault: '',
        marketValueDefault: 'gpltsz_all',
        historyValueRangeDefault: 'lscjl_all',
        strategyDefault: '',
        stockPoolDefault: '',
        innerCode: '',
        topic: ''
      },
      xData: '近1月涨跌幅',
      yData: 'EPS增长率(未来3年)',
      sizeData: '流通市值',
      colorData: '近1月涨跌幅',
      templateList: {

        'demoTmp1': {
          name: '盘面与股价涨跌关系',
          options: {
            xDefault: 'perf_idx.chng_pct_month',
            yDefault: 'fcst_idx.fcst_eps_chng_next3',
            sizeDefault: 'mkt_idx.mktcap',
            colorDefault: 'perf_idx.chng_pct_month',
            indexRangeDefault: '',
            industryRangeDefault: '',
            marketValueDefault: 'gpltsz_all',
            historyValueRangeDefault: 'lscjl_all',
            strategyDefault: '',
            stockPoolDefault: '',
            innerCode: '',
            topic: ''
          },
          explain: '从未来成长性、及盘面大小的角度，判断近1月涨幅较好的股票属于哪一类，跌幅较大的股票属于哪一类，例如：涨幅较好的股票为兼具成长性的大盘股，抑或成长性较好的小盘股？'
        },
        'demoTmp2': {
          name: '估值与股价涨跌关系',
          options: {
            xDefault: 'perf_idx.chng_pct_month',
            yDefault: 'mkt_idx.pe_ttm',
            sizeDefault: '',
            colorDefault: 'perf_idx.chng_pct_month',
            indexRangeDefault: '',
            industryRangeDefault: '',
            marketValueDefault: 'gpltsz_all',
            historyValueRangeDefault: 'lscjl_all',
            strategyDefault: '',
            stockPoolDefault: '',
            innerCode: '',
            topic: ''
          },
          explain: '从估值的角度，判断近1月涨幅较好的股票属于哪一类，跌幅较大的股票属于哪一类，例如：涨幅较好的股票主要为高估值股票，抑或估值较低的股票？'
        },
        'demoTmp3': {
          name: '行业与股价涨跌幅关系分析',
          options: {
            xDefault: 'sw_indu_name',
            yDefault: 'mkt_idx.peg',
            sizeDefault: '',
            colorDefault: 'mkt_idx.chng_pct_week',
            indexRangeDefault: '',
            industryRangeDefault: '',
            marketValueDefault: 'gpltsz_all',
            historyValueRangeDefault: 'lscjl_all',
            strategyDefault: '',
            stockPoolDefault: '',
            innerCode: '',
            topic: ''
          },
          explain: '从行业和估值的角度，判断近1周的市场热点集中在哪几个行业，以及行业内是估值较低的股票涨得好，还是估值较高的股票涨得更好，还是较为中性的一类涨得好？'
        },
        'demoTmp4': {
          name: '分析师观点与股价涨跌关系',
          options: {
            xDefault: 'fcst_idx.rating_syn',
            yDefault: 'fcst_idx.expect_price_med',
            sizeDefault: '',
            colorDefault: 'mkt_idx.rela_volume',
            indexRangeDefault: '',
            industryRangeDefault: '',
            marketValueDefault: 'gpltsz_all',
            historyValueRangeDefault: 'lscjl_all',
            strategyDefault: '',
            stockPoolDefault: '',
            innerCode: '',
            topic: ''
          },
          explain: '从分析师预期和是否放量的角度寻找标的股票。例如：从分析师观点为买入或增持的股票中，挑选出具备目标价格空间较大，且近期成交量放量的股票。'
        },
        'demoTmp0': {
          name: '自定义'
        }
      },
      currentTime: '',
      isShowTheme: false,
      topicName: '全部'
    }
  },
  components: {
    ThemeSortAz,
    Bubbles,
    Dialog

  },
  methods: {
    showDialog () {
      this.showStockRangeDialog = true
    },
    hideDialog () {
      this.showStockRangeDialog = false
      this.showSelfRangeDialog = false
      this.dimensionOptions.xDefault = this.options.xDefault
      this.dimensionOptions.yDefault = this.options.yDefault
      this.dimensionOptions.sizeDefault = this.options.sizeDefault
      this.dimensionOptions.colorDefault = this.options.colorDefault
      this.stockRangeOptions.indexRangeDefault = this.options.indexRangeDefault
      this.stockRangeOptions.industryRangeDefault = this.options.industryRangeDefault
      this.stockRangeOptions.marketValueDefault = this.options.marketValueDefault
      this.stockRangeOptions.historyValueRangeDefault = this.options.historyValueRangeDefault
      this.stockRangeOptions.strategyDefault = this.options.strategyDefault
      this.stockRangeOptions.stockPoolDefault = this.options.stockPoolDefault
      this.stockRangeOptions.topic = this.options.topic
    },
    showSelfRange () {
      this.showSelfRangeDialog = true
    },
    showSelectData () {
      this.xData = this.xDataList[this.dimensionOptions.xDefault]
      this.yData = this.xDataList[this.dimensionOptions.yDefault]
      this.sizeData = this.options.sizeDefault === '' ? '常规' : this.bubbleSizeList[this.dimensionOptions.sizeDefault]
      this.colorData = this.options.colorDefault === '' ? '常规' : this.bubbleColorList[this.dimensionOptions.colorDefault]
      this.options = { ...this.dimensionOptions,
        ...this.stockRangeOptions
      }
      this.tmpId = 'demoTmp0'
    },
    changeTmp (e) {
      const tmpValue = e.target.value
      this.tmpId = tmpValue
      if (tmpValue === 'demoTmp0') {
        return
      }
      this.options = this.templateList[tmpValue].options
      this.xData = this.xDataList[this.templateList[tmpValue].options.xDefault]
      this.yData = this.xDataList[this.templateList[tmpValue].options.yDefault]
      this.sizeData = this.bubbleSizeList[this.templateList[tmpValue].options.sizeDefault]
      this.colorData = this.bubbleColorList[this.templateList[tmpValue].options.colorDefault]
      this.dimensionOptions.xDefault = this.templateList[tmpValue].options.xDefault
      this.dimensionOptions.yDefault = this.templateList[tmpValue].options.yDefault
      this.dimensionOptions.sizeDefault = this.templateList[tmpValue].options.sizeDefault
      this.dimensionOptions.colorDefault = this.templateList[tmpValue].options.colorDefault
      this.stockRangeOptions.indexRangeDefault = this.templateList[tmpValue].options.indexRangeDefault
      this.stockRangeOptions.industryRangeDefault = this.templateList[tmpValue].options.industryRangeDefault
      this.stockRangeOptions.marketValueDefault = this.templateList[tmpValue].options.marketValueDefault
      this.stockRangeOptions.historyValueRangeDefault = this.templateList[tmpValue].options.historyValueRangeDefault
      this.stockRangeOptions.strategyDefault = this.templateList[tmpValue].options.strategyDefault
      this.stockRangeOptions.stockPoolDefault = this.templateList[tmpValue].options.stockPoolDefault
      this.stockRangeOptions.innerCode = this.templateList[tmpValue].options.innerCode
      this.stockRangeOptions.topic = this.templateList[tmpValue].options.topic
      this.topicName = '全部'
    },
    getTime () {
      var date = new Date()
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var strHour = date.getHours()
      var strMin = date.getMinutes()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (strHour >= 0 && strHour <= 9) {
        strHour = '0' + strHour
      }
      if (strMin >= 0 && strMin <= 9) {
        strMin = '0' + strMin
      }
      var currentdate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + strHour + seperator2 + strMin
      this.currentTime = currentdate
    },
    showTheme () {
      this.isShowTheme = true
    },
    closeTheme () {
      this.isShowTheme = false
    },
    getThemeVal (data) {
      this.stockRangeOptions.topic = data[0]
      this.topicName = data[1]
      this.closeTheme()
    },
    hideAlert (data) {
      this.showStockRangeDialog = data
      this.showSelfRangeDialog = data
    }
  },
  computed: {
    stockPool: function () {
      return this.$store.state.bubbles.stockPool
    },
    userStrategy: function () {
      return this.$store.state.bubbles.userStrategy
    }
  },
  watch: {
    'dimensionOptions.xDefault': function () {
      if ((this.dimensionOptions.xDefault === 'order' && (this.dimensionOptions.yDefault === 'sw_indu_name' || this.dimensionOptions.yDefault === 'chi_spel' || this.dimensionOptions.yDefault === 'order'))) {
        this.dimensionOptions.xDefault = 'sw_indu_name'
      }
      if ((this.dimensionOptions.yDefault === 'order' && (this.dimensionOptions.xDefault === 'sw_indu_name' || this.dimensionOptions.xDefault === 'chi_spel' || this.dimensionOptions.xDefault === 'order'))) {
        this.dimensionOptions.yDefault = 'sw_indu_name'
      }
    },
    'dimensionOptions.yDefault': function () {
      if ((this.dimensionOptions.xDefault === 'order' && (this.dimensionOptions.yDefault === 'sw_indu_name' || this.dimensionOptions.yDefault === 'chi_spel' || this.dimensionOptions.yDefault === 'order'))) {
        this.dimensionOptions.xDefault = 'sw_indu_name'
      }
      if ((this.dimensionOptions.yDefault === 'order' && (this.dimensionOptions.xDefault === 'sw_indu_name' || this.dimensionOptions.xDefault === 'chi_spel' || this.dimensionOptions.xDefault === 'order'))) {
        this.dimensionOptions.yDefault = 'sw_indu_name'
      }
    }
  },
  mounted () {
    this.$store.dispatch('bubbles/getStrategy')
    this.$store.dispatch('bubbles/getStockPool')

    const that = this
    setInterval(function () {
      that.getTime()
    }, 1000)
  }
}
</script>
