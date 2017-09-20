<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .search-bar{
        margin-top: 8px;
        width: 500px;
        height: 24px;
        line-height: 0;
        background-color: #62697d;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    form{
        position: relative;
        text-align: left;
    }
    input{
        outline: 0;
        border: 0;
        background: 0;
    }
    .search_t{
        width: 450px;
        height: 16px;
        line-height: 16px;
        border-right: 1px solid #828ba4;
        margin-top: 4px;
        font-size: 12px;
        color: #bfbec0;
        padding-left: 18px;
        &::-webkit-input-placeholder{color:#bfbec0}
    }
    .search_s{
        position: absolute;
        right: 8px;
        top: 6px;
        width: 13px;
        height: 13px;
        cursor: pointer;
        background-image: url(../assets/images/f_sprite.png);
        background-position: 0 -129px;
    }
</style>
<template>
    <div class="search-bar">
        <form @submit="search($event)" class="">
            <input @input="search($event)" ref="keyword" class="search_t" type="text" value="" :placeholder="placeholder" autocomplete="off">
            <input type="submit" class="search_s" value="">
        </form>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
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
        }
      },
      mounted () {
        this.$watch('result', result => {
          if (result) {
            this.$emit('searchsuccess')
          } else {
            this.$emit('searcherror')
          }
        })
      }
    }
</script>
