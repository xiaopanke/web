<style lang="scss" scoped="">
    .theme-home{padding: 10px;background: #fff;float: right;display: inline-block;}
    .theme-home-top{height:12%;border-bottom: 1px solid #ddd;}
    .theme-home-top p{display: inline-block;width: 50%;}
    .more-theme{color:#4c8cca;cursor: pointer;}
    .theme-home-title{font-weight: bold;color:#666;}
    .theme-title{width: 25%;color:#4c8cca;font-weight: bold;}
    .theme-con-title{height:15%;padding-top:5px;}
    .theme-con-title li{height:100%;float: left;display: inline-block;}
    .theme-con-title li span:nth-child(1){}
    .updown-rate{width: 29%;}
    .up-stock,.down-stock{width: 23%;}
    .event:hover{color: #2388da;}
    .event{}
</style>
<template>
    <div class="theme-home" :style="{width:themeWidth,height:themeHeight}">
        <div class="theme-home-top clearfix">
            <p class="fl tl theme-home-title">今日热点主题</p>
            <p class="fr tr more-theme"><router-link :to="{name:'themeindex'}">全部</router-link></p>
        </div>
        <ul class="theme-con-title clearfix">
            <li class="theme-title tl"><router-link :to="{name:'topicDetail',params:{topicId:topicCode}}">{{topicName}}</router-link></li>
            <li class="updown-rate">
                <span>今日涨跌</span>
                <span :class="chngPct === '--'?'c_txt':(chngPct>0 ? 'c_up':'c_down')">{{chngPctFmt}}</span>
            </li>
            <li class="up-stock tr">
                <span>上涨股票</span>
                <span :class="stkUpNum === '--'?'c_txt':'c_up'">{{stkUpNum}}</span>
            </li>
            <li class="down-stock tr">
                <span>下跌股票</span>
                <span :class="stkDownNum === '--'?'c_txt':'c_down'">{{stkDownNum}}</span>
            </li>
        </ul>
        <div style="text-align: justify;line-height: 205%;">
            <strong>最新事件：</strong>
            <span class="txt-con">
              <router-link :to="{name:'detailPages',params:{id : newsId, detailType:'news'}}" class="new-text"><span class="event c_txt tl">{{summary}}</span></router-link>
                （<span class="c_txt">{{newsDeclareDate}}</span>   <span class="c_txt">{{srcName}}</span>）
            </span>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { formatDate } from 'utils/date'
    export default {
      props: ['themeHeight', 'themeWidth'],
      data () {
        return {
          newsId: '',
          summary: '',
          newsDeclareDate: '',
          srcName: '',
          topicName: '',
          chngPct: '',
          stkUpNum: '',
          stkDownNum: '',
          topicCode: ''
        }
      },
      computed: {
        topicData: function () {
          const topicData = this.$store.state.topic.hotlist
          return topicData
        }
      },
      methods: {
        format (date) {
          return formatDate(date)
        },
        initTopic () {
          this.$store.dispatch('topic/queryHot').then(() => {
            if (this.topicData) {
              this.newsId = this.topicData[1].newsId
              this.summary = this.topicData[1].summary
              this.newsDeclareDate = this.format(this.topicData[1].newsDeclareDate)
              this.srcName = this.topicData[1].srcName
              this.topicName = this.topicData[1].topicName
              this.chngPct = this.topicData[1].topicMarket.chngPct === null ? '--' : this.topicData[1].topicMarket.chngPct
              this.chngPctFmt = this.topicData[1].topicMarket.chngPct === null ? '--' : (this.topicData[1].topicMarket.chngPct > 0 ? '+' + (this.topicData[1].topicMarket.chngPct).toFixed(2) + '%' : (this.topicData[1].topicMarket.chngPct).toFixed(2) + '%')
              this.stkUpNum = this.topicData[1].topicMarket.stkUpNum === null ? '--' : this.topicData[1].topicMarket.stkUpNum
              this.stkDownNum = this.topicData[1].topicMarket.stkDownNum === null ? '--' : this.topicData[1].topicMarket.stkDownNum
              this.topicCode = this.topicData[1].topicCode
            }
          })
        }
      },
      mounted () {
        this.initTopic()
      }
    }
</script>
