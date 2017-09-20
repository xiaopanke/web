<style lang="scss" scoped>
@import '../assets/css/reset.css';

.clearfix:after {
    display: block;
    content: '';
    clear: both;
}
.course-box {
    width: 1000px;
    text-align: left;
}

.course-con {
    padding: 4px 32px;
    width: 936px;
}

.course-con h1 {
    line-height: 55px;
    height: 55px;
    background: url(../assets/images/course-list/icon1.jpg) 5px 18px no-repeat;
    color: #333;
    font-size: 18px;
    font-weight: normal;
    padding-left: 24px;
    border-bottom: 1px #dadada solid;
}

.create-box {
    padding: 35px 24px;
}

.create-left {
    width: 186px;
    float: left;
    cursor: pointer;
}

.create-left p {
    padding: 0 8px;
    font-size: 14px;
    color: #ff4040;
    line-height: 20px;
    text-align: center;
    margin-top: 15px;
}

.create-right {
    width: 679px;
    float: right;
    position: relative;
}

.create-right .courseName {
    width: 647px;
    height: 27px;
    line-height: 27px;
    padding: 10px 15px;
    border: 1px #b9b9b9 solid;
    color: #333;
    font-size: 14px;
    outline: none;
}

.create-right .courseName::placeholder {
    color: #888;
}

.create-right .courseMsg {
    width: 647px;
    height: 205px;
    padding: 16px 15px;
    border: 1px #b9b9b9 solid;
    font-size: 14px;
    line-height: 22px;
    color: #333;
    resize: none;
    outline: none;
    margin-top: 21px;
}

.create-right .courseMsg::placeholder {
    color: #888;
}

.create-right>div {
    margin-top: 28px;
}

.create-right>div p {
    width: 292px;
    float: left;
    height: 37px;
    line-height: 37px;
    font-size: 14px;
    color: #333;
}

.create-right>div p .coursePrice {
    padding: 5px 10px;
    width: 86px;
    height: 18px;
    border: 1px #b9b9b9 solid;
    border-radius: 5px;
    color: #333;
    font-size: 14px;
    outline: none;
}

.create-right>div p .coursePrice.priceDisabled {
    background-color: #ccc;
}

#counter {
    position: absolute;
    top: 280px;
    right: 10px;
    font-size: 14px;
    color: #333;
}

.peopleType1 {
    margin-left: 5px;
}

.create-right button {
    width: 300px;
    height: 52px;
    background-color: #ff5555;
    line-height: 52px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin: 100px 0 93px 0;
    outline: none;
    cursor: pointer;
}
.create-right select {
    height: 30px;
    outline: none;
}
</style>

<template>
    <div class="course-box">
        <div class="course-con clearfix">
            <h1>
                <span>创建课程</span>
            </h1>
            <div class="create-box">
                <!-- <UploadImg /> -->
                <div class="create-left">
                    <ImageUploader ref="cover" width="186" height="104" desc="上传课程封面" />
                    <p>支持JPG/JPEG和PNG文件<br />尺寸为大小不超过1M</p>
                </div>
                <div class="create-right">
                    <input type="text" name="courseName" value="" placeholder="输入课程名称（不超过15个字，发售后不可修改）" class="courseName" maxlength="15" ref="courseName"/>
                    <textarea ref="courseDesc" name="name" rows="8" cols="80" placeholder="输入课程介绍 （课程包括内容，学习后能有哪些收获）" class="courseMsg" id="tdesc" maxlength="300" v-model="desc" @input="descInput" onchange="this.value=this.value.substring(0, 300)" onkeydown="this.value=this.value.substring(0, 300)" onkeyup="this.value=this.value.substring(0, 300)"></textarea>
                    <div class="clearfix"><span id="counter" class="msg-info c_666 fr">{{txtVal}} / 300</span></div>
                    <div class="clearfix">
                        <p>
                            <span>课程价格：</span>
                            <input type="text" name="" value="" ref="price" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();" maxlength="5" :disabled="priceDisabled" :class="priceDisabled == true ? 'coursePrice priceDisabled' :  'coursePrice'" oninput='this.value=this.value.replace(/^[0]+[0-9]*$/gi,"")'/>
                            <span>元</span>
                        </p>
                        <p>
                            <input type="checkbox" name="" ref="feeType" @click="checkboxClick"/>
                            <span>免费</span>
                        </p>
                    </div>
                    <div class="clearfix">
                        <p>
                            <span style="float:left;">适合人群：</span>
                            <select id="peopleType1" name="peopleType1" ref="suitType">
                                <option value="-1">请选择适合人群</option>
                                <option value="0">不限投资经验</option>
                                <option value="1">1-3年投资经验</option>
                                <option value="2">3年以上投资经验</option>
                            </select>
                        </p>
                        <p>
                            <select id="peopleType2" name="peopleType2" ref="operationType">
                                <option value="-1">请选择操作风格</option>
                                <option value="2">不限操作风格</option>
                                <option value="0">短线或超短线操作</option>
                                <option value="1">中长线操作</option>
                            </select>
                        </p>
                    </div>
                    <button type="button" name="button" @click='courseSubmit'>立即创建</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
// window.basicUserInfo = {
//   userId: '141120010018719260'
// }

import { mapState } from 'vuex'
import ImageUploader from './image-uploader'
export default {
  data () {
    return {
      priceDisabled: false,
      txtVal: 0
    }
  },
  computed: mapState({
    createCourseError: state => {
      return state.createCourse.err
    },
    createCourse: state => {
      return state.createCourse.courseId
    }
  }),
  components: {
    ImageUploader
  },
  methods: {
    courseSubmit () {
      var courseCover = this.$refs.cover.imgUrl
      var courseDesc = this.$refs.courseDesc.value
      var courseName = this.$refs.courseName.value
      var feeType = this.$refs.feeType.checked
      var operationType = this.$refs.operationType.value
      var price = this.$refs.price.value
      var suitType = this.$refs.suitType.value
      var userId = window.basicUserInfo.userId

      if (!courseCover) {
        alert('请上传课程封面')
        return false
        // courseCover = '123'
      }
      if (feeType === true) {
        feeType = 0
      } else {
        feeType = 1
      }
      if (!courseName || courseName.length < 3) {
        alert('标题字数不少于3个字，不超过15个字')
        return false
      } else if (!courseDesc || courseDesc.length < 20) {
        alert('简介字数不可少于20')
        return false
      } else if (price.length === 0 && feeType === 1) {
        alert('价格不可为空')
        return false
      } else if (suitType === '-1') {
        alert('请选择适合人群')
        return false
      } else if (operationType === '-1') {
        alert('请选择操作风格')
        return false
      }

      this.$store.dispatch('createCourse/fetch', {
        courseCover: courseCover,
        courseDesc: courseDesc,
        courseName: courseName,
        feeType: feeType,
        operationType: operationType,
        price: price * 100,
        suitType: suitType,
        userId: userId
      })
    //   console.log('http://itougu.jrj.com.cn/xlive/course/addCourse.jspa?courseCover=' + courseCover + '&courseDesc=' + courseDesc + '&courseName=' + courseName + '&feeType=' + feeType + '&operationType=' + operationType + '&price=' + price * 100 + '&suitType=' + suitType + '&userId=' + userId)
    },
    checkboxClick () {
      var feeType = this.$refs.feeType.checked
      if (feeType === true) {
        this.priceDisabled = true
      } else {
        this.priceDisabled = false
      }
    },
    descInput () {
      if (this.desc) {
        var txtVal = this.desc.length
        var _this = this
        // console.log((_this.desc + ''s).substring(0, 300))
        if (txtVal > 300) {
          _this.desc = (_this.desc + '').substring(0, 300)
        }
        this.txtVal = this.desc.length
      }
    }
  },
  mounted () {
    this.$watch('createCourseError', createCourseError => {
      alert(createCourseError.msg)
    })
    this.$watch('createCourse', createCourse => {
      window.location.href = 'http://itougu.jrj.com.cn/xlive/course/addMyVideo.jspa?courseId=' + createCourse
    })
  }
}
</script>
