<style lang="scss" scoped="">
    .finance-news{}
    .finance-news-top{height:12%;border-bottom: 1px solid #ddd;}
    .finance-news-top p{display: inline-block;width: 50%;}
    .more-news{color:#4c8cca;cursor: pointer;}
    .finance-news-title{font-weight: bold;color:#666;}
    .finance-news-list{height:88%;}
    .finance-news-list li{height:16.66%;padding-top:8px;}
    .newtitle{cursor: pointer;color:#666;}
    .newtitle:hover{color:#4c8cca;}
    .finance-news-list>li:before{
        float: left;
        content: "";
        background: #ccc;
        width: 4px;
        height: 4px;
        overflow: hidden;
        display: inline-block;
        margin: 6px 11px 0 0;
        border-radius: 2px;
    }
</style>
<template>
    <div class="finance-news">
        <div class="finance-news-top clearfix">
            <p class="fl tl finance-news-title">{{newsName}}</p>
            <p class="fr tr more-news"><router-link :to="{name:'newslist',params:{newsType:newsType}}">更多</router-link></p>
        </div>
        <ul class="finance-news-list">
            <li v-for="item of newsList" class="c_txt tl clearfix">
                <router-link class="fl newtitle" :to="{name:'newsdetails',params:{newsId:item.iiid,newsType:newsType}}" target="_blank">{{item.title}}</router-link>
                <span class="fr">{{item.makedate.substring(11)}}</span>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
    export default {
      props: ['newsList', 'newsName', 'newsType'],
      data () {
        return {

        }
      },
      computed: {

      },
      methods: {

      },
      mounted () {
    
      }
    }
</script>
