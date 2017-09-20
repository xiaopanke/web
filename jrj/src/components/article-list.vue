<style lang="scss" scoped>
@import '../assets/css/base.css';
.article-list {
    width: 100%;
    border-top: 1px solid #ccc;
    background: #fff;
    font-size: 12px;
    z-index: 999999;
    text-align: left;
}
.newsTitle {
    background: #F2F2F2;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    padding: 0 9px;
}
.newsTitle a {
    color: #000;
}
.newsTitle a:hover {
    text-decoration: underline;
}
.newList {
    line-height: 20px;
    padding: 0 9px;
    margin-bottom: 10px;
}
.newList li a {
    color: #000;
    display: inline-block;
    width: 280px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.newList li a:hover {
    text-decoration: underline;
}
</style>
<template>
<div class="article-list">
  <div v-if="data && data.length > 0" v-for="block of data">
    <template v-if="block.count != 0">
            <p class="c999 clearfix newsTitle">
                <span class="fl title">{{block.title}}</span>
                <router-link :to="{name:'search' , params:{ linkText : block.linkText, keyword : keyword}}" class="fr" target="_blank">共{{block.count}}条相关{{block.title}}&gt;&gt;</router-link>
            </p>
            <ul class="newList" v-if="block.linkText==='stock'">
                <li v-for="article of block.list"><a :href="article.link" target="_blank">{{article.title}}[{{article.code}}]</a></li>
            </ul>
            <ul class="newList" v-if="block.linkText==='theme'">
                    <li v-for="article of block.list"><router-link :to="{ name:'topicDetail' , params:{ topicId : article.link}}" target="_blank">{{article.title}}</router-link></li>
                </ul>
            <ul class="newList" v-if="block.linkText==='signal'">
                    <li v-for="article of block.list"><a :href="article.link" target="_blank">{{article.title}}</a></li>
                </ul>
            <ul class="newList" v-if="block.linkText==='infor'">
                <li v-for="article of block.list">
                    <router-link :to="{ name:'detailPages' , params:{ id : article.link, detailType:'news'}}" target="_blank">{{article.title}}</router-link>
                </li>
            </ul>
            <ul class="newList" v-if="block.linkText==='report'">
                <li v-for="article of block.list"><router-link :to="{ name:'detailPages' , params:{id : article.link, detailType:'report'}}" target="_blank">{{article.title}}</router-link></li>
            </ul>
            </template>
  </div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {

    }
  },
  props: ['data', 'width', 'keyword'],
  computed: mapState({
    result: state => state.zhikuanSearch.result
  }),
  components: {},
  methods: {
    search (e) {
      e.preventDefault()
      const keyword = this.$refs.keyword.value
      this.$store.dispatch('zhikuanSearch/search', {
        keyword
      })
    }
  },
  mounted () {
    this.$watch('result', result => {
      this.$emit('searchsuccess')
    })
  }
}
</script>
