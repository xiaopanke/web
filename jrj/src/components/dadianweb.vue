<style scoped>
@import '../assets/css/reset.css';
.tit {
  border-bottom: 1px solid green;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.item { position: relative; margin-bottom: 60px;}
.btn{ position: absolute; left:800px; top:20px;width: 100px;
text-align: center;
font-size: 16px;
color: #3e0f11;
float: left;
background: #00e2d4;
line-height: 40px;
border-radius: 10px;
box-shadow: 0 5px 0 0 #02867d;
color:#fff;
cursor: pointer;}
.btn:active{background: #474a4a}
.item  li{ margin-bottom: 30px;}
.item span {
  width: 150px;line-height: 26px; padding-left: 40px;
}
.item select,.item input{ width:200px; height: 26px;font-size: 18px; outline: none;}
.item .appv{width:100px;}
.item .long{ width:400px;}
.text{ width:680px; height: 150px;padding:0 10px;resize: none; outline: none; margin-left: 40px; font-size: 14px;}
.nosresult{text-align: center; font-size: 20px;}

</style>

<template>
<div class="dadian">
  <dadianBtn/>
  <div class="tit">查询条件</div>
  <div class="item">
    <ul>
      <li class="clearfix">
        <span class="fl">日期</span>
        <div class="fl">
          <dadianTime v-bind:starttime="beginTime" v-bind:endtime="endTime" v-on:starttimeChanged="startshowMsgFromChild"  v-on:endtimeChanged="endshowMsgFromChild"  />
        </div>
      </li>
      <li class="clearfix">
        <span class="fl">URL中包含</span>
        <input type="text" class="fl long" name="" value="" v-model="searchKey">
      </li>
    </ul>
    <a href="javascript:;" class="btn" @click="appbtn1">检索</a>
  </div>
  <div class="tit">结果(<span>总共{{total}}条</span>)(<span>总共{{totalPage}}页</span>)</div>
  <div v-if="totalPage>1">
      <pagination :page="currentPage" :size="pageSize" :total="total"  @change="turn" />
  </div>
  <dadianTable v-bind:tabledata="tabledata" />
  <JichushareToast/>
  <p v-if="nosresult" class="nosresult">暂无搜索结果</p>
</div>
</template>

<script>
import dadianBtn from 'components/dadian-btn'
import dadianTime from 'components/dadian-time'
import dadianTable from 'components/dadian-table'
import JichushareToast from 'components/jichushare-toast'
import pagination from 'components/paginationnum'
import 'whatwg-fetch'

export default {
  components: {
    dadianBtn,
    dadianTime,
    dadianTable,
    JichushareToast,
    pagination
  },
  data () {
    return {
      nosresult: false,
      total: 0,
      beginTime: this.getNowFormatDate(),
      endTime: this.getNowFormatDate(),
      currentPage: 1,
      pageSize: 30,
      totalPage: 0,
      searchKey: '',
      tabledata: {
        th: ['visitTime', 'firstTime', 'wtid', 'isFirstVisit', 'isLogin', 'userId', 'loginPage', 'returnPage', 'loginTime', 'ssUid', 'ip', 'urlHost', 'url', 'refHost', 'refer', 'sessionId', 'language', 'color', 'flashVersion', 'title', 'os', 'browser', 'status', 'screen', 'source', 'seDomain', 'keyWord', 'urlGroup', 'refGroup', 'site', 'wtidJrj', 'wtidSs'],
        td: []
      }
    }
  },
  computed: {

  },
  mounted () {
    document.title = 'h5/web打点'
    this.$watch('searchKey', (searchKey) => {
      this.currentPage = 1
    })
  },
  methods: {
    pad2 (n) { return n < 10 ? '0' + n : n },
    getNowFormatDate () {
      var date = new Date()
      return date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) + '-' + this.pad2(date.getDate()) + ' ' + this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes()) + ':' + this.pad2(date.getSeconds())
    },
    appbtn1 () {
      if (!this.CompareDate(this.beginTime, this.endTime)) {
        alert('结束时间必须大于开始时间')
        return
      }
      var url = 'http://appcms.jrj.com.cn/admin/queryH5Log.jspa?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize + '&beginTime=' + this.beginTime + '&endTime=' + this.endTime + '&searchKey=' + this.searchKey

      fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.retCode === 1) {
          this.tabledata.td = []
          if (this.currentPage === 1) {
            this.total = v.data.totalCount
            this.totalPage = v.data.totalPage
          }
          if (this.currentPage === 1 && v.data.totalPage === 0) {
            this.nosresult = true
            this.currentPage = 1
            this.total = 0
            return
          }
          this.nosresult = false

          for (var i = 0; i < v.data.list.length; i++) {
            var o = v.data.list[i]
            this.tabledata.td.push([o.visitTime, o.firstTime, o.wtid, o.isFirstVisit, o.isLogin, o.userId, o.loginPage, o.returnPage, o.loginTime, o.ssUid, o.ip, o.urlHost, o.url, o.refHost, o.refer, o.sessionId, o.language, o.color, o.flashVersion, o.title, o.os, o.browser, o.status, o.screen, o.source, o.seDomain, o.keyWord, o.urlGroup, o.refGroup, o.site, o.wtidJrj, o.wtidSs])
          }
        } else if (v.retCode === 48) {
          alert('结束时间必须大于开始时间')
        } else {
          alert(v.msg)
        }
      }).catch(v2 => {
        alert(v2)
      })
    },
    startshowMsgFromChild (data) {
      this.beginTime = data
      this.currentPage = 1
    },
    endshowMsgFromChild (data) {
      this.endTime = data
      this.currentPage = 1
    },
    turn (page) {
      this.currentPage = page
      this.appbtn1()
    },
    CompareDate (d1, d2) {
      return ((new Date(d1.replace(/-/g, '\/'))) < (new Date(d2.replace(/-/g, '\/'))))
    }
  }
}
</script>
