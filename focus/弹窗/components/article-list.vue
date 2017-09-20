<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .article-list{
        border: 1px solid #e1e1e1;
        background: #fff;
        font-size: 12px;
        z-index: 999999;
        box-shadow: 2px 2px 7px 0 #bfbfbf;
        -moz-box-shadow: 2px 2px 7px 0 #bfbfbf;
        -webkit-box-shadow: 2px 2px 7px 0 #bfbfbf;
        text-align: left;
    }
</style>
<template>
    <div class="article-list" :style="{width:width+'px'}">
        <div v-if="data && data.length > 0" v-for="block of data">
            <p class="c999 clearfix">
                <span class="fl title">{{block.title}}</span>
                <a class="fr">共{{block.count}}条相关资讯&gt;&gt;</a>
            </p>
            <ul>
                <li v-for="article of block.list"><a :href="article.link">{{article.title}}</a></li>
            </ul>
        </div>
        <div v-if="!data">当前没有数据</div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
export default {
      data () {
        return {}
      },
      props: ['data', 'width'],
      computed: mapState({
        result: state => state.zhikuanSearch.result
      }),
      components: {},
      methods: {
        search (e) {
          e.preventDefault()
          const keyword = this.$refs.keyword.value
          this.$store.dispatch('zhikuanSearch/search', { keyword })
        }
      },
      mounted () {
        this.$watch('result', result => {
          this.$emit('searchsuccess')
        })
      }
    }
</script>
