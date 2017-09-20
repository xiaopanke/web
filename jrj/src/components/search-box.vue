<style lang="scss" scoped>
.searchBox{
    width: 300px;
    background: #fff;
    box-shadow: 2px 2px 7px 0 #bfbfbf;
    -moz-box-shadow: 2px 2px 7px 0 #bfbfbf;
    -webkit-box-shadow: 2px 2px 7px 0 #bfbfbf;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin:0 auto;
}
</style>
<template>
    <div class="searchBox">
        <SearchBar @searchsuccess="showArticleList" @searcherror="cleanArticleList" placeholder="支持搜索股票、主题、信号、指标、资讯、研报" />

        <ArticleList :data="articleList" width="498" :keyword="keyword"/>
    </div>
</template>
<script>
    import SearchBar from 'components/search-bar'
    import ArticleList from 'components/article-list'
    import { mapState } from 'vuex'
    export default{

      data () {
        return {
          articleList: null
        }
      },
      components: {
        SearchBar,
        ArticleList
      },
      computed: mapState({
        keyword: state => state.zhikuanSearch.keyword
      }),
      methods: {
        showArticleList () {
          const searchResult = this.$store.state.zhikuanSearch
          this.articleList = [{
            title: '股票',
            linkText: 'stock',
            count: searchResult.total.stock,
            list: searchResult.result.stock && searchResult.result.stock.map(item => {
              return {
                title: item.stockName,
                link: item.stockUrl,
                code: item.stockCode
              }
            })
          }, {
            title: '主题',
            linkText: 'theme',
            count: searchResult.total.theme,
            list: searchResult.result.theme && searchResult.result.theme.map(item => {
              const id = item.themeUrl.substring((item.themeUrl.lastIndexOf('/') + 1), item.themeUrl.indexOf('.'))
              return {
                title: item.themeName,
                link: id
              }
            })
          }, {
            title: '信号',
            linkText: 'signal',
            count: searchResult.total.signal,
            list: searchResult.result.signal && searchResult.result.signal.map(item => {
              return {
                title: item.signalName,
                link: item.signalUrl
              }
            })
          }, {
            title: '资讯',
            linkText: 'infor',
            count: searchResult.total.infor,
            list: searchResult.result.infor && searchResult.result.infor.map(item => {
              const id = item.newsUrl.substring((item.newsUrl.lastIndexOf('/') + 1), item.newsUrl.indexOf('.'))
              return {
                title: item.newsTitle,
                link: id
              }
            })
          }, {
            title: '研报',
            linkText: 'report',
            count: searchResult.total.report,
            list: searchResult.result.report && searchResult.result.report.map(item => {
              const id = item.reportUrl.substring((item.reportUrl.lastIndexOf('/') + 1), item.reportUrl.indexOf('.'))
              return {
                title: item.reportTitle,
                link: id
              }
            })
          }]
        },
        cleanArticleList () {
          this.articleList = null
        }
      },
      mounted () {

      }

    }

</script>
