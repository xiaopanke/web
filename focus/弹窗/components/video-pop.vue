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
    min-height: 346px;
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
.pop .video-pop {
    width: 491px;
    margin-left: 27px;
}
.pop .video-pop ul {
    height: 300px;
    overflow-y: scroll;
}
.video-pop p {
    height: 200px;
    text-align: center;
    padding-top: 100px;
    font-size: 16px;
}
.pop .video-pop li {
    line-height: 50px;
    border-bottom: 1px #f0f0f0 solid;
}
.pop .video-pop li input {
    float: left;
    margin: 19px 17px 0 13px;
    display: inline;
}
.pop .video-pop li i {
    width: 18px;
    height: 18px;
    float: left;
    background: url("../assets/images/course-list/icon20.png") no-repeat;
    margin: 16px 9px 0 0;
    position: static;
}
.pop .video-pop li span {
    font-size: 14px;
    color: #333;
}
.video-pop div {
    height: 33px;
    line-height: 33px;
    margin: 15px 0;
}
.video-pop div input {
    float: left;
    margin: 10px 15px 0 13px;
    display: inline;
}
.video-pop div strong {
    float: left;
    line-height: 33px;
    font-size: 14px;
    color: #333;
    font-weight: normal;
}
.video-pop div i {
    width: 15px;
    height: 15px;
    float: left;
    background: url("../assets/images/course-list/icon21.png") no-repeat;
    margin: 10px 9px 0 23px;
    position: static;
}
.video-pop div span {
    float: left;
    line-height: 33px;
    font-size: 12px;
    color: #eeab5c;
}
.video-pop div button {
    float: right;
    width: 130px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background-color: #ff5555;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
}

.pop .sort-video {
    width: 491px;
    margin-left: 27px;
}
.pop .sort-video ul {
    height: 300px;
    overflow-y: scroll;
}
.pop .sort-video li {
    line-height: 50px;
    border-bottom: 1px #f0f0f0 solid;
}
.pop .sort-video li .i1 {
    width: 18px;
    height: 18px;
    float: left;
    background: url("../assets/images/course-list/icon20.png") no-repeat;
    margin: 16px 9px 0 0;
    position: static;
}
.pop .sort-video li .i2 {
    width: 14px;
    height: 16px;
    float: right;
    background: url("../assets/images/course-list/icon22.png") no-repeat;
    margin: 20px 18px 0 0;
    position: static;
}
.pop .sort-video li span {
    font-size: 14px;
    color: #333;
}
.sort-video div {
    height: 33px;
    line-height: 33px;
    margin: 15px 0;
}
.sort-video div i {
    width: 15px;
    height: 15px;
    float: left;
    background: url("../assets/images/course-list/icon21.png") no-repeat;
    margin: 10px 9px 0 23px;
    position: static;
}
.sort-video div span {
    float: left;
    line-height: 33px;
    font-size: 12px;
    color: #eeab5c;
}
.sort-video div button {
    float: right;
    width: 130px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background-color: #ff5555;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
}
</style>
<template>
<div class="pop">
    <h3>添加课程视频</h3>
    <i @click="onCloseClicked"></i>
    <div class="video-pop" v-if="videoPop">
        <ul @scroll="scrollLoad($event)" v-if="listDataShow">
            <li v-for="item in listData.list">
                <input type="checkbox" name="video" value="" :vid="item.videoId" :value="item.videoId" v-model="selected" />
                <i></i>
                <span>{{item.videoName}}</span>
            </li>
        </ul>
        <p v-if="noList">暂无可添加视频，请联系管理员。 <br />客服电话：400-166-1188</p>
        <div v-if="listDataShow">
            <input type="checkbox" name="video-all" v-model="selectAll" />
            <strong>全选</strong>
            <i></i>
            <span>请选择课程视频</span>
            <button type="button" name="button" @click="addVideoClick()">添加选中的视频</button>
        </div>
    </div>
    <div class="sort-video" v-if="sortVideo">
        <ul id="sortable">
            <li v-for="item in selectedData" :vid="item.videoId">
                <i class='i1'></i>
                <span>{{item.videoName}}</span>
                <i class='i2'></i>
            </li>
        </ul>
        <div>
            <i></i>
            <span>拖拽可排序</span>
            <button type="button" name="button" @click="addVideoSubmit()">确认排序并添加</button>
        </div>
    </div>
</div>
</template>
<script>
import jQuery from 'jquery'

// window.basicUserInfo = {
//   userId: '141120010079383950'
// }
import {
    mapState
} from 'vuex'

export default {
  data () {
    return {
      videoPop: true,
      sortVideo: false,
      listDataShow: false,
      noList: false,
      videoData: [{
        id: 1,
        title: '飙升精准形态1'
      },
      {
        id: 2,
        title: '飙升精准形态2'
      },
      {
        id: 3,
        title: '飙升精准形态3'
      },
      {
        id: 4,
        title: '飙升精准形态4'
      },
      {
        id: 5,
        title: '飙升精准形态5'
      },
      {
        id: 6,
        title: '飙升精准形态6'
      },
      {
        id: 7,
        title: '飙升精准形态7'
      },
      {
        id: 8,
        title: '飙升精准形态8'
      },
      {
        id: 9,
        title: '飙升精准形态9'
      },
      {
        id: 10,
        title: '飙升精准形态10'
      }
      ],
      checkedAll: false,
      selected: [],
      selectedData: []
    }
  },
  computed: {
    ...mapState({
      listData: state => {
        return state.videoPop
      },
      list: state => {
        return state.videoPop.list
      }
    }),
    selectAll: {
      get: function () {
        return this.listData.list ? this.selected.length === this.listData.list.length : false
      },
      set: function (value) {
        var selected = []

        if (value) {
          this.listData.list.forEach(function (user) {
            selected.push(user.videoId)
          })
        }
        this.selected = selected
      }
    }
  },
  components: {},
  methods: {
    addVideoClick () {
      var _this = this
      if (this.selected.length > 0) {
        for (var i = 0; i < this.listData.list.length; i++) {
          for (var j = 0; j < this.selected.length; j++) {
            if (this.listData.list[i].videoId === this.selected[j]) {
              this.selectedData.push(this.listData.list[i])
            }
          }
        }
        this.videoPop = false
        this.sortVideo = true
                // 拖拽排序
        window.jQuery = window.$ = jQuery
        require('assets/plugins/jquery-ui.js')
        setTimeout(function () {
          $('#sortable').sortable({
            revert: true,
            stop: function () {
              var ids = []
              $('#sortable li').each((i, li) => {
                ids.push(parseInt($(li).attr('vid')))
              })
              _this.selectedData.sort((a, b) => {
                return ids.indexOf(a.videoId) - ids.indexOf(b.videoId)
              })
              return false
            }
          })
        })
      } else {
        alert('不可为空')
      }
    },
    onCloseClicked () {
      this.$emit('closeVideo')
    },
    addVideoSubmit () {
      this.$emit('addVideo', this.selectedData)
    },
        // 滚动到底部事件
    scrollLoad (v) {
      if (v.target.scrollTop + v.target.clientHeight === v.target.scrollHeight) {
        if ((this.listData.page + 1) <= this.listData.totalPage) {
          this.$store.dispatch('videoPop/fetch', {
            userId: window.basicUserInfo.userId,
            page: this.listData.page + 1
          })
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('videoPop/fetch', {
      userId: window.basicUserInfo.userId
    })
    this.$watch('list', list => {
      console.log(list.length)
      if (list.length > 0) {
        this.listDataShow = true
      } else {
        this.noList = true
      }
    })
  }
}
</script>
