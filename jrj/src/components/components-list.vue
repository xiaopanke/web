<style lang="scss">
a {
    color: #666;
    font-size: 14px;
}
    .components-list .search-bar{
        background: red;
    }
</style>

<template>
<div class="components-list">
  <ComponentPanel name="head-nav-dark" desc="金融界网站头部深色导航2" :props="[
    {
      name: 'logo-url',
      desc: '替换logo图片'
    }
  ]" :events="[
    {
      name: 'logoclick',
      desc: '点击logo触发的事件'
    }
  ]" :slots="[
    {
      name: 'search',
      desc: '用于插入搜索框'
    }
  ]">
    <HeadNavDark />
  </ComponentPanel>

  <ComponentPanel name="search-bar" desc="搜索框" :props="[
    {
      name: 'placeholder',
      desc: '替换文本'
    }
  ]" :events="[
{
      name: 'searchsuccess',
      desc: '搜索完成时触发'
    }
  ]" :slots="[

  ]">
    <SearchBar @searchsuccess="showArticleList" @searcherror="cleanArticleList" placeholder="支持搜索股票、主题、信号、指标、资讯、研报" />
  </ComponentPanel>
    <ComponentPanel name="search-bar" desc="文章列表块" :props="[
    {
      name: 'data',
      desc: `传入的数据。数据结构：[{
            title:'资讯',
            count:22,
            moreLink:'http://10.77.4.23:8081/dbus/search/infor/list.shtml?w=00',
            list:[{
                title:'预告：乐视网临时股东大会将于今日下午14：00召开',
                link:'http://localhost:8000/dbus/news/0000000000000ip3k8.shtml?searchval=00'
            }]
        },{
            title:'研报',
            count:5,
            moreLink:'http://10.77.4.23:8081/dbus/search/infor/list.shtml?w=00',
            list:[{
                title:'China CYTS Tours Alert:Post Result Update Con Call on April 24',
                link:'http://localhost:8000/dbus/stock/reportinfo/0000000000000hw282.shtml?searchval=00'
            }]
        }]`
    }
    ]" :events="[

    ]" :slots="[

    ]">
        <ArticleList :data="articleList" width="498" />
    </ComponentPanel>
</div>
</template>

<script>
import ComponentPanel from './component-panel'
import HeadNavDark from './head-nav-dark'
import SearchBar from './search-bar'
import ArticleList from './article-list'
import JichushareMessage from './jichushare-message'

export default {
  data () {
    return {
      articleList: null
    }
  },
  components: {
    ComponentPanel,
    HeadNavDark,
    SearchBar,
    ArticleList,
    JichushareMessage
  },
  methods: {
    showArticleList () {
      const searchResult = this.$store.state.zhikuanSearch
      this.articleList = [{
        title: '股票',
        count: searchResult.total,
        list: searchResult.result && searchResult.result.map(item => {
          return {
            title: item.stockName,
            link: item.stockUrl
          }
        })
      }]
    },
    cleanArticleList () {
      this.articleList = null
    }
  },
  mounted () {}
}
</script>
