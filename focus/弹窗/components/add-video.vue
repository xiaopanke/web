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
    background: url("../assets/images/course-list/icon1.jpg") 5px 18px no-repeat;
    color: #333;
    font-size: 18px;
    font-weight: normal;
    padding-left: 24px;
    border-bottom: 1px #dadada solid;
}

.add-box {
    width: 882px;
    padding: 0 27.5px;
}

.add-nav {
    margin-top: 30px;
    height: 142px;
}

.add-nav span {
    display: inline-block;
    line-height: 142px;
    text-align: center;
    font-size: 16px;
    color: #333;
    float: left;
}

.add-nav p {
    width: 280px;
    height: 140px;
    border: 1px #dfdfdf solid;
    display: inline-block;
    float: left;
    margin-right: 37px;
    position: relative;
    text-align: center;
    cursor: pointer;
}

.add-nav p strong {
    text-align: center;
    font-size: 14px;
    color: #333;
    font-weight: normal;
    display: block;
    margin: 15px 0 10px;
}

.add-nav p span {
    width: 173px;
    height: 81px;
    display: inline-block;
    margin: 0 0 0 50px;
}

.add-nav p .add-chapter {
    background: url("../assets/images/course-list/icon3.jpg") 0 0 no-repeat;
}

.add-nav p .no-chapter {
    background: url("../assets/images/course-list/icon4.jpg") 0 0 no-repeat;
}

.add-nav p i {
    width: 29px;
    height: 27px;
    background: url("../assets/images/course-list/icon5.png") 0 0 no-repeat;
    position: absolute;
    right: 0;
    bottom: 0;
}

.add-nav p.show {
    border: 1px #3b99fc solid;
}

.add-nav p.show i {
    background: url("../assets/images/course-list/icon6.png") 0 0 no-repeat;
}

.chapter {
    border: 1px #d7d7d7 solid;
    margin-top: 36px;
}

.chapter > div p {
    height: 47px;
    background-color: #f6f6f6;
    line-height: 47px;
    color: #333;
}

.chapter > div p span {
    font-size: 16px;
    float: left;
    height: 47px;
    margin-left: 15px;
}

.chapter > div p strong {
    font-size: 14px;
    float: right;
    margin-right: 20px;
    cursor: pointer;
}

.chapter > div p strong i {
    width: 16px;
    height: 16px;
    float: left;
    margin-top: 15px;
    margin-right: 10px;
}

.chapter > div p strong i.i1 {
    background: url("../assets/images/course-list/icon7.png") no-repeat;
    background-size: 100% 100%;
}

.chapter > div p strong i.i2 {
    background: url("../assets/images/course-list/icon8.png") no-repeat;
    background-size: 100% 100%;
}

.chapter > div p strong i.i3 {
    background: url("../assets/images/course-list/icon9.png") no-repeat;
    background-size: 100% 100%;
}

.chapter li {
    height: 54px;
    line-height: 54px;
    border-bottom: 1px #eee solid;
}

.chapter li div {
    float: left;
    font-size: 14px;
}

.chapter li div span {
    display: inline-block;
    text-indent: 15px;
    color: #b8b8b8;
    float: left;
}

.chapter li div i {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url("../assets/images/course-list/icon10.png") no-repeat;
    float: left;
    margin: 17px 10px 0 15px;
}

.chapter li div strong {
    font-weight: normal;
    color: #333;
}

.chapter li a {
    float: right;
    font-size: 12px;
    margin-right: 23px;
    color: #2e7cd7;
}
.chapter li:last-child {
    border: none;
}

.add-chapter {
    margin-top: 14px;
}

.add-chapter button {
    width: 140px;
    height: 37px;
    background: url("../assets/images/course-list/icon11.png") no-repeat;
    float: right;
    border: none;
    outline: none;
    font-size: 14px;
    padding-left: 20px;
    color: #333;
}

.submit-button {
    border-top: 1px #e5e5e5 solid;
    margin: 89px 0 63px;
}

.submit-button .submit {
    width: 140px;
    height: 32px;
    background-color: #ff5555;
    float: right;
    border: none;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    margin-top: 37px;
    cursor: pointer;
    outline: none;
}

.submit-button .submit.no{
    background-color: #ccc;
}

.submit-button .prev {
    width: 138px;
    height: 30px;
    border: 1px #ff5555 solid;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #ff5555;
    float: right;
    margin: 37px 40px 0 0;
    background: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
}
.add-tab {
    display: none;
}
.add-tab.show {
    display: block;
}
</style>

<template>
<div class="course-box">
    <div class="course-con clearfix">
        <h1>
                <span>添加视频</span>
            </h1>
        <div class="add-box">
            <div class="add-nav">
                <span>选择课程结构：</span>
                <p v-for='item,index in navData' :class="item.iscur ? 'show' : ''" @click="setCur(index)">
                    <strong>{{item.text}}</strong>
                    <span :class="item.class"></span>
                    <i></i>
                </p>
            </div>
            <div :class="iscur === false ? 'add-tab show' : 'add-tab'">

                <div class="chapter">
                    <div v-for='item,index in listData' :chapterId="item.chapterId" v-if="chapter">
                        <p>
                            <span>第{{ index+1 }}章：{{item.chapterName}}</span>
                            <strong @click='addVideo(item.chapterId)'><i class="i1"></i>添加视频</strong>
                            <strong @click='deleteChapter(item.chapterId)'><i class="i2"></i>删除</strong>
                            <strong @click='editChapter(item.chapterId,item.chapterName)'><i class="i3"></i>编辑</strong>
                        </p>
                        <ul>
                            <li v-for='items,indexs in item.videoList' :videoId="items.videoId">
                                <div>
                                    <span>{{ indexs+1 }}.</span>
                                    <i></i>
                                    <strong>{{ items.videoName }}</strong>
                                </div>
                                <a href="javascript:;" @click='deleteChapterVideo(items.id)'>删除</a>
                                <a href="javascript:;" @click='editVideo(items.id,items.videoName)'>编辑</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="add-chapter clearfix">
                    <button type="button" name="button" @click='addChapter()'>添加章节</button>
                </div>
            </div>
            <div :class="iscur === true ? 'add-tab show' : 'add-tab'" >
                <!-- <div class="chapter" v-if="noChapter"> -->
                <div class="chapter">

                    <div>
                        <ul v-if="noChapter">
                            <li v-for='item,index in listData.videoList' :vid="item.id">
                                <div>
                                    <span>{{index+1}}.</span>
                                    <i></i>
                                    <strong>{{item.videoName}}</strong>
                                </div>
                                <a href="javascript:;" @click='deleteChapterVideo(item.id)'>删除</a>
                                <a href="javascript:;" @click='editVideo(item.id,item.videoName)'>编辑</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="add-chapter clearfix">
                    <button type="button" name="button" @click='addVideo(0)'>添加视频</button>
                </div>
            </div>
            <div class="submit-button clearfix">
                <button type="button" name="button" class="submit" @click="fromSubmit()" v-if="submitShow">保存并提交审核</button>
                <button type="button" name="button" class="submit no" v-else>保存并提交审核</button>
                <!-- <button type="button" name="button" class="prev">上一步</button> -->
            </div>
        </div>
    </div>
    <fix-bg v-if="fixBgShow" />
    <chapter-pop @close="closeChapterDialog" v-if="addChapterShow" @add='addChapters' :title="popTitle" :inputTitle="inputTitle" :desc="popDesc" :type="popType" :value="value" />
    <video-pop @closeVideo="closeVideoDialog" v-if="addVideoShow" @addVideo="addVideos" />
    <course-submit-pop v-if="courseSubmitShow" @closeCourse="closeCourseDialog" @submit="submitCourse" />
    <course-delete-pop v-if="courseDeleteShow" @closeDeleteDialog="closeDeleteDialog" :prompt="prompt" @ok="deleteOk" />
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import FixBg from './fix-bg'
import ChapterPop from './chapter-pop'
import VideoPop from './video-pop'
import CourseSubmitPop from './course-submit-pop'
import CourseDeletePop from './course-delete-pop'
import getQueryString from 'utils/getQueryString'

// window.basicUserInfo = {
//   userId: '141120010079383950'
// }

export default {
  data () {
    return {
      iscur: null,
      addChapterShow: false,
      fixBgShow: false,
      videoPop: false,
      addVideoShow: false,
      courseSubmitShow: false,
      chapterId: null,
      popTitle: '',
      inputTitle: '',
      popDesc: '',
      value: '',
      popType: null,
      videoId: null,
      noChapter: false,
      chapter: false,
      courseDeleteShow: false,
      submitShow: false,
      prompt: '删除章节会同时删除章节下所有课程，确定要删除该章节吗？',
      navData: [{
        text: '分章节模式',
        icon: '../assets/images/course-list/icon3.png',
        iscur: false,
        class: 'add-chapter'
      },
      {
        text: '视频列表模式',
        icon: '../assets/images/course-list/icon4.png',
        iscur: false,
        class: 'no-chapter'
      }
      ],
      chapterData: [{
        title: '黑马工作室1',
        edit: '编辑',
        delete: '删除',
        addVideo: '添加视频',
        video: [{
          title: '神奇趋势线1',
          edit: '编辑',
          delete: '删除'
        },
        {
          title: '神奇趋势线2',
          edit: '编辑',
          delete: '删除'
        }
        ]
      },
      {
        title: '黑马工作室2',
        edit: '编辑',
        delete: '删除',
        addVideo: '添加视频',
        video: [{
          title: '神奇趋势线1',
          edit: '编辑',
          delete: '删除'
        },
        {
          title: '神奇趋势线2',
          edit: '编辑',
          delete: '删除'
        }
        ]
      }
      ],
      videoData: []

    }
  },
  computed: mapState({
    listData: state => {
      return state.addVideo.chapterList
    },
    chapterType: state => {
      return state.addVideo.chapterType
    }
  }),
  components: {
    FixBg,
    ChapterPop,
    VideoPop,
    CourseSubmitPop,
    CourseDeletePop
  },
  methods: {
    setCur (index) {
      var tb = this
      if (tb.listData.length === 0) {
        this.navData.map(function (v, i) {
          i === index ? v.iscur = true : v.iscur = false
          i === index ? tb.iscur = true : tb.iscur = false
        })
      } else {
        alert('章节模式和视频模式不可共存')
      }
    },
    closeChapterDialog () {
      this.addChapterShow = false
      this.fixBgShow = false
    },
        // 添加章节
    addChapter () {
      this.popTitle = '添加章节'
      this.inputTitle = '输入章节名称：'
      this.popDesc = '章节'
      this.popType = 1
      this.addChapterShow = true
      this.fixBgShow = true
      this.value = ''
    },
    addChapters (evtValue, type) {
      if (type === 1) {
        this.$store.dispatch('addVideo/addChapter', {
          userId: window.basicUserInfo.userId,
          courseId: getQueryString('courseId'),
          chapterName: evtValue
        })
      } else if (type === 2) {
        this.$store.dispatch('addVideo/modifyChapter', {
          userId: window.basicUserInfo.userId,
          courseId: getQueryString('courseId'),
          chapterName: evtValue,
          chapterId: this.chapterId
        })
      } else if (type === 3) {
        this.$store.dispatch('addVideo/modifyVideo', {
          userId: window.basicUserInfo.userId,
          videoName: evtValue,
          id: this.videoId
        })
      }
      this.addChapterShow = false
      this.fixBgShow = false
    },
        // 添加视频
    addVideo (chapterId) {
      this.chapterId = chapterId
      this.fixBgShow = true
      this.addVideoShow = true
    },
    addVideos (evtValue) {
      var videoId = ''
      for (var i = 0; i < evtValue.length; i++) {
        if ((i + 1) === evtValue.length) {
          videoId += evtValue[i].videoId
        } else {
          videoId += evtValue[i].videoId + ','
        }
      }
      var chapterType = null
      if (this.chapterType === -1) {
        chapterType = 0
      } else {
        chapterType = this.chapterType
      }
      this.$store.dispatch('addVideo/addVideo', {
        chapterId: this.chapterId,
        chapterType: chapterType,
        courseId: getQueryString('courseId'),
        userId: window.basicUserInfo.userId,
        videoId: videoId
      })
      this.fixBgShow = false
      this.addVideoShow = false
    },
        // 删除章节
    deleteChapter (chapterId) {
            //   this.chapterData.splice(index, 1)
      this.chapterId = chapterId
      this.courseDeleteShow = true
      this.fixBgShow = true
    },
        // 删除视频
    deleteChapterVideo (id) {
      if (this.chapterType === 0 && this.listData.videoList.length === 1) {
        this.$store.dispatch('addVideo/deleteChapter', {
          chapterId: this.listData.chapterId,
          courseId: getQueryString('courseId'),
          userId: window.basicUserInfo.userId
        })
      } else {
        this.$store.dispatch('addVideo/deleteVideo', {
          id: id,
          userId: window.basicUserInfo.userId
        })
      }
    },
    closeVideoDialog () {
      this.addVideoShow = false
      this.fixBgShow = false
    },
        // 提交审核
    fromSubmit () {
      this.courseSubmitShow = true
      this.fixBgShow = true
    },
    closeCourseDialog () {
      this.courseSubmitShow = false
      this.fixBgShow = false
    },
    submitCourse () {
      this.$store.dispatch('addVideo/submitCourse', {
        userId: window.basicUserInfo.userId,
        courseId: getQueryString('courseId')
      })
    },
        // 修改章节名称
    editChapter (chapterId, value) {
      this.popTitle = '编辑章节名称'
      this.inputTitle = '章节名称：'
      this.popDesc = '章节'
      this.popType = 2
      this.chapterId = chapterId
      this.addChapterShow = true
      this.fixBgShow = true
      this.value = value
    },
        // 修改视频名称
    editVideo (id, value) {
      this.popTitle = '编辑视频名称'
      this.inputTitle = '视频名称：'
      this.popDesc = '视频'
      this.popType = 3
      this.videoId = id
      this.addChapterShow = true
      this.fixBgShow = true
      this.value = value
    },
    closeDeleteDialog () {
      this.courseDeleteShow = false
      this.fixBgShow = false
    },
    deleteOk () {
      var _this = this
      this.$store.dispatch('addVideo/deleteChapter', {
        chapterId: _this.chapterId,
        courseId: getQueryString('courseId'),
        userId: window.basicUserInfo.userId
      })
      this.courseDeleteShow = false
      this.fixBgShow = false
    }
  },
  mounted () {
    this.$store.dispatch('addVideo/fetch', {
      userId: window.basicUserInfo.userId,
      courseId: getQueryString('courseId')
    })
    this.$watch('chapterType', chapterType => {
      if (chapterType === 0) {
        this.navData[0].iscur = false
        this.navData[1].iscur = true
        this.iscur = true
        this.noChapter = true
      } else if (chapterType === 1) {
        this.navData[0].iscur = true
        this.navData[1].iscur = false
        this.chapter = true
        this.iscur = false
      }
    })
    this.$watch('listData', listData => {
      if (listData.length !== 0) {
        if (listData.chapterType === 0) {
          if (listData.videoList.length > 0) {
            this.submitShow = true
          }
        } else if (this.chapterType === 1) {
          if (listData[0].videoList.length > 0) {
            this.submitShow = true
          } else {
            this.submitShow = false
          }
        }
      } else {
        this.submitShow = false
      }
    })
  }
}
</script>
