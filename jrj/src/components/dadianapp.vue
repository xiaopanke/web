<style scoped>
@import '../assets/css/reset.css';
.tit {
  border-bottom: 1px solid green;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
}

.item {
  position: relative;
  margin-bottom: 60px;
}

.btn {
  position: absolute;
  left: 800px;
  top: 20px;
  width: 100px;
  text-align: center;
  font-size: 16px;
  color: #3e0f11;
  float: left;
  background: #00e2d4;
  line-height: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 0 0 #02867d;
  color: #fff;
  cursor: pointer;
}

.btn:active {
  background: #474a4a
}

.item li {
  margin-bottom: 30px;
}

.item span {
  width: 100px;
  line-height: 26px;
  padding-left: 25px;
}

.item select,
.item input {
  width: 200px;
  height: 26px;
  font-size: 18px;
  outline: none;
}

.item .appv {
  width: 100px;
}

.item .long {
  width: 400px;
}

.text {
  width: 680px;
  height: 150px;
  padding: 0 10px;
  resize: none;
  outline: none;
  margin-left: 40px;
  font-size: 14px;
}

.nosresult {
  text-align: center;
  font-size: 20px;
}
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
          <dadianTime v-bind:starttime="beginTime" v-bind:endtime="endTime" v-on:starttimeChanged="startshowMsgFromChild" v-on:endtimeChanged="endshowMsgFromChild" />
        </div>
      </li>
      <li class="clearfix">
        <span class="fl">系统</span>
        <select class="fl" name="" v-model="osType">
          <option value="1" selected="">Ios</option>
          <option value="2">Android</option>
        </select>
        <span class="fl">appversion</span>
        <input type="text" class="fl appv" name="" v-model="appVersion" value=""> <b>请输入要正确：比如6.9.0</b>
      </li>
      <li class="clearfix">
        <span class="fl">d_name</span>
        <input type="text" class="fl" name="" value="" v-model="searchKey">
        <span class="fl">devid</span>
        <input type="text" class="fl long" name="" value="" v-model="devId">
      </li>
    </ul>
    <a href="javascript:;" class="btn" @click="appbtn1">检索</a>
  </div>
  <div class="tit">结果(<span>总共{{total}}条</span>)(<span>总共{{totalPage}}页</span>)</div>
  <div v-if="totalPage>1">
    <pagination :page="currentPage" :size="pageSize" :total="total" @change="turn" />
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
      osType: '1',
      appVersion: '',
      searchKey: '',
      devId: '',
      tabledata: {
        th: ['brand', 'model', 'pixel', 'network', 'ip', 'passportId', 'idfa', 'mac', 'channelId', 'appVer', 'devId', 'platId', 'productId', 'localizedModel', 'systemName', 'systemVersion', 'accessToken', 'appId', 'verifyCode', 'mobile', 'dName',
          'dResult', 'dTime', 'other', 'dDate'
        ],
        td: []
      }
    }
  },
  computed: {

  },
  mounted () {
    document.title = 'app打点'
    this.$watch('appVersion', (appVersion) => {
      this.currentPage = 1
    })
    this.$watch('osType', (osType) => {
      this.currentPage = 1
    })
    this.$watch('searchKey', (searchKey) => {
      this.currentPage = 1
    })
    this.$watch('devId', (devId) => {
      this.currentPage = 1
    })
  },
  methods: {
    pad2 (n) {
      return n < 10 ? '0' + n : n
    },
    getNowFormatDate () {
      var date = new Date()
      return date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) + '-' + this.pad2(date.getDate()) + ' ' + this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes()) + ':' + this.pad2(date.getSeconds())
    },
    appbtn1 () {
      if (!this.CompareDate(this.beginTime, this.endTime)) {
        alert('结束时间必须大于开始时间')
        return
      }
      var url = 'http://appcms.jrj.com.cn/admin/queryAppLog.jspa?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize + '&beginTime=' + this.beginTime + '&endTime=' + this.endTime + '&osType=' + this.osType + '&appVersion=' + this.appVersion +
        '&searchKey=' + this.searchKey + '&devId=' + this.devId

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
            this.tabledata.td.push([o.brand, o.model, o.pixel, o.network, o.ip, o.passportId, o.idfa, o.mac, o.channelId, o.appVer, o.devId, o.platId, o.productId, o.localizedModel, o.systemName, o.systemVersion, o.accessToken, o.appId, o.verifyCode,
              o.mobile, o.dName, o.dResult, o.dTime, o.other, o.dDate
            ])
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
