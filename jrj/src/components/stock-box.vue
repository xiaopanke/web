<template>
    <div class="stock-box" :style="position" v-show="isShow">
        <div class="stock-box-header"><span class="left">{{stock.stockName}}[{{stock.stockCode}}]</span><span class="right" v-z3-updowncolor="stock.chgPx">({{updownMark + stock.chgPctPx}})</span><span class="right" v-z3-updowncolor="stock.chgPx">{{updownMark + stock.chgPx}}</span><span class="right" v-z3-updowncolor="stock.chgPx">{{stock.lastPx}}</span></div>
        <div>
            <StockKline :stockCode="stockCode" chartWidth="360" chartHeight="250"></StockKline>
        </div>
    </div>
</template>

<script>
    import StockKline from 'components/stock-kline'
    import { mapState } from 'vuex'
    import config from '../z3tougu/config'
    export default{
      props: ['stockCode', 'top', 'left'],
      data () {
        return {
          isShow: false
        }
      },
      components: {
        StockKline
      },
      computed: {
        ...mapState({
          stock: state => state.stock.stock
        }),
        position () {
          return 'top:' + this.top + 'px;left:' + this.left + 'px'
        },
        updownMark () {
          let flag = this.stock.chgPx
          let mark = ''
          if (flag === config.emptyValue) {
            flag = 0
          }
          if (flag > 0) {
            mark = '+'
          }
          return mark
        }
      },
      methods: {
      }
    }
</script>

<style scoped>
    .stock-box{
        position:absolute;
        padding:10px;
        padding-top:25px;
        border:1px solid #eee;
        background:#fff;
        z-index: 999;
        -ms-box-shadow: rgb(204, 204, 204) 2px 3px 2px;
        -o-box-shadow: rgb(204, 204, 204) 2px 3px 2px;
        -webkit-box-shadow: rgb(204, 204, 204) 2px 3px 2px;
        -moz-box-shadow: rgb(204, 204, 204) 2px 3px 2px;
        box-shadow: rgb(204, 204, 204) 2px 3px 2px;
    }
    .stock-box .stock-box-header{
        height:30px;
        line-height:30px;
        position:absolute;
        top:0;
        left:10px;
        right:10px;
        font-size:14px;
    }
    .stock-box .stock-box-header .left{
        float:left;
        margin-left:10px;
    }
    .stock-box .stock-box-header .right{
        float:right;
        margin-right:10px;
    }
</style>
