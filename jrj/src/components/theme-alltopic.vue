<style lang="scss" scoped>
    @import '../assets/css/base.css';
    *{
      text-align: justify;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none
    }
    em,i{
      font-style: normal;
    }

    .blue{
      color: #2388da;
      font-size: 12px;
    }
    .red{
      color:#e6363a
    }
    .green {
      color:#48a854
    }
    .display-box {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -o-box;
      display: box;
    }
    .box-flex-1 {
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
    }
    .box-flex-2 {
      -webkit-box-flex: 2;
      -moz-box-flex: 2;
      -ms-flex: 2;
      -o-box-flex: 2;
      box-flex: 2;
    }
    .box-flex-3 {
      -webkit-box-flex: 3;
      -moz-box-flex: 3;
      -ms-flex: 3;
      -o-box-flex: 3;
      box-flex: 3;
    }
     .box-flex-4 {
      -webkit-box-flex: 4;
      -moz-box-flex: 4;
      -ms-flex: 4;
      -o-box-flex: 4;
      box-flex: 4;
    }
    .alltopic{
      width: 100%;
      font-size: 12px;
      color: #696969;
    }
    span{
      color: #696969;
    }
    .topic-head{
      font-weight: normal;
      padding-left: 15px;
      margin:12px 0 -4px 0;
    }
    .topic-head em{
      padding-right: 65px;
      font-size: 12px;
    }
    .topic-head span{
      width: 82px;
      /* height: 20px; */
      float: right;
      line-height: 20px;
      /* display: inline-block; */
      border-radius: 3px;
      border: 1px solid #e5e5e5;
     /*  color: #4f5256; */
     color: #696969;
      text-align: center;
      background: #fff;
      margin-left: 14px;
      cursor: pointer;
      font-size: 12px;
      /* padding: 4px 8px 5px 15px; */
    }
    .alltopic span.active{
      color: #2388da;
      background: #fff;
      border: 1px solid #2388da;
    }
    span.active .hot_icon{
      background-position: -2px 1px;

    }
    span.active .time_icon{
      background-position: 1px -34px;

    }
    .hot_icon,.time_icon{
      height: 10px;
      display: inline-block;
      background: url(../assets/images/z3img/theme_icon.png) no-repeat;
    }
    .hot_icon{
      width: 6px;
      background-position: -2px -10px;
      margin-left: 5px;
    }
    .time_icon{
      width: 11px;
      background-position: 1px -22px;
      margin-left: 4px;
    }
    .changelist{
      margin-right: 16px;
      margin-top: 5px;
    }
    .changelist a{
      width: 11px;
      height: 11px;
      display: inline-block;
      background: url(../assets/images/z3img/theme_icon.png) no-repeat 1px -45px;
      cursor: pointer;
    }
    a.list_icon{
      background-position: 1px -45px;
      margin-right: 10px;
    }
    a.kuai_icon{
      background-position: 1px -69px;
    }
    .list_icon.active{
      background-position: 1px -57px;
    }
    .kuai_icon.active{
      background-position: 1px -82px;
    }
    .con-left{
      /* width: 36%; */
      width: 37%;
      margin-right: 5%;
    }
    .content{
      line-height: 24px;
      cursor: pointer;
     /*  position: relative; */
    }
    .content:hover{
      color: #2388da;
    }
    /* .content i{
      display: none;
      position: absolute;
      top: 10px;
      left: 0;
      min-width: 400px;
      border: 1px solid #e5e5e5;
      color: #696969;
      border-radius: 3px;
      background: #fff;
      padding: 0 5px;
      box-shadow: 2px 3px 2px #ccc;
      line-height: 20px;
      min-height: 22px;
      font-style: normal;
    }
    .content:hover i{
      display: block
    } */
    .content-head{
      margin-bottom: 20px;
    }
    .content-box{

    }
    .con-cen{
      /* width: 18%; */
      width: 25%;
      line-height: 24px;
     /*  margin-top: -6px; */

    }
    .con-right{
      /* width: 41%; */
      /* width: 35%; */
      width: 35.4%;
      line-height: 24px;

    }
    .topic-ol{
      padding-left: 8px;
      padding-right: 8px;
      margin-top: 8px;
    }
    .topic-ol li{
      padding: 10px 15px 40px 13px;
      background: #ffffff;
      border-radius: 3px;
      margin-bottom: 8px;
      border: 1px solid #e5e5e5;
    }

    .topic-name{
      font-weight: 900;
      width: 36%;
      margin-right: 5%;
      float: left;
      cursor: pointer;

    }

    .topic-time{
      float: left;

    }
    .topic-time span{
      display: inline-block;
    }
    .time-num{
      width: 90px;
      text-align: center;
    }
    .time-num2{
      width: 49px;
      text-align: center;
    }
    .time-num3{
      width: 60px;
      text-align: center;
    }
    .time-num4{
      width: 37px;
      text-align: center;
    }
    .equ-name{
      width: 60px;
      display: inline-block;
      text-align: left;
      cursor: pointer;
    }
    .equ-price{
      width: 26%;
      display: inline-block;
      text-align: center;

    }
    .new-tit{
      /* width: 50%; */
      /* width: 61%; */
      /* width: 56%; */
      width: 55%;
      text-align: left;
      float: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

    }
    .new-tit:hover{
      color:#2388da;
    }
    .new-date{
      color: #7e7e7e;
      margin-left: 18px;
      line-height: 24px;
      float: left;
    }
    .new-srcname{
      color: #7e7e7e;
      /* margin-left: 18px; */
      line-height: 24px;
      float: right;
     /*  width: 18%; */
       margin-right: 5px;

    }
    .sortaz-wrap{
     /*  display: none; */
      padding: 0 8px;
      margin-top: 12px;
    }
    .az-main{
        background: #fff;
        border-radius: 3px;
        border-top:1px solid #e5e5e5;
        /* position:relative; */
    }
    .sort-title{
        /* position: absolute;
        top: 1.5%; */
        /* left: 1%; */
        /* left: 1.5%; */
        line-height: 20px;
        width: 5.4%;
        /* text-align: center; */
    }
    .sort-title i{
      margin-left: 5px;
     }
    .sort-hot-wrap{
      
     font-size: 12px;
     padding:7px 16px 9px 16px;
     margin: 13px auto 13px
    }
    .sort-hot{
     /*  width: 62%;
      margin: 13px auto 13px; */
      width: 90%;
      padding-left: 2.1%;
    }
    .hot-name{
     /*  margin-left: 19px; */
     /* width: 10%;
     display: inline-block;
     text-align: center; */
     width: 10%;
     line-height: 20px;
     display: inline-block;
     cursor: pointer;
       
    }
    .alltopic .page{
      text-align: center;
      padding: 0 0 20px 0;
      background: #f2f2f2;
    }

    .tooltip-box {
      position: absolute;
      background: #fff;
      padding: 25px 10px 10px;
      border: 1px solid #eee;
      z-index: 999
    }

    .tooltip-box .lenged_l {
        position: absolute;
        right: 10px;
        top: 14px;
        font-size: 14px;
        color: #000;
        z-index: 999
    }

    .tooltip-box .name {
        position: absolute;
        top: 14px;
        left: 23px;
        font-size: 14px;
        color: #666;
        z-index: 9
    }

    .tooltip-box .txt {
        position: absolute;
        top: 38px;
        left: 3px;
        font-size: 12px;
        z-index: 9
    }

    .tooltip-box .txt>div {
        float: left;
        margin-right: 10px
    }

    .sort-hot a:hover{
       text-decoration: underline;
    }
</style>
<template>
<div class="alltopic clearfix">
    <div class="clearfix topic-head">
       <div class="fl">
            <em>全部主题概念</em>
            <span :class="sortField==='updown'?'active':''" @click="query('updown')" :style="{display:isStyle}">涨跌幅排序<i class="hot_icon"></i></span>
            <span :class="sortField==='time'?'active':''" @click="query('time')" :style="{display:isStyle}">时间排序<i class="time_icon"></i></span>
            <span @click="query('hot')" :class="sortField==='hot'?'active':''" :style="{display:isStyle}">热度排序<i class="hot_icon"></i></span>
        </div>
        <div class="fr changelist"><a @click="listClick($event)" class="list_icon" :class="this.showList==true?'active':''"></a><a class="kuai_icon" @click="azClick($event)" :class="this.showAz==true?'active':''"></a></div>
    </div>
    <div class="main-list" v-show="showList">
      <ol class="topic-ol" >
        <li v-for="allTopic of themeList" class="clearfix">
           <div class="content-head clearfix">
                <div class="topic-name">
                 <router-link :to="{name:'topicDetail',params:{topicId:allTopic.topicCode}}" class="blue "> {{ allTopic.topicName }}</router-link>
                </div>
                <div class="topic-time">
                    <span class="">发布时间</span><span class="blue time-num">{{allTopic.declareDate==null?'--':format(allTopic.declareDate)}}</span><span>成分股数</span><span class="blue time-num2">{{allTopic.equityNum}}只</span><span>相关新闻</span><span class="blue time-num2">{{allTopic.eventNum}}条</span>
                    <span>今日涨跌</span>
                    <span class="time-num3" :class="allTopic.topicMarket.chngPct>0 ? 'red':'green'">{{ allTopic.topicMarket==null || allTopic.topicMarket.chngPct==null?'--':changeTofixed(allTopic.topicMarket.chngPct)}}</span><span>上涨股票</span><span class="red time-num4">{{allTopic.topicMarket==null || allTopic.topicMarket.stkUpNum ==null?'--':allTopic.topicMarket.stkUpNum}}</span><span>下跌股票</span><span class="green time-num4">{{allTopic.topicMarket==null || allTopic.topicMarket.stkDownNum ==null?'--':allTopic.topicMarket.stkDownNum}}</span>
                </div>
           </div>
           <div class="content-box clearfix display-box">
               <div  class="con-left box-flex-3">
                   <strong>主题简介:</strong>
                   <router-link :to="{name:'topicDetail',params:{topicId:allTopic.topicCode}}" >
                    <span class='content' ref="txtheight" :title="allTopic.topicDesc">{{allTopic.topicDesc}}
                    </span>
                  </router-link>
               </div>
               <div  class="con-cen box-flex-1">
                  <div v-for="equity of allTopic.relatedEquity">
                      <a :href="'/stock/'+equity.innerCode" target="_blank"><span class="blue equ-name" ref="equityname" v-z3-stock="{ref:'stockbox',code:equity.innerCode}">{{relatedStocks[equity.innerCode].name}}</span></a>
                      <span class="equ-price" v-z3-updowncolor="relatedStocks[equity.innerCode].curChngPct">{{relatedStocks[equity.innerCode].price==null?'--':relatedStocks[equity.innerCode].price}}</span>
                      <span class="equ-price" v-z3-updowncolor="relatedStocks[equity.innerCode].curChngPct">{{relatedStocks[equity.innerCode].curChngPct==null?'--':changeTofixed(relatedStocks[equity.innerCode].curChngPct)}}</span>
                  </div>
                  <div class="tooltip-box clearfix" v-if="hoverChartShow">
                            <a href="##" target="_blank" class="name" v-stock-popup.name="direName"></a>
                            <Stockkline :chartWidth="300" :chartHeight="200" ></Stockkline>
                            <div class="lenged_l">
                              <span class="mr-10" >--</span>
                              <span class="mr-10" >--</span>
                              <span id="curChngPctTip">--</span>
                            </div>
                    </div>
               </div>
               <div  class="con-right box-flex-2" >
                   <div v-for="news of allTopic.relatedNews" class="clearfix">
                      <router-link :to="{name:'detailPages',params:{id : news.newsId, detailType:'news'}}"> <span class="new-tit" :title="news.title">{{news.title==null?'--':news.title}}</span>
                       <span class="new-date">{{news.declareDate==null?'--':format(news.declareDate)}}</span>
                       <span class="new-srcname">{{news.srcName==null?'--':news.srcName}}</span></router-link>
                    </div>
                </div>
           </div>
        </li>
      </ol>
     <Pagination  @getPageFromChild="goToPage" :totalPage="totalPage"/>
    </div>
    <div class="sortaz-wrap clearfix" v-show="showAz">
      <div class="az-main">
            <div class="sort-hot-wrap">
                <div class="sort-title fl">推荐主题 ></div>
                <!-- <div class="sort-title fl">推荐主题<i>></i></div> -->
                <div class="sort-hot fl">
                   <a class="blue hot-name" v-for="(updownTopic,index) of listChange">
                      <router-link :to="{name:'topicDetail',params:{topicId:updownTopic.topicCode}}" >{{updownTopic.topicName}}</router-link>
                   </a>
                </div>
            </div>
            <ThemeSortAz/>
      </div>
    </div>
    <StockBox ref="stockbox"></StockBox>
</div>

</template>

<script>
 import { mapState } from 'vuex'
 import { formatDate } from 'utils/date'
 import Pagination from './pagination'
 import ThemeSortAz from './theme-sort-az'
//  import { mutationTypes } from 'stores/z3tougu-theme'
 import z3websocket from '../z3tougu/z3socket'
 import StockBox from 'components/stock-box'
export default {
   data () {
     return {
       FIELDS: { hot: 'topicMarket.realChngPctWeek', time: 'declareDate', updown: 'topicMarket.chngPct' },
       sortField: '',
       page: 0,
       pagesize: '',
       isShow: true,
       isStyle: '',
       showList: true,
       showAz: false,
       hoverChartShow: false,
       direName: '',
       equity: {
         code: '',
         name: '',
         price: '',
         chg: '',
         curChngPct: ''

       }
     }
   },

   computed: mapState({
     themeList: state => state.topic.themeList,
   /*  themeEquity:state => state.*/
     totalPage: state => state.topic.total,
     listChange: state => state.topic.listChange,
     relatedStocks: state => state.topic.relatedStocks,
     socketState: state => state.z3sockjs.readystate,
     stockMessage: state => {
       const msg = state.z3sockjs.message
       if (msg && msg.data && msg.data.subject === 'snapshot') {
         const record = msg.data
         console.log(record)
         return {
           innerCode: record.stockCode,
          //  name: record.stockName,
           price: record.lastpx,
           chg: record.pxchg,
           curChngPct: record.pxchgratio
         }
       } else {
         return null
       }
     }
   }),
   components: {
     Pagination,
     ThemeSortAz,
     StockBox
   },
   methods: {
     query (type, page) {
       // if (this.sortField === type && page) {
       //   return
       // }
       this.sortField = type
      // sortField, page, pagesize, totalPages
       // this.$store.dispatch('topic/queryAllTopic', { sortField: this.FIELDS[this.sortField] })
       this.$store.dispatch('topic/queryAllTopic', { sortField: this.FIELDS[this.sortField], page: this.page, pagesize: this.pagesize })
     },
     list (type, page) {
       this.$store.dispatch('topic/queryListChange', { sortField: this.FIELDS.updown, page: this.page, pagesize: this.pagesize })
     },
     goToPage (page) {
       this.page = Number(page) - 1
     },
     updateVal () {
       this.direName = 'df'
     }, /* showList: false,
       showAz: false,*/
     listClick (e) {
       e.preventDefault()
       this.showList = true
       this.showAz = false
       this.query('hot')
       this.isStyle = ''
     },
     azClick (e) {
       e.preventDefault()
       this.showList = false
       this.showAz = true
       this.list('updown')
       this.isStyle = 'none'
     },
     /* listChangeClick (type, e) {
       e.preventDefault()
       this.isShow = !this.isShow
       if (type === 'kuai') {
         this.list('updown')
         this.isStyle = 'none'
       } else {
         this.query('hot')
         this.isStyle = ''
       }
     },*/
     format (date) {
       return formatDate(date)
     },
     changeTofixed (num) {
       return num > 0 ? '+' + parseFloat(num).toFixed(2) + '%' : parseFloat(num).toFixed(2) + '%'
     },
     updateStock (stock) {
       this.$store.commit('topic/UPDATE_TOPIC_RELSTOCK', stock)
     },
     subscribeStock () {
       const msg = {
         subject: 'snapshot',
         type: '1',
         actionType: '1',
         stockCodeList: Object.keys(this.relatedStocks),
         token: ''
       }
       this.$store.dispatch('z3sockjs/send', msg)
     }
   },
   watch: {
     page () {
       this.query(this.sortField, this.page)
     },
     relatedStocks () {
       console.log(this.relatedStocks)
       if (z3websocket.ws) {
         z3websocket.ws && z3websocket.ws.close()
       } else {
         this.$store.dispatch('z3sockjs/init')
       }
     },
     stockMessage () {
       console.log(this.stockMessage)
       if (this.stockMessage) {
         this.updateStock(this.stockMessage)
       }
     },
     socketState () {
       if (this.socketState === 1) {
         // 建立连接
         this.subscribeStock()
       } else if (this.socketState === 3) {
         // 断开连接，重新建立连接
         this.$store.dispatch('z3sockjs/init')
       }
     }
   },
   mounted () {
     this.query('hot')
   },
   destroyed () {
     z3websocket.ws && z3websocket.ws.close()
   }
 }
</script>
