<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .topNav{ height:23px; border-bottom:1px solid #0799E5; background:#fff;}
    .topNav ul li{ float: left;}
    .topNav ul li>a{  font-size:12px; display: block; height:23px; line-height: 23px; width:75px; text-align: center; cursor: pointer;}
    .router-link-active{ background:#2388da; color:#fff;}
</style>
<template>
    <div class="topNav">
        <ul class="clearfix">
            <li><router-link :to="{name:'search',params:{ linkText : 'stock' }}"  >股票</router-link></li>
            <li><router-link :to="{name:'search',params:{ linkText : 'theme' }}"  >主题</router-link></li>
            <li><router-link :to="{name:'search',params:{ linkText : 'signal' }}"  >信号</router-link></li>
            <li><router-link :to="{name:'search',params:{ linkText : 'infor' }}"  >资讯</router-link></li>
            <li><router-link :to="{name:'search',params:{ linkText : 'report' }}"  >研报</router-link></li>
        </ul>
    </div>
</template>
<script>
    export default{
      data () {
        return {
          activeSearch: this.$route.params.linkText
        }
      },
      watch: {
        'this.activeSearch': function () {

        }
      },
      cumputed: {

      },
      methods: {
        changeTab () {
          this.activeSearch = this.$route.params.linkText
        }
      },
      mounted () {

      }
    }
</script>
