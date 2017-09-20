<style scoped>
@import '../assets/css/reset.css';
input {
  outline: none;
}

body {
  background: #fff;
}

a,
.blue {
  color: #2388da;
}

.foundpoollist {}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}

table tr:nth-child(1) {
  background: #f2f2f2;
  color: #666;
  font-size: 12px;
}

table tr:nth-child(1) td {
  height: 30px;
}

td {
  border-bottom: 1px solid #f2f2f2;
}

td,
th {
  word-break: break-all;
  height: 38px;
}

td div {
  padding: 5px;
}

.editbox a {
  padding: 0 20px;
  line-height: 20px;
  border: 1px solid #2a8ae1;
  margin: 0 10px;
  border-radius: 2px;
  font-size: 12px;
  float: left;
}

.editbox .delete {
  width: 20px;
  height: 20px;
  background: url('../assets/images/z3img/delete.png') no-repeat center center;
  padding: 0
}

.editbox .nodelete {
  width: 20px;
  height: 20px;
  background: url('../assets/images/z3img/nodelete.png') no-repeat center center;
  padding: 0;
  border-color: #ccc;
}

.footer div {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.footer div a {
  line-height: 35px;
  background: #2388da;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  margin: 0 20px;
  padding:0 10px;
}

.up {
  margin: 0 auto;
  font-size: 12px;
  width: 340px;
  padding-top: 20px;
  color:#666;
}
.newzuhe li{line-height: 28px;}
.newzuhe li div{float: left;width:120px;}
.up1{width:380px;}
.up1 i{display: inline-block;width:16px;height: 16px;background:url('../assets/images/z3img/ques.png') no-repeat center center;cursor: pointer;}
.up2 {
  width: 380px;
}

.up a {
  color: #2a8ae1;
  font-size: 16px;
}

.up input {
  width: 230px;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  padding-left: 10px;
  margin-left: 10px;
}

</style>
<template>
<div class="foundpoollist">
  <table>
    <tr>
      <td v-for="(item,index) in tabledata.th">
        {{item}}
      </td>
    </tr>
    <tr v-for="(item,index) in tabledata.td">
      <td>
        <router-link :to="{name:'foundpooldetail',params:{id:item.poolId}}" class="blue">{{item.poolName}}</router-link>
      </td>
      <td>
        <div>{{item.fundNum}}</div>
      </td>
      <td>
        <div>{{item.createTime}}</div>
      </td>
      <td>
        <div>{{item.updateTime}}</div>
      </td>
      <td>
        <div>
          <a href="javascript:;" v-if="item.fundStrategyInfoList.length === 0">-</a>
        </div>
        <div>
          <a href="javascript:;" v-for="(item2,index2) in item.fundStrategyInfoList">[{{item2.name}}]{{item2.strategyId}}</a>
        </div>
      </td>
      <td>
        <div class="editbox clearfix" :poolname="item.poolName" :poolId="item.poolId">
          <a href="#" class="build" @click="showdialogfn($event,1)">创建组合</a><a href="#" class="copy" @click="showdialogfn($event,2)">复制</a><a href="#" class="delete" @click="showdialogfn($event,3)" v-if="item.fundStrategyInfoList.length ===0"></a><a href="#"
            class="nodelete" @click="showdialogfn($event,4)" v-if="item.fundStrategyInfoList.length > 0"></a>
        </div>
      </td>
    </tr>
  </table>
  <founddialog :title="popTitle" v-if="dialogShow" @toHideDialog="dialogclosefn">
    <div slot="content">
      <div class="up up1" v-if="content===1">
        <ul class="newzuhe">
          <li class="clearfix">
            <div class="">
              <span>基金池</span>
            </div>
            <select class="" name="" v-model="select1">
                  <option :value="item.poolId" v-for="(item,index) in poolsbox"  :selected="item.poolId===poolId" >{{item.poolName}}</option>
            </select>
          </li>
          <li class="clearfix">
            <div class="">
              <span>现金基金</span>
              <i @click="tips01=!tips01"><div class="" v-if="tips01">
                    在构建组合时，起到现金作用的基金。建议选择推荐基金
              </div></i>
            </div>

            <select class="" name="" v-model="select2">
                <option :value="item.idx" v-for="(item,index) in touzifsdata">{{item.code}}</option>
            </select>
          </li>
          <li class="clearfix">
            <div class="">
              <span>投资方式</span>
            </div>
            <select class="" name=""  ref="touzifangshi">
              <option value="0">一次性投资</option>
              <option value="1">定投：每月</option>
              <option value="1">定投：每双周</option>
              <option value="1">定投：每周</option>
            </select>
          </li>
          <li class="clearfix">
            <div class="">
              <span>起投金额/定投金额</span>
              <i @click="tips02=!tips02"><div class="" v-if="tips02">
                        设置金额低于组合回测的起投金额时，回测结果可能出现问题
              </div></i>
            </div>
            <select class="" name="" ref="qitoujine">
              <option value="500">500元</option>
              <option value="1000">1000元</option>
              <option value="5000">5000元</option>
              <option value="10000">1万元</option>
              <option value="100000">10万元</option>
              <option value="1000000">100万元</option>
            </select>
          </li>
          <li class="clearfix">
            <span>组合名称</span>
            <input type="text" name="" v-model="createStrategyname" placeholder="请输入组合名称">
          </li>
        </ul>

      </div>
      <div class="up up2" v-if="content===2">
        <span>新基金池名称</span><input type="text" name="" v-model="copypoolName" placeholder="请输入基金池名称">
      </div>
      <div class="up up3" v-if="content===3">
        您确认删除回测【<a href="#">{{poolname}}</a>】吗？
      </div>
      <div class="up up4" v-if="content===4">
        【<a href="#">{{poolname}}</a>】已关联基金组合，删除基金组合后，可删除本基金池
      </div>
    </div>
    <div slot="footer">
      <a href="javascript:;" @click="dialogokfn" v-if="okbtnshow">{{okbtntxt ? okbtntxt : '确定'}}</a>
      <a href="javascript:;" @click="dialogclosefn" v-if="closebtnshow">{{closebtntxt ? closebtntxt : '取消'}}</a>
    </div>
  </founddialog>
  <toast :msg="msgtxt"  v-if="msgshow"></toast>
</div>
</template>
<script>
import founddialog from 'components/founddialog'
import toast from 'components/toast'
import 'whatwg-fetch'
import {
  mapState
} from 'vuex'
import { domain } from '../z3tougu/config'

export default {
  data () {
    return {
      tabledata: {
        th: ['名称', '基金数(只)', '创建时间', '修改时间', '组合关联', '编辑'],
        td: {}
      },
      dialogShow: false,
      okbtnshow: true,
      closebtnshow: true,
      copypoolName: '',
      poolname: '',
      msgtxt: '',
      msgshow: false,
      poolId: '',
      orgCode: '200180365',
      userId: '3dce11a5-7db5-42a8-b2d0-81cb70dc10dd',
      createStrategyname: '',
      // 基金池列表
      poolsbox: [],
      select1: '',
      select2: '',
      touzifsdata: [
        {
          'code': '080011.CW',
          'idx': 1
        },
        {
          'code': '630012.CW',
          'idx': 2
        },
        {
          'code': '213009.CW',
          'idx': 3
        },
        {
          'code': '090022.CW',
          'idx': 4
        },
        {
          'code': '270004.CW',
          'idx': 5
        },
        {
          'code': '000331.CW',
          'idx': 6
        },
        {
          'code': '260102.CW',
          'idx': 7
        },
        {
          'code': '000576.CW',
          'idx': 8
        },
        {
          'code': '000425.CW',
          'idx': 9
        },
        {
          'code': '000721.CW',
          'idx': 10
        }
      ]

    }
  },
  components: {
    founddialog,
    toast
  },
  computed: mapState({}),
  mounted () {
    this.getdate()
    // this.touzifsfn()
  },
  methods: {
    showmsg (m) {
      this.msgshow = true
      this.msgtxt = m
      var t = this
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        t.msgshow = false
      }, 3000)
    },
    showdialogfn (v, content) {
      this.poolname = v.toElement.parentNode.getAttribute('poolname')
      this.poolId = v.toElement.parentNode.getAttribute('poolId')
      this.select1 = this.poolId

      console.log(this.poolId)
      this.dialogShow = true
      this.content = content
      if (content === 1) {
        this.popTitle = '创建组合'
        this.closebtnshow = false
        this.okbtntxt = '保存，并创建组合'
      } else if (content === 2) {
        this.popTitle = '复制当前基金池'
        this.closebtnshow = false
        this.okbtntxt = '保存'
      } else if (content === 3) {
        this.popTitle = '删除基金池'
        this.closebtnshow = true
        this.okbtntxt = '确定'
      } else if (content === 4) {
        this.popTitle = '提示'
        this.closebtnshow = false
        this.okbtntxt = '我知道了'
      }
    },
    dialogclosefn () {
      this.dialogShow = false
    },
    dialogokfn () {
      if (this.content === 1) {
        this.createStrategy()
      } else if (this.content === 2) {
        this.copyFundPool()
      } else if (this.content === 3) {
        this.deleteFundPool()
      } else if (this.content === 4) {
        this.dialogShow = false
      }
      // this.dialogShow = false
    },
    getdate () {
      fetch(`${domain}/openapi/fund/showFundPool.shtml?isRecommend=0&userId=` + this.userId + '&orgCode=' + this.orgCode, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          this.tabledata.td = v.data
          for (var i = 0; i < v.data.length; i++) {
            this.poolsbox.push({
              poolName: v.data[i].poolName,
              poolId: v.data[i].poolId
            })
          }
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    copyFundPool () {
      if (!this.copypoolName) {
        this.showmsg('请输入基金池名称')
        return
      }
      fetch(`${domain}/openapi/fund/copyFundPool.shtml?poolName=` + this.copypoolName + '&copyPoolId=' + this.poolId + '&userId=' + this.userId + '&orgCode=' + this.orgCode, {
        method: 'POST',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          this.showmsg('成功')
          this.getdate()
        } else {
          this.showmsg(v.msg)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    deleteFundPool () {
      fetch(`${domain}/openapi/fund/` + this.poolId + '.shtml?userId=' + this.userId + '&orgCode=' + this.orgCode, {
        method: 'POST',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          this.showmsg(v.msg)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    touzifsfn () {
      fetch(`${domain}/tp/zsfnd/getorgmny?orgCode=` + this.orgCode, {
        method: 'get',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        if (v.errCode === 0) {
          console.log(v)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    createStrategy () {
      if (!this.createStrategyname) {
        this.showmsg('请输入组合名称')
        return
      }
      var str = 'fundPoolId=' + this.select1 + '&fundPoolName=' + this.poolsbox.find(item => item.poolId === this.select1)['poolName'] + '&cashFund=' + this.select2 + '&investType=' + this.$refs.touzifangshi.value + '&originPrice=' + this.$refs.qitoujine.value + '&name=' + this.createStrategyname + '&userId=' + this.userId + '&brokerId=' + this.orgCode

      fetch(`${domain}/openapi/fund/createStrategy.shtml?` + str, {
        method: 'post',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        console.log(v)
        if (v.errCode === 0) {
          console.log(v)
        }
      }).catch(v2 => {
        console.log(v2)
      })
    }
  }
}
</script>
