<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .lang{ position: relative;padding-top:3px;}
    .lang .line{width:300px;height: 10px;background: #dddddd;border-radius: 2px; display: block;cursor: pointer;}
    .lang ul{ margin-top:10px;}
    .lang ul li{ float: left;margin-left:12px;}
    .lang i{ display: block;width:0;height: 5px; border-left:1px solid #b4b8c1;margin-left:8px;}
    .lang b{font-size: 12px; font-weight: normal;}
    .lang strong{width:8px;height: 15px;border:1px solid #d3d3d3;position: absolute;top:0;left:16px;background: #ededed;cursor: pointer;}
    .lang .sel i{border-color: #fa532e}
    .lang .sel b{color: #fa532e}
</style>
<template>
    <div class="progressbar">
      <div class="lang">
        <span class="line" @click="clickgreet" ref="line"></span>
        <strong  v-drag="greet" ref="progressblock"></strong>
        <ul class="clearfix">
          <li class="" v-for="(item,index) in 10" :index="index" ref="li">
            <i></i>
            <b>{{item}}.0</b>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default{
      props: [],
      data () {
        return {
          val: '132',
          num: ''
        }
      },
      methods: {
        greet (val) {
          this.val = val
          // console.log(val.x)
          this.num = val.num
          if (this.num < 0) { this.num = 0 }
          if (this.num > 9) { this.num = 9 }
          this.addcur(this.num)
        },
        clickgreet (e) {
          var l = e.clientX - 13
          this.num = Math.round(((l - 16) / 28.66))
          if (this.num < 0) { this.num = 0 }
          if (this.num > 9) { this.num = 9 }
          l = this.num * 28.66 + 16
          this.$refs.progressblock.style.left = l + 'px'
          this.addcur(this.num)
        },
        addcur (num) {
          var litotal = this.$refs.li
          for (var i = 0; i < litotal.length; i++) {
            litotal[i].className = ''
          }
          litotal.find(item => item.getAttribute('index') === (num + '')).className = 'sel'
        }
      },
      mounted () {

      }
    }
</script>
