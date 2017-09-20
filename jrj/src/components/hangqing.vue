<style>
@import '../assets/css/reset.css';
body {
  background: #f7f7f7;
}

.red {
  color: #ff4040 !important;
}

.gray {
  color: #666 !important;
}

.green {
  color: #26be6a !important;
}

.blue {
  color: #3996F2 !important
}

.alldata {
  font-size: .24rem;
  color: #333;
  overflow: hidden;
  background: #fff;
  position: relative;
}

.mask {
  position: absolute;
  right: 0;
  width: .6rem;
  height: 100%;
  background: url(../assets/images/hangqing/mask.png) bottom right;
  background-size: 100% auto;
  top: 0
}

.data_hd {
  color: #aaa;
  line-height: .77rem;
  position: relative;
  background: #fff;
}

.data_hd .icon {
  display: inline-block;
  width: .15rem;
  height: .15rem;
  background: url(../assets/images/hangqing/default.png) no-repeat bottom right;
  background-size: .1rem .1rem;
}
.data_hd .iconup ,.data_hd .icondown{color: #3996F2}
.data_hd .iconup .icon {
  background-image: url(../assets/images/hangqing/up.png);
  background-size: .1rem .2rem;
  height: .2rem;
}

.data_hd .icondown .icon {
  background-image: url(../assets/images/hangqing/down.png);
  background-size: .1rem .2rem;
  height: .2rem;
}

.data_hd,
.alldata li{
  border-bottom: 1px solid #e6e6e6;
}
.data_zuo,.data_you{padding-top: .77rem;}
.alldata li {
  position: relative;
  height: 1.2rem
}

.data_r .data_hd {
  text-align: right;
  position: fixed;
  left:30%;top:0;
  background: #fff;z-index: 3;width:17.5rem;
}

.data_l {
  width: 30%
}
.data_l .data_hd{
  position: fixed;width: 30%;left: 0;top: 0;
  z-index: 4;
}

.data_l .data_hd span {
  padding-left: .3rem
}

.data_zuo b {
  display: block;
  font-size: .32rem
}

.data_zuo li {
  padding-left: .3rem;
  height: 1.2rem;
}

.data_zuo li b {
  padding-top: .35rem;
}

.datazuo1 li b {
  padding-top: .2rem;
}

.data_zuo em {
  display: block;
  font-size: .24rem;
  color: #888
}

.data_r {
  width: 70%;
  overflow-x: auto;
}

.data_r>div {
  width: 12.4rem;
}

.data_r .bigwidth {
  width: 17.5rem;
}

.data_r .data_hd span {
  width: 1.7rem;
  float: left;
}

.data_you span {
  float: left;
  width: 1.7rem;
  text-align: right;
  line-height: 1.2rem;
  font-size: .3rem
}
.loading{text-align: center;line-height: .5rem; font-size: .3rem;}
</style>

<template>
<div class="hangqing">
  <div class="alldata clearfix">
    <div class="data_l fl">
      <div class="data_hd">
        <span v-if="typeurl == 1">股票名称</span>
        <span v-if="typeurl == 2">概念</span>
        <span v-if="typeurl == 3">行业</span>
      </div>
      <ul class="data_zuo datazuo1" v-if="typeurl == 1">
        <li v-for="item in dataarr1" @click="gotostock(item.stockName,item.stockCode)"><b>{{item.stockName}}</b><em>{{item.stockCode}}</em></li>
      </ul>
      <ul class="data_zuo datazuo2" v-if="typeurl == 2">
        <li v-for="item in dataarr2" @click="gotobankuai(item.name,item.code)"><b>{{item.name}}</b></li>
      </ul>
      <ul class="data_zuo datazuo3" v-if="typeurl == 3">
        <li v-for="item in dataarr3" @click="gotobankuai(item.name,item.code)"><b>{{item.name}}</b></li>
      </ul>
    </div>
    <div class="data_r fl" @scroll="scrollLeft($event)">
      <div :class="typeurl == '1' ? 'bigwidth' : ''">
        <div class="data_hd clearfix datahd1" :style="{left:-scrollleftpx+'px'}" v-if="typeurl == 1" ref="myspanbox">
          <span data-index='1' class="icondown" @click="paixu($event)">主力净流入<i class="icon" ></i></span>
          <span  data-index='2' @click="paixu($event)">现价<i class="icon"></i></span>
          <span  data-index='3' @click="paixu($event)">涨跌幅<i class="icon"></i></span>
          <span  data-index='4' @click="paixu($event)">主力流入<i class="icon"></i></span>
          <span  data-index='5' @click="paixu($event)">主力流出<i class="icon"></i></span>
          <span  data-index='6' @click="paixu($event)">总成交额<i class="icon"></i></span>
          <span  data-index='7' @click="paixu($event)">量比<i class="icon"></i></span>
          <span  data-index='8' @click="paixu($event)">换手率<i class="icon"></i></span>
          <span  data-index='9' @click="paixu($event)">流通市值<i class="icon"></i></span>
          <span  data-index='10' @click="paixu($event)">总市值<i class="icon"></i></span>
        </div>
        <div class="data_hd clearfix datahd2" :style="{left:-scrollleftpx+'px'}"  v-if="typeurl == 2">
          <span data-index='0' :class="sortcolumn ==='0' ? 'icondown' : '' " @click="paixu($event)">主力净流入<i class="icon"></i></span>
          <span data-index='4' :class="sortcolumn ==='4' ? 'icondown' : '' " @click="paixu($event)">涨跌幅<i class="icon"></i></span>
          <span data-index='6'>领涨股</span>
          <span data-index='1' @click="paixu($event)">主力流入<i class="icon"></i></span>
          <span data-index='2' @click="paixu($event)">主力流出<i class="icon"></i></span>
          <span data-index='3' @click="paixu($event)">总成交额<i class="icon"></i></span>
          <span data-index='5' @click="paixu($event)">涨股比<i class="icon"></i></span>
        </div>
        <div class="data_hd clearfix datahd3"  :style="{left:-scrollleftpx+'px'}" v-if="typeurl == 3">
          <span data-index='0' :class="sortcolumn ==='0' ? 'icondown' : '' "  @click="paixu($event)">主力净流入<i class="icon "></i></span>
          <span data-index='4' :class="sortcolumn ==='4' ? 'icondown' : '' " @click="paixu($event)">涨跌幅<i class="icon"></i></span>
          <span data-index='6'>领涨股</span>
          <span data-index='1' @click="paixu($event)">主力流入<i class="icon"></i></span>
          <span data-index='2' @click="paixu($event)">主力流出<i class="icon"></i></span>
          <span data-index='3' @click="paixu($event)">总成交额<i class="icon"></i></span>
          <span data-index='5' @click="paixu($event)">涨股比<i class="icon"></i></span>
        </div>
        <ul class="data_you datayou1" v-if="typeurl == 1">
          <li class="clearfix" v-for="item in dataarr1"  @click="gotostock(item.stockName,item.stockCode)">
            <span :class="addcolor(item.mainForceNetInflow)">{{item.mainForceNetInflow | changyi  }}</span>
            <span :class="addcolor(item.advanceDeclineRatio)">{{item.currentPrice}}</span>
            <span :class="addcolor(item.advanceDeclineRatio)">{{item.advanceDeclineRatio}}%</span>
            <span :class="addcolor(item.mainForceInflow)">{{item.mainForceInflow | changyi }}</span>
            <span class="green">{{item.mainForceOutflow | changyi }}</span>
            <span>{{item.dealBalance | changyi }}</span>
            <span :class="addcolor(item.cat)">{{item.cat}}</span>
            <span>{{item.tr}}</span>
            <span>{{item.cmv | changyi }}</span>
            <span>{{item.tmv | changyi }}</span>
          </li>
        </ul>
        <ul class="data_you datayou2" v-if="typeurl == 2">
          <li class="clearfix" v-for="item in dataarr2">
            <span :class="addcolor(item.mainForceNetInflow)">{{item.mainForceNetInflow | changyi}}</span>
            <span :class="addcolor(item.advanceDeclineRatio)">{{item.advanceDeclineRatio}}%</span>
            <span  @click="gotostock(item.leaderStockName,item.leaderStockCode)">{{item.leaderStockName}}</span>
            <span :class="addcolor(item.mainForceInflow)">{{item.mainForceInflow | changyi }}</span>
            <span class="green">{{item.mainForceOutflow | changyi }}</span>
            <span>{{item.dealBalance | changyi }}</span>
            <span>{{item.shareRatio}}%</span>
          </li>
        </ul>
        <ul class="data_you datayou3" v-if="typeurl == 3">
          <li class="clearfix" v-for="item in dataarr3">
            <span :class="addcolor(item.mainForceNetInflow)">{{item.mainForceNetInflow | changyi }}</span>
            <span :class="addcolor(item.advanceDeclineRatio)">{{item.advanceDeclineRatio}}%</span>
            <span  @click="gotostock(item.leaderStockName,item.leaderStockCode)">{{item.leaderStockName}}</span>
            <span :class="addcolor(item.mainForceInflow)">{{item.mainForceInflow | changyi }}</span>
            <span class="green">{{item.mainForceOutflow | changyi }}</span>
            <span>{{item.dealBalance | changyi }}</span>
            <span>{{item.shareRatio}}%</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading">
      加载中...
    </div>
    <i class="mask"></i>
  </div>
</div>
</template>

<script>
import jQuery from 'jquery'
import 'whatwg-fetch'

export default {
  data () {
    return {
      typeurl: this.getQueryString('a'), // 个股1，概念2，行业3
      sortcolumn: this.getQueryString('sortcolumn'), // 默认排序 0  按主力净流入排序 1  涨跌幅排序
      scrollleftpx: '30%',
      dataarr1: [],
      dataarr2: [],
      dataarr3: [],
      urllink: {
        1: {
          'url': 'https://sslapi.jrj.com.cn/zxhq/sapi/stockfundflow/query_stock_fund_flow',
          'sort_column': '1', // 排序字段
          'order_type': 'desc', // asc=升，desc=降，默认降序
          'pn': 1, // 页码
          'ps': 20 // 每页条数
        },
        2: {
          'url': 'https://sslapi.jrj.com.cn/zxhq/sapi/plat/list',
          'sort_column': this.getQueryString('sortcolumn'), // 排序字段
          'order_type': 'desc', // asc=升，desc=降，默认降序
          'pn': 1, // 页码
          'ps': 20, // 每页条数
          'platType': 5// 概念
        },
        3: {
          'url': 'https://sslapi.jrj.com.cn/zxhq/sapi/plat/list',
          'sort_column': this.getQueryString('sortcolumn'), // 排序字段
          'order_type': 'desc', // asc=升，desc=降，默认降序
          'pn': 1, // 页码
          'ps': 20, // 每页条数
          'platType': 16// 行业
        }
      },
      titlearr: ['个股', '概念', '行业']
    }
  },
  mounted () {
    window.jQuery = window.$ = jQuery
    document.title = this.titlearr[this.typeurl - 1]

    this.jiazaidata()
    var _this = this
    var sw = true
    window.addEventListener('scroll', function () {
      sw = true
      if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        if (sw === true) {
          if (sw === false) { return }
          sw = false
          setTimeout(function () {
            var urll = _this.urllink[_this.typeurl]
            urll.pn++
            var url = urll.url + '?sort_column=' + urll.sort_column + '&order_type=' + urll.order_type + '&pn=' + urll.pn + '&ps=' + urll.ps + '&platType=' + urll.platType
            fetch(url, {
              method: 'GET',
              mode: 'cors',
              cache: 'default'
            }).then((res) => {
              return res.json()
            }).then(v => {
              if (v.data.items.length === 0) {
                sw = false
                $('.loading').hide()
              } else {
                _this.$data['dataarr' + _this.typeurl] = _this['dataarr' + _this.typeurl].concat(v.data.items)
                sw = true
              }
            }).catch(v2 => {
              console.log(v2)
            })
          }, 1000)
        }
      }
    })
  },
  filters: {
    changyi (v) {
      return (v / 100000000).toFixed(2) + '亿'
    }
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    jiazaidata () {
      var urll = this.urllink[this.typeurl]
      var url = urll.url + '?sort_column=' + urll.sort_column + '&order_type=' + urll.order_type + '&pn=' + urll.pn + '&ps=' + urll.ps + '&platType=' + urll.platType
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        // this.dataarr1 = this.dataarr1.concat(v.data.items)
        this.$data['dataarr' + this.typeurl] = v.data.items
      }).catch(v2 => {
        console.log(v2)
      })
    },
    // 正红负绿
    addcolor (v) {
      if ((v + '').indexOf('-') !== -1) {
        return 'green'
      } else {
        return 'red'
      }
    },
    scrollLeft (v) {
      this.scrollleftpx = v.target.scrollLeft - v.target.offsetLeft
    },
    paixu (v) {
      var o = this.urllink[this.typeurl]
      o['pn'] = 1
      document.body.scrollTop = 0
      $('.loading').show()
      if (o['sort_column'] === v.currentTarget.getAttribute('data-index')) {
        if (o['order_type'] === 'asc') {
          o['order_type'] = 'desc'
          v.currentTarget.setAttribute('class', 'icondown')
        } else {
          o['order_type'] = 'asc'
          v.currentTarget.setAttribute('class', 'iconup')
        }
      } else {
        o['sort_column'] = v.currentTarget.getAttribute('data-index')
        o['order_type'] = 'desc'

        $('.data_hd span').removeClass('icondown').removeClass('iconup')
        v.currentTarget.setAttribute('class', 'icondown')
      }
      this.jiazaidata()
    },
    gotostock (stockName, stockCode) {
      window.jrj.jsCallNative('100', JSON.stringify({ 'stockName': stockName, 'stockCode': stockCode }))
    },
    gotobankuai (platname, platcode) {
      window.jrj.jsCallNative('161', JSON.stringify({ 'platname': platname, 'platcode': platcode, 'plattype': this.urllink[this.typeurl].platType }))
    }
  }
}
</script>
