<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .topNav{ height:23px; border-bottom:1px solid #D2D2D2; background:#EEF3F7;}
    .goldH5 .topNav ul li{ float: left; width:20%}
    .topNav ul li{ float: left;}
    .topNav ul li>span{ font-size:12px; display: block; height:23px; line-height: 23px; width:75px; text-align: center; cursor: pointer;}
    .active{ background:#2388da; color:#fff;}
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .topNav{ height:0.6rem; border-bottom:1px solid #0799E5; background:#fff;}
        .topNav ul li>span{ font-size:0.24rem; display: block; height:0.6rem; line-height: 0.6rem; width:auto;
            padding:0 0.1rem; text-align: center; cursor: pointer;}
    }
</style>
<template>
    <div class="topNav">
        <ul class="clearfix">
            <li v-for="item in data"><span @click="changeTab($event)" :class="type === item[1] ? 'active':''" href="#" :value="item[1]">{{item[0]}}</span></li>
        </ul>
    </div>
</template>
<script>
    export default{
      props: ['data', 'type'],
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
        changeTab (e) {
          const type = e.target.getAttribute('value')
          this.$emit('changeType', type)
        }
      },
      mounted () {

      }
    }
</script>
