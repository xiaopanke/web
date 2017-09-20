<style lang="scss" scoped>
@import '../assets/css/reset.css';
.clearfix:after {
    display: block;
    content: '';
    clear: both;
}

.courseList-box h1 {
    line-height: 33px;
    height: 33px;
    color: #333;
    font-size: 16px;
    font-weight: normal;
    padding-left: 8px;
    border-bottom: 1px #dadada solid;
}

.courseList-box h1 span {
    float: left;
}

.courseList-box h1 a {
    width: 112px;
    height: 26px;
    background: url("../assets/images/course-list/icon12.png") no-repeat;
    float: right;
    border: none;
    outline: none;
    cursor: pointer;
}

.courseList-box li {
    height: 161px;
    border-bottom: 1px solid #e6e6e6;
    margin-top: 25px;
}

.courseList-box .courseList-top {
    height: 108px;
    background-color: #f6f6f6;
    position: relative;
}

.courseList-box .courseList-top img {
    width: 152px;
    height: 108px;
    float: left;
}

.courseList-box .courseList-top div {
    padding: 15px 19px;
    float: left;
}

.courseList-box .courseList-top div h3 {
    font-size: 18px;
    font-weight: normal;
    color: #333;
    margin: 2px 0;
}

.courseList-box .courseList-top div p {
    width: 530px;
    font-size: 14px;
    color: #666666;
    line-height: 24px;
    height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.courseList-box .courseList-top div p span {
    color: #ff4040;
}

.courseList-box .courseList-top i {
    width: 65px;
    height: 23px;
    background: url("../assets/images/course-list/icon13.png") no-repeat;
    position: absolute;
    top: 0;
    right: 0;
}

.courseList-box .courseList-top i.show {
    background: url("../assets/images/course-list/icon17.png") no-repeat;
}

.courseList-box .courseList-top i.show1 {
    background: url("../assets/images/course-list/icon18.png") no-repeat;
}

.courseList-box .courseList-bottom {
    height: 53px;
    line-height: 53px;
}

.courseList-box .courseList-bottom div {
    float: left;
    line-height: 53px;
}

.courseList-box .courseList-bottom div i {
    width: 18px;
    height: 18px;
    float: left;
    margin: 17px 10px 0 6px;
    display: inline;
}

.courseList-bottom div i.i1 {
    background: url("../assets/images/course-list/icon14.png") no-repeat;
    background-size: 100% 100%;
}

.courseList-bottom div i.i2 {
    background: url("../assets/images/course-list/icon15.png") no-repeat;
    background-size: 100% 100%;
}

.courseList-bottom i.i3 {
    background: url("../assets/images/course-list/icon8.png") no-repeat;
    background-size: 100% 100%;
}

.courseList-bottom i.i4 {
    background: url("../assets/images/course-list/icon16.png") no-repeat;
    background-size: 100% 100%;
}

.courseList-box .courseList-bottom div p {
    float: left;
    font-size: 14px;
    color: #888;
    margin-right: 5px;
}

.courseList-box .courseList-bottom div p span {
    color: #ff4040;
}

.courseList-box .courseList-bottom a {
    float: right;
    margin-left: 10px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

.courseList-box .courseList-bottom a i {
    width: 18px;
    height: 18px;
    float: left;
    margin: 17px 6px 0 10px;
    display: inline;
}
.courseList-box ul {
    min-height: 536px;
    margin-bottom: 10px;
}
.courseList-box .noList {
    height: 536px;
    line-height: 536px;
    text-align: center;
    border: none;
    font-size: 20px;
}
</style>

<template>
<div class="courseList-box">
    <h1>
                <span>课程管理</span>
                <!-- <button type="button" name="button"></button> -->
                <a href="http://itougu.jrj.com.cn/xlive/course/addMyCourse.jspa"></a>
                <!-- <a href="http://localhost:8081/dist/web/createCourse.html"></a> -->
            </h1>
    <ul>
        <li v-if="listDataShow" class="noList">暂无课程</li>
        <li v-for="course of listData.list" v-else>
            <div class="courseList-top clearfix" @click="courseListClick">
                <img :src="course.courseCover" />
                <div>
                    <h3>{{course.courseName}}</h3>
                    <p>{{course.courseDesc}}</p>
                    <p>课程数：<span>{{course.videoNum}}</span>节课</p>
                </div>
                <i :class="course.status == 0 ? 'show1' : course.status == 1 ? '' : 'show'"></i>
            </div>
            <div class="courseList-bottom">
                <div>
                    <i class="i1"></i>
                    <p>{{moment(parseInt(course.ctime),'YYYY年MM月DD日 HH:mm')}}创建</p>
                    <i class="i2"></i>
                    <p><span>{{course.sellNum}}</span>人购买</p>
                    <i></i>
                    <p v-if="course.feeType == 1"><span>￥ {{(course.price/100).toFixed(0)}}</span></p>
                    <p v-else><span>免费</span></p>
                </div>
                <a href="javascript:;" v-if="course.status == 0 || course.status == 1">
                            <i class="i3"></i>
                            <span @click="deleteCourse(course.courseId)">删除</span>
                        </a>
                <a href="javascript:;" v-if="course.status == 0">
                            <i class="i4"></i>
                            <span @click="addVideo(course.courseId)">上传视频</span>
                        </a>
            </div>
        </li>
    </ul>
    <pagination v-if="listData.pagesize*listData.totalPage > 10" :page="listData.page" :size="listData.pagesize" :total="listData.pagesize*listData.totalPage" @change="turn" />
    <fix-bg v-if="fixBgShow" />
    <course-delete-pop v-if="courseDeleteShow" @closeDeleteDialog="closeDeleteDialog" :prompt="prompt" @ok="deleteOk" />

</div>
</template>

<script>
// window.basicUserInfo = {
//   userId: '141120010079383950'
// }
import {
    mapState
} from 'vuex'
import moment from 'moment'
import Pagination from './pagination'
import CourseDeletePop from './course-delete-pop'
import FixBg from './fix-bg'

export default {
  data () {
    return {
      listShow: false,
      fixBgShow: false,
      courseDeleteShow: false,
      prompt: '确认删除该课程吗？',
      courseId: null,
      listDataShow: false
    }
  },
  computed: mapState({
    listData: state => {
      return state.courseList
    },
    list: state => {
      return state.courseList.list
    }
  }),
  components: {
    Pagination,
    CourseDeletePop,
    FixBg
  },
  methods: {
    moment (time, format) {
      return moment(time).format(format)
    },
    turn (page) {
      this.$store.dispatch('courseList/fetch', {
        userId: window.basicUserInfo.userId,
        page: page
      })
    },
    deleteCourse (courseId) {
      this.courseId = courseId
      this.fixBgShow = true
      this.courseDeleteShow = true
    },
    addVideo (courseId) {
      window.location.href = 'http://itougu.jrj.com.cn/xlive/course/addMyVideo.jspa?courseId=' + courseId
    },
    closeDeleteDialog () {
      this.courseDeleteShow = false
      this.fixBgShow = false
    },
    deleteOk () {
      var _this = this
      this.$store.dispatch('courseList/deleteCourse', {
        courseId: _this.courseId,
        userId: window.basicUserInfo.userId
      })
      this.fixBgShow = false
      this.courseDeleteShow = false
    },
    courseListClick () {
      alert('课程详情页面正在开发中，敬请期待！')
    }
  },
  mounted () {
    this.$store.dispatch('courseList/fetch', {
      userId: window.basicUserInfo.userId
    })
    this.$watch('list', list => {
      if (list.length === 0) {
        this.listDataShow = true
      }
    })
  }
}
</script>
