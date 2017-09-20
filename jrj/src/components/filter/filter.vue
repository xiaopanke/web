<template>
  <div class="filter">
    <div class="filterTop clearfix">
      <div class="filterBox fl">
        <div class="topBar cleafix">
          <a href="javascript:;" class="fr btn" @click='exportFundPool'>导出基金</a>
          <ul class="tabList fl">
            <li class="active">筛选条件</li>
            {{foundPoolListData.foundPoolList}}
          </ul>
        </div>
        <!-- 筛选条件 -->
        <filter-select @query='query' @exportFoundPool='exportFoundPool' @change1='filterType' :options = 'options' @selectType = 'selectType'></filter-select>
        <!-- 筛选条件 end-->
      </div>
      <!-- 临时基金池 -->
      <div class="fundPool fl">
        <p class="tr"><a href="javascript:;" class="btn" @click="showDialogFn(content)">保存基金池</a></p>
        <ul class="fundPoolList">
          <li v-for='(item,index) in lsfoundPoolList'><a href="##" class="code">{{item.innerCode}}</a><span class="name">{{item.name}}</span><i class="close" @click='delFoundPoolList(index,item)'></i></li>
          <li v-if="lsfoundPoolList.length === 0"><div class="defaultTxt tc">每个基金池最多可添加50只基金，<br/>保存基金池后，可快速创建组合</div></li>
        </ul>
      </div>
      <!-- 临时基金池 end-->
    </div>

    <div class='filterCon'>
      <div class='top clearfix'>
        <span class="fl">找到基金数：{{fundNum}}</span>
        <div class="search pr fr ml-20">
          <i class="icon_search"></i>
          <input v-model='searchVal' class="searchInput fl" type="txt" name="name" value="" placeholder='在结果中搜索' @keyup.enter='search'>
          <a href="javascript:;" class="s_btn fl" @click='search'>搜索</a>
        </div>
        <label for="jdx" class="fr">
          <input id='jdx' @change='checked($event)' v-model='isConsignment' type="checkbox" name="name" value="">
          仅显示代销基金
        </label>
      </div>
      <!-- 筛选数据 -->
      <div>
        <table class="table tc">
          <thead>
            <tr>
              <th width='4%'>序号</th>
              <th @click="sorts('innerCode')" width='7.6%'><span>基金代码</span></th>
              <th @click="sorts('chiAbbr')" class="pr" width='12%'><span>基金简称</span><i class="icon_help tsk"></i><div class="text">蓝色表示机构正常代销基金，灰色表示机构暂未代销该基金。</div></th>
              <th @click="sorts('estabDate')" width='6%'><span>成立日期</span></th>
              <th @click="sorts('fundScale')" width='7.6%'><span>规模</span></th>
              <th @click="sorts('managerDurationMax')" width='9%'><span>基金经理任值时间</span></th>
              <th width='7.6%' v-if='typeIndex === 1 || typeIndex === 2'>行业</th>
              <th @click="sorts('fundFav')" width='7.6%' v-if='typeIndex === 1 || typeIndex === 2'><span>基金风格</span></th>
              <th @click="sorts('fundType')" width='7.6%' v-if='typeIndex === 0 || typeIndex === 3'><span>类型</span></th>
              <th @click="sorts('staticYield')" width='7.6%' v-if='typeIndex === 6'><span>静态收益</span></th>
              <th @click="sorts('closedPeriod')" width='7.6%' v-if='typeIndex === 7'><span>封闭期</span></th>
              <th @click="sorts('yearYld')" width='7.6%' v-if='typeIndex === 6 || typeIndex === 7'><span>七日年化收益率</span></th>
              <th @click="sorts('tenthouUnitIncm')" width='7.6%' v-if='typeIndex === 6 || typeIndex === 7'><span>万份收益</span></th>
              <th @click="sorts('chgPct')" width='7.6%' v-if="typeIndex === 0 || typeIndex === 1 || typeIndex === 2 || typeIndex === 3 || typeIndex ===4  || typeIndex ===5"><span>涨跌幅</span></th>
              <th width='7.6%' v-if="typeIndex === 0 || typeIndex === 1 || typeIndex === 2 || typeIndex === 3 || typeIndex ===4  || typeIndex ===5">
                <div class="seletetime">
                  <div @click="seletetimeshow=!seletetimeshow">
                    {{seletetimearr[seletetimenum]}}<i :class="seletetimeshow ? 'downicon' : '' "></i>
                  </div>
                  <transition name="fade">
                    <ul v-if="seletetimeshow">
                      <li :seletetimenum="index2" @click="seletenumfn($event)" v-for="(item2,index2) in seletetimearr">{{item2}}</li>
                    </ul>
                  </transition>
                </div>
              </th>
              <th @click="sorts('trackError')" width='7.6%' v-if='typeIndex ===4 || typeIndex === 5'><span>跟踪误差</span></th>
              <th @click="sorts('performBench')" width='7.6%' v-if='typeIndex === 5'><span>业绩比较基准</span></th>
              <th width='7.6%'>起购金额</th>
                <th @click="sorts('fundYieldYearRank')" width='7.6%' v-if='typeIndex === 1 || typeIndex === 2 || typeIndex === 3 || typeIndex === 6'><span>排名</span></th>
              <th @click="sorts('tradeCost')" width='7.6%' v-if='typeIndex === 0' class="pr tsk"><span>交易成本</span><div class="text">基金的最高申购费率、最高赎回费率、管理费率、托管费率、销售服务费率之和</div></th>
              <th width='7.6%'>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item,index) in foundPoolListData.foundPoolList'>
              <td>{{number*numberOfElements+index+1}}</td>
              <td :class="{'blue' : item.consignment == 1}">{{item.innerCode | isNull}}</td>
              <td :class="{'blue' : item.consignment == 1}" class="tl">{{item.name | isNull}}</td>
              <td>{{format(item.estabDate) | isNull}}</td>
              <td>{{item.fundScale | isNull}}</td>
              <td>{{item.managerDurationMax | isNull}}</td>
              <td v-if='typeIndex === 1 || typeIndex === 2'><p class="hyname tc" :title='item.hyName'>{{item.hyName | isNull}}</p></td>
              <td v-if='typeIndex === 1 || typeIndex === 2'>{{item.fundFav| isNull}}</td>
              <td v-if='typeIndex === 0 || typeIndex === 3'>{{item.fundTypeName  | isNull}}</td>
              <td v-if='typeIndex === 6'>{{item.staticYield | isNull }}</td>
              <td v-if='typeIndex === 7'>{{item.closedPeriod | isNull }}</td>
              <td v-if='typeIndex === 6 || typeIndex === 7'>{{item.yearYld | isNull }}</td>
              <td v-if='typeIndex === 6 || typeIndex === 7'>{{item.tenthouUnitIncm  | isNull}}</td>
              <td v-if="typeIndex === 0 || typeIndex === 1 || typeIndex === 2 || typeIndex === 3 || typeIndex ===4  || typeIndex ===5">
                <span v-z3-updowncolor="item.chgPct">{{item.chgPct  | filterNum("%")}}</span>
              </td>
              <td v-if="typeIndex === 0 || typeIndex === 1 || typeIndex === 2 || typeIndex === 3 || typeIndex ===4  || typeIndex ===5">
                <div v-if="seletetimenum==='0'" v-z3-updowncolor="item.fundYieldMonth">{{item.fundYieldMonth  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='1'" v-z3-updowncolor="item.fundYield3Month">{{item.fundYield3Month  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='2'" v-z3-updowncolor="item.fundYield6Month">{{item.fundYield6Month  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='3'" v-z3-updowncolor="item.fundYieldYearSofar">{{item.fundYieldYearSofar  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='4'" v-z3-updowncolor="item.fundYieldYear">{{item.fundYieldYear  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='5'" v-z3-updowncolor="item.fundYield2Year">{{item.fundYield2Year  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='6'" v-z3-updowncolor="item.fundYield3Year">{{item.fundYield3Year  | filterNum("%")}}</div>
                <div v-if="seletetimenum==='7'" v-z3-updowncolor="item.fundYield5Year">{{item.fundYield5Year  | filterNum("%")}}</div>
              </td>
              <td v-if='typeIndex === 4 || typeIndex === 5'>{{item.trackError | isNull}}</td>
              <td v-if='typeIndex === 5'>{{item.performBench  | isNull}}</td>
              <td>{{item.firstBuyMin | isNull}}</td>
              <td v-if='typeIndex === 0'>{{item.tradeCost | isNull}}</td>
              <td v-if='typeIndex === 1 || typeIndex === 2|| typeIndex === 3 || typeIndex === 6'>{{item.fundYieldYearRankName}}</td>
              <td>
                <a href="javascript:;" class="add_button button"   @click="addIinterimFunds(item)" v-if="!item.inTempPools">加基金池</a>
                <a href="javascript:;" class="remove_button button" @click="removeInterimFunds(item)" v-else>移除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 筛选数据 end-->
      <!-- 分页 -->
      <Pagination v-if="foundPoolListLength > 0" @getPageFromChild="goToPage" :totalPage="totalPage" />
      <!-- 分页  end-->
      <p class="zwsj tc" v-if="foundPoolListLength === 0" ><img src='../../assets/images/empty_data.png'/></p>
    </div>
    <!-- 弹框 -->
    <founddialog :title="popTitle" v-if="dialogShow" @toHideDialog="dialogCloseFn">
      <div slot='content'>
        <div class="up" v-if="content == 1">
          <span>基金池名称</span><input v-model='inputPoolName' type="text" name="" placeholder="请输入基金池名称">
          <p class="msg">{{msg}}</p>
        </div>
        <div class="up" v-if="content == 2">
          <p class="msg2 tc">{{msg}}</p>
        </div>
        <div class="down">
          <button v-if="content == 1" @click='save'>保存</button>
          <button v-if="content == 2" @click='dialogCloseFn'>确认</button>
        </div>
      </div>
    </founddialog>
    <!-- 弹框 end-->
    <div class="loading" v-if="maskShow">
      <div>
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
      </div>
      <span>loading...</span>
    </div>
    <!-- <div class="loadings"v-if="maskShow"><div class="pacman"><div></div><div></div><div></div><div></div><div></div></div></div> -->
  </div>
</template>

<script>
  import 'whatwg-fetch'
  import { domain } from '../../z3tougu/config'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import founddialog from 'components/founddialog'
  import FilterSelect from 'components/filter/filter-select'
  import Pagination from 'components/pagination'
  import { formatDate } from '../../utils/date'
  import { ctx } from '../../z3tougu/config'
  export default {
    data () {
      return {
        lsfoundPoolList: [],
        foundPoolList: ['1'],
        seletetimearr: ['近1个月收益', '近3个月收益', '近6个月收益', '今年以来收益', '近1年收益', '近2年收益', '近3年收益', '近5年收益'],
        seletetimeshow: false,
        seletetimenum: '2',
        dialogShow: false,
        popTitle: '',
        tsTxt: '',
        content: 1,
        inputPoolName: '',
        okbtntxt: '保存',
        typeIndex: 0,
        page: 0,
        pageSize: 20,
        type2: 'jjlx_all',
        searchVal: '',
        sort: 'innerCode,asc',
        num: 0,
        userId: '3dce11a5-7db5-42a8-b2d0-81cb70dc10dd',
        orgCode: 200180365,
        fundCodes: '',
        isConsignment: 0,
        msg: '',
        filterParams2: {
          jjlx: 'jylx_all', // 基金类型
          jyzt: 'jyzt_all', // 交易状态
          jjgm: 'jjgm_all', // 基金规模
          clsj: 'clsj_all', // 成立时间
          dexz: 'dexz_all', // 大额限制
          sylbx1: 'sylbx_all', // 收益率表现1
          sylbx2: 'sylbx_all', // 收益率表现2
          nhsyl: 'nhsyl_all', // 年化收益率
          hy: 'all', // 行业
          tzfg: 'tzfg_all', // 投资风格
          jhfxq: 'jhfxq_all', // 机会期风险期
          zdhc: 'zdhc_all', // 最大回撤
          xpb: 'xpb_all', // 夏普比
          cesyl: 'cesy_all', // 超额收益
          fbq: 'fbq_all'// 封闭期
        }
      }
    },
    filters: {
      isNull (value) {
        return value === null || value === '' ? '--' : value
      },
      filterNum (value, type) {
        return value === null || value === '' ? '--' : value.toFixed(2) + type
      }
    },
    components: {
      FilterSelect,
      founddialog,
      Pagination
    },
    computed: {
      ...mapState([
        'totalPage',
        'number',
        'numberOfElements',
        'fundNum',
        'page',
        'pageSize',
        'foundPoolListLength',
        'maskShow'
      ]),
      ...mapGetters({
        totalPage: 'totalPage',
        numberOfElements: 'numberOfElements',
        number: 'number',
        fundNum: 'fundNum',
        page: 'page',
        pageSize: 'pageSize',
        foundPoolListLength: 'foundPoolListLength',
        maskShow: 'maskShow'
      }),
      ...mapState({
        foundPoolListData: function (state) {
          const list = state.filter.foundPoolList
          return {
            foundPoolList: list.map((fund, index) => {
              const tempFund = { ...fund, inTempPools: this.isInTempPoollist(fund.innerCode) }
              return tempFund
            })
          }
        }
      })
    },
    methods: {
      // 排序
      sorts (value) {
        this.num === this.num++
        if (this.num === 1) {
          this.sort = value + ',desc'
        }
        if (this.num === 2) {
          this.sort = value + ',asc'
        } else {
          this.num = 1
          this.sort = value + ',desc'
        }
        this.query(this.filterParams2, this.page, this.type2)
      },
      // 下拉切换数据
      seletenumfn (v) {
        this.seletetimenum = v.currentTarget.getAttribute('seletetimenum')
        this.seletetimeshow = false
      },
      isInTempPoollist (fundid) {
        return this.lsfoundPoolList.some((fund) => {
          return fund.innerCode === fundid
        })
      },
      // 显示弹框
      showDialogFn () {
        this.dialogShow = true
        this.popTitle = '保存当前基金池'
        if (this.lsfoundPoolList.length <= 0) {
          this.content = 2
          this.msg = '基金池为空，无法保存。'
        } else if (this.lsfoundPoolList.length > 50) {
          this.content = 2
          this.msg = '自建基金池已达到20个上限,请删除后,再新建基金池'
        } else {
          this.content = 1
          this.msg = ''
        }
      },
      dialogCloseFn () {
        this.dialogShow = false
      },
      // 保存临时基金池
      save () {
        if (this.inputPoolName === '') {
          this.msg = '请输入筛股条件名称!'
        } else {
          for (let i = 0; i < this.lsfoundPoolList.length; i++) {
            this.fundCodes += this.lsfoundPoolList[i].innerCode + ','
          }
          var str = this.fundCodes.substring(0, this.fundCodes.length - 1)// 去除最后一个逗号
          this._saveFundPool(str)
          this.fundCodes = ''
        }
      },
      _saveFundPool (fundCodes) {
        const url = `${domain}/openapi/fund/saveFundPool.shtml?poolName=${this.inputPoolName}&fundCodes=${fundCodes}&userId=${this.userId}&orgCode=${this.orgCode}`
        return fetch(url, { method: 'POST', mode: 'cors' }).then(res => {
          return res.json()
        }).then(result => {
          console.log(result)
          if (result.errCode === 0) {
            this.dialogShow = false
            this.$router.push({ path: ctx + '/foundpooldetail/' + result.data + '?orgCode=' + this.orgCode })
          } else if (result.errCode === 1505 || result.errCode === 1501 || result.errCode === -1) {
            this.msg = result.msg
            this.errCode = result.errCode
            if (result.errCode === -1) {
              this.content = 2
            }
          }
        })
      },
      // 筛选类型切换查询
      selectType (index, type) {
        this.typeIndex = index
        this.type2 = type
        this.query(this.filterParams2, this.page, this.type2)
        if (this.type2 === 'jjlx_all') {
          this.init()
        }
      },
      // 加入临时基金池
      addIinterimFunds (item) {
        if (this.lsfoundPoolList.length >= 50) {
          this.dialogShow = true
          this.content = 2
          this.msg = '自建基金池已达到50个上限,请删除后,再新建基金池'
        } else {
          this.lsfoundPoolList.push(item)
          item.inTempPools = true
        }
      },
       //  删除股票池数据
      delFoundPoolList (index, item) {
        this.foundPoolListData.foundPoolList.some((fund) => {
          if (fund.innerCode === item.innerCode) {
            fund.inTempPools = false
            return true
          }
        })
        this.lsfoundPoolList.splice(index, 1)
      },
      // 删除股票池状态
      removeInterimFunds (item) {
        item.inTempPools = false
        this.lsfoundPoolList.some((fund, index) => {
          if (fund.innerCode === item.innerCode) {
            this.lsfoundPoolList.splice(index, 1)
            return true
          }
        })
      },
      goToPage (page) {
        this.page = Number(page) - 1
      },
      filterType (type) {
        this.type2 = type
      },
      // 获取筛选数据
      query (filterParams, type) {
        this.filterParams2 = filterParams
        this.$store.dispatch('getFundPool', { type: this.type2, option: this.filterParams2, isConsignment: this.isConsignment, searchVal: this.searchVal, page: this.page, pageSize: this.pageSize, orgCode: this.orgCode, sort: this.sort })
      },
      // 导出筛选数据
      exportFundPool () {
        const url = `${domain}/openapi/fund/exportExcel.shtml?jjlx=${this.type2}&jyzt=${this.filterParams2.jyzt}&sort=${this.sort}&jjgm=${this.filterParams2.jjgm}&clsj=${this.filterParams2.clsj}&dexz=${this.filterParams2.dexz}&sylbx1=${this.filterParams2.sylbx1}&sylbx2=${this.filterParams2.sylbx2}&nhsyl=${this.filterParams2.nhsyl}&hy=hy_${this.filterParams2.hy}&tzfg=${this.filterParams2.tzfg}&jhfxq=${this.filterParams2.jhfxq}&zdhc=${this.filterParams2.zdhc}&xpb=${this.filterParams2.xpb}&cesyl=${this.filterParams2.cesyl}&fbq=${this.filterParams2.fbq}&isConsignment=${this.isConsignment}&searchVal=${this.searchVal}&page=${this.page}&pageSize=${this.pageSize}&orgCode=${this.orgCode}`
        return fetch(url, { method: 'GET', mode: 'cors' }).then((res) => {
          return res.blob()
        }).then(result => {
          var date = new Date()
          var url = window.URL.createObjectURL(result)
          var a = document.createElement('a')
          a.href = url
          a.download = '巨灵智胜基金筛选-' + this.formatDates(date) + '.xlsx'
          a.click()
        })
      },
      // 日期格式化
      format (time) {
        if (time === null) {
          return '--'
        }
        return (time + '').substring(0, 4) + '-' + (time + '').substring(4, 6) + '-' + (time + '').substring(6, (time + '').length)
      },
      formatDates (datestr) {
        return formatDate(datestr, 'yyMMddhhmm ')
      },
      checked (e) {
        const checked = e.target.checked
        if (checked === true) {
          this.isConsignment = 1
          this.query(this.filterParams2, this.page, this.type2)
        } else {
          this.isConsignment = 0
          this.query(this.filterParams2, this.page, this.type2)
        }
      },
      // 搜索查询
      search () {
        this.query(this.filterParams2, this.page, this.type2)
      },
      // 初始化筛选条件
      init () {
        this.filterParams2.jyzt = 'jyzt_all'
        this.filterParams2.jjlx = 'jylx_all' // 基金类型
        this.filterParams2.jyzt = 'jyzt_all' // 交易状态
        this.filterParams2.jjgm = 'jjgm_all' // 基金规模
        this.filterParams2.clsj = 'clsj_all'// 成立时间
        this.filterParams2.dexz = 'dexz_all' // 大额限制
        this.filterParams2.sylbx1 = 'sylbx_all' // 收益率表现1
        this.filterParams2.sylbx2 = 'sylbx_all' // 收益率表现2
        this.filterParams2.nhsyl = 'nhsyl_all' // 年化收益率
        this.filterParams2.hy = 'all'  // 行业
        this.filterParams2.tzfg = 'tzfg_all' // 投资风格
        this.filterParams2.jhfxq = 'jhfxq_all' // 机会期风险期
        this.filterParams2.zdhc = 'zdhc_all' // 最大回撤
        this.filterParams2.xpb = 'xpb_all' // 夏普比
        this.filterParams2.cesyl = 'cesy_all' // 超额收益
        this.filterParams2.fbq = 'fbq_all'// 封闭期
      }
    },
    created () {
      this.query(this.filterParams2, this.page, this.type2)
    },
    mounted () {},
    watch: {
      // 监控页码改变
      'page': {
        deep: true,
        handler: function (oldVal, newVal) {
          this.query(this.filterParams2, this.page, this.type2)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/common/variable.scss';
  @import '../../assets/css/reset.css';
  @import '../../assets/css/base.css';
  @mixin border_radius($num){-webkit-border-radius: $num;-moz-border-radius: $num;border-radius: $num;}
  .app>*{
    width: auto;
    position: static;
    text-align: left;
    font-family: '宋体';
  }
  .cGreen{color:$colorFontFall}
  .cRed{color:$colorFontRise}
  select{
    -webkit-appearance: none;
    appearance: none;
    outline: 0;
    border: 0;
    background: 0;
  }
  .filter {
      font-family: '宋体';
      font-size: $fontSize12;
      color: $colorFontTheme;
      padding: 10px;
      background-color: #fff;
  }
  .btn {
      display: inline-block;
      font-size: $fontSize12;
      color: $colorFontBlue;
      padding: 0 10px;
      height: 22px;
      line-height: 22px;
      background-color: $colorBackground;
      text-align: center;
      @include border_radius(3px);
  }
  .filterTop {
      width: 100%;
      height: 230px;
  }
  .filterBox {
      width: 70%;
      .topBar {
          height: 24px;
          border-bottom: 1px solid $colorFontBlue;
      }
  }
  .tabList {
      font-size: 0;
      height: 24px;
      li {
          display: inline-block;
          font-size: $fontSize12;
          color: $colorFontBlue;
          height: 24px;
          line-height: 24px;
          padding: 0 15px;
          cursor: pointer;
          &.active {
              color: #fff;
              background-color: #2388da;
          }
      }
  }
  .fundPool {
      width: 28%;
      height:175px;
      ul {
          display: block;
          height: 178px;
          overflow: hidden;
          overflow-y: auto;
          margin-top: 20px;
          li {
              position: relative;
              font-size: $fontSize12;
              text-align: left;
              padding-left: 37px;
              height: 25px;
              line-height: 25px;
              span {
                  display: inline-block;
                  overflow: hidden;
              }
              .close {
                  display: block;
                  position: absolute;
                  right: 10px;
                  top:8px;
                  cursor: pointer;
              }
              .code {
                  width: 20%;
                  display: block;
                  float: left;
                  color: #2388da;
              }
              .name {
                  width: 76%;
                  white-space: pre;
                  text-overflow: ellipsis;
              }
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
      span{
        cursor: pointer
      }
    }
    td{
      color: $colorFontTheme;
      height: 40px;
      border-bottom: 1px solid $colorBorder;
      a{
        color: #666;
      }
      &.blue{color:#2388da;}
    }
    select{
      width:92px;
      height: 40px;
      color: #666;
      background: url(../../assets/images/arrows.png) no-repeat right;
    }
    .add_button{
      border-color: #2388da;
      color: #2388da;
    }
  }
  .button{
    display: inline-block;
    width:72px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    @include  border_radius(3px);
  }
  .text{
    display:none;
    width: 181px;
    position: absolute;
    top: -55px;
    left:21px;
    line-height: 1.4;
    border: 1px solid #ccc;
    padding: 10px;
    @include border_radius(3px);
    background-color: #fff;
    color: #666;
    text-align: left;
    &:after{
      content: '';
      position: absolute;
      bottom: -16px;
      left: 85px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #fff;
    }
    &:before{
      content: '';
      position: absolute;
      bottom: -17px;
      left: 85px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #ccc;
    }
  }
  .filterCon{
    .top{
      height: 30px;
      line-height: 30px;
      color: #666;
      margin-bottom: 5px;
    }
    .search{
      width: 170px;
      height: 24px;
      line-height: 24px;
      margin-top: 3px;
      .icon_search{
        position: absolute;
        top:6px;
        left: 8px;
        display: block;
        width: 13px;
        height:13px;
        background: url(../../assets/images/search.png) no-repeat;
      }
      .searchInput{
        width: 120px;
        height: 22px;
        border: 1px solid #ccc;
        @include border_radius(3px);
        text-indent: 25px;
      }

      .s_btn{
        display: inline-block;
        margin-left: -1px;
        width: 47px;
        height: 22px;
        border: 1px solid #2f94ee;
        line-height: 22px;
        text-align: center;
        color: #2f94ee;
        background: #fff;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }
    label{
      color: $colorFontTheme;
      cursor: pointer;
      input{
        vertical-align: -3px;
      }
    }
    select{
      padding: 5px;
    }
  }
  .icon_help{
    display: inline-block;
    width: 15px;
    height:15px;
    background: url(../../assets/images/help.png) no-repeat;
    vertical-align: -3px;
    margin-left: 4px;
  }
  .close{
    display: inline-block;
    width: 9px;
    height:9px;
    background: url(../../assets/images/f_close.png) no-repeat;
    vertical-align: -3px;
    margin-left: 4px;
    cursor: pointer;
  }
  .show{display: block;}
  .tsk{
    &:hover{
      + div,>div{
        display: block;
      }
    }
  }
  .seletetime{
    position: relative;
    cursor: pointer;
    i{ border:6px solid transparent;border-top:6px solid #2f94ee;display: inline-block; vertical-align: -4px; margin-left: 5px;}
    .downicon{border-top:6px solid transparent;border-bottom: 6px solid #2f94ee; vertical-align: 2px;}
    ul{ width: 100%;position: absolute; background: #fff;top:30px; left:0;z-index: 999;border: 1px solid #ddd;border-top:0;li{ line-height: 30px; &::hover{ background: #ccc;}}}
  }
  .zwsj{
    padding-top: 80px;
  }
  .up{margin: 0 auto;width:380px;}
  .up{margin: 30px auto;width:380px;}
  .up span{font-size: 14px;color: #191919;}
  .up input{width:230px;height:34px; line-height: 34px; font-size: 12px; padding-left: 10px;margin-left: 10px;}
  .down{ display: flex;justify-content: center; margin-top:30px; }
  .down button{width:100px;line-height: 32px;background: #39c;color: #fff; text-align: center;}
  .msg{color: red;left: 145px;position: absolute;top: 106px;}
  .msg2{font-size: 14px;}
  .defaultTxt{font-size: $fontSize12;color:$colorFontH;margin-top: 30px}
  p.hyname{width:120px;white-space: pre;text-overflow: ellipsis;overflow: hidden;color:$colorFontTheme}
  /*加载中*/
 @-webkit-keyframes pacman-balls{75%{opacity:.7}100%{-webkit-transform:translate(-100px,-6.25px);transform:translate(-100px,-6.25px)}}@keyframes pacman-balls{75%{opacity:.7}100%{-webkit-transform:translate(-100px,-6.25px);transform:translate(-100px,-6.25px)}}.pacman>div:nth-child(2){-webkit-animation:pacman-balls 1s 0s infinite linear;animation:pacman-balls 1s 0s infinite linear}.pacman>div:nth-child(3){-webkit-animation:pacman-balls 1s .33s infinite linear;animation:pacman-balls 1s .33s infinite linear}.pacman>div:nth-child(4){-webkit-animation:pacman-balls 1s .66s infinite linear;animation:pacman-balls 1s .66s infinite linear}.pacman>div:nth-child(5){-webkit-animation:pacman-balls 1s .99s infinite linear;animation:pacman-balls 1s .99s infinite linear}.pacman>div:first-of-type{width:0;height:0;border-right:25px solid transparent;border-top:25px solid #2388da;border-left:25px solid #2388da;border-bottom:25px solid #2388da;border-radius:25px;-webkit-animation:rotate_pacman_half_up .5s 0s infinite;animation:rotate_pacman_half_up .5s 0s infinite}.pacman>div:nth-child(2){width:0;height:0;border-right:25px solid transparent;border-top:25px solid #2388da;border-left:25px solid #2388da;border-bottom:25px solid #2388da;border-radius:25px;-webkit-animation:rotate_pacman_half_down .5s 0s infinite;animation:rotate_pacman_half_down .5s 0s infinite;margin-top:-50px}.pacman>div:nth-child(3),.pacman>div:nth-child(4),.pacman>div:nth-child(5),.pacman>div:nth-child(6){background-color:#2388da;width:15px;height:15px;border-radius:100%;margin:2px;width:10px;height:10px;position:absolute;-webkit-transform:translate(0,-6.25px);-ms-transform:translate(0,-6.25px);transform:translate(0,-6.25px);top:25px;left:100px}@-webkit-keyframes rotate_pacman_half_up{0%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}}@keyframes rotate_pacman_half_up{0%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}}@-webkit-keyframes rotate_pacman_half_down{0%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}50%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes rotate_pacman_half_down{0%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}50%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
