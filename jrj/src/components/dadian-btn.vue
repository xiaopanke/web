<style>
.dadian-btn:after{ display: block;content: ''; clear: both;}
.btn1 {
  width: 200px;
  margin: 20px 30px;
  text-align: center;
  font-size: 16px;
  color: #3e0f11;
  float: left;
  background: #00e0d2;
  line-height: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 0 0 #00c1b5;
  color:#fff;
  cursor: pointer;
}
.btn1:active{background: #474a4a}
.router-link-active{ background: #009F95;box-shadow: 0 5px 0 0 #026760 ;}
</style>
<template>
<div class="dadian-btn">
  <router-link class="btn1" to="/dadianapp">APP<br /> 打卡测试</router-link>
  <router-link class="btn1" to="/dadianweb">H5/WEB<br /> 打卡测试</router-link>
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
  computed: mapState({
  }),
  mounted () {
  },
  methods: {}
}
</script>
