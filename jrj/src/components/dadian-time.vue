<style>
@import "../assets/plugins/laydate/laydate.css";
.dadian-time .up:after{ display: block;content: ''; clear: both;}
input{font-size: 16px;width:190px;}
#laydate_today{display: none !important;}
</style>
<template>
<div class="dadian-time">
  <div class="up">
    <input  @change="starttimeChanged($event)" placeholder="请输入日期" class="laydate-icon" v-model="starttime" @click="startsendmsgtoparent" >
    <span>至</span>
    <input  @change="endtimeChanged($event)"  placeholder="请输入日期" class="laydate-icon" v-model="endtime"  @click="endsendmsgtoparent" >
  </div>

</div>
</template>
<script>
import '../assets/plugins/laydate/laydate.js'
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
    }
  },
  props: ['starttime', 'endtime'],
  computed: mapState({
  }),
  mounted () {
  },
  methods: {
    starttimeChanged (newTime) {
      this.$emit('starttimeChanged', newTime)
    },
    endtimeChanged (newTime) {
      this.$emit('endtimeChanged', newTime)
    },
    startsendmsgtoparent () {
      window.laydate({ istime: true, format: 'YYYY-MM-DD hh:mm:ss', choose: this.starttimeChanged.bind(this) })
    },
    endsendmsgtoparent () {
      window.laydate({ istime: true, format: 'YYYY-MM-DD hh:mm:ss', choose: this.endtimeChanged.bind(this) })
    }
  }
}
</script>
