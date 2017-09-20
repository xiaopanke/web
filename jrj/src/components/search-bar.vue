<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .search-bar{
        width: 100%;
        height: 24px;
        line-height: 0;
    }
    form{
        position: relative;
        text-align: left;
    }
    input{
        outline: 0;
        border: 0;
        background: 0;
        color:#666;
    }
    .search_t{
        width: 100%;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        padding-left: 10px;
        &::-webkit-input-placeholder{ color:#bfbec0;}
    }

</style>
<template>
    <div class="search-bar">
        <form @submit="search($event)" class="">
            <input @input="search($event)" @keyup="keyEnter($event)" ref="keyword" class="search_t" type="text" value="" :placeholder="placeholder" autocomplete="off">
        </form>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { ctx } from '../z3tougu/config'

export default {
      data () {
        return {}
      },
      props: ['placeholder'],
      computed: mapState({
        result: state => state.zhikuanSearch.result
      }),
      components: {},
      methods: {
        search (e) {
          e.preventDefault()
          const keyword = this.$refs.keyword.value
          this.$store.dispatch('zhikuanSearch/search', { keyword })
        },
        keyEnter (e) {
          if (e.keyCode === 13) {
            const keyword = this.$refs.keyword.value
            if (keyword !== '') {
              this.$store.dispatch('zhikuanSearch/quotaList', { keyword }).then(() => {
                if (this.$store.state.zhikuanSearch.isQuota) {
                  window.open(this.$store.state.zhikuanSearch.isQuota)
                } else {
                  window.open(`${ctx}/search/stock/${keyword}`)
                }
              })
            }
          }
        }
      },
      mounted () {
        this.$watch('result', function (result) {
          if (result) {
            this.$emit('searchsuccess')
          } else {
            this.$emit('searcherror')
          }
        })
      }
    }
</script>
