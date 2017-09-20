<style scoped>
@import '../assets/css/reset.css';
body{background: #fff;}
a,.blue{color:#2a8ae1;}
.foundpooldetail{}
table{border-collapse: collapse;width:100%;font-size: 14px;}
table tr:nth-child(1){background: #f2f2f2; color: #666;font-size: 12px;}
table tr:nth-child(1) td{height: 30px;}
td{border-bottom:1px solid #f2f2f2;}
td,th{word-break:break-all;height: 38px;}
td div{padding:5px;}
.tradeStatusName{border:1px solid #ccc; margin-left: 4px;color: #ccc; display: inline-block;}
.daixiaost{background: #e93e33;color: #fff; line-height: 17px;padding:0 7px; display: inline-block;}
.seletetime{ position: relative; cursor: pointer;z-index: 2;}
.seletetime i{ border:6px solid transparent;border-top:6px solid #2f94ee;display: inline-block; vertical-align: middle; margin-left: 5px;}
.seletetime .downicon{border-top:6px solid transparent;border-bottom: 6px solid #2f94ee; vertical-align: top;}
.seletetime ul{ position: absolute; background: #fff;top:30px; left:0;padding: 10px;}
.seletetime ul li{ line-height: 24px; }
.seletetime ul li:hover{ background: #ccc;}
</style>
<template>
<div class="foundpooldetail">
  <table>
    <tr>
      <td v-for="(item,index) in tabledata.th">
        <div class="seletetime" v-if="index===4">
          <div class=""  @click="seletetimeshow=!seletetimeshow">
            {{seletetimearr[seletetimenum]}}<i :class="seletetimeshow ? 'downicon' : '' "></i>
          </div>
          <ul v-if="seletetimeshow">
            <li :seletetimenum="index2" @click="seletenumfn($event)" v-for="(item2,index2) in seletetimearr">{{item2}}</li>
          </ul>
        </div>
        <div class="" v-else>
            {{item}}
        </div>

      </td>
    </tr>
      <tr v-for="(item,index) in tabledata.td">
        <td>
          <span>{{item.innerCode}}</span>
          <span class="blue" >{{item.name}}</span>
          <span class="daixiaost">{{item.consignment === 1 ? '代销' : '未代销' }}</span>
          <span class="tradeStatusName">{{item.tradeStatusName}}</span>
        </td>
        <td><div >{{item.fundTypeName}}</div></td>
        <td><div >{{item.fundScale}}</div></td>
        <td><div >{{item.chgPct}}</div></td>
        <td>
          <div v-if="seletetimenum==='0'">{{item.fundYieldMonth}}</div>
          <div v-if="seletetimenum==='1'">{{item.fundYield3Month}}</div>
          <div v-if="seletetimenum==='2'">{{item.fundYield6Month}}</div>
          <div v-if="seletetimenum==='3'">{{item.fundYieldYearSofar}}</div>
          <div v-if="seletetimenum==='4'">{{item.fundYieldYear}}</div>
          <div v-if="seletetimenum==='5'">{{item.fundYield2Year}}</div>
          <div v-if="seletetimenum==='6'">{{item.fundYield3Year}}</div>
          <div v-if="seletetimenum==='7'">{{item.fundYield5Year}}</div>
        </td>
        <td><div >{{item.startAmount}}</div></td>
        <td><div >{{item.discount}}</div></td>
        <td><div >{{item.sgflRate}}</div></td>
        <td><div >{{item.shflRate}}</div></td>
        <td><div >{{item.sellDay}}</div></td>
        <td><div >{{item.fundYieldYearRank}}</div></td>
      </tr>
  </table>
  <fundPoolRelevance :relevancedata="relevancedata"></fundPoolRelevance>
  <founddialog :title="haha" v-if="dialogShow" @toHideDialog="dialogclosefn">
    <div slot="content">
      123
    </div>
      <div slot="footer">
        <a href="javascript:;" @click="dialogokfn" v-if="okbtnshow">{{okbtntxt ? okbtntxt : '确定'}}</a>
        <a href="javascript:;" @click="dialogclosefn"  v-if="closebtnshow">{{closebtntxt ? closebtntxt : '取消'}}456</a>
      </div>
  </founddialog>
</div>
</template>
<script>
import founddialog from 'components/founddialog'
import fundPoolRelevance from 'components/fundPoolRelevance'
import 'whatwg-fetch'
import {
  mapState
} from 'vuex'
import { domain } from '../z3tougu/config'

export default {
  data () {
    return {
      tabledata: {
        th: ['基金名称', '类型', '规模', '涨跌幅', '近6个月收益', '起购金额', '申购费折扣', '申购费率', '赎回费率', '购回确认周期', '近1年同类排名'],
        td: {}
      },
      seletetimeshow: false,
      seletetimenum: '2',
      orgCode: '200180365',
      seletetimearr: ['近1个月收益', '近3个月收益', '近6个月收益', '今年以来收益', '近1年收益', '近2年收益', '近3年收益', '近5年收益'],
      relevancedata: { 'fundInfoList': [
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 4,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 4,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 4,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 4,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 7,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 7,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 7,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 12,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 12,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 3,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 7,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 12,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 11,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 11,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 11,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 7,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 5,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 3,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 3,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 7,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 6,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 5,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 3,
          'fundTypeName': '股票型'
        },
        {
          'innerCode': '000048.CW',
          'symbol': '000048',
          'name': '华夏双re债C',
          'fundType': 3,
          'fundTypeName': '股票型'
        }
      ],
        'relevance': [
          [
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.3662039145088282'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ], [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.3662039145088282'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ], [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.3662039145088282'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ], [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.3662039145088282'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ],
          [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ],
          [
            '0.32662039145088282',
            '0.1276264092142834',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '1.0'

          ], [
            '0.43258954682661727',
            '1.0',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.23258954682661727',
            '0.10004092142834'
          ]
        ]
      }

    }
  },
  components: {
    founddialog,
    fundPoolRelevance
  },
  computed: mapState({
  }),
  mounted () {
    this.getdate()
    this.relevancedatafn()
  },
  methods: {
    getdate () {
      fetch(`${domain}/openapi/fund/` + this.$route.params.id + '.shtml?orgCode=' + this.orgCode, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        console.log(v)
        if (v.errCode === 0) {
          this.tabledata.td = v.data
        }
      }).catch(v2 => {
        console.log(v2)
      })
    },
    seletenumfn (v) {
      this.seletetimenum = v.currentTarget.getAttribute('seletetimenum')
      this.seletetimeshow = false
    },
    relevancedatafn () {
      fetch(`${domain}/openapi/fund/fundPoolRelevance.shtml?poolId=` + this.$route.params.id, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }).then((res) => {
        return res.json()
      }).then(v => {
        console.log(v)
        if (v.errCode === 0) {
          // this.relevancedata = v.data
        }
      }).catch(v2 => {
        console.log(v2)
      })
    }
  }
}
</script>
