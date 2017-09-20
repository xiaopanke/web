<style lang="scss">
    @import '../assets/css/base.css';
    *{
      text-align: justify;
    }
    em,i{
      font-style: normal;
    }
    html{
      background: #f2f2f2;
    }
    body{
      background: #f2f2f2;
    }
    .blue{
      color: #2388da;
      font-size: 12px;
    }
    .red{
      color:#e6363a;
    }
    .green {
      color:#48a854;
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
   /*  span{
      color: #696969;
    } */
    a{
      color: #696969;
    }
    
    html,body{
        background: #f2f2f2;

    }

    .informat-list{
        width: 100%;
        /* background: #f2f2f2; */
       /*  padding: 9px; */
        font-size: 12px;
        color: #696969;

    }
    .infor-top{
      padding: 19px 0 6px 21px;
      font-size: 12px;
    }
    .informat-content{
      background: #fff;
      border-radius: 3px;
      border: 1px solid #e5e5e5;
      margin: 9px;
      height: 100%;

    }
    .informat-main{
      width: 66%;
      margin: 0 auto;
      /* min-height: 811px; */
    }
    .in-content{
      /* line-height: 20px; */
    }
    /* .list-bottom{
      padding-bottom: 4%;
      display: inline-block;
      width: 100%;
    } */
    .in-title{
      line-height: 82px;
    }
    .new-tit{
      width: 62%;
      text-align: left;
      float: left;
      white-space: nowrap;  
      overflow: hidden;  
      text-overflow: ellipsis; 
      line-height: 24px;
      /* padding-bottom: 4.8%; */

    }
    .new-date{
      color: #7e7e7e;
      line-height: 24px;
      float: left;
      width: 12%;
      text-align: center;
     /*  padding-bottom: 4.8%; */
    }
    .new-srcname{
      line-height: 24px;
      float: left;
      width: 14%;
      text-align: right;
      /* text-align: center; */
      color: #7e7e7e;
      /* padding-bottom: 4.8%; */
    }
    .new-tit:hover{
      color:#2388da;
    }
    .informat-list .informat-content .page{
      text-align: center;
      /* margin: 13px 0 16px 0; */
      padding: 20px 0;
    }
</style>
<template>
      <div class="informat-list clearfix">
          <div class="infor-top">
             <a href="#" class="blue" @click="routerBack">< 返回主题详情</a>
          </div>
          <div class="informat-content clearfix">
              <div class="informat-main" :style="{  minHeight: fullHeight + 'px' }">
                   <strong class="in-title" v-if="index==0" v-for="(infor,index) of informatList">{{infor.topicName}}相关资讯</strong>
                   <div class="in-content clearfix">
                      <div class="clearfix alink" v-if="informatList && informatList.length > 0" v-for="infor of informatList">
                        <router-link :to="{name:'detailPages',params:{id : infor.newsId, detailType:'news'}}" class="list-bottom"> 
                         <span class="new-tit">{{infor.title==null?'--':infor.title}}</span>
                         <span class="new-date">{{infor.declareDate==null?'--':format(infor.declareDate)}}</span>
                         <span class="new-srcname">{{infor.srcName==null?'--':infor.srcName}}</span></router-link>
                      </div>
                   </div>
                   
              </div>
              <Pagination  @getPageFromChild="goToPage" :totalPage="totalPage"/>
          </div>
      </div>
</template>

<script>
 import { mapState } from 'vuex'
 import { formatDate } from 'utils/date'
 import Pagination from './pagination'
 export default {
   data () {
     return {
       topicCode: this.$route.params.inforId,
       inforPage: '',
       inforPageSize: '',
       fullHeight: document.documentElement.clientHeight - 145
     }
   },
   computed: mapState({
     informatList: state => state.topic.informatList,
     totalPage: state => state.topic.inforTotal
   }),
   components: {
     Pagination
   },
   methods: {
     initData (inforPage) {
       this.$store.dispatch('topic/queryInformatList', { topicCode: this.topicCode, inforPage: this.inforPage, inforPageSize: this.inforPageSize })
     },
     routerBack () {
       this.$router.go(-1)
     },
     goToPage (inforPage) {
       this.inforPage = Number(inforPage) - 1
     },
     format (date) {
       return formatDate(date)
     }
   },
   watch: {
     inforPage () {
       this.initData(this.inforPage)
     }
 
   },
   mounted () {
     this.initData()
     console.log(this.fullHeight)
   }
 
 }
</script>
