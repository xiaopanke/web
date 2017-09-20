<template>
  <div id="smartPoolList">
    <div class="top clearfix">
      <ul class="navList fl">
        <li :class="{'active': selectActive == 1}" @click='selectActive = 1'>自建基金池</li>
        <li :class="{'active': selectActive == 2}" @click='selectActive = 2'>智能基金池</li>
      </ul>
      <p class="fr">温馨提示：智能基金池为系统创建，如基金池中出现未代销基金，则基金池及关联组合失效，可删除。</p>
    </div>
    <div>
      <table class="table tc">
          <tr>
            <th v-for="theader in theaders">{{theader}}</th>
          </tr>
          <tr v-for="item in smartPoolList">
            <td :class='{blue:item.userByStrategy == 1}'>
              <router-link :to="{path: 'smartPoolListDetails/' + item.poolId}" class="blue">[{{item.poolName}}]<span v-if="item.isInvalid" v-text="item.isInvalid == false?'无效':''"></span></router-link>
            </td>
            <td>{{item.fundNum | fundNum('只')}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.updateTime}}</td>
            <td><span v-for="fsiList in item.fundStrategyInfoList" :class='{blue:item.userByStrategy == 1}'>[{{fsiList.name}}]</span></td>
            <td>
              <a v-if="!item.isInvalid"  :poolName='item.poolName' :poolId = 'item.poolId' href="javascript:;" class="button copy_button" @click='showDialog($event,content)'>复制</a>
            </td>
          </tr>
      </table>
    </div>
    <founddialog :title="popTitle" v-if="show" @toHideDialog="dialogclosefn">
      <div slot='content'>
        <div class="up" v-if="content == 1">
          <span>复制当前基金池</span><input v-model='inputPoolName' type="text" name="" placeholder="请输入基金池名称">
          <p class="msg">{{msg}}</p>
        </div>
        <div class="up" v-if="content == 2">
          <p class="msg2 tc">{{msg}}</p>
        </div>
        <div class="down">
          <button v-if="content == 1" @click='save'>保存</button>
          <button v-if="content == 2" @click='dialogclosefn'>确认</button>
        </div>
      </div>
    </founddialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import founddialog from 'components/founddialog'
  import { domain } from '../../z3tougu/config'
  import { ctx } from '../../z3tougu/config'
  export default{
    data () {
      return {
        theaders: ['名称', '基金数(只)', '创建时间', '修改时间', '组合关联', '操作'],
        selectActive: 2,
        show: false,
        isRecommend: 1,
        userId: '3dce11a5-7db5-42a8-b2d0-81cb70dc10dd',
        orgCode: '200180365',
        poolId: '',
        poolName: '',
        inputPoolName: '',
        msg: '',
        errCode: '',
        isInvalid: '',
        content: 1
      }
    },
    components: {
      founddialog
    },
    mounted () {
      this._getSmartPoolList()
    },
    computed: {
      ...mapState([
        'smartPoolList'
      ]),
      ...mapGetters({
        smartPoolList: 'smartPoolList'
      })
    },
    methods: {
      // 智能基金池列表
      _getSmartPoolList () {
        this.$store.dispatch('getSmartPoolList', { isRecommend: this.isRecommend, userId: this.userId, orgCode: this.orgCode })
      },
      // 复制基金池
      copySmartPool () {
        const url = `${domain}/openapi/fund/copyFundPool.shtml?poolName=${this.inputPoolName}&copyPoolId=${this.poolId}&userId=${this.userId}&orgCode=${this.orgCode}`
        return fetch(url, { method: 'POST', mode: 'cors' }).then((res) => {
          return res.json()
        }).then(result => {
          if (result.errCode === 0) {
            this.show = false
            this.$router.push({ path: ctx + '/smartPoolListDetails/' + result.data })
          } else if (result.errCode === 1505 || result.errCode === 1501 || result.errCode === -1) {
            this.msg = result.msg
            this.errCode = result.errCode
            if (result.errCode === -1) {
              this.content = 2
            }
          }
        })
      },
      showDialog (e, content) {
        this.poolName = e.target.attributes.poolname.value
        this.poolId = e.target.attributes.poolid.value
        this.show = true
        this.popTitle = '复制当前基金池'
        this.inputPoolName = ''
      },
      dialogclosefn () {
        this.show = false
        this.content = 1
        this.msg = ''
      },
      save () {
        this.copySmartPool()
      }
    }
  }
  Vue.filter('fundNum', function (value, type) {
    return value + type
  })
</script>
<style scoped lang="scss">
  @import '../../assets/common/variable.scss';
  @import '../../assets/css/reset.css';
  @import '../../assets/css/base.css';
  @mixin border_radius($num){-webkit-border-radius: $num;-moz-border-radius: $num;border-radius: $num;}
  .app>*{
    width: auto;
    position: static;
    text-align: left;
  }
  #smartPoolList{
    font-family: '宋体';
    background-color: #fff;
    font-size: 12px;
    color: #191919;
    padding: 10px;
    .top{
      font-size: $fontSize12;
      height: 23px;
      line-height: 23px;
      margin-bottom: 15px;
      p{
        color: #9099a9;
      }
    }
  }
  .navList{
    border: 1px solid #2388da;
    @include  border_radius(3px);
    li{
      float: left;
      color: #2388da;
      padding: 0 20px;
      cursor: pointer;
      &.active{
        color:#fff;
        background-color: #2388da;
      }
    }
  }
  .table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    th{
      font-weight: normal;
      color: #666;
      height: 30px;
      line-height: 30px;
      background-color: #f2f2f2;
    }
    td{
      color: $colorFontTheme;
      height: 40px;
      border-bottom: 1px solid $colorBorder;
      a{
        color: #666;
      }
      .button{
        display: inline-block;
        width:72px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border: 1px solid #ccc;
        @include border_radius(3px);
      }
      .copy_button{
        border-color: #2388da;
        color: #2388da;
      }
      &.blue{
        color: #2388da;
      }
    }
    .blue{
      color: #2388da;
    }
  }
  .up{margin: 0 auto;width:380px;}
  .up{margin: 30px auto;width:380px;}
  .up span{font-size: 14px;color: #191919;}
  .up input{width:230px;height:34px; line-height: 34px; font-size: 12px; padding-left: 10px;margin-left: 10px;}
  .down{ display: flex;justify-content: center; margin-top:30px; }
  .down button{width:100px;line-height: 32px;background: #39c;color: #fff; text-align: center;}
  .msg{color: red;left: 169px;position: absolute;top: 106px;}
  .msg2{font-size: 14px;}
</style>
