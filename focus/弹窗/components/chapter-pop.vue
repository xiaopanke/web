<style lang="scss" scoped>
@import '../assets/css/reset.css';

.pop {
    width: 547px;
    position: fixed;
    top: 35%;
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
.pop div {
    text-align: left;
}
.pop div p {
    padding: 50px 0;
    font-size: 14px;
    color: #333;
}
.pop div p ul {
    margin-left: 87px;
}
.pop div p input {
    padding: 5px 15px;
    width: 220px;
}
.pop div p span {
    width: 98px;
    display: inline-block;
}
.pop div p li {
    margin-bottom: 5px;
}
.pop div p strong {
    font-size: 12px;
    color: #888;
}
.pop div p strong em {
    color: #ff4040;
}
.pop div p button {
    width: 170px;
    height: 38px;
    background-color: #ff5555;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-top: 50px;
}
</style>
<template>
<div class="pop">
    <h3>{{title}}</h3>
    <i @click="onCloseClicked"></i>
    <div>
        <p>
            <ul>
                <li>
                    <span>{{inputTitle}}</span>
                    <input type="text" name="chapterName" :value="value" ref='input1' placeholder="" maxlength="15" />
                </li>
                <li>
                    <span></span>
                    <strong v-if='errMsg'>{{desc}}名称长度<em>2-15</em>个字</strong>
                    <strong v-else><em>{{desc}}名称长度不符</em></strong>
                </li>
                <li>
                    <span></span><button type="button" name="button" @click='addChapters'>添加</button>
                </li>
            </ul>

        </p>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      errMsg: true
    }
  },
  props: ['title', 'inputTitle', 'desc', 'type', 'value'],
  components: {},
  methods: {
    onCloseClicked () {
      this.$emit('close')
    },
    addChapters () {
      if (this.$refs.input1.value.length >= 2 && this.$refs.input1.value.length <= 15) {
        this.$emit('add', this.$refs.input1.value, this.type)
      } else {
        this.errMsg = false
      }
    }
  },
  mounted () {
  }
}
</script>
