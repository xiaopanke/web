<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .dialog{
        width:450px;
        height:240px;
        background: #4B515E;
    }
    .top{
        height:34px;
        color:#fff;
        font-size:14px;
        text-align: left;
        line-height: 34px;
        padding:0 10px;
    }
    .bottom{
        color:#fff;
        padding-right: 5px;
    }
    .bottomLeft{
        width:125px;
        font-size: 12px;
        padding:0 10px;
    }
    .bottomLeft p{
        margin:0;
    }
    .bottomLeft>div{
        margin-bottom: 7px;
    }
    .bottomRight {
        width:300px;
        height:200px;
    }
</style>
<template>
    <div class="dialog">
        <div class="top clearfix">
            <span class="fl">{{dialogOptions.stockName}}[{{dialogOptions.stockCode}}]</span>
            <span class="fr">
                <span :style="{color:colorS,marginRight:5+'px'}">{{hoverStock.lastPx}}</span>
                <span :style="{color:colorS,marginRight:5+'px'}">{{Number(hoverStock.chgPx) >0 ? '+':''}}{{hoverStock.chgPx}}</span>
                <span :style="{color:colorS}">({{Number(hoverStock.chgPx) >0 ? '+':''}}{{hoverStock.chgPctPx}})</span>
            </span>
        </div>
        <div class="bottom clearfix">
            <div class="bottomLeft fl">
               <div v-show="xData !== 'sw_indu_name' && xData !== 'chi_spel' && xData !== 'order'">
                   <p>{{xSelectData[xData]}}</p>
                   <p>{{dialogOptions.leftList.xData.value}}</p>
               </div>
                <div v-show="yData !== 'sw_indu_name' && yData !== 'chi_spel' && yData !== 'order'">
                    <p>{{xSelectData[yData]}}</p>
                    <p>{{dialogOptions.leftList.yData.value}}</p>
                </div>
                <div v-show="bubbleSize !== ''">
                    <p>{{bubbleSizeSelect[bubbleSize]}}</p>
                    <p>{{dialogOptions.leftList.bubbleSize.value}}</p>
                </div>
                <div v-show="bubbleColor !== '' && bubbleColor !== 'sw_indu_name'">
                    <p>{{bubbleColorSelect[bubbleColor]}}</p>
                    <p>{{dialogOptions.leftList.bubbleColor.value}}</p>
                </div>
            </div>
            <div class="bottomRight fl">
                <Stockkline :stockCode="dialogOptions.stockCode" :chartWidth="300" :chartHeight="200"></Stockkline>
            </div>
        </div>
    </div>
</template>
<script>
    import Stockkline from 'components/stock-kline'
    import * as Data from '../z3tougu/constant/siwei.js'
    import { mapState } from 'vuex'
    
    export default{
      props: ['dialogOptions'],
      data () {
        return {
          xSelectData: Data.xSelectData,
          bubbleSizeSelect: Data.bubbleSizeSelect,
          bubbleColorSelect: Data.bubbleColorSelect
        }
      },
      components: {
        Stockkline
      },
      watch: {

      },
      computed: mapState({
        xData: state => state.bubbles.parameterData.xData,
        yData: state => state.bubbles.parameterData.yData,
        bubbleSize: state => state.bubbles.parameterData.bubblesSize,
        bubbleColor: state => state.bubbles.parameterData.bubbleColor,
        hoverStock: state => state.stock.stock,
        colorS: function () {
          if (Number(this.hoverStock.chgPx) > 0) {
            return '#ef232a'
          } else if (Number(this.hoverStock.chgPx) < 0) {
            return '#14b143'
          } else {
            return ''
          }
        }
      }),
      methods: {

      },
      mounted () {
    
      }
    }

</script>
