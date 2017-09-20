<style lang="scss" scoped>
@import '../assets/css/reset.css';

.pop {
    width: 547px;
    position: fixed;
    top: 25%;
    left: 50%;
    margin-left: -273.5px;
    z-index: 11;
    background-color: #fff;
    border-radius: 5px;
}
.pop h3 {
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #e7e7e7;
    border-radius: 5px 5px 0 0;
    font-weight: normal;
    font-size: 16px;
    color: #000;
}
.pop i {
    width: 21px;
    height: 21px;
    position: absolute;
    right: 14px;
    top: 12px;
    background: url("../assets/images/course-list/icon19.png") no-repeat;
    cursor: pointer;
}
.pop .course-pop {
    text-align: center;
    position: relative;
    padding: 44px 0;
}
.pop .course-pop p {
    font-size: 14px;
    color: #333;
    line-height: 26px;
}
.pop .course-pop button {
    width: 158px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #ff5555;
    color: #fff;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin: 50px 8px 0 8px;
    outline: none;
    cursor: pointer;
}
.pop .course-pop button.ok {
    background-color: #ff5555;
    color: #fff;
}
.pop .course-pop button.no {
    background-color: #ccc;
    color: 333;
}
</style>
<template>
<div class="pop">
    <h3>提示</h3>
    <i @click="onCloseClicked"></i>
    <div class="course-pop">
        <p>{{prompt}}</p>
        <button type="button" name="button" @click="submit()" class="ok">确认</button>
        <button type="button" name="button" class="no" @click="onCloseClicked">取消</button>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['prompt'],
  components: {},
  methods: {
    onCloseClicked () {
      this.$emit('closeDeleteDialog')
    },
    submit () {
      this.$emit('ok')
    }
  },
  mounted () {}
}
</script>
