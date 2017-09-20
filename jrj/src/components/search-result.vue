<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .searchResult{
        background:#fff;
        font-size:12px;
        color:#191919;
        font-family: "宋体";
    }
    .searchResult>p{
        padding-left: 7px;
    }
    .searchResult ul{
        background:#fff;
    }
    .searchResult ul>p{
        background:#F2F2F2;
        line-height: 30px;
    }
    .searchResult ul li{
        padding-left: 7px;
        text-align: left;
        width:70%;
        border-bottom: 1px solid #F7F7F7;
    }
    .searchResult ul li p{
        margin-bottom: 9px;
    }
    .searchResult ul li a{
        display: block;
        padding-top: 15px;
    }
    .searchInfo{
        line-height: 24px;
    }
    .searchTime{
        color:#7e7e7e;
    }
    .newsSource{
        margin-left:20px;
    }
    .searchSort{
        position: absolute;
        right:20px;
        top:3px;
    }
    .searchSort span{
        display: inline-block;
        background: #fff;
        color: #409cf7;
        padding: 4px 7px;
        cursor: pointer;
    }
    .searchSort span:first-child{
        margin-right: 15px;
    }
    .searchSort span.active{
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .searchSort span img{
        position: relative;
        margin-left: 3px;
        width: 10px;
        top:2px;
    }

</style>
<template>

    <div class="searchResult">
        <ul v-if="searchType == 'stock'">
            <p>搜索股票数：<span>{{total}}</span></p>
            <li  v-for="item of resultData">
                <a :href="item.stockUrl" target="_blank">{{item.stockName}}[{{item.stockCode}}]</a>
                <p class="searchInfo">{{item.stockIntro}}</p>
            </li>
        </ul>
        <ul v-if="searchType == 'theme'">
            <p>搜索主题数：<span>{{total}}</span></p>
            <li  v-for="item of resultData">
                <router-link :to="{ name:'topicDetail' , params:{ topicId : item.themeUrl.substring((item.themeUrl.lastIndexOf('/') + 1), item.themeUrl.indexOf('.'))}}" target="_blank">{{item.themeName}}</router-link>
                <p class="searchInfo">{{item.themeExplain}}</p>
                <p class="searchTime">{{item.themeTime}}</p>
            </li>
        </ul>
        <ul v-if="searchType == 'signal'">
            <p>搜索信号数：<span>{{total}}</span></p>
            <li  v-for="item of resultData">
                <a :href="item.signalUrl" target="_blank">{{item.signalName}}</a>
                <p class="searchInfo">{{item.signalExplain}}</p>
            </li>
        </ul>
        <ul v-if="searchType == 'infor'" style="position: relative;">
            <p>搜索资讯数：<span>{{total}}</span></p>
            <div class="searchSort"><span class="active" ref="relativeBtn" @click="relativeSort($event)">关联度排序<img src="../assets/images/searchOrder.png"></span><span ref="timeBtn" @click="timeSort($event)">时间排序<img src="../assets/images/searchOrder.png"></span></div>
            <!--<span>关联度排序</span><span>时间排序</span>-->
            <li  v-for="item of resultData">
                <router-link :to="{name:'detailPages' , params:{ id : item.id, detailType:'news'}}" target="_blank">{{item.newsTitle}}</router-link>
                <p class="searchInfo">{{item.newsSummary}}</p>
                <p class="searchTime">{{item.newsTime}}<span class="newsSource">{{item.newsSource}}</span></p>
            </li>
        </ul>
        <ul v-if="searchType == 'report'" style="position: relative;">
            <p>搜索研报数：<span>{{total}}</span></p>
            <div class="searchSort"><span class="active" ref="relativeBtn" @click="relativeSort($event)">关联度排序<img src="../assets/images/searchOrder.png"></span><span ref="timeBtn" @click="timeSort($event)">时间排序<img src="../assets/images/searchOrder.png"></span></div>
            <li  v-for="item of resultData">
                <router-link :to="{ name:'detailPages' , params:{ id : item.id, detailType:'report'}}" target="_blank">{{item.reportTitle}}</router-link>
                <p class="searchInfo">{{item.reportSummary}}</p>
                <p class="searchTime">{{item.reportTime}}<span class="newsSource">{{item.reportSource}}</span></p>
            </li>
        </ul>
        <Pagination :totalPage="totalPage" :page="pageTo" v-on:getPageFromChild="goToPage" v-if="totalPage > 1"/>
    </div>


</template>



<script>
    import Pagination from 'components/pagination.vue'
    export default{
      // props: ['linkText'],
      data () {
        return {
          resultData: [],
          total: '',
          searchType: this.$route.params.linkText,
          totalPage: '',
          pageTo: undefined,
          sortType: ''
        }
      },
      components: {
        Pagination
      },
      cumputed: {

      },
      methods: {
        showSearchList (currentPage) {
          const keyword = this.$store.state.zhikuanSearch.keyword === '' ? this.$route.params.keyword : this.$store.state.zhikuanSearch.keyword
          const linkText = this.$route.params.linkText
          this.$store.dispatch('zhikuanSearchList/searchList', { keyword, currentPage, linkText, sortType: this.sortType }).then(() => {
            this.resultData = this.$store.state.zhikuanSearchList.dataList
            this.total = this.$store.state.zhikuanSearchList.totalRecordNum
            this.totalPage = this.$store.state.zhikuanSearchList.totalPage[linkText]
          })
        },
        goToPage (data) {
          this.showSearchList(data)
        },
        relativeSort (e) {
          const relativeBtn = this.$refs.relativeBtn
          const btn = this.$refs.timeBtn
          if (relativeBtn.className === 'active') {
            return
          } else {
            relativeBtn.setAttribute('class', 'active')
            btn.setAttribute('class', '')
          }
          const keyword = this.$route.params.keyword
          const linkText = this.$route.params.linkText
          this.searchType = this.$route.params.linkText
          this.sortType = 1

          this.$store.dispatch('zhikuanSearchList/searchList', { keyword, linkText, sortType: this.sortType }).then(() => {
            this.resultData = this.$store.state.zhikuanSearchList.dataList
            this.total = this.$store.state.zhikuanSearchList.totalRecordNum
            this.totalPage = this.$store.state.zhikuanSearchList.totalPage[linkText]
            this.pageTo = this.$store.state.zhikuanSearchList.currentPage
          })
        },
        timeSort (e) {
          const timeBtn = this.$refs.timeBtn
          const btn = this.$refs.relativeBtn
          if (timeBtn.className === 'active') {
            return
          } else {
            timeBtn.setAttribute('class', 'active')
            btn.setAttribute('class', '')
          }
          const keyword = this.$route.params.keyword
          const linkText = this.$route.params.linkText
          this.searchType = this.$route.params.linkText
          this.sortType = 2
          this.$store.dispatch('zhikuanSearchList/searchList', { keyword, linkText, sortType: this.sortType }).then(() => {
            this.resultData = this.$store.state.zhikuanSearchList.dataList
            this.total = this.$store.state.zhikuanSearchList.totalRecordNum
            this.totalPage = this.$store.state.zhikuanSearchList.totalPage[linkText]
            this.pageTo = this.$store.state.zhikuanSearchList.currentPage
          })
        }

      },
      watch: {
        '$route': function () {
          const keyword = this.$route.params.keyword
          const linkText = this.$route.params.linkText
          this.searchType = this.$route.params.linkText
          this.$store.dispatch('zhikuanSearchList/searchList', { keyword, linkText, sortType: this.sortType }).then(() => {
            this.resultData = this.$store.state.zhikuanSearchList.dataList
            this.total = this.$store.state.zhikuanSearchList.totalRecordNum
            this.totalPage = this.$store.state.zhikuanSearchList.totalPage[linkText]
          })
        }
      },
      mounted () {
        this.showSearchList()
      }

    }
</script>
