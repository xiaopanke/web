<style lang="scss" scoped="">
@import '../../assets/css/base.css';
* {
    box-sizing: border-box;
    font-family: '微软雅黑';
    font-size: 12px;
}
body,
html {
    height: 100%;
}
.news-wrap {
    padding: 10px 95px 0;
    background-color: #fff;
    min-height: 100%;
    overflow: auto;
}
.new-title {
    text-align: center;
    padding-bottom: 40px;
    font-weight: 700;
    font-size: 14px;
}
.new-txt {
    padding-bottom: 20px;
    padding-left: 5px;
    text-align: right;
}
.source-warn {
    text-align: center;
}
.new-main {
    padding-bottom: 40px;
}
.new-main p a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: red;
}
.duty-name {
    padding-bottom: 80px;
}
iframe {
    height: 20px !important;
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    width: 605px;
}
.stbu {
    color: red;
}
</style>
<template>
<div class="news-wrap">
  <p class="new-title">{{newsTitle}}</p>
  <div class="new-txt">
    <span>{{makeDate}}</span>
    <span>来源：{{source}}</span>
  </div>
  <div class="new-main" v-html="newsContxt"></div>
  <p class="source-warn" v-if="source === '金融界网站'">来源为金融界股票频道的作品，均为版权作品，未经书面授权禁止任何媒体转载，否则视为侵权！</p>
  <p class="tl">关键词阅读：{{keyword}}</p>
  <p class="tr duty-name">责任编辑：{{dutyname}}</p>
</div>
</template>
<script type="text/javascript">
export default {
  props: [],
  data () {
    return {
      newsDetails: null,
      newsTitle: '',
      newsId: '',
      makeDate: '',
      source: '',
      newsContxt: '',
      keyword: '',
      dutyname: ''
    }
  },
  computed: {
    newsDetailData: function () {
      const newsDetailData = [].concat(this.$store.state.z3touguIndex.newsDetails)
      return newsDetailData[0]
    }
  },
  methods: {
    getNews: function () {
      this.newsId = this.$route.params.newsId
      this.$store.dispatch('z3touguIndex/getNewsDetails', {
        newsId: this.newsId
      })
        .then(() => {
          this.newsDetails = this.newsDetailData
          this.newsTitle = this.newsDetailData.title
          this.makeDate = this.newsDetailData.makedate
          this.source = this.newsDetailData.source
          this.newsContxt = this.newsDetailData.context.replace(/href/g, 'aa').replace(/<P/g, '<P style=\'text-indent:25px;line-height: 25px;\' ')
          console.log(this.newsContxt)
          this.keyword = this.newsDetailData.keyword.replace(',', ' ')
          this.dutyname = this.newsDetailData.dutyname
        })
    }
  },
  mounted () {
    this.getNews()
  }
}
</script>
